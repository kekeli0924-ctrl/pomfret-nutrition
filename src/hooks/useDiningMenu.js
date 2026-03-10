import { useState, useEffect, useCallback, useRef } from 'react'

export function useDiningMenu(date, mealType) {
  const [stations, setStations] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (!date || !mealType) return

    let cancelled = false
    setLoading(true)
    setError(null)

    fetch(`/api/menu/${mealType}/${date}`)
      .then((res) => {
        if (!res.ok) throw new Error('Failed to load menu')
        return res.json()
      })
      .then((data) => {
        if (!cancelled) {
          const stationList = data.stations || []
          setStations(stationList)

          // Trigger background prefetch for all dish names in this menu
          const allDishes = stationList.flatMap((s) => s.items.map((i) => i.name))
          if (allDishes.length > 0) {
            fetch('/api/menu/prefetch-nutrition', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ dishes: allDishes }),
            }).catch(() => {}) // silently ignore prefetch errors
          }
        }
      })
      .catch((err) => {
        if (!cancelled) {
          setError(err.message)
          setStations([])
        }
      })
      .finally(() => {
        if (!cancelled) setLoading(false)
      })

    return () => { cancelled = true }
  }, [date, mealType])

  return { stations, loading, error }
}

export function useNutrition() {
  const [cache, setCache] = useState({})
  const cacheRef = useRef(cache)
  cacheRef.current = cache

  const fetchNutrition = useCallback(async (dishName) => {
    const key = dishName.toLowerCase().trim()
    if (cacheRef.current[key]) return cacheRef.current[key]

    const maxRetries = 3
    for (let attempt = 0; attempt < maxRetries; attempt++) {
      try {
        const res = await fetch(`/api/menu/nutrition/${encodeURIComponent(key)}`)

        if (res.status === 429) {
          // Rate limited — wait and retry
          const waitMs = 3000 * (attempt + 1)
          await new Promise((r) => setTimeout(r, waitMs))
          continue
        }

        if (!res.ok) {
          // Other server error — wait briefly and retry
          if (attempt < maxRetries - 1) {
            await new Promise((r) => setTimeout(r, 2000))
            continue
          }
          return { found: false, retryable: true }
        }

        const data = await res.json()
        setCache((prev) => ({ ...prev, [key]: data }))
        return data
      } catch {
        if (attempt < maxRetries - 1) {
          await new Promise((r) => setTimeout(r, 2000))
          continue
        }
        return { found: false, retryable: true }
      }
    }

    return { found: false, retryable: true }
  }, []) // stable callback — uses ref for cache

  return { fetchNutrition, cache }
}
