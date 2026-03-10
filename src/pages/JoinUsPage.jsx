import { Link } from 'react-router-dom'
import Reveal from '../components/Reveal'

const PERKS = [
  { text: 'Help design and maintain our cafeteria nutrition label system' },
  { text: 'Run CertaFuel on game days — blend, serve, and manage orders' },
  { text: 'Plan and host nutrition workshops, cooking demos, and speaker events' },
  { text: 'Conduct cafeteria audits and propose healthier menu improvements' },
  { text: 'Create social media content that makes nutrition fun and shareable' },
  { text: 'Learn performance nutrition from guest speakers and real-world projects' },
  { text: 'Build leadership skills and make a real impact on your school community' },
  { text: 'Great for college apps — show initiative, teamwork, and community impact' },
]

export default function JoinUsPage() {
  return (
    <div>
      {/* ── Hero ──────────────────────────────────── */}
      <section className="px-6 py-20 md:py-28 text-center bg-dark-800">
        <div style={{ animation: 'fadeSlideUp 0.6s ease-out' }}>
          <span className="text-xs font-semibold uppercase tracking-widest text-crimson-500">
            Join Us
          </span>
          <h1 className="text-4xl md:text-5xl font-black mt-4 mb-4 tracking-tight" style={{ color: '#F5F0EB' }}>
            Be Part of the Movement
          </h1>
          <p className="text-lg text-dark-400 max-w-xl mx-auto">
            Whether you're a varsity athlete, a nutrition nerd, or just someone who wants to make
            a difference — there's a spot for you on our team.
          </p>
        </div>
      </section>

      {/* ── Why Join ──────────────────────────────── */}
      <section className="px-6 py-20 bg-dark-50">
        <div className="max-w-3xl mx-auto">
          <Reveal>
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-dark-900 mb-3">What You'll Get to Do</h2>
              <p className="text-dark-500 max-w-lg mx-auto">
                Club members are hands-on with every part of our mission
              </p>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {PERKS.map((perk, i) => (
              <Reveal key={i} delay={i * 60}>
                <div className="bg-white rounded-lg border border-dark-200 shadow-[0_2px_12px_rgba(0,0,0,0.06)] p-5 flex items-start gap-3 hover:border-crimson-500 transition-colors duration-200">
                  <span className="w-1.5 h-1.5 bg-crimson-500 rounded-full shrink-0 mt-2" />
                  <p className="text-sm text-dark-700 leading-relaxed">{perk.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Who Can Join ───────────────────────────── */}
      <section className="px-6 py-20 bg-white">
        <div className="max-w-3xl mx-auto">
          <Reveal>
            <div className="bg-dark-50 rounded-lg border border-dark-200 p-8 text-center">
              <h2 className="text-2xl font-bold text-dark-900 mb-3">Everyone Is Welcome</h2>
              <p className="text-dark-600 max-w-lg mx-auto mb-4 leading-relaxed">
                You don't need to be a nutritionist or an athlete to join. We welcome all students
                who want to learn about food, help their peers make better choices, and be part of
                a supportive community.
              </p>
              <p className="text-sm text-dark-500">
                Meetings are held <span className="font-semibold text-dark-700">every Tuesday after school</span> in
                the <span className="font-semibold text-dark-700">Room 204</span> — come say hi!
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── CTA ───────────────────────────────────── */}
      <section className="px-6 py-20 bg-dark-50">
        <div className="max-w-xl mx-auto text-center">
          <Reveal>
            <div className="bg-white rounded-lg border border-dark-200 shadow-[0_2px_12px_rgba(0,0,0,0.06)] p-10">
              <h2 className="text-2xl font-bold text-dark-900 mb-3">Ready to Join?</h2>
              <p className="text-dark-500 mb-6 leading-relaxed">
                Just show up to our next meeting — no sign-up needed! We meet every Tuesday
                after school in Room 204. Bring your curiosity and we'll handle the rest.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Link
                  to="/certafuel"
                  className="btn-bounce inline-flex items-center justify-center bg-crimson-500 hover:bg-crimson-600 text-white font-semibold px-7 py-3 rounded-md transition-colors duration-200"
                >
                  Check Out CertaFuel
                </Link>
                <Link
                  to="/activities"
                  className="btn-bounce inline-flex items-center justify-center bg-crimson-500 hover:bg-crimson-600 text-white font-semibold px-7 py-3 rounded-md transition-colors duration-200"
                >
                  See Our Activities
                </Link>
              </div>
              <p className="text-xs text-dark-500 mt-6">
                Questions? Ask any club member or talk to our advisor in Room 204.
              </p>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  )
}
