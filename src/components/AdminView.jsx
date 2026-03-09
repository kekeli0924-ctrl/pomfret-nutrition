import { BASES, FRUITS, BOOSTERS, SNACKS } from '../data/menu'
import { useGameDay } from '../hooks/useGameDay'

export default function AdminView({ orders, onClearOrders, onBack }) {
  const { fullDate } = useGameDay()

  // Group orders by team
  const ordersByTeam = {}
  orders.forEach((order) => {
    const team = order.studentInfo?.team || 'Unknown'
    if (!ordersByTeam[team]) ordersByTeam[team] = []
    ordersByTeam[team].push(order)
  })

  const findItem = (id, list) => list.find((i) => i.id === id)

  const exportOrders = () => {
    const json = JSON.stringify(orders, null, 2)
    const blob = new Blob([json], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `pomfret-nutrition-orders-${new Date().toISOString().split('T')[0]}.json`
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div className="min-h-dvh bg-dark-50">
      {/* Header */}
      <div className="bg-dark-900 text-white px-6 py-6">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div>
            <button
              onClick={onBack}
              className="text-dark-400 hover:text-white text-sm mb-2 cursor-pointer bg-transparent border-0 transition-colors"
            >
              ← Back to Pomfret Nutrition
            </button>
            <h1 className="text-2xl font-bold">Admin Dashboard</h1>
            <p className="text-dark-400 text-sm mt-1">
              Orders for {fullDate || 'upcoming game day'} — {orders.length} total
            </p>
          </div>
          <div className="flex gap-3">
            <button
              onClick={exportOrders}
              className="btn-bounce bg-crimson-500 hover:bg-crimson-600 text-white font-semibold px-4 py-2 rounded-xl text-sm cursor-pointer border-0 transition-colors"
            >
              Export JSON
            </button>
            <button
              onClick={onClearOrders}
              className="btn-bounce bg-dark-700 hover:bg-dark-600 text-dark-300 font-semibold px-4 py-2 rounded-xl text-sm cursor-pointer border-0 transition-colors"
            >
              Clear All
            </button>
          </div>
        </div>
      </div>

      {/* Orders */}
      <div className="max-w-4xl mx-auto px-6 py-8">
        {orders.length === 0 ? (
          <div className="text-center py-16 text-dark-400">
            <div className="text-5xl mb-4">📋</div>
            <p className="text-lg font-semibold">No orders yet</p>
            <p className="text-sm mt-1">Orders will appear here once students start ordering</p>
          </div>
        ) : (
          <div className="space-y-8">
            {Object.entries(ordersByTeam).map(([team, teamOrders]) => (
              <div key={team}>
                <h2 className="text-lg font-bold text-dark-900 mb-4 flex items-center gap-2">
                  {team}
                  <span className="text-sm font-normal text-dark-400 bg-dark-100 px-2 py-0.5 rounded-full">
                    {teamOrders.length}
                  </span>
                </h2>
                <div className="space-y-3">
                  {teamOrders.map((order) => {
                    const base = findItem(order.smoothie?.base, BASES)
                    const snack = findItem(order.snack, SNACKS)
                    return (
                      <div key={order.id} className="bg-white rounded-xl border border-dark-200 p-4">
                        <div className="flex items-start justify-between mb-3">
                          <div>
                            <span className="font-mono text-xs bg-dark-100 text-dark-600 px-2 py-1 rounded">
                              {order.id}
                            </span>
                            <h3 className="font-bold text-dark-900 mt-1.5">{order.studentInfo?.name}</h3>
                            <p className="text-xs text-dark-400">
                              {order.studentInfo?.grade} • {new Date(order.timestamp).toLocaleTimeString()}
                            </p>
                          </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                          {/* Smoothie */}
                          <div className="bg-crimson-50 rounded-lg p-3">
                            <p className="text-xs font-semibold text-crimson-700 mb-1">
                              🥤 Smoothie{order.smoothie?.customName ? ` — "${order.smoothie.customName}"` : ''}
                            </p>
                            <p className="text-dark-700">
                              {[
                                base?.name,
                                ...order.smoothie?.fruits?.map((f) => findItem(f, FRUITS)?.name).filter(Boolean) || [],
                                ...order.smoothie?.boosters?.map((b) => findItem(b, BOOSTERS)?.name).filter(Boolean) || [],
                              ].filter(Boolean).join(', ')}
                            </p>
                          </div>

                          {/* Snack */}
                          <div className="bg-dark-100 rounded-lg p-3">
                            <p className="text-xs font-semibold text-dark-700 mb-1">🥪 Snack</p>
                            <p className="text-dark-700">{snack?.emoji} {snack?.name}</p>
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
