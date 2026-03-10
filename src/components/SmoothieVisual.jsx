import { BASES, FRUITS, BOOSTERS } from '../data/menu'

// Renders a visual glass that fills up as ingredients are added
export default function SmoothieVisual({ base, fruits, boosters }) {
  const allItems = [...BASES, ...FRUITS, ...BOOSTERS]
  const findItem = (id) => allItems.find((i) => i.id === id)

  // Collect all selected ingredient objects
  const selected = []
  if (base) selected.push(findItem(base))
  fruits.forEach((f) => { const item = findItem(f); if (item) selected.push(item) })
  boosters.forEach((b) => { const item = findItem(b); if (item) selected.push(item) })

  // Calculate fill level (base=30%, each fruit=12%, each booster=5%, max 100%)
  const fillPercent = Math.min(
    100,
    (base ? 30 : 0) + fruits.length * 12 + boosters.length * 5
  )

  // Blend the colors of selected ingredients
  const blendColor = selected.length > 0
    ? blendColors(selected.map((i) => i?.color || '#E0E0E0'))
    : '#E0E0E0'

  return (
    <div className="flex flex-col items-center gap-3">
      {/* Glass container */}
      <div className="relative w-28 h-44 flex flex-col justify-end">
        {/* Glass outline — trapezoid shape */}
        <div
          className="relative w-full h-full rounded-b-2xl overflow-hidden border border-dark-200 bg-white"
          style={{
            clipPath: 'polygon(10% 0%, 90% 0%, 100% 100%, 0% 100%)',
          }}
        >
          {/* Liquid fill */}
          <div
            className="absolute bottom-0 left-0 right-0 transition-all duration-500 ease-out"
            style={{
              height: `${fillPercent}%`,
              background: `linear-gradient(180deg, ${blendColor}CC 0%, ${blendColor} 100%)`,
            }}
          >
            {/* Subtle bubble effect */}
            {fillPercent > 20 && (
              <>
                <div className="absolute top-2 left-4 w-1.5 h-1.5 bg-white/20 rounded-full" style={{ animation: 'pulse 2s infinite' }} />
                <div className="absolute top-6 right-5 w-1 h-1 bg-white/15 rounded-full" style={{ animation: 'pulse 3s infinite 0.5s' }} />
              </>
            )}
          </div>

          {/* Empty state */}
          {fillPercent === 0 && (
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-dark-400 text-xs font-medium text-center px-2">Add ingredients</span>
            </div>
          )}
        </div>

        {/* Straw */}
        {fillPercent > 0 && (
          <div className="absolute -top-4 right-6 w-1.5 h-20 bg-dark-300 rounded-full origin-bottom"
            style={{ transform: 'rotate(-8deg)', animation: 'fadeIn 0.3s ease-out' }}
          >
            <div className="absolute -top-1 -left-0.5 w-2.5 h-3 bg-dark-300 rounded-full" />
          </div>
        )}
      </div>

      {/* Ingredient icons stacking */}
      <div className="flex flex-wrap justify-center gap-1 max-w-32">
        {selected.map((item, i) => item && (
          <span
            key={item.id}
            className="text-lg"
            style={{ animation: `bounceIn 0.3s ease-out ${i * 0.1}s both` }}
            title={item.name}
          >
            {item.emoji}
          </span>
        ))}
      </div>

      {/* Fill percentage */}
      {fillPercent > 0 && (
        <span className="text-xs text-dark-500 font-medium">
          {Math.round(fillPercent)}% full
        </span>
      )}
    </div>
  )
}

// Simple color blending — averages hex colors
function blendColors(hexColors) {
  if (hexColors.length === 0) return '#E0E0E0'
  let r = 0, g = 0, b = 0
  hexColors.forEach((hex) => {
    const c = hexToRgb(hex)
    if (c) { r += c.r; g += c.g; b += c.b }
  })
  const n = hexColors.length
  return rgbToHex(Math.round(r / n), Math.round(g / n), Math.round(b / n))
}

function hexToRgb(hex) {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16),
  } : null
}

function rgbToHex(r, g, b) {
  return '#' + [r, g, b].map((x) => x.toString(16).padStart(2, '0')).join('')
}
