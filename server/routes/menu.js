import { Router } from 'express'
import db from '../db.js'

const router = Router()

const FLIK_BASE = 'https://pomfretschool.api.flikisdining.com/menu/api/weeks/school/pomfret-school-main-house/menu-type'
const USDA_API = 'https://api.nal.usda.gov/fdc/v1/foods/search'

// In-memory cache for Flik menu responses (1-hour TTL)
const menuCache = new Map()
const MENU_CACHE_TTL = 60 * 60 * 1000

// USDA nutrient number → our field mapping
const NUTRIENT_MAP = {
  '208': 'calories',       // Energy (kcal)
  '203': 'protein_g',      // Protein
  '205': 'carbohydrates_total_g', // Carbohydrate
  '204': 'fat_total_g',    // Total lipid (fat)
  '291': 'fiber_g',        // Fiber, total dietary
  '269': 'sugar_g',        // Total Sugars
}

// ── USDA API key config ───────────────────────────────
const USDA_KEY = process.env.USDA_API_KEY || 'DEMO_KEY'
const IS_DEMO_KEY = USDA_KEY === 'DEMO_KEY'

// DEMO_KEY: 30 req/hr → need ~120s between requests
// Proper key: 1000 req/hr → 4s between requests is safe
const REQUEST_DELAY = IS_DEMO_KEY ? 3000 : 500
const MAX_RETRIES = 2

if (IS_DEMO_KEY) {
  console.log(
    '\n⚠️  Using USDA DEMO_KEY (30 requests/hour limit).\n' +
    '   Nutrition data will load slowly. Get a free key at:\n' +
    '   https://fdc.nal.usda.gov/api-key-signup/\n' +
    '   Then add USDA_API_KEY=your_key to .env\n'
  )
}

// ── Rate limiter for DEMO_KEY ─────────────────────────
// Track requests per hour to avoid burning through the limit
let requestTimestamps = []
const HOURLY_LIMIT = IS_DEMO_KEY ? 25 : 900 // leave some headroom

function canMakeRequest() {
  const oneHourAgo = Date.now() - 60 * 60 * 1000
  requestTimestamps = requestTimestamps.filter((t) => t > oneHourAgo)
  return requestTimestamps.length < HOURLY_LIMIT
}

