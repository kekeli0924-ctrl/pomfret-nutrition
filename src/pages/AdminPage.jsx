import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { BASES, FRUITS, BOOSTERS, SNACKS } from '../data/menu'

function AdminLogin({ onLogin }) {
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      })
      const data = await res.json()

      if (!res.ok) {
        setError(data.error || 'Login failed')
        return
      }

      sessionStorage.setItem('adminToken', data.token)
      onLogin()
    } catch {
      setError('Could not connect to server')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-dvh flex items-center justify-center px-6 bg-dark-800">
      <div className="w-full max-w-sm" style={{ animation: 'fadeSlideUp 0.4s ease-out' }}>
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold" style={{ color: '#F5F0EB' }}>Admin Dashboard</h1>
          <p className="text-dark-400 text-sm mt-1">Enter the admin password to continue</p>
        </div>

        <form onSubmit={handleSubmit} className="bg-white rounded-lg p-8 shadow-[0_2px_12px_rgba(0,0,0,0.06)]">
          <label htmlFor="admin-password" className="block text-sm font-semibold text-dark-700 mb-2">
            Password
          </label>
          <input
            id="admin-password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter admin password"
            className="w-full px-4 py-3 rounded-md border border-dark-200 focus:border-crimson-500 outline-none text-dark-900 text-sm transition-colors"
            autoFocus
            autoComplete="current-password"
          />

          {error && (
            <p className="text-sm text-red-600 mt-3 font-medium" style={{ animation: 'scaleIn 0.2s ease-out' }}>
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading || !password}
            className="w-full mt-5 bg-crimson-500 hover:bg-crimson-600 disabled:bg-dark-200 disabled:text-dark-400 text-white font-semibold py-3 rounded-md transition-colors duration-200 cursor-pointer border-0 text-sm"
          >
            {loading ? 'Logging in...' : 'Log In'}
          </button>

          <Link
            to="/"
            className="block text-center text-sm text-dark-500 hover:text-dark-700 mt-4 transition-colors"
          >
            Back to site
          </Link>
        </form>
      </div>
    </div>
  )
}

