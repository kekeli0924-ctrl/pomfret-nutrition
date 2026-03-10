import { SNACKS } from '../data/menu'

function NutritionDot({ level }) {
  const colors = { green: 'bg-green-500', yellow: 'bg-yellow-400' }
  return (
    <span className={`inline-block w-2 h-2 rounded-full ${colors[level]} shrink-0`} />
  )
}

export default function SnackSelector({ selectedSnack, onSelect }) {
  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-dark-900">Choose a Pregame Snack</h2>
        <p className="text-dark-500 text-sm mt-1">Select one snack to pair with your smoothie</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {SNACKS.map((snack) => {
          const isSelected = selectedSnack === snack.id
          return (
            <button
              key={snack.id}
              onClick={() => onSelect(snack.id)}
              className={`btn-bounce flex items-start gap-4 p-5 rounded-md border transition-colors duration-200 cursor-pointer text-left w-full ${
                isSelected
                  ? 'border-crimson-500 bg-crimson-50'
                  : 'border-dark-200 bg-white hover:border-dark-300'
              }`}
            >
              <span className="text-2xl shrink-0 mt-0.5">{snack.emoji}</span>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <h3 className="font-bold text-dark-900 text-sm">{snack.name}</h3>
                  <NutritionDot level={snack.nutrition} />
                </div>
                <p className="text-sm text-dark-500 mt-1">{snack.description}</p>
                {snack.highlight && (
                  <p className="text-xs text-crimson-500 font-medium mt-1.5 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 bg-crimson-500 rounded-full" />
                    {snack.highlight}
                  </p>
                )}
              </div>
              {isSelected && (
                <span className="text-crimson-500 text-sm font-bold shrink-0" style={{ animation: 'scaleIn 0.2s ease-out' }}>
                  ✓
                </span>
              )}
            </button>
          )
        })}
      </div>
    </div>
  )
}