function recordRequest() {
  requestTimestamps.push(Date.now())
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

// ── USDA fetch (fail-fast on rate limit) ──────────────
// If we get a 429, mark the API as blocked so the whole queue
// stops trying until the cooldown expires.
let rateLimitedUntil = 0

function isRateLimited() {
  return Date.now() < rateLimitedUntil
}

function markRateLimited() {
  // Block all requests for 10 minutes (DEMO_KEY) or 1 minute (proper key)
  const cooldown = IS_DEMO_KEY ? 10 * 60 * 1000 : 60 * 1000
  rateLimitedUntil = Date.now() + cooldown
  const mins = Math.round(cooldown / 60000)
  console.log(`⏳ USDA API rate limited — pausing requests for ${mins} min`)
}

async function fetchUSDA(query, dataType) {
  const body = { query, pageSize: 1 }
  if (dataType) body.dataType = dataType

  const response = await fetch(`${USDA_API}?api_key=${USDA_KEY}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  })

  if (response.status === 429) {
    markRateLimited()
    throw Object.assign(new Error('Rate limited'), { status: 429 })
  }
  if (!response.ok) {
    throw Object.assign(new Error(`USDA API error ${response.status}`), { status: response.status })
  }

  const data = await response.json()
  return data.foods?.[0] || null
}

// ── Request queue ─────────────────────────────────────
// All USDA requests go through a serial queue to control timing
let requestQueue = []
let queueProcessing = false

function queueNutritionLookup(dishName) {
  return new Promise((resolve, reject) => {
    requestQueue.push({ dishName, resolve, reject })
    processQueue()
  })
}

async function processQueue() {
  if (queueProcessing || requestQueue.length === 0) return
  queueProcessing = true

  while (requestQueue.length > 0) {
    const { dishName, resolve, reject } = requestQueue.shift()

    // Double-check cache (might have been cached by a parallel request)
    const cached = db.prepare('SELECT data FROM nutrition_cache WHERE dish_name = ?').get(dishName)
    if (cached) {
      resolve(JSON.parse(cached.data))
      continue // No delay for cache hits
    }

    // If we're rate-limited or over our internal budget, skip immediately
    if (isRateLimited() || !canMakeRequest()) {
      resolve({ name: dishName, found: false, retryable: true })
      continue
    }

    try {
      // Try FNDDS first (generic foods like "Chicken fillet, grilled")
      recordRequest()
      let food = await fetchUSDA(dishName, ['Survey (FNDDS)'])

      // Fall back to all food types if FNDDS has no match
      if (!food && !isRateLimited() && canMakeRequest()) {
        await sleep(REQUEST_DELAY)
        recordRequest()
        food = await fetchUSDA(dishName)
      }

      if (!food) {
        const noResult = { name: dishName, found: false }
        cacheResult(dishName, noResult)
        resolve(noResult)
      } else {
        const result = extractNutrients(food, dishName)
        cacheResult(dishName, result)
        resolve(result)
      }
    } catch (err) {
      console.error(`Nutrition error for "${dishName}":`, err.message)
      resolve({ name: dishName, found: false, retryable: true })
    }

    // Throttle between requests
    if (requestQueue.length > 0) {
      await sleep(REQUEST_DELAY)
    }
  }

  queueProcessing = false
}

function extractNutrients(food, dishName) {
  const totals = {
    calories: 0,
    protein_g: 0,
    carbohydrates_total_g: 0,
    fat_total_g: 0,
    fiber_g: 0,
    sugar_g: 0,
    serving_size_g: 100,
  }

  for (const nutrient of food.foodNutrients || []) {
    const field = NUTRIENT_MAP[nutrient.nutrientNumber]
    if (field) {
      totals[field] = nutrient.value || 0
    }
  }

  for (const key of Object.keys(totals)) {
    totals[key] = Math.round(totals[key] * 10) / 10
  }

  return { name: dishName, ...totals, found: true }
}

function cacheResult(dishName, result) {
  db.prepare(
    'INSERT OR REPLACE INTO nutrition_cache (dish_name, data, created_at) VALUES (?, ?, ?)'
  ).run(dishName, JSON.stringify(result), new Date().toISOString())
}

// ── GET /api/menu/nutrition/:dishName ─────────────────
// NOTE: This route MUST be defined before /:mealType/:date
router.get('/nutrition/:dishName', async (req, res) => {
  const dishName = decodeURIComponent(req.params.dishName).trim().toLowerCase()
  if (!dishName) {
    return res.status(400).json({ error: 'Dish name is required' })
  }

  // Check SQLite cache first (instant)
  const cached = db.prepare('SELECT data FROM nutrition_cache WHERE dish_name = ?').get(dishName)
  if (cached) {
    return res.json(JSON.parse(cached.data))
  }

  try {
    const result = await queueNutritionLookup(dishName)
    res.json(result)
  } catch (err) {
    res.status(500).json({ error: 'Failed to estimate nutrition', retryable: true })
  }
})

// ── POST /api/menu/prefetch-nutrition ─────────────────
// Accepts array of dish names and queues them for background caching.
router.post('/prefetch-nutrition', async (req, res) => {
  const { dishes } = req.body
  if (!Array.isArray(dishes) || dishes.length === 0) {
    return res.status(400).json({ error: 'dishes array is required' })
  }

  const uncached = dishes
    .map((d) => d.trim().toLowerCase())
    .filter((d) => {
      if (!d) return false
      const cached = db.prepare('SELECT 1 FROM nutrition_cache WHERE dish_name = ?').get(d)
      return !cached
    })

  // Queue in the background
  for (const dishName of uncached) {
    queueNutritionLookup(dishName).catch(() => {})
  }

  res.json({
    queued: uncached.length,
    alreadyCached: dishes.length - uncached.length,
    total: dishes.length,
  })
})

// ── GET /api/menu/:mealType/:date ─────────────────────
router.get('/:mealType/:date', async (req, res) => {
  const { mealType, date } = req.params

  const validMeals = ['breakfastbrunch', 'lunch', 'dinner']
  if (!validMeals.includes(mealType)) {
    return res.status(400).json({ error: 'Invalid meal type. Use: breakfastbrunch, lunch, or dinner' })
  }
  if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) {
    return res.status(400).json({ error: 'Invalid date format. Use: YYYY-MM-DD' })
  }

  const cacheKey = `${mealType}-${date}`
  const cached = menuCache.get(cacheKey)
  if (cached && Date.now() - cached.timestamp < MENU_CACHE_TTL) {
    return res.json(cached.data)
  }

  try {
    const [year, month, day] = date.split('-')
    const url = `${FLIK_BASE}/${mealType}/${year}/${month}/${day}/?format=json`

    const response = await fetch(url)
    if (!response.ok) {
      return res.status(502).json({ error: 'Failed to fetch menu from Flik' })
    }

    const json = await response.json()
    const dayData = json.days?.find((d) => d.date === date)
    if (!dayData || !dayData.menu_items) {
      return res.json({ date, mealType, stations: [] })
    }

    const stations = []
    let currentStation = null

    for (const item of dayData.menu_items) {
      if (item.blank_line) continue
      if (item.is_section_title || item.is_station_header) {
        currentStation = { name: item.text, items: [] }
        stations.push(currentStation)
        continue
      }
      if (item.text && item.text.trim()) {
        if (!currentStation) {
          currentStation = { name: 'Menu', items: [] }
          stations.push(currentStation)
        }
        currentStation.items.push({ name: item.text.trim() })
      }
    }

    const result = {
      date,
      mealType,
      stations: stations.filter((s) => s.items.length > 0),
    }

    menuCache.set(cacheKey, { data: result, timestamp: Date.now() })
    res.json(result)
  } catch (err) {
    console.error('Menu fetch error:', err.message)
    res.status(500).json({ error: 'Failed to fetch menu' })
  }
})

export default router