export default function AdminPage({ orders, clearOrders, fetchOrders, gameDay }) {
  const [authed, setAuthed] = useState(false)
  const { fullDate } = gameDay

  useEffect(() => {
    const token = sessionStorage.getItem('adminToken')
    if (token) setAuthed(true)
  }, [])

  useEffect(() => {
    if (authed) fetchOrders()
  }, [authed, fetchOrders])

  const handleLogout = () => {
    const token = sessionStorage.getItem('adminToken')
    if (token) {
      fetch('/api/admin/logout', {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` },
      })
    }
    sessionStorage.removeItem('adminToken')
    setAuthed(false)
  }

  if (!authed) {
    return <AdminLogin onLogin={() => setAuthed(true)} />
  }

  const ordersByTeam = {}
  orders.forEach((order) => {
    const team = order.studentInfo?.team || 'Unknown'
    if (!ordersByTeam[team]) ordersByTeam[team] = []
    ordersByTeam[team].push(order)
  })

  const findItem = (id, list) => list.find((i) => i.id === id)

  const exportJSON = () => {
    const json = JSON.stringify(orders, null, 2)
    const blob = new Blob([json], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `pomfret-nutrition-orders-${new Date().toISOString().split('T')[0]}.json`
    a.click()
    URL.revokeObjectURL(url)
  }

  const copyOrders = () => {
    const lines = orders.map((o) => {
      const base = findItem(o.smoothie?.base, BASES)
      const fruits = o.smoothie?.fruits?.map((f) => findItem(f, FRUITS)?.name).filter(Boolean) || []
      const boosters = o.smoothie?.boosters?.map((b) => findItem(b, BOOSTERS)?.name).filter(Boolean) || []
      const snack = findItem(o.snack, SNACKS)
      return [
        `${o.id} | ${o.studentInfo?.name} | ${o.studentInfo?.grade} | ${o.studentInfo?.team}`,
        `  Smoothie: ${[base?.name, ...fruits, ...boosters].filter(Boolean).join(', ')}${o.smoothie?.customName ? ` ("${o.smoothie.customName}")` : ''}`,
        `  Snack: ${snack?.name || 'None'}`,
      ].join('\n')
    })
    navigator.clipboard.writeText(lines.join('\n\n'))
      .then(() => alert('Orders copied to clipboard!'))
      .catch(() => alert('Failed to copy — try Export JSON instead'))
  }

  return (
    <div className="min-h-dvh bg-dark-50">
      {/* Header */}
      <div className="bg-dark-800 px-6 py-6">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <Link
              to="/"
              className="text-dark-400 hover:text-dark-300 text-sm mb-2 inline-block transition-colors"
            >
              Back to Pomfret Nutrition
            </Link>
            <h1 className="text-2xl font-bold" style={{ color: '#F5F0EB' }}>
              Admin Dashboard
            </h1>
            <p className="text-dark-400 text-sm mt-1">
              Orders for {fullDate || 'upcoming game day'} — <span className="text-crimson-500 font-semibold">{orders.length} total</span>
            </p>
          </div>
          <div className="flex gap-3 flex-wrap">
            <button
              onClick={copyOrders}
              className="btn-bounce bg-dark-700 hover:bg-dark-600 text-dark-300 font-semibold px-4 py-2 rounded-md text-sm cursor-pointer border-0 transition-colors"
            >
              Copy All
            </button>
            <button
              onClick={exportJSON}
              className="btn-bounce bg-crimson-500 hover:bg-crimson-600 text-white font-semibold px-4 py-2 rounded-md text-sm cursor-pointer border-0 transition-colors"
            >
              Export JSON
            </button>
            <button
              onClick={clearOrders}
              className="btn-bounce bg-dark-700 hover:bg-red-600 text-dark-300 hover:text-white font-semibold px-4 py-2 rounded-md text-sm cursor-pointer border-0 transition-colors"
            >
              Clear All
            </button>
            <button
              onClick={handleLogout}
              className="btn-bounce bg-dark-700 hover:bg-dark-600 text-dark-300 font-semibold px-4 py-2 rounded-md text-sm cursor-pointer border-0 transition-colors"
            >
              Log Out
            </button>
          </div>
        </div>
      </div>

      {/* Summary stats */}
      <div className="max-w-5xl mx-auto px-6 py-6">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-lg border border-dark-200 shadow-[0_2px_12px_rgba(0,0,0,0.06)] p-4 text-center">
            <p className="text-2xl font-bold text-dark-900">{orders.length}</p>
            <p className="text-xs text-dark-500">Total Orders</p>
          </div>
          <div className="bg-white rounded-lg border border-dark-200 shadow-[0_2px_12px_rgba(0,0,0,0.06)] p-4 text-center">
            <p className="text-2xl font-bold text-dark-900">{Object.keys(ordersByTeam).length}</p>
            <p className="text-xs text-dark-500">Teams</p>
          </div>
          <div className="bg-white rounded-lg border border-dark-200 shadow-[0_2px_12px_rgba(0,0,0,0.06)] p-4 text-center">
            <p className="text-2xl font-bold text-dark-900">
              {orders.filter((o) => o.smoothie?.boosters?.includes('protein-powder')).length}
            </p>
            <p className="text-xs text-dark-500">Protein Add-ons</p>
          </div>
          <div className="bg-white rounded-lg border border-dark-200 shadow-[0_2px_12px_rgba(0,0,0,0.06)] p-4 text-center">
            <p className="text-2xl font-bold text-crimson-500">
              {orders.length > 0
                ? new Date(orders[orders.length - 1].timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
                : '—'}
            </p>
            <p className="text-xs text-dark-500">Last Order</p>
          </div>
        </div>

        {/* Orders by team */}
        {orders.length === 0 ? (
          <div className="text-center py-16 text-dark-500">
            <p className="text-lg font-semibold">No orders yet</p>
            <p className="text-sm mt-1">Orders will appear here once students start ordering</p>
          </div>
        ) : (
          <div className="space-y-8">
            {Object.entries(ordersByTeam).map(([team, teamOrders]) => (
              <div key={team}>
                <h2 className="text-lg font-bold text-dark-900 mb-4 flex items-center gap-2">
                  {team}
                  <span className="text-sm font-normal text-dark-500 bg-dark-100 px-2 py-0.5 rounded">
                    {teamOrders.length}
                  </span>
                </h2>

                {/* Table view for desktop */}
                <div className="hidden md:block overflow-x-auto">
                  <table className="w-full bg-white rounded-lg border border-dark-200 overflow-hidden">
                    <thead>
                      <tr className="bg-dark-100 text-left text-xs font-semibold text-dark-500 uppercase tracking-wider">
                        <th className="px-4 py-3">Order #</th>
                        <th className="px-4 py-3">Student</th>
                        <th className="px-4 py-3">Grade</th>
                        <th className="px-4 py-3">Smoothie</th>
                        <th className="px-4 py-3">Snack</th>
                        <th className="px-4 py-3">Time</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-dark-200">
                      {teamOrders.map((order) => {
                        const base = findItem(order.smoothie?.base, BASES)
                        const snack = findItem(order.snack, SNACKS)
                        const ingredients = [
                          base?.name,
                          ...order.smoothie?.fruits?.map((f) => findItem(f, FRUITS)?.name).filter(Boolean) || [],
                          ...order.smoothie?.boosters?.map((b) => findItem(b, BOOSTERS)?.name).filter(Boolean) || [],
                        ].filter(Boolean).join(', ')

                        return (
                          <tr key={order.id} className="hover:bg-dark-50 transition-colors">
                            <td className="px-4 py-3">
                              <span className="font-mono text-xs bg-dark-100 text-dark-600 px-2 py-1 rounded">
                                {order.id}
                              </span>
                            </td>
                            <td className="px-4 py-3 font-semibold text-sm text-dark-900">
                              {order.studentInfo?.name}
                            </td>
                            <td className="px-4 py-3 text-sm text-dark-500">
                              {order.studentInfo?.grade}
                            </td>
                            <td className="px-4 py-3 text-sm text-dark-700 max-w-xs">
                              <span className="truncate block">{ingredients}</span>
                              {order.smoothie?.customName && (
                                <span className="text-xs text-crimson-500">"{order.smoothie.customName}"</span>
                              )}
                            </td>
                            <td className="px-4 py-3 text-sm text-dark-700">
                              {snack?.name}
                            </td>
                            <td className="px-4 py-3 text-xs text-dark-500">
                              {new Date(order.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                            </td>
                          </tr>
                        )
                      })}
                    </tbody>
                  </table>
                </div>

                {/* Card view for mobile */}
                <div className="md:hidden space-y-3">
                  {teamOrders.map((order) => {
                    const base = findItem(order.smoothie?.base, BASES)
                    const snack = findItem(order.snack, SNACKS)
                    return (
                      <div key={order.id} className="bg-white rounded-lg border border-dark-200 shadow-[0_2px_12px_rgba(0,0,0,0.06)] p-4">
                        <div className="flex items-start justify-between mb-3">
                          <div>
                            <span className="font-mono text-xs bg-dark-100 text-dark-600 px-2 py-1 rounded">
                              {order.id}
                            </span>
                            <h3 className="font-bold text-dark-900 mt-1.5">{order.studentInfo?.name}</h3>
                            <p className="text-xs text-dark-500">
                              {order.studentInfo?.grade} • {new Date(order.timestamp).toLocaleTimeString()}
                            </p>
                          </div>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                          <div className="bg-dark-50 rounded-md p-3">
                            <p className="text-xs font-semibold text-dark-700 mb-1">
                              Smoothie{order.smoothie?.customName ? ` — "${order.smoothie.customName}"` : ''}
                            </p>
                            <p className="text-dark-600">
                              {[
                                base?.name,
                                ...order.smoothie?.fruits?.map((f) => findItem(f, FRUITS)?.name).filter(Boolean) || [],
                                ...order.smoothie?.boosters?.map((b) => findItem(b, BOOSTERS)?.name).filter(Boolean) || [],
                              ].filter(Boolean).join(', ')}
                            </p>
                          </div>
                          <div className="bg-dark-50 rounded-md p-3">
                            <p className="text-xs font-semibold text-dark-700 mb-1">Snack</p>
                            <p className="text-dark-600">{snack?.name}</p>
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
