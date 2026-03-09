import { useState, useCallback } from 'react'

// Generate a short order code like "FB-A3X7"
function generateOrderCode() {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'
  let code = ''
  for (let i = 0; i < 4; i++) {
    code += chars[Math.floor(Math.random() * chars.length)]
  }
  return `FB-${code}`
}

export function useOrders() {
  const [orders, setOrders] = useState(() => {
    try {
      const stored = localStorage.getItem('fuelbar-orders')
      return stored ? JSON.parse(stored) : []
    } catch {
      return []
    }
  })

  const saveOrders = useCallback((newOrders) => {
    setOrders(newOrders)
    localStorage.setItem('fuelbar-orders', JSON.stringify(newOrders))
  }, [])

  const addOrder = useCallback((order) => {
    const newOrder = {
      ...order,
      id: generateOrderCode(),
      timestamp: new Date().toISOString(),
    }
    const updated = [...orders, newOrder]
    saveOrders(updated)
    // Also log to console for easy export
    console.log('New order submitted:', newOrder)
    console.log('All orders:', updated)
    return newOrder
  }, [orders, saveOrders])

  const clearOrders = useCallback(() => {
    saveOrders([])
  }, [saveOrders])

  return { orders, addOrder, clearOrders }
}
