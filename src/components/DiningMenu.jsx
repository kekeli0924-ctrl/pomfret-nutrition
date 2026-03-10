import { useState, useCallback } from 'react'
import { useDiningMenu, useNutrition } from '../hooks/useDiningMenu'

const MEAL_TABS = [
  { key: 'breakfastbrunch', label: 'Breakfast' },
  { key: 'lunch', label: 'Lunch' },
  { key: 'dinner', label: 'Dinner' },
]

function formatDate(dateStr) {
  const d = new Date(dateStr + 'T12:00:00')
  return d.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })
}

function shiftDate(dateStr, days) {
  const d = new Date(dateStr + 'T12:00:00')
  d.setDate(d.getDate() + days)
  return d.toISOString().split('T')[0]
}

function todayStr() {
  return new Date().toISOString().split('T')[0]
}

function MacroBar({ label, value, unit, color }) {
  return (
    <div className="flex items-center justify-between text-xs">
      <span className="text-dark-500">{label}</span>
      <span className={`font-semibold ${color}`}>{value}{unit}</span>
    </div>
  )
}

function MenuItem({ name, fetchNutrition, nutritionCache }) {
  const [expanded, setExpanded] = useState(false)
  const [loading, setLoading] = useState(false)
  const [nutrition, setNutrition] = useState(null)

  const loadNutrition = useCallback(async () => {
    const key = name.toLowerCase().trim()
    const cached = nutritionCache[key]
    if (cached) {
      setNutrition(cached)
      return
    }

    setLoading(true)
    setNutrition(null)
    const data = await fetchNutrition(name)
    setNutrition(data)
    setLoading(false)
  }, [name, fetchNutrition, nutritionCache])

  const handleClick = useCallback(async () => {
    if (expanded) {
      setExpanded(false)
      return
    }
    setExpanded(true)
    loadNutrition()
  }, [expanded, loadNutrition])

  return (
    <div>
      <button
        onClick={handleClick}
        className="w-full flex items-center justify-between px-4 py-3 text-left hover:bg-dark-50 transition-colors duration-150 cursor-pointer bg-transparent border-0"
      >
        <span className="text-sm text-dark-900">{name}</span>
        <span className={`text-dark-400 text-xs transition-transform duration-200 ${expanded ? 'rotate-180' : ''}`}>
          ▾
        </span>
      </button>

      {expanded && (
        <div className="px-4 pb-3" style={{ animation: 'fadeIn 0.2s ease-out' }}>
          {loading ? (
            <p className="text-xs text-dark-400">Loading nutrition info…</p>
          ) : nutrition && nutrition.found ? (
            <div className="bg-dark-50 rounded-md p-3 space-y-1.5">
              <p className="text-xs font-semibold text-dark-700 mb-2">
                Estimated per serving ({nutrition.serving_size_g}g)
              </p>
              <MacroBar label="Calories" value={nutrition.calories} unit=" kcal" color="text-dark-900" />
              <MacroBar label="Protein" value={nutrition.protein_g} unit="g" color="text-green-600" />
              <MacroBar label="Carbs" value={nutrition.carbohydrates_total_g} unit="g" color="text-blue-600" />
              <MacroBar label="Fat" value={nutrition.fat_total_g} unit="g" color="text-yellow-600" />
              <MacroBar label="Fiber" value={nutrition.fiber_g} unit="g" color="text-dark-500" />
              <MacroBar label="Sugar" value={nutrition.sugar_g} unit="g" color="text-dark-500" />
            </div>
          ) : nutrition && nutrition.retryable ? (
            <div className="flex items-center gap-2">
              <p className="text-xs text-dark-400">Nutrition data loading in background…</p>
              <button
                onClick={loadNutrition}
                className="text-xs text-crimson-500 hover:text-crimson-600 font-semibold cursor-pointer bg-transparent border-0"
              >
                Retry
              </button>
            </div>
          ) : nutrition && !nutrition.found ? (
            <p className="text-xs text-dark-400">No nutrition data available for this item</p>
          ) : (
            <div className="flex items-center gap-2">
              <p className="text-xs text-dark-400">Nutrition data loading in background…</p>
              <button
                onClick={loadNutrition}
                className="text-xs text-crimson-500 hover:text-crimson-600 font-semibold cursor-pointer bg-transparent border-0"
              >
                Retry
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default function DiningMenu() {
  const [date, setDate] = useState(todayStr)
  const [mealType, setMealType] = useState('lunch')
  const { stations, loading, error } = useDiningMenu(date, mealType)
  const { fetchNutrition, cache: nutritionCache } = useNutrition()

  return (
    <div className="space-y-6">
      {/* Date navigation */}
      <div className="flex items-center justify-center gap-4">
        <button
          onClick={() => setDate((d) => shiftDate(d, -1))}
          className="btn-bounce w-9 h-9 flex items-center justify-center rounded-md border border-dark-200 bg-white hover:bg-dark-50 text-dark-500 cursor-pointer transition-colors text-sm font-bold"
        >
          ‹
        </button>
        <div className="text-center min-w-48">
          <p className="text-sm font-semibold text-dark-900">{formatDate(date)}</p>
          {date === todayStr() && (
            <p className="text-[10px] uppercase tracking-wider text-crimson-500 font-semibold">Today</p>
          )}
        </div>
        <button
          onClick={() => setDate((d) => shiftDate(d, 1))}
          className="btn-bounce w-9 h-9 flex items-center justify-center rounded-md border border-dark-200 bg-white hover:bg-dark-50 text-dark-500 cursor-pointer transition-colors text-sm font-bold"
        >
          ›
        </button>
      </div>

      {/* Jump to today */}
      {date !== todayStr() && (
        <div className="text-center">
          <button
            onClick={() => setDate(todayStr())}
            className="text-xs text-crimson-500 hover:text-crimson-600 font-semibold cursor-pointer bg-transparent border-0 transition-colors"
          >
            Jump to Today
          </button>
        </div>
      )}

      {/* Meal tabs */}
      <div className="flex rounded-md border border-dark-200 overflow-hidden">
        {MEAL_TABS.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setMealType(tab.key)}
            className={`flex-1 py-2.5 text-xs font-semibold uppercase tracking-wider cursor-pointer border-0 transition-colors duration-200 ${
              mealType === tab.key
                ? 'bg-crimson-500 text-white'
                : 'bg-white text-dark-500 hover:bg-dark-50'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Content */}
      {loading ? (
        <div className="text-center py-12">
          <p className="text-sm text-dark-400">Loading menu...</p>
        </div>
      ) : error ? (
        <div className="text-center py-12">
          <p className="text-sm text-dark-500 font-semibold">Couldn't load menu</p>
          <p className="text-xs text-dark-400 mt-1">{error}</p>
        </div>
      ) : stations.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-sm text-dark-500 font-semibold">No menu available</p>
          <p className="text-xs text-dark-400 mt-1">
            There's no {MEAL_TABS.find((t) => t.key === mealType)?.label.toLowerCase()} menu for this date
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {stations.map((station) => (
            <div key={station.name} className="bg-white rounded-lg border border-dark-200 overflow-hidden">
              <div className="px-4 py-2.5 bg-dark-50 border-b border-dark-200">
                <h4 className="text-xs font-semibold text-dark-700 uppercase tracking-wider">
                  {station.name}
                </h4>
              </div>
              <div className="divide-y divide-dark-100">
                {station.items.map((item, i) => (
                  <MenuItem
                    key={`${station.name}-${i}`}
                    name={item.name}
                    fetchNutrition={fetchNutrition}
                    nutritionCache={nutritionCache}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Disclaimer */}
      {stations.length > 0 && (
        <p className="text-[10px] text-dark-400 text-center leading-relaxed">
          Nutritional values are estimates based on standard serving sizes and may not reflect exact preparation.
          Tap any item to view estimated macros. Menu data provided by FLIK Dining.
        </p>
      )}
    </div>
  )
}
