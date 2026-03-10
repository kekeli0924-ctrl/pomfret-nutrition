import { useGameDay } from '../hooks/useGameDay'

export default function GameDayBanner() {
  const { isOpen, message, countdown } = useGameDay()

  return (
    <div className={`w-full px-4 py-2.5 text-center text-sm font-medium ${
      isOpen
        ? 'bg-crimson-500 text-white'
        : 'bg-dark-800 text-dark-400'
    }`}>
      <p className="m-0">{message}</p>
      {countdown && (
        <p className="m-0 mt-0.5 text-xs font-mono opacity-80">{countdown}</p>
      )}
    </div>
  )
}
