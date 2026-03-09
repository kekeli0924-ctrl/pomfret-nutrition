import { Router } from 'express'
import db from '../db.js'

const router = Router()

function generateOrderCode() {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'
  let code = ''
  for (let i = 0; i < 4; i++) {
    code += chars[Math.floor(Math.random() * chars.length)]
  }
  return `FB-${code}`
}

function rowToOrder(row) {
  return {
    id: row.id,
    timestamp: row.timestamp,
    smoothie: JSON.parse(row.smoothie),
    snack: row.snack,
    studentInfo: {
      name: row.student_name,
      grade: row.student_grade,
      team: row.student_team,
    },
    gameDay: row.game_day,
  }
}

// GET /api/orders
router.get('/', (req, res) => {
  const rows = db.prepare('SELECT * FROM orders ORDER BY timestamp DESC').all()
  res.json(rows.map(rowToOrder))
})

// POST /api/orders
router.post('/', (req, res) => {
  const { smoothie, snack, studentInfo, gameDay } = req.body

  if (!smoothie?.base || !smoothie?.fruits?.length) {
    return res.status(400).json({ error: 'Smoothie must have a base and at least one fruit' })
  }
  if (!snack) {
    return res.status(400).json({ error: 'Snack is required' })
  }
  if (!studentInfo?.name || !studentInfo?.grade || !studentInfo?.team) {
    return res.status(400).json({ error: 'Student name, grade, and team are required' })
  }

  const id = generateOrderCode()
  const timestamp = new Date().toISOString()

  db.prepare(`
    INSERT INTO orders (id, timestamp, smoothie, snack, student_name, student_grade, student_team, game_day)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `).run(
    id,
    timestamp,
    JSON.stringify(smoothie),
    snack,
    studentInfo.name,
    studentInfo.grade,
    studentInfo.team,
    gameDay || ''
  )

  res.status(201).json({
    id,
    timestamp,
    smoothie,
    snack,
    studentInfo,
    gameDay,
  })
})

// DELETE /api/orders
router.delete('/', (req, res) => {
  const result = db.prepare('DELETE FROM orders').run()
  res.json({ message: 'All orders deleted', count: result.changes })
})

// DELETE /api/orders/:id
router.delete('/:id', (req, res) => {
  const result = db.prepare('DELETE FROM orders WHERE id = ?').run(req.params.id)
  if (result.changes === 0) {
    return res.status(404).json({ error: 'Order not found' })
  }
  res.json({ message: 'Order deleted' })
})

export default router
