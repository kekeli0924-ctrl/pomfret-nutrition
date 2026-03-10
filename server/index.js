import express from 'express'
import compression from 'compression'
import helmet from 'helmet'
import path from 'path'
import { fileURLToPath } from 'url'
import ordersRouter from './routes/orders.js'
import adminRouter from './routes/admin.js'
import menuRouter from './routes/menu.js'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const app = express()
const PORT = process.env.API_PORT || 3001

// Gzip/Brotli compression
app.use(compression())

// Security headers
app.use(helmet())

app.use(express.json())

// CORS for standalone dev server testing
if (process.env.NODE_ENV !== 'production') {
  const cors = await import('cors')
  app.use(cors.default())
}

// Admin auth routes (login/logout)
app.use('/api/admin', adminRouter)

// Order routes (auth applied per-route inside the router)
app.use('/api/orders', ordersRouter)

// Menu + nutrition routes (public)
app.use('/api/menu', menuRouter)

// In production, serve the Vite build
if (process.env.NODE_ENV === 'production') {
  const distPath = path.join(__dirname, '..', 'dist')
  app.use(express.static(distPath))
  app.get('*', (req, res) => {
    res.sendFile(path.join(distPath, 'index.html'))
  })
}

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`)
})
