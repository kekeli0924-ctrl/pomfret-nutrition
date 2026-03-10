import { Router } from 'express'
import crypto from 'crypto'

const router = Router()

// Admin password — in production, use an env var
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'keke0924'

// Active tokens (in-memory; cleared on server restart)
const validTokens = new Set()

// POST /api/admin/login
router.post('/login', (req, res) => {
  const { password } = req.body

  if (!password) {
    return res.status(400).json({ error: 'Password is required' })
  }

  if (password !== ADMIN_PASSWORD) {
    return res.status(401).json({ error: 'Invalid password' })
  }

  const token = crypto.randomBytes(32).toString('hex')
  validTokens.add(token)

  res.json({ token })
})

// POST /api/admin/logout
router.post('/logout', (req, res) => {
  const token = req.headers.authorization?.replace('Bearer ', '')
  if (token) validTokens.delete(token)
  res.json({ message: 'Logged out' })
})

// Middleware to protect routes
export function requireAdmin(req, res, next) {
  const token = req.headers.authorization?.replace('Bearer ', '')

  if (!token || !validTokens.has(token)) {
    return res.status(401).json({ error: 'Unauthorized — admin login required' })
  }

  next()
}

export default router
