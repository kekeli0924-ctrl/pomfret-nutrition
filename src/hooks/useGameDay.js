import { useState, useEffect } from 'react'

// Game days are Wednesday (3) and Friday (5)
const GAME_DAYS = [3, 5]
const CUTOFF_HOUR = 10 // Orders close at 10:00 AM on game day

function getNextGameDay(now) {
  const currentDay = now.getDay()
  const currentHour = now.getHours()

  // Check each day starting from today up to 7 days ahead
  for (let offset = 0; offset < 7; offset++) {
    const checkDay = (currentDay + offset) % 7
    if (GAME_DAYS.includes(checkDay)) {
      // If it's today, check if we're past cutoff
      if (offset === 0 && currentHour >= CUTOFF_HOUR) continue
      const gameDate = new Date(now)
      gameDate.setDate(now.getDate() + offset)
      gameDate.setHours(CUTOFF_HOUR, 0, 0, 0)
      return gameDate
    }
  }
  // Fallback — shouldn't happen with Wed+Fri
  return null
}

function getDayName(date) {
  return date.toLocaleDateString('en-US', { weekday: 'long' })
}

function formatDate(date) {
  return date.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })
}

export function useGameDay() {
  const [now, setNow] = useState(() => new Date())

  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 1000)
    return () => clearInterval(timer)
  }, [])

  const nextGameDay = getNextGameDay(now)
  if (!nextGameDay) {
    return { isOpen: false, message: 'No upcoming game days', nextGameDay: null, timeUntilClose: null, dayName: '' }
  }

  const isToday = now.toDateString() === nextGameDay.toDateString()
  const isPastCutoff = isToday && now.getHours() >= CUTOFF_HOUR
  const isOpen = !isPastCutoff

  const timeUntilClose = nextGameDay.getTime() - now.getTime()
  const hoursLeft = Math.floor(timeUntilClose / (1000 * 60 * 60))
  const minutesLeft = Math.floor((timeUntilClose % (1000 * 60 * 60)) / (1000 * 60))
  const secondsLeft = Math.floor((timeUntilClose % (1000 * 60)) / 1000)

  const dayName = getDayName(nextGameDay)
  const fullDate = formatDate(nextGameDay)

  let message = ''
  let countdown = ''
  if (!isOpen) {
    message = "Orders are closed — see you next game day!"
  } else if (isToday) {
    message = `Orders close today at 10:00 AM!`
    countdown = `${hoursLeft}h ${minutesLeft}m ${secondsLeft}s remaining`
  } else {
    message = `Ordering open for ${dayName}'s game day!`
    countdown = hoursLeft > 24
      ? `${Math.floor(hoursLeft / 24)}d ${hoursLeft % 24}h until cutoff`
      : `${hoursLeft}h ${minutesLeft}m until cutoff`
  }

  return { isOpen, message, countdown, nextGameDay, dayName, fullDate, timeUntilClose }
}
