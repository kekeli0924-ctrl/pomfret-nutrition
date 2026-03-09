import { Link } from 'react-router-dom'
import Reveal from '../components/Reveal'
import GameDayBanner from '../components/GameDayBanner'

// ─── Initiative highlight cards ────────────────────────
const INITIATIVES = [
  {
    icon: '🏷️',
    title: 'Color-Coded Nutrition Labels',
    description:
      'Our simple labeling system rates cafeteria foods with green, yellow, and red codes — plus a special "Athlete\'s Choice" icon for performance-friendly options.',
    color: 'green',
    link: '/about',
    linkText: 'Learn More',
  },
  {
    icon: '📦',
    title: 'Game Day Performance Packs',
    description:
      'Curated pregame snack bundles designed by student athletes, for student athletes. Fuel up right before every competition.',
    color: 'orange',
    link: '/smoothie-bar',
    linkText: 'Order Now',
  },
  {
    icon: '🥤',
    title: 'Smoothie Bar',
    description:
      'A student-run smoothie and juice bar with online preordering for game days. Build your own or pick a popular combo.',
    color: 'green',
    link: '/smoothie-bar',
    linkText: 'Start Your Order',
  },
]

// ─── Upcoming events ──────────────────────────────────
const UPCOMING_EVENTS = [
  {
    date: 'Mar 12',
    day: 'Wed',
    title: 'Smoothie Bar Open',
    desc: 'Game day smoothies and snack packs available for pickup',
    tag: 'Game Day',
    tagColor: 'green',
  },
  {
    date: 'Mar 14',
    day: 'Fri',
    title: 'Smoothie Bar Open',
    desc: 'Friday game day — order before 10 AM!',
    tag: 'Game Day',
    tagColor: 'green',
  },
  {
    date: 'Mar 18',
    day: 'Tue',
    title: 'Nutrition Myth Busters',
    desc: 'We debunk the top 10 nutrition myths athletes believe',
    tag: 'Workshop',
    tagColor: 'orange',
  },
  {
    date: 'Mar 25',
    day: 'Tue',
    title: 'Athlete Meal Prep 101',
    desc: 'Hands-on meal prep session in the school kitchen',
    tag: 'Workshop',
    tagColor: 'orange',
  },
]

