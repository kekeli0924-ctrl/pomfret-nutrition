import { useState } from 'react'
import { SNACKS } from '../data/menu'

function NutritionDot({ level }) {
  const colors = { pre: 'bg-blue-500', post: 'bg-orange-500', both: 'bg-green-500' }
  return (
    <span className={`inline-block w-2 h-2 rounded-full ${colors[level]} shrink-0`} />
  )
}

export default function SnackSelector({ selectedSnack, onSelect }) {
  const [expandedInfo, setExpandedInfo] = useState(null)

  const toggleInfo = (id) => setExpandedInfo(expandedInfo === id ? null : id)

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-dark-900">Choose a Snack</h2>
        <p className="text-dark-500 text-sm mt-1">Select one snack to pair with your smoothie</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {SNACKS.map((snack) => {
          const isSelected = selectedSnack === snack.id
          const isExpanded = expandedInfo === snack.id
          return (
            <div key={snack.id} className="flex flex-col">
              <button
                onClick={() => onSelect(snack.id)}
                className={`btn-bounce flex items-start gap-4 p-5 border transition-colors duration-200 cursor-pointer text-left w-full ${
                  isExpanded ? 'rounded-t-md rounded-b-none' : 'rounded-md'
                } ${
                  isSelected
                    ? 'border-crimson-500 bg-crimson-50'
                    : 'border-dark-200 bg-white hover:border-dark-300'
                }`}
              >
                <span className="text-2xl shrink-0 mt-0.5">{snack.emoji}</span>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h3 className="font-bold text-dark-900 text-sm">{snack.name}</h3>
                    <NutritionDot level={snack.nutrition} />
                    {snack.allergens && (
                      <span className="text-[9px] font-semibold text-red-500 uppercase tracking-wide">
                        {snack.allergens.map(a => a === 'tree-nut' ? 'nut' : a).join(' · ')}
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-dark-500 mt-1">{snack.description}</p>
                  {snack.highlight && (
                    <p className="text-xs text-crimson-500 font-medium mt-1.5 flex items-center gap-1">
                      <span className="w-1.5 h-1.5 bg-crimson-500 rounded-full" />
                      {snack.highlight}
                    </p>
                  )}
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  {isSelected && (
                    <span className="text-crimson-500 text-sm font-bold" style={{ animation: 'scaleIn 0.2s ease-out' }}>
                      ✓
                    </span>
                  )}
                  {snack.info && (
                    <span
                      onClick={(e) => { e.stopPropagation(); toggleInfo(snack.id) }}
                      className={`w-5 h-5 rounded-full text-xs font-bold flex items-center justify-center cursor-pointer transition-colors ${
                        isExpanded
                          ? 'bg-crimson-500 text-white'
                          : 'bg-dark-100 text-dark-500 hover:bg-dark-200'
                      }`}
                    >
                      i
                    </span>
                  )}
                </div>
              </button>
              {isExpanded && snack.info && (
                <div
                  className={`px-5 py-3 text-xs text-dark-600 leading-relaxed border border-t-0 rounded-b-md ${
                    isSelected ? 'border-crimson-500 bg-crimson-50/50' : 'border-dark-200 bg-dark-50'
                  }`}
                  style={{ animation: 'fadeIn 0.2s ease-out' }}
                >
                  {snack.info}
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
