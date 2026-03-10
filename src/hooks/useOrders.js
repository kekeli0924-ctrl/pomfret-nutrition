import { useState, useCallback } from 'react'

export function useOrders() {
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(false)

  // Get admin token from sessionStorage
  const getToken = () => sessionStorage.getItem('adminToken')

  // Fetch orders (admin only — requires token)
  const fetchOrders = useCallback(async () => {
    const token = getToken()
    if (!token) return

    setLoading(true)
    try {
      const res = await fetch('/api/orders', {
        headers: { Authorization: `Bearer ${token}` },
      })
      if (res.status === 401) {
        sessionStorage.removeItem('adminToken')
        return
      }
      const data = await res.json()
      setOrders(data)
    } catch (err) {
      console.error('Failed to fetch orders:', err)
    } finally {
      setLoading(false)
    }
  }, [])

  // Place an order (public — no token needed)
  const addOrder = useCallback(async (order) => {
    const res = await fetch('/api/orders', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(order),
    })
    const newOrder = await res.json()
    return newOrder
  }, [])

  // Clear all orders (admin only)
  const clearOrders = useCallback(async () => {
    const token = getToken()
    if (!token) return

    await fetch('/api/orders', {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` },
    })
    setOrders([])
  }, [])

  return { orders, addOrder, clearOrders, fetchOrders, loading }
}
