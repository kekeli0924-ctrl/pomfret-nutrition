import GameDayBanner from './GameDayBanner'
import { useGameDay } from '../hooks/useGameDay'
import { POPULAR_COMBOS, BASES, FRUITS, BOOSTERS } from '../data/menu'

export default function Landing({ onStartOrder, onApplyCombo, onGoAdmin }) {
  const { isOpen, fullDate } = useGameDay()

  // Look up display info for combo ingredients
  const allItems = [...BASES, ...FRUITS, ...BOOSTERS]
  const findItem = (id) => allItems.find((i) => i.id === id)

  return (
    <div className="min-h-dvh flex flex-col">
      <GameDayBanner />

      {/* Hero Section */}
      <div className="relative flex-1 flex flex-col items-center justify-center px-6 py-16 text-center overflow-hidden"
        style={{
          background: 'linear-gradient(135deg, #0E2034 0%, #192D44 50%, #1A1520 100%)',
        }}
      >
        {/* Background decorative circles */}
        <div className="absolute top-10 left-10 w-64 h-64 bg-crimson-500 opacity-10 rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-10 w-80 h-80 bg-crimson-400 opacity-10 rounded-full blur-3xl" />

        <div className="relative z-10" style={{ animation: 'fadeSlideUp 0.6s ease-out' }}>
          <div className="text-6xl mb-4">🥤</div>
          <h1 className="text-5xl md:text-7xl font-black text-white tracking-tight mb-3">
            Pomfret <span className="text-crimson-400">Nutrition</span>
          </h1>
          <p className="text-xl md:text-2xl text-crimson-300 font-semibold mb-2">
            Fuel Your Game Day
          </p>
          <p className="text-dark-400 text-base max-w-md mx-auto mb-8">
            Custom smoothies & pregame snacks made fresh by the Pomfret Nutrition Club
          </p>

          {isOpen ? (
            <button
              onClick={onStartOrder}
              className="btn-bounce inline-flex items-center gap-2 bg-crimson-500 hover:bg-crimson-600 text-white font-bold text-lg px-8 py-4 rounded-2xl transition-all duration-200 cursor-pointer shadow-lg shadow-crimson-500/30 hover:shadow-crimson-500/50 hover:-translate-y-0.5"
            >
              Start Your Order
              <span className="text-xl">→</span>
            </button>
          ) : (
            <div className="bg-dark-800/80 border border-dark-600 rounded-2xl px-8 py-4 text-dark-300">
              <p className="font-semibold text-lg">Ordering is currently closed</p>
              <p className="text-sm mt-1">Check back before the next game day!</p>
            </div>
          )}

          {fullDate && isOpen && (
            <p className="text-dark-400 text-sm mt-4">
              Ordering for <span className="text-crimson-300 font-semibold">{fullDate}</span>
            </p>
          )}
        </div>
      </div>

      {/* Popular Combos Section */}
      <div className="bg-dark-50 px-6 py-16">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-dark-900 mb-2">Popular Combos</h2>
          <p className="text-center text-dark-500 mb-10">One-click favorites to get you started</p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {POPULAR_COMBOS.map((combo) => (
              <div
                key={combo.id}
                className="bg-white rounded-2xl p-6 border border-dark-200 hover:border-crimson-400 hover:shadow-lg transition-all duration-200 cursor-pointer group"
                onClick={() => {
                  if (isOpen) onApplyCombo(combo)
                }}
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-bold uppercase tracking-wider text-crimson-600 bg-crimson-50 px-3 py-1 rounded-full">
                    {combo.badge}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-dark-900 mb-1">{combo.name}</h3>
                <p className="text-sm text-dark-500 mb-4">{combo.description}</p>

                {/* Ingredient pills */}
                <div className="flex flex-wrap gap-1.5">
                  {[combo.base, ...combo.fruits, ...combo.boosters].map((itemId) => {
                    const item = findItem(itemId)
                    return item ? (
                      <span key={itemId} className="text-xs bg-dark-100 text-dark-600 px-2 py-1 rounded-full">
                        {item.emoji} {item.name}
                      </span>
                    ) : null
                  })}
                </div>

                {isOpen && (
                  <div className="mt-4 text-sm font-semibold text-crimson-500 group-hover:text-crimson-600 transition-colors">
                    Select this combo →
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* How It Works */}
      <div className="bg-white px-6 py-16">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-dark-900 mb-10">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            {[
              { step: '1', icon: '🍹', title: 'Build Your Smoothie', desc: 'Pick your base, fruits, and boosters' },
              { step: '2', icon: '🥪', title: 'Choose a Snack', desc: 'Select a pregame snack to fuel up' },
              { step: '3', icon: '✅', title: 'Pick Up on Game Day', desc: 'Grab your order at the smoothie bar' },
            ].map((s) => (
              <div key={s.step} className="flex flex-col items-center">
                <div className="w-16 h-16 rounded-2xl bg-crimson-50 flex items-center justify-center text-3xl mb-4">
                  {s.icon}
                </div>
                <h3 className="font-bold text-lg text-dark-900 mb-1">{s.title}</h3>
                <p className="text-dark-500 text-sm">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-dark-900 text-dark-400 text-center text-sm py-6 px-4">
        <p>Pomfret Nutrition Club</p>
        <p className="mt-1 text-dark-600">Game days: Wednesday & Friday | Orders close at 10:00 AM</p>
        <button
          onClick={onGoAdmin}
          className="mt-3 text-xs text-dark-600 hover:text-dark-400 transition-colors underline cursor-pointer bg-transparent border-0"
        >
          Admin View
        </button>
      </footer>
    </div>
  )
}
