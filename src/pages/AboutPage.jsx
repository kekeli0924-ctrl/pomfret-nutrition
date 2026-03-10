import { Link } from 'react-router-dom'
import Reveal from '../components/Reveal'

const TEAM_MEMBERS = [
  { name: 'Alex Rivera', role: 'Club President', bio: 'Varsity soccer captain who started the club after learning how nutrition transformed their game-day performance.' },
  { name: 'Jordan Lee', role: 'Vice President', bio: 'Manages CertaFuel logistics and makes sure every game day runs smoothly from prep to pickup.' },
  { name: 'Priya Patel', role: 'Nutrition Lead', bio: 'Designed our color-coded label system and researches evidence-based sports nutrition for the menu.' },
  { name: 'Marcus Chen', role: 'Social Media Manager', bio: 'Creates content that makes healthy eating look as good as it tastes. Follow us for smoothie drops and tips!' },
  { name: 'Sofia Martinez', role: 'Events Coordinator', bio: 'Plans our workshops, cooking demos, and guest speaker sessions. Always looking for the next big event idea.' },
  { name: 'Ethan Brooks', role: 'CertaFuel Manager', bio: 'Runs CertaFuel on game days — from blending smoothies to training new volunteers on the recipes.' },
]

export default function AboutPage() {
  return (
    <div>
      {/* ── Hero ──────────────────────────────────── */}
      <section className="px-6 py-20 md:py-28 text-center bg-dark-800">
        <div style={{ animation: 'fadeSlideUp 0.6s ease-out' }}>
          <span className="text-xs font-semibold uppercase tracking-widest text-crimson-500">
            About Us
          </span>
          <h1 className="text-4xl md:text-5xl font-black mt-4 mb-4 tracking-tight" style={{ color: '#F5F0EB' }}>
            Our Mission
          </h1>
          <p className="text-lg text-dark-400 max-w-2xl mx-auto leading-relaxed">
            The Pomfret Nutrition Club is dedicated to making nutrition accessible, fun, and
            performance-driven for every athlete and student at our school. We believe that
            what you eat matters — and we're here to make the healthy choice the easy choice.
          </p>
        </div>
      </section>

      {/* ── Nutrition Labels Link ─────────────────── */}
      <section className="px-6 py-20 bg-white">
        <div className="max-w-4xl mx-auto">
          <Reveal>
            <div className="bg-dark-50 rounded-lg border border-dark-200 p-8 flex flex-col sm:flex-row items-start sm:items-center gap-6">
              <div className="flex gap-2 shrink-0">
                <span className="w-3 h-3 rounded-full bg-green-500" />
                <span className="w-3 h-3 rounded-full bg-yellow-400" />
                <span className="w-3 h-3 rounded-full bg-red-500" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-bold text-dark-900 mb-1">Color-Coded Nutrition Labels</h3>
                <p className="text-sm text-dark-500">
                  Our simple labeling system rates cafeteria foods with green, yellow, and red codes — plus a special Athlete's Choice badge for performance-friendly options.
                </p>
              </div>
              <Link
                to="/nutrition-labels"
                className="btn-bounce shrink-0 inline-flex items-center bg-crimson-500 hover:bg-crimson-600 text-white font-semibold text-sm px-5 py-2.5 rounded-md transition-colors duration-200"
              >
                Learn More
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── Game Day Performance Packs ──────────────── */}
      <section className="px-6 py-20 bg-dark-50">
        <div className="max-w-4xl mx-auto">
          <Reveal>
            <div className="text-center mb-12">
              <span className="text-xs font-semibold uppercase tracking-widest text-crimson-500">
                Core Program
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-dark-900 mt-3 mb-3">
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
              <div className="bg-white rounded-lg border border-dark-200 shadow-[0_2px_12px_rgba(0,0,0,0.06)] p-6">
                <h3 className="font-bold text-dark-900 mb-3">What's Inside</h3>
                <ul className="space-y-2 text-sm text-dark-600">
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-crimson-500 rounded-full shrink-0" />
                    A custom smoothie or juice from CertaFuel
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-crimson-500 rounded-full shrink-0" />
                    A pregame snack (PB&J, wrap, energy bites, etc.)
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-crimson-500 rounded-full shrink-0" />
                    Nutrition info card with performance tips
                  </li>
                </ul>
              </div>
            </Reveal>
            <Reveal delay={100}>
              <div className="bg-white rounded-lg border border-dark-200 shadow-[0_2px_12px_rgba(0,0,0,0.06)] p-6">
                <h3 className="font-bold text-dark-900 mb-3">How to Order</h3>
                <ul className="space-y-2 text-sm text-dark-600">
                  <li className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-md bg-dark-100 text-dark-600 text-xs font-bold flex items-center justify-center shrink-0">1</span>
                    Visit the CertaFuel page before 10 AM on game day
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-md bg-dark-100 text-dark-600 text-xs font-bold flex items-center justify-center shrink-0">2</span>
                    Build your smoothie and choose a snack
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-md bg-dark-100 text-dark-600 text-xs font-bold flex items-center justify-center shrink-0">3</span>
                    Pick up at CertaFuel before your game
                  </li>
                </ul>
              </div>
            </Reveal>
          </div>

          <Reveal delay={200}>
            <div className="text-center mt-8">
              <Link
                to="/certafuel"
                className="btn-bounce inline-flex items-center bg-crimson-500 hover:bg-crimson-600 text-white font-semibold px-7 py-3 rounded-md transition-colors duration-200"
              >
                Order Your Performance Pack
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── CertaFuel Overview ────────────────────── */}
      <section className="px-6 py-20 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <Reveal>
            <span className="text-xs font-semibold uppercase tracking-widest text-crimson-500">
              Core Program
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-dark-900 mt-3 mb-3">
              CertaFuel
            </h2>
            <p className="text-dark-500 max-w-xl mx-auto mb-8">
              Our student-run pregame fuel station operates on every game day (Wednesday & Friday).
              Students can build custom smoothies, pick from popular combos, and add pregame snacks — all
              through our online ordering system.
            </p>
            <Link
              to="/certafuel"
              className="btn-bounce inline-flex items-center bg-crimson-500 hover:bg-crimson-600 text-white font-semibold px-7 py-3 rounded-md transition-colors duration-200"
            >
              Go to CertaFuel
            </Link>
          </Reveal>
        </div>
      </section>

      {/* ── Meet the Team ──────────────────────────── */}
      <section className="px-6 py-20 bg-dark-50">
        <div className="max-w-5xl mx-auto">
          <Reveal>
            <div className="text-center mb-12">
              <span className="text-xs font-semibold uppercase tracking-widest text-crimson-500">
                Our People
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-dark-900 mt-3 mb-3">
                Meet the Team
              </h2>
              <p className="text-dark-500">The students making it all happen</p>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {TEAM_MEMBERS.map((member, i) => (
              <Reveal key={i} delay={i * 80}>
                <div className="bg-white rounded-lg border border-dark-200 shadow-[0_2px_12px_rgba(0,0,0,0.06)] p-6 text-center hover:border-crimson-500 transition-colors duration-200">
                  <div className="w-16 h-16 rounded-full bg-dark-100 flex items-center justify-center mx-auto mb-4">
                    <span className="text-dark-500 text-sm font-bold">
                      {member.name.split(' ').map(n => n[0]).join('')}
                    </span>
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
