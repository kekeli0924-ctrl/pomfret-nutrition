import Database from 'better-sqlite3'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

// In production on Render, use persistent disk; locally, use project root
const dbPath = process.env.NODE_ENV === 'production' && process.env.RENDER
  ? '/opt/render/project/src/data/nutrition.db'
  : path.join(__dirname, '..', 'nutrition.db')

const db = new Database(dbPath)

db.pragma('journal_mode = WAL')

db.exec(`
  CREATE TABLE IF NOT EXISTS orders (
    id            TEXT PRIMARY KEY,
    timestamp     TEXT NOT NULL,
    smoothie      TEXT NOT NULL,
    snack         TEXT NOT NULL,
    student_name  TEXT NOT NULL,
    student_grade TEXT NOT NULL,
    student_team  TEXT NOT NULL,
    game_day      TEXT NOT NULL
  )
`)

db.exec(`
  CREATE TABLE IF NOT EXISTS nutrition_cache (
    dish_name   TEXT PRIMARY KEY,
    data        TEXT NOT NULL,
    created_at  TEXT NOT NULL
  )
`)

export default db
