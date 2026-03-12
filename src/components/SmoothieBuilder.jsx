import { useState } from 'react'
import { BASES, FRUITS, BOOSTERS } from '../data/menu'
import SmoothieVisual from './SmoothieVisual'

function NutritionDot({ level }) {
  const colors = { pre: 'bg-blue-500', post: 'bg-orange-500', both: 'bg-green-500' }
  const labels = { pre: 'Pre-workout', post: 'Post-workout', both: 'Pre & Post' }
  return (
    <span
      className={`inline-block w-2 h-2 rounded-full ${colors[level]} shrink-0`}
      title={labels[level]}
    />
  )
}

function IngredientChip({ item, selected, onToggle, type, expanded, onToggleInfo }) {
  const isSelected = type === 'base'
    ? selected === item.id
    : selected.includes(item.id)

  return (
    <div className="flex flex-col">
      <div className="flex items-center">
        <button
          onClick={() => onToggle(item.id)}
          className={`btn-bounce flex-1 flex items-center gap-2 px-4 py-3 rounded-md border transition-colors duration-200 cursor-pointer text-left ${
            expanded ? 'rounded-b-none' : ''
          } ${
            isSelected
              ? 'border-crimson-500 bg-crimson-50'
              : 'border-dark-200 bg-white hover:border-dark-300'
          }`}
        >
          <span className="text-lg">{item.emoji}</span>
          <span className="font-semibold text-sm text-dark-900">{item.name}</span>
          <NutritionDot level={item.nutrition} />
          {item.allergens && (
            <span className="text-[9px] font-semibold text-red-500 uppercase tracking-wide">
              {item.allergens.map(a => a === 'tree-nut' ? 'nut' : a).join(' · ')}
            </span>
          )}
          {isSelected && (
            <span className="ml-auto text-crimson-500 text-sm font-bold">✓</span>
          )}
          {item.info && (
            <span
              onClick={(e) => { e.stopPropagation(); onToggleInfo(item.id) }}
              className={`ml-auto w-5 h-5 rounded-full text-xs font-bold flex items-center justify-center shrink-0 cursor-pointer transition-colors ${
                expanded
                  ? 'bg-crimson-500 text-white'
                  : 'bg-dark-100 text-dark-500 hover:bg-dark-200'
              } ${isSelected ? 'ml-0' : ''}`}
            >
              i
            </span>
          )}
        </button>
      </div>
      {expanded && item.info && (
        <div
          className={`px-4 py-2.5 text-xs text-dark-600 leading-relaxed border border-t-0 rounded-b-md ${
            isSelected ? 'border-crimson-500 bg-crimson-50/50' : 'border-dark-200 bg-dark-50'
          }`}
          style={{ animation: 'fadeIn 0.2s ease-out' }}
        >
          {item.info}
        </div>
      )}
    </div>
  )
}

export default function SmoothieBuilder({ smoothie, onChange }) {
  const { base, fruits, boosters } = smoothie
  const [expandedInfo, setExpandedInfo] = useState(null)

  const toggleInfo = (id) => setExpandedInfo(expandedInfo === id ? null : id)

  const setBase = (id) => onChange({ ...smoothie, base: id })
  const toggleFruit = (id) => {
    const next = fruits.includes(id) ? fruits.filter((f) => f !== id) : [...fruits, id]
    onChange({ ...smoothie, fruits: next })
  }
  const toggleBooster = (id) => {
    const next = boosters.includes(id) ? boosters.filter((b) => b !== id) : [...boosters, id]
    onChange({ ...smoothie, boosters: next })
  }

  const hasIngredients = base || fruits.length > 0 || boosters.length > 0

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-dark-900">Build Your Smoothie</h2>
        <p className="text-dark-500 text-sm mt-1">Pick your base, add fruits, and power up with boosters</p>
      </div>

      <div className={`flex flex-col items-center gap-8 ${hasIngredients ? 'md:flex-row md:items-start' : ''}`}>
        <div className="shrink-0">
          <SmoothieVisual base={base} fruits={fruits} boosters={boosters} />
        </div>

        {hasIngredients && (
          <div className="flex-1 w-full">
            <div className="p-4 rounded-md bg-dark-50 border border-dark-200"
              style={{ animation: 'fadeIn 0.3s ease-out' }}
            >
              <p className="text-xs font-semibold text-dark-500 uppercase tracking-wider mb-2">Your smoothie</p>
              <p className="text-sm text-dark-700">
                {[
                  base && BASES.find((b) => b.id === base)?.name,
                  ...fruits.map((f) => FRUITS.find((fr) => fr.id === f)?.name),
                  ...boosters.map((b) => BOOSTERS.find((bo) => bo.id === b)?.name),
                ].filter(Boolean).join(' + ')}
              </p>
            </div>
          </div>
        )}
      </div>

      <div className="flex items-center gap-4 text-xs text-dark-500 bg-dark-50 rounded-md px-4 py-2.5 flex-wrap">
        <span className="font-semibold text-dark-700">Timing Guide:</span>
        <span className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-blue-500" /> Pre-workout
        </span>
        <span className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-orange-500" /> Post-workout
        </span>
        <span className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-green-500" /> Both
        </span>
        <span className="flex items-center gap-1.5 ml-auto">
          <span className="w-4 h-4 rounded-full bg-dark-100 text-dark-500 text-[10px] font-bold flex items-center justify-center">i</span> Tap for info
        </span>
      </div>

      <div>
        <h3 className="text-lg font-bold text-dark-900 mb-1">
          Choose Your Base <span className="text-crimson-500">*</span>
        </h3>
        <p className="text-sm text-dark-500 mb-3">Pick one liquid base for your smoothie</p>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {BASES.map((item) => (
            <IngredientChip key={item.id} item={item} selected={base} onToggle={setBase} type="base" expanded={expandedInfo === item.id} onToggleInfo={toggleInfo} />
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-lg font-bold text-dark-900 mb-1">
          Add Fruits <span className="text-crimson-500">*</span>
        </h3>
        <p className="text-sm text-dark-500 mb-3">Select one or more fruits</p>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {FRUITS.map((item) => (
            <IngredientChip key={item.id} item={item} selected={fruits} onToggle={toggleFruit} type="fruit" expanded={expandedInfo === item.id} onToggleInfo={toggleInfo} />
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-lg font-bold text-dark-900 mb-1">Power-Up Boosters</h3>
        <p className="text-sm text-dark-500 mb-3">Optional add-ons for extra nutrition</p>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {BOOSTERS.map((item) => (
            <IngredientChip key={item.id} item={item} selected={boosters} onToggle={toggleBooster} type="booster" expanded={expandedInfo === item.id} onToggleInfo={toggleInfo} />
          ))}
        </div>
      </div>
    </div>
  )
}
