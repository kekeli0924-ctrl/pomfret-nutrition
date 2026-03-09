import Database from 'better-sqlite3'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const dbPath = path.join(__dirname, '..', 'nutrition.db')

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

export default db
