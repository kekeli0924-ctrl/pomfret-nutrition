import { useState, useEffect, useCallback } from 'react'

export function useOrders() {
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/orders')
      .then((res) => res.json())
      .then((data) => setOrders(data))
      .catch((err) => console.error('Failed to fetch orders:', err))
      .finally(() => setLoading(false))
  }, [])

  const addOrder = useCallback(async (order) => {
    const res = await fetch('/api/orders', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(order),
    })
    const newOrder = await res.json()
    setOrders((prev) => [...prev, newOrder])
    return newOrder
  }, [])

  const clearOrders = useCallback(async () => {
    await fetch('/api/orders', { method: 'DELETE' })
    setOrders([])
  }, [])

  return { orders, addOrder, clearOrders, loading }
}
