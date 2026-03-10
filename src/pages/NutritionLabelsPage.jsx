import { Link } from 'react-router-dom'
import Reveal from '../components/Reveal'
import DiningMenu from '../components/DiningMenu'

const LABEL_TIERS = [
  {
    color: 'green',
    title: 'Green — Great Choice',
    description:
      'Nutrient-dense foods packed with vitamins, lean protein, complex carbs, and healthy fats. These are your everyday go-to options.',
    examples: 'Grilled chicken, brown rice, fresh fruit, salads, whole wheat wraps',
    bgClass: 'bg-green-50 border-green-200',
    textClass: 'text-green-700',
    dotClass: 'bg-green-500',
  },
  {
    color: 'yellow',
    title: 'Yellow — Enjoy in Balance',
    description:
      'Moderately nutritious foods that are fine in balanced portions. Not the best for peak performance, but okay in moderation.',
    examples: 'Pasta with cream sauce, flavored yogurt, granola bars, fruit juice',
    bgClass: 'bg-yellow-50 border-yellow-200',
    textClass: 'text-yellow-700',
    dotClass: 'bg-yellow-400',
  },
  {
    color: 'red',
    title: 'Red — Occasional Treat',
    description:
      'Low nutritional value foods. High in sugar, sodium, or processed ingredients. Save these for occasional treats, not daily fuel.',
    examples: 'Sugary drinks, fried foods, candy, chips, processed snacks',
    bgClass: 'bg-red-50 border-red-200',
    textClass: 'text-red-700',
    dotClass: 'bg-red-500',
  },
]

export default function NutritionLabelsPage() {
  return (
    <div>
      {/* ── Hero ──────────────────────────────────── */}
      <section className="px-6 py-20 md:py-28 text-center bg-dark-800">
        <div style={{ animation: 'fadeSlideUp 0.6s ease-out' }}>
          <span className="text-xs font-semibold uppercase tracking-widest text-crimson-500">
            Core Program
          </span>
          <h1 className="text-4xl md:text-5xl font-black mt-4 mb-4 tracking-tight" style={{ color: '#F5F0EB' }}>
            Color-Coded Nutrition Labels
          </h1>
          <p className="text-lg text-dark-400 max-w-2xl mx-auto leading-relaxed">
            We created a simple system to help students make smarter food choices in the cafeteria — no calorie counting required.
          </p>
        </div>
      </section>

      {/* ── Daily Cafeteria Menu ────────────────── */}
      <section className="px-6 py-20 bg-dark-50">
        <div className="max-w-2xl mx-auto">
          <Reveal>
            <div className="text-center mb-10">
              <span className="text-xs font-semibold uppercase tracking-widest text-crimson-500">
                Daily Menu
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-dark-900 mt-3 mb-3">
                Today's Cafeteria Menu
              </h2>
              <p className="text-dark-500 max-w-xl mx-auto">
                Browse what's being served for breakfast, lunch, and dinner. Tap any dish to see estimated nutrition info.
              </p>
            </div>
          </Reveal>

          <DiningMenu />
        </div>
      </section>

      {/* ── Label Tiers ──────────────────────────── */}
      <section className="px-6 py-20 bg-white">
        <div className="max-w-4xl mx-auto">
          <Reveal>
            <div className="text-center mb-12">
              <span className="text-xs font-semibold uppercase tracking-widest text-crimson-500">
                How It Works
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-dark-900 mt-3 mb-3">
                Three Simple Labels
              </h2>
              <p className="text-dark-500 max-w-xl mx-auto">
                Every cafeteria item gets a color code so you can make quick, informed decisions at a glance.
              </p>
            </div>
          </Reveal>

          <div className="space-y-4 mb-10">
            {LABEL_TIERS.map((tier, i) => (
              <Reveal key={tier.color} delay={i * 100}>
                <div className={`rounded-lg border p-6 ${tier.bgClass}`}>
                  <div className="flex items-center gap-3 mb-3">
                    <span className={`w-3 h-3 rounded-full ${tier.dotClass} shrink-0`} />
                    <h3 className={`text-lg font-bold ${tier.textClass}`}>{tier.title}</h3>
                  </div>
                  <p className="text-dark-700 text-sm mb-3">{tier.description}</p>
                  <p className="text-dark-500 text-xs">
                    <span className="font-semibold">Examples:</span> {tier.examples}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal>
            <div className="bg-dark-50 rounded-lg border border-dark-200 p-6 flex items-start gap-4">
              <div className="w-10 h-10 rounded-md bg-crimson-500 text-white flex items-center justify-center text-lg shrink-0 font-bold">
                ⚡
              </div>
              <div>
                <h3 className="text-lg font-bold text-dark-900 mb-1">Athlete's Choice Badge</h3>
                <p className="text-dark-600 text-sm leading-relaxed">
                  Foods marked with the Athlete's Choice icon are especially good for performance —
                  high in lean protein, complex carbs, good hydration, and micronutrients that
                  support recovery and energy.
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────── */}
      <section className="px-6 py-20 text-center bg-dark-50">
        <Reveal>
          <div className="max-w-2xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-dark-900 mb-4">
              Fuel Up on Game Day
            </h2>
            <p className="text-dark-500 mb-8 text-lg">
              Pair smart cafeteria choices with a CertaFuel smoothie and pregame snack for peak performance.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                to="/certafuel"
                className="btn-bounce inline-flex items-center bg-crimson-500 hover:bg-crimson-600 text-white font-semibold text-base px-7 py-3 rounded-md transition-colors duration-200"
              >
                Order from CertaFuel
              </Link>
              <Link
                to="/about"
                className="btn-bounce inline-flex items-center bg-crimson-500 hover:bg-crimson-600 text-white font-semibold text-base px-7 py-3 rounded-md transition-colors duration-200"
              >
                About the Club
              </Link>
            </div>
          </div>
        </Reveal>
      </section>
    </div>
  )
}
