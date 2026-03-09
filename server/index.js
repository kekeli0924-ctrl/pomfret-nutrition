import express from 'express'
import path from 'path'
import { fileURLToPath } from 'url'
import ordersRouter from './routes/orders.js'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const app = express()
const PORT = process.env.API_PORT || 3001

app.use(express.json())

// CORS for standalone dev server testing
if (process.env.NODE_ENV !== 'production') {
  const cors = await import('cors')
  app.use(cors.default())
}

// API routes
app.use('/api/orders', ordersRouter)

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