export default function HomePage() {
  return (
    <div>
      {/* ── Game Day Status Banner ─────────────────── */}
      <GameDayBanner />

      {/* ── Hero Section ───────────────────────────── */}
      <section
        className="relative overflow-hidden px-6 py-24 md:py-36 text-center"
        style={{
          background:
            'linear-gradient(135deg, #0E2034 0%, #192D44 50%, #1A1520 100%)',
        }}
      >
        {/* Decorative blobs */}
        <div className="absolute top-10 left-10 w-72 h-72 bg-crimson-500 opacity-10 rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-crimson-400 opacity-10 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-crimson-300 opacity-5 rounded-full blur-3xl" />

        <div
          className="relative z-10 max-w-3xl mx-auto"
          style={{ animation: 'fadeSlideUp 0.7s ease-out' }}
        >
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm text-crimson-300 text-sm font-semibold px-4 py-2 rounded-full mb-6">
            <span>🥗</span>
            Pomfret Nutrition Club
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-7xl font-black text-white tracking-tight leading-[1.1] mb-6">
            Fueling Student Athletes,{' '}
            <span className="text-crimson-400">
              One Plate at a Time
            </span>
          </h1>

          <p className="text-lg md:text-xl text-dark-400 max-w-xl mx-auto mb-10 leading-relaxed">
            We're the Pomfret Nutrition Club — making nutrition accessible, fun, and performance-driven
            for every athlete at our school.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/smoothie-bar"
              className="btn-bounce inline-flex items-center gap-2 bg-crimson-500 hover:bg-crimson-600 text-white font-bold text-lg px-8 py-4 rounded-2xl transition-all duration-200 shadow-lg shadow-crimson-500/30 hover:shadow-crimson-500/50 hover:-translate-y-0.5"
            >
              Order from Smoothie Bar
              <span>🥤</span>
            </Link>
            <Link
              to="/join"
              className="btn-bounce inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white font-bold text-lg px-8 py-4 rounded-2xl transition-all duration-200 backdrop-blur-sm border border-white/10"
            >
              Join the Club
              <span>→</span>
            </Link>
          </div>
        </div>
      </section>

      {/* ── Initiatives Section ────────────────────── */}
      <section className="px-6 py-20 bg-dark-50">
        <div className="max-w-6xl mx-auto">
          <Reveal>
            <div className="text-center mb-12">
              <span className="text-xs font-bold uppercase tracking-widest text-crimson-600 bg-crimson-50 px-3 py-1.5 rounded-full">
                What We Do
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-dark-900 mt-4 mb-3">
                Our Initiatives
              </h2>
              <p className="text-dark-500 max-w-lg mx-auto">
                Three programs driving healthier choices across campus
              </p>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {INITIATIVES.map((item, i) => (
              <Reveal key={item.title} delay={i * 100}>
                <div className="bg-white rounded-2xl p-7 border border-dark-200 hover:border-crimson-400 hover:shadow-xl hover:shadow-crimson-500/5 transition-all duration-300 h-full flex flex-col group">
                  <div className="w-14 h-14 rounded-2xl bg-crimson-50 flex items-center justify-center text-3xl mb-5">
                    {item.icon}
                  </div>
                  <h3 className="text-xl font-bold text-dark-900 mb-2">
                    {item.title}
                  </h3>
                  <p className="text-dark-500 text-sm leading-relaxed flex-1 mb-5">
                    {item.description}
                  </p>
                  <Link
                    to={item.link}
                    className="text-sm font-semibold text-crimson-500 group-hover:text-crimson-600 transition-colors inline-flex items-center gap-1"
                  >
                    {item.linkText} <span>→</span>
                  </Link>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── How It Works ───────────────────────────── */}
      <section className="px-6 py-20 bg-white">
        <div className="max-w-4xl mx-auto">
          <Reveal>
            <div className="text-center mb-12">
              <span className="text-xs font-bold uppercase tracking-widest text-crimson-600 bg-crimson-50 px-3 py-1.5 rounded-full">
                Smoothie Bar
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-dark-900 mt-4 mb-3">
                How It Works
              </h2>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              { step: '1', icon: '📱', title: 'Order Online', desc: 'Build your smoothie and pick a snack before the 10 AM cutoff' },
              { step: '2', icon: '🍹', title: 'We Blend It', desc: 'Our crew preps your order fresh before game time' },
              { step: '3', icon: '🏃', title: 'Pick It Up', desc: 'Grab your order at the smoothie bar on game day' },
              { step: '4', icon: '⚡', title: 'Fuel Up!', desc: 'Eat well, play well. Every game day.' },
            ].map((s, i) => (
              <Reveal key={s.step} delay={i * 100}>
                <div className="text-center">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-crimson-50 to-dark-100 flex items-center justify-center text-3xl mx-auto mb-4 border border-dark-100">
                    {s.icon}
                  </div>
                  <div className="text-xs font-bold text-crimson-500 mb-1">STEP {s.step}</div>
                  <h3 className="font-bold text-dark-900 mb-1">{s.title}</h3>
                  <p className="text-sm text-dark-500">{s.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Upcoming Events / Announcements ─────────── */}
      <section className="px-6 py-20 bg-dark-50">
        <div className="max-w-4xl mx-auto">
          <Reveal>
            <div className="text-center mb-12">
              <span className="text-xs font-bold uppercase tracking-widest text-crimson-600 bg-crimson-50 px-3 py-1.5 rounded-full">
                Coming Up
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-dark-900 mt-4 mb-3">
                Upcoming Events
              </h2>
            </div>
          </Reveal>

          <div className="space-y-4">
            {UPCOMING_EVENTS.map((event, i) => (
              <Reveal key={event.title + event.date} delay={i * 80}>
                <div className="bg-white rounded-2xl border border-dark-200 p-5 flex items-center gap-5 hover:border-crimson-300 hover:shadow-md transition-all duration-200">
                  {/* Date block */}
                  <div className="shrink-0 w-16 h-16 rounded-xl bg-dark-900 text-white flex flex-col items-center justify-center">
                    <span className="text-xs font-semibold text-dark-400">{event.day}</span>
                    <span className="text-lg font-bold leading-tight">{event.date.split(' ')[1]}</span>
                  </div>
                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-0.5">
                      <h3 className="font-bold text-dark-900 truncate">{event.title}</h3>
                      <span
                        className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full shrink-0 ${
                          event.tagColor === 'green'
                            ? 'bg-crimson-50 text-crimson-600'
                            : 'bg-dark-100 text-dark-600'
                        }`}
                      >
                        {event.tag}
                      </span>
                    </div>
                    <p className="text-sm text-dark-500 truncate">{event.desc}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA Section ────────────────────────────── */}
      <section
        className="px-6 py-20 text-center"
        style={{
          background:
            'linear-gradient(135deg, #0E2034 0%, #1A1520 100%)',
        }}
      >
        <Reveal>
          <div className="max-w-2xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Ready to Join the Team?
            </h2>
            <p className="text-dark-400 mb-8 text-lg">
              Whether you're an athlete looking for better fuel or just passionate about nutrition
              — there's a spot for you.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                to="/join"
                className="btn-bounce inline-flex items-center gap-2 bg-crimson-500 hover:bg-crimson-600 text-white font-bold text-lg px-8 py-4 rounded-2xl transition-all duration-200 shadow-lg shadow-crimson-500/30"
              >
                Join the Club →
              </Link>
              <Link
                to="/about"
                className="btn-bounce inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white font-bold text-lg px-8 py-4 rounded-2xl transition-all duration-200 backdrop-blur-sm border border-white/10"
              >
                Learn More
              </Link>
            </div>
          </div>
        </Reveal>
      </section>
    </div>
  )
}
