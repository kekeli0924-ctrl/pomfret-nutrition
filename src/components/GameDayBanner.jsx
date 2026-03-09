import { useGameDay } from '../hooks/useGameDay'

export default function GameDayBanner() {
  const { isOpen, message, countdown } = useGameDay()

  return (
    <div className={`w-full px-4 py-3 text-center text-sm font-semibold ${
      isOpen
        ? 'bg-crimson-500 text-white'
        : 'bg-dark-700 text-dark-300'
    }`}>
      <p className="m-0">{message}</p>
      {countdown && (
        <p className="m-0 mt-1 text-xs font-mono opacity-80">{countdown}</p>
      )}
    </div>
  )
}
