import { BASES, FRUITS, BOOSTERS, SNACKS } from '../data/menu'

export default function Confirmation({ order, onNewOrder }) {
  const findBase = (id) => BASES.find((b) => b.id === id)
  const findFruit = (id) => FRUITS.find((f) => f.id === id)
  const findBooster = (id) => BOOSTERS.find((b) => b.id === id)
  const findSnack = (id) => SNACKS.find((s) => s.id === id)

  const base = findBase(order.smoothie.base)
  const fruits = order.smoothie.fruits.map(findFruit).filter(Boolean)
  const boosters = order.smoothie.boosters.map(findBooster).filter(Boolean)
  const snack = findSnack(order.snack)

  return (
    <div className="min-h-dvh flex flex-col items-center justify-center px-4 py-12 bg-dark-800">
      <div
        className="w-full max-w-lg bg-white rounded-lg shadow-[0_2px_12px_rgba(0,0,0,0.06)] overflow-hidden"
        style={{ animation: 'scaleIn 0.4s ease-out' }}
      >
        {/* Success header */}
        <div className="bg-crimson-500 px-6 py-8 text-center text-white">
          <div className="text-4xl mb-3" style={{ animation: 'bounceIn 0.6s ease-out' }}>
            ✓
          </div>
          <h1 className="text-2xl font-bold">Order Confirmed</h1>
          <p className="text-crimson-100 mt-1 text-sm">You're all set for game day</p>
        </div>

        {/* Order details */}
        <div className="p-6 space-y-6">
          {/* Order code */}
          <div className="text-center">
            <p className="text-xs font-semibold text-dark-500 uppercase tracking-wider">Order Number</p>
            <p className="text-3xl font-black text-dark-900 font-mono tracking-widest mt-1">{order.id}</p>
          </div>

          {/* Student info */}
          <div className="bg-dark-50 rounded-lg p-4">
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div>
                <p className="text-dark-500 text-xs">Student</p>
                <p className="font-semibold text-dark-900">{order.studentInfo.name}</p>
              </div>
              <div>
                <p className="text-dark-500 text-xs">Grade</p>
                <p className="font-semibold text-dark-900">{order.studentInfo.grade}</p>
              </div>
              <div>
                <p className="text-dark-500 text-xs">Team</p>
                <p className="font-semibold text-dark-900">{order.studentInfo.team}</p>
              </div>
              <div>
                <p className="text-dark-500 text-xs">Pickup</p>
                <p className="font-semibold text-dark-900">{order.gameDay}</p>
              </div>
            </div>
          </div>

          {/* Smoothie */}
          <div>
            <h3 className="font-bold text-dark-900 mb-2">
              Smoothie
              {order.smoothie.customName && (
                <span className="text-sm font-normal text-crimson-500 ml-2">
                  "{order.smoothie.customName}"
                </span>
              )}
            </h3>
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm">
                <span className="text-dark-500 w-16 shrink-0">Base:</span>
                <span className="font-medium">{base?.name}</span>
              </div>
              <div className="flex items-start gap-2 text-sm">
                <span className="text-dark-500 w-16 shrink-0">Fruits:</span>
                <div className="flex flex-wrap gap-1.5">
                  {fruits.map((f) => (
                    <span key={f.id} className="bg-crimson-50 text-crimson-500 px-2 py-0.5 rounded text-xs font-medium">
                      {f.name}
                    </span>
                  ))}
                </div>
              </div>
              {boosters.length > 0 && (
                <div className="flex items-start gap-2 text-sm">
                  <span className="text-dark-500 w-16 shrink-0">Boosts:</span>
                  <div className="flex flex-wrap gap-1.5">
                    {boosters.map((b) => (
                      <span key={b.id} className="bg-dark-100 text-dark-700 px-2 py-0.5 rounded text-xs font-medium">
                        {b.name}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Snack */}
          <div>
            <h3 className="font-bold text-dark-900 mb-2">Pregame Snack</h3>
            <div className="flex items-center gap-3 bg-dark-50 rounded-lg p-3">
              <div>
                <p className="font-semibold text-dark-900">{snack?.name}</p>
                <p className="text-xs text-dark-500">{snack?.description}</p>
              </div>
            </div>
          </div>

          {/* Action */}
          <div className="pt-2">
            <button
              onClick={onNewOrder}
              className="btn-bounce w-full bg-crimson-500 hover:bg-crimson-600 text-white font-semibold py-3 rounded-md transition-colors duration-200 cursor-pointer border-0 text-base"
            >
              Place Another Order
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
