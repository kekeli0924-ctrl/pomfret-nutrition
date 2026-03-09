import { Link } from 'react-router-dom'
import Reveal from '../components/Reveal'

const PERKS = [
  { icon: '🏷️', text: 'Help design and maintain our cafeteria nutrition label system' },
  { icon: '🥤', text: 'Run the smoothie bar on game days — blend, serve, and manage orders' },
  { icon: '🎤', text: 'Plan and host nutrition workshops, cooking demos, and speaker events' },
  { icon: '📊', text: 'Conduct cafeteria audits and propose healthier menu improvements' },
  { icon: '📱', text: 'Create social media content that makes nutrition fun and shareable' },
  { icon: '⚡', text: 'Learn performance nutrition from guest speakers and real-world projects' },
  { icon: '🤝', text: 'Build leadership skills and make a real impact on your school community' },
  { icon: '📝', text: 'Great for college apps — show initiative, teamwork, and community impact' },
]

export default function JoinUsPage() {
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
            Join Us
          </span>
          <h1 className="text-4xl md:text-5xl font-black text-white mt-4 mb-4 tracking-tight">
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
                <div className="bg-white rounded-xl border border-dark-200 p-5 flex items-start gap-4 hover:border-crimson-300 hover:shadow-sm transition-all duration-200">
                  <span className="text-2xl shrink-0 mt-0.5">{perk.icon}</span>
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
            <div className="bg-gradient-to-r from-crimson-50 to-dark-100 rounded-2xl border border-crimson-200 p-8 text-center">
              <div className="text-4xl mb-4">🙌</div>
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

      {/* ── Sign Up CTA ────────────────────────────── */}
      <section className="px-6 py-20 bg-dark-50">
        <div className="max-w-xl mx-auto text-center">
          <Reveal>
            <div className="bg-white rounded-2xl border border-dark-200 p-10 shadow-sm">
              <div className="text-5xl mb-4">📋</div>
              <h2 className="text-2xl font-bold text-dark-900 mb-3">Ready to Sign Up?</h2>
              <p className="text-dark-500 mb-6 leading-relaxed">
                The sign-up link is shared at our school meetings and through the school announcements.
                Come to a meeting to learn more, or watch for the link!
              </p>
              <button
                className="btn-bounce bg-crimson-500 hover:bg-crimson-600 text-white font-bold px-8 py-4 rounded-2xl transition-all duration-200 cursor-pointer border-0 shadow-lg shadow-crimson-500/20 text-base"
                disabled
              >
                Sign-Up Form Coming Soon
              </button>
              <p className="text-xs text-dark-400 mt-4">
                In the meantime, come find us at our next meeting or follow us on school social media!
              </p>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  )
}
