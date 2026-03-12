import { Link } from 'react-router-dom'
import Reveal from '../components/Reveal'
import GameDayBanner from '../components/GameDayBanner'

const INITIATIVES = [
  {
    title: 'Color-Coded Nutrition Labels',
    description:
      'Our simple labeling system rates cafeteria foods with green, yellow, and red codes — making it easy to eat well without counting calories.',
    link: '/nutrition-labels',
    linkText: 'See the Labels',
  },
  {
    title: 'CertaFuel',
    description:
      'Our student-run fuel station for game days. Build a custom smoothie, pick a pre- or post-workout snack, and order online for pickup.',
    link: '/certafuel',
    linkText: 'Order Now',
  },
  {
    title: 'Workshops & Events',
    description:
      'Cooking demos, myth-busting sessions, guest speakers, and hands-on meal prep — nutrition education that goes beyond the cafeteria.',
    link: '/activities',
    linkText: 'See What\'s Coming',
  },
]

const UPCOMING_EVENTS = [
  {
    date: 'Mar 12',
    day: 'Wed',
    title: 'CertaFuel Open',
    desc: 'Game day smoothies and snack packs available for pickup',
    tag: 'Game Day',
  },
  {
    date: 'Mar 14',
    day: 'Fri',
    title: 'CertaFuel Open',
    desc: 'Friday game day — order before 10 AM!',
    tag: 'Game Day',
  },
  {
    date: 'Mar 18',
    day: 'Tue',
    title: 'Nutrition Myth Busters',
    desc: 'We debunk the top 10 nutrition myths athletes believe',
    tag: 'Workshop',
  },
  {
    date: 'Mar 25',
    day: 'Tue',
    title: 'Athlete Meal Prep 101',
    desc: 'Hands-on meal prep session in the school kitchen',
    tag: 'Workshop',
  },
]

export default function HomePage() {
  return (
    <div>
      <GameDayBanner />

      {/* ── Hero ─────────────────────────────────── */}
      <section className="relative overflow-hidden px-6 py-24 md:py-36 text-center bg-dark-800">
        <div
          className="relative z-10 max-w-3xl mx-auto"
          style={{ animation: 'fadeSlideUp 0.7s ease-out' }}
        >
          <div className="inline-flex items-center text-crimson-500 text-xs font-semibold px-4 py-2 font-heading uppercase tracking-widest border border-dark-700 rounded-md mb-6">
            Pomfret Nutrition Club
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-7xl font-black tracking-tight leading-[1.1] mb-6" style={{ color: '#F5F0EB' }}>
            Fueling Our Community,{' '}
            <span className="text-crimson-500">
              One Plate at a Time
            </span>
          </h1>

          <p className="text-lg md:text-xl text-dark-400 max-w-xl mx-auto mb-10 leading-relaxed">
            We're the Pomfret Nutrition Club — making nutrition accessible, fun, and performance-driven
            for students, athletes, and faculty alike.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/certafuel"
              className="btn-bounce inline-flex items-center bg-crimson-500 hover:bg-crimson-600 text-white font-semibold text-base px-7 py-3 rounded-md transition-colors duration-200"
            >
              Order from CertaFuel
            </Link>
            <a
              href="https://docs.google.com/forms/d/e/1FAIpQLSfi4ZBpX8CCXKujvJedAexCAnaVIKv0DSQJ2FD-CUm5jFHy_w/viewform"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-bounce inline-flex items-center bg-crimson-500 hover:bg-crimson-600 text-white font-semibold text-base px-7 py-3 rounded-md transition-colors duration-200"
            >
              Join the Club
            </a>
          </div>
        </div>
      </section>

      {/* ── Initiatives ──────────────────────────── */}
      <section className="px-6 py-20 bg-dark-50">
        <div className="max-w-6xl mx-auto">
          <Reveal>
            <div className="text-center mb-12">
              <span className="text-xs font-semibold uppercase tracking-widest text-crimson-500">
                What We Do
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-dark-900 mt-3 mb-3">
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
                <div className="bg-white rounded-lg p-7 shadow-[0_2px_12px_rgba(0,0,0,0.06)] border border-dark-200 hover:border-crimson-500 transition-colors duration-200 h-full flex flex-col">
                  <h3 className="text-xl font-bold text-dark-900 mb-2">
                    {item.title}
                  </h3>
                  <p className="text-dark-500 text-sm leading-relaxed flex-1 mb-5">
                    {item.description}
                  </p>
                  <Link
                    to={item.link}
                    className="text-sm font-semibold text-crimson-500 hover:text-crimson-600 transition-colors"
                  >
                    {item.linkText}
                  </Link>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Upcoming Events ──────────────────────── */}
      <section className="px-6 py-20 bg-white">
        <div className="max-w-4xl mx-auto">
          <Reveal>
            <div className="text-center mb-12">
              <span className="text-xs font-semibold uppercase tracking-widest text-crimson-500">
                Coming Up
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-dark-900 mt-3 mb-3">
                Upcoming Events
              </h2>
            </div>
          </Reveal>

          <div className="space-y-3">
            {UPCOMING_EVENTS.map((event, i) => (
              <Reveal key={event.title + event.date} delay={i * 80}>
                <div className="bg-white rounded-lg border border-dark-200 shadow-[0_2px_12px_rgba(0,0,0,0.06)] p-5 flex items-center gap-5 hover:border-crimson-500 transition-colors duration-200">
                  <div className="shrink-0 w-14 h-14 rounded-md bg-dark-900 text-white flex flex-col items-center justify-center">
                    <span className="text-[10px] font-medium text-dark-400">{event.day}</span>
                    <span className="text-lg font-bold leading-tight">{event.date.split(' ')[1]}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-0.5">
                      <h3 className="font-bold text-dark-900 truncate">{event.title}</h3>
                      <span className="text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded shrink-0 bg-crimson-50 text-crimson-500">
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

      {/* ── CTA ──────────────────────────────────── */}
      <section className="px-6 py-20 text-center bg-dark-800">
        <Reveal>
          <div className="max-w-2xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ color: '#F5F0EB' }}>
              Ready to Join the Team?
            </h2>
            <p className="text-dark-400 mb-8 text-lg">
              Whether you're an athlete looking for better fuel or just passionate about nutrition
              — there's a spot for you.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href="https://docs.google.com/forms/d/e/1FAIpQLSfi4ZBpX8CCXKujvJedAexCAnaVIKv0DSQJ2FD-CUm5jFHy_w/viewform"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-bounce inline-flex items-center bg-crimson-500 hover:bg-crimson-600 text-white font-semibold text-base px-7 py-3 rounded-md transition-colors duration-200"
              >
                Join the Club
              </a>
              <Link
                to="/about"
                className="btn-bounce inline-flex items-center bg-crimson-500 hover:bg-crimson-600 text-white font-semibold text-base px-7 py-3 rounded-md transition-colors duration-200"
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
