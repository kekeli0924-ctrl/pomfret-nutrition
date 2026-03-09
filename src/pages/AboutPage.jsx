import { Link } from 'react-router-dom'
import Reveal from '../components/Reveal'

// ─── Label system color tiers ──────────────────────────
const LABEL_TIERS = [
  {
    color: 'green',
    emoji: '🟢',
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
    emoji: '🟡',
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
    emoji: '🔴',
    title: 'Red — Occasional Treat',
    description:
      'Low nutritional value foods. High in sugar, sodium, or processed ingredients. Save these for occasional treats, not daily fuel.',
    examples: 'Sugary drinks, fried foods, candy, chips, processed snacks',
    bgClass: 'bg-red-50 border-red-200',
    textClass: 'text-red-700',
    dotClass: 'bg-red-500',
  },
]

// ─── Meet the Team placeholders ─────────────────────────
const TEAM_MEMBERS = [
  { name: 'Team Member Name', role: 'Club President', emoji: '👤', bio: 'Leading the club with passion for nutrition and athletics.' },
  { name: 'Team Member Name', role: 'Vice President', emoji: '👤', bio: 'Organizing events and managing the smoothie bar operations.' },
  { name: 'Team Member Name', role: 'Nutrition Lead', emoji: '👤', bio: 'Designing our label system and researching performance nutrition.' },
  { name: 'Team Member Name', role: 'Social Media', emoji: '👤', bio: 'Spreading the word and making nutrition look cool on Instagram.' },
  { name: 'Team Member Name', role: 'Events Coordinator', emoji: '👤', bio: 'Planning workshops, demos, and guest speaker sessions.' },
  { name: 'Team Member Name', role: 'Smoothie Bar Manager', emoji: '👤', bio: 'Running smoothie bar operations on game days.' },
]

export default function AboutPage() {
  return (
    <div>
      {/* ── Hero ──────────────────────────────────── */}
      <section
        className="px-6 py-20 md:py-28 text-center"
        style={{
          background: 'linear-gradient(135deg, #0E2034 0%, #192D44 50%, #1A1520 100%)',
        }}
      >
        <div style={{ animation: 'fadeSlideUp 0.6s ease-out' }}>
          <span className="text-xs font-bold uppercase tracking-widest text-crimson-300 bg-crimson-400/10 px-3 py-1.5 rounded-full">
            About Us
          </span>
          <h1 className="text-4xl md:text-5xl font-black text-white mt-4 mb-4 tracking-tight">
            Our Mission
          </h1>
          <p className="text-lg text-dark-400 max-w-2xl mx-auto leading-relaxed">
            The Pomfret Nutrition Club is dedicated to making nutrition accessible, fun, and
            performance-driven for every athlete and student at our school. We believe that
            what you eat matters — and we're here to make the healthy choice the easy choice.
          </p>
        </div>
      </section>

      {/* ── Nutrition Label System ─────────────────── */}
      <section className="px-6 py-20 bg-white">
        <div className="max-w-4xl mx-auto">
          <Reveal>
            <div className="text-center mb-12">
              <span className="text-xs font-bold uppercase tracking-widest text-crimson-600 bg-crimson-50 px-3 py-1.5 rounded-full">
                Core Program
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-dark-900 mt-4 mb-3">
                Color-Coded Nutrition Labels
              </h2>
              <p className="text-dark-500 max-w-xl mx-auto">
                We created a simple system to help students make smarter food choices in the cafeteria — no calorie counting required.
              </p>
            </div>
          </Reveal>

          {/* Color tiers */}
          <div className="space-y-4 mb-10">
            {LABEL_TIERS.map((tier, i) => (
              <Reveal key={tier.color} delay={i * 100}>
                <div className={`rounded-2xl border p-6 ${tier.bgClass}`}>
                  <div className="flex items-center gap-3 mb-3">
                    <span className={`w-4 h-4 rounded-full ${tier.dotClass} shrink-0`} />
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

          {/* Athlete's Choice badge */}
          <Reveal>
            <div className="bg-gradient-to-r from-crimson-50 to-dark-100 rounded-2xl border border-crimson-200 p-6 flex items-start gap-4">
              <div className="w-14 h-14 rounded-2xl bg-white flex items-center justify-center text-3xl shrink-0 shadow-sm">
                ⚡
              </div>
              <div>
                <h3 className="text-lg font-bold text-dark-900 mb-1">Athlete's Choice Badge</h3>
                <p className="text-dark-600 text-sm leading-relaxed">
                  Foods marked with the Athlete's Choice icon are especially good for performance —
                  high in lean protein, complex carbs, good hydration, and micronutrients that
                  support recovery and energy. Look for the ⚡ icon next to the color label
                  in the cafeteria.
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── Game Day Performance Packs ──────────────── */}
      <section className="px-6 py-20 bg-dark-50">
        <div className="max-w-4xl mx-auto">
          <Reveal>
            <div className="text-center mb-12">
              <span className="text-xs font-bold uppercase tracking-widest text-crimson-600 bg-crimson-50 px-3 py-1.5 rounded-full">
                Core Program
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-dark-900 mt-4 mb-3">
                Game Day Performance Packs
              </h2>
              <p className="text-dark-500 max-w-xl mx-auto">
                Curated pregame snack bundles designed to fuel athletes before competition.
                Every pack is balanced for energy, hydration, and sustained performance.
              </p>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Reveal delay={0}>
              <div className="bg-white rounded-2xl border border-dark-200 p-6">
                <h3 className="font-bold text-dark-900 mb-3 flex items-center gap-2">
                  📦 What's Inside
                </h3>
                <ul className="space-y-2 text-sm text-dark-600">
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-crimson-500 rounded-full shrink-0" />
                    A custom smoothie or juice from our Smoothie Bar
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-crimson-500 rounded-full shrink-0" />
                    A pregame snack (PB&J, wrap, energy bites, etc.)
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-crimson-500 rounded-full shrink-0" />
                    Nutrition info card with performance tips
                  </li>
                </ul>
              </div>
            </Reveal>
            <Reveal delay={100}>
              <div className="bg-white rounded-2xl border border-dark-200 p-6">
                <h3 className="font-bold text-dark-900 mb-3 flex items-center gap-2">
                  🗓️ How to Order
                </h3>
                <ul className="space-y-2 text-sm text-dark-600">
                  <li className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-dark-100 text-dark-600 text-xs font-bold flex items-center justify-center shrink-0">1</span>
                    Visit the Smoothie Bar page before 10 AM on game day
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-dark-100 text-dark-600 text-xs font-bold flex items-center justify-center shrink-0">2</span>
                    Build your smoothie and choose a snack
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-dark-100 text-dark-600 text-xs font-bold flex items-center justify-center shrink-0">3</span>
                    Pick up at the smoothie bar before your game
                  </li>
                </ul>
              </div>
            </Reveal>
          </div>

          <Reveal delay={200}>
            <div className="text-center mt-8">
              <Link
                to="/smoothie-bar"
                className="btn-bounce inline-flex items-center gap-2 bg-crimson-500 hover:bg-crimson-600 text-white font-bold px-8 py-4 rounded-2xl transition-all duration-200 shadow-lg shadow-crimson-500/20"
              >
                Order Your Performance Pack →
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── Smoothie Bar Overview ──────────────────── */}
      <section className="px-6 py-20 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <Reveal>
            <span className="text-xs font-bold uppercase tracking-widest text-crimson-600 bg-crimson-50 px-3 py-1.5 rounded-full">
              Core Program
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-dark-900 mt-4 mb-3">
              The Smoothie Bar
            </h2>
            <p className="text-dark-500 max-w-xl mx-auto mb-8">
              Our student-run smoothie and juice bar operates on every game day (Wednesday & Friday).
              Students can build custom smoothies, pick from popular combos, and add pregame snacks — all
              through our online ordering system.
            </p>
            <Link
              to="/smoothie-bar"
              className="btn-bounce inline-flex items-center gap-2 bg-crimson-500 hover:bg-crimson-600 text-white font-bold px-8 py-4 rounded-2xl transition-all duration-200 shadow-lg shadow-crimson-500/20"
            >
              Go to Smoothie Bar 🥤
            </Link>
          </Reveal>
        </div>
      </section>

      {/* ── Meet the Team ──────────────────────────── */}
      <section className="px-6 py-20 bg-dark-50">
        <div className="max-w-5xl mx-auto">
          <Reveal>
            <div className="text-center mb-12">
              <span className="text-xs font-bold uppercase tracking-widest text-crimson-600 bg-crimson-50 px-3 py-1.5 rounded-full">
                Our People
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-dark-900 mt-4 mb-3">
                Meet the Team
              </h2>
              <p className="text-dark-500">The students making it all happen</p>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {TEAM_MEMBERS.map((member, i) => (
              <Reveal key={i} delay={i * 80}>
                <div className="bg-white rounded-2xl border border-dark-200 p-6 text-center hover:border-crimson-300 hover:shadow-md transition-all duration-200">
                  {/* Avatar placeholder */}
                  <div className="w-20 h-20 rounded-full bg-gradient-to-br from-crimson-100 to-dark-100 flex items-center justify-center text-4xl mx-auto mb-4">
                    {member.emoji}
                  </div>
                  <h3 className="font-bold text-dark-900">{member.name}</h3>
                  <p className="text-sm text-crimson-500 font-semibold mb-2">{member.role}</p>
                  <p className="text-sm text-dark-500">{member.bio}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
