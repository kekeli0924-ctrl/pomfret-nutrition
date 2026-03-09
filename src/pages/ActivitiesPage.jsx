import Reveal from '../components/Reveal'

// ─── Activities & events data ──────────────────────────
const ACTIVITIES = [
  {
    icon: '🏷️',
    title: 'Cafeteria Menu Audits',
    description:
      'We review the weekly cafeteria menu and apply our color-coded label system so students can make informed choices.',
    tag: 'Weekly',
    tagColor: 'green',
  },
  {
    icon: '🍳',
    title: 'Cooking Demos',
    description:
      'Hands-on sessions where we show students how to prepare quick, healthy meals and snacks with simple ingredients.',
    tag: 'Monthly',
    tagColor: 'orange',
  },
  {
    icon: '🎤',
    title: 'Guest Speaker Events',
    description:
      'Local nutritionists, college athletes, and coaches share their insights on performance nutrition and healthy living.',
    tag: 'Quarterly',
    tagColor: 'orange',
  },
  {
    icon: '💡',
    title: 'Nutrition Myth Busters',
    description:
      'Interactive sessions where we debunk common nutrition myths — like "carbs are bad" or "you need supplements to be fit."',
    tag: 'Bi-weekly',
    tagColor: 'green',
  },
  {
    icon: '🥘',
    title: 'Athlete Meal Prep Tutorials',
    description:
      'Step-by-step meal prep tutorials designed for student athletes — affordable, easy, and packed with performance fuel.',
    tag: 'Monthly',
    tagColor: 'orange',
  },
  {
    icon: '📊',
    title: 'Nutrition Workshops',
    description:
      'Deep dives into topics like hydration, pre/post-game nutrition, reading food labels, and building balanced plates.',
    tag: 'Bi-weekly',
    tagColor: 'green',
  },
  {
    icon: '🥤',
    title: 'Smoothie Bar Operations',
    description:
      'Every Wednesday and Friday, our crew runs the smoothie bar — blending custom orders and serving performance packs.',
    tag: 'Game Days',
    tagColor: 'green',
  },
  {
    icon: '📸',
    title: 'Social Media & Outreach',
    description:
      'Creating content that makes nutrition fun and shareable — recipe posts, myth busts, athlete features, and more.',
    tag: 'Ongoing',
    tagColor: 'orange',
  },
]

// ─── Upcoming calendar events ──────────────────────────
const CALENDAR_EVENTS = [
  { month: 'March', events: [
    { date: '12', day: 'Wed', title: 'Smoothie Bar — Game Day', type: 'smoothie' },
    { date: '14', day: 'Fri', title: 'Smoothie Bar — Game Day', type: 'smoothie' },
    { date: '18', day: 'Tue', title: 'Nutrition Myth Busters: Protein Edition', type: 'workshop' },
    { date: '19', day: 'Wed', title: 'Smoothie Bar — Game Day', type: 'smoothie' },
    { date: '21', day: 'Fri', title: 'Smoothie Bar — Game Day', type: 'smoothie' },
    { date: '25', day: 'Tue', title: 'Athlete Meal Prep 101', type: 'workshop' },
  ]},
  { month: 'April', events: [
    { date: '2', day: 'Wed', title: 'Smoothie Bar — Game Day', type: 'smoothie' },
    { date: '4', day: 'Fri', title: 'Smoothie Bar — Game Day', type: 'smoothie' },
    { date: '8', day: 'Tue', title: 'Guest Speaker: Sports Nutrition', type: 'speaker' },
    { date: '15', day: 'Tue', title: 'Cooking Demo: Post-Game Recovery Meals', type: 'cooking' },
    { date: '22', day: 'Tue', title: 'Cafeteria Audit Review + New Labels', type: 'workshop' },
  ]},
]

const TYPE_STYLES = {
  smoothie: { bg: 'bg-crimson-50', text: 'text-crimson-600', dot: 'bg-crimson-500' },
  workshop: { bg: 'bg-dark-100', text: 'text-dark-600', dot: 'bg-dark-500' },
  speaker: { bg: 'bg-blue-50', text: 'text-blue-600', dot: 'bg-blue-500' },
  cooking: { bg: 'bg-yellow-50', text: 'text-yellow-700', dot: 'bg-yellow-500' },
}

export default function ActivitiesPage() {
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
            Get Involved
          </span>
          <h1 className="text-4xl md:text-5xl font-black text-white mt-4 mb-4 tracking-tight">
            Activities & Events
          </h1>
          <p className="text-lg text-dark-400 max-w-xl mx-auto">
            From cooking demos to myth-busting sessions — here's everything our club does throughout the year.
          </p>
        </div>
      </section>

      {/* ── Activity Cards Grid ────────────────────── */}
      <section className="px-6 py-20 bg-dark-50">
        <div className="max-w-5xl mx-auto">
          <Reveal>
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-dark-900 mb-3">What We Do</h2>
              <p className="text-dark-500 max-w-lg mx-auto">
                Our activities span nutrition education, hands-on cooking, and running the smoothie bar
              </p>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {ACTIVITIES.map((activity, i) => (
              <Reveal key={activity.title} delay={i * 70}>
                <div className="bg-white rounded-2xl border border-dark-200 p-6 hover:border-crimson-300 hover:shadow-lg transition-all duration-200 h-full flex flex-col">
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 rounded-xl bg-crimson-50 flex items-center justify-center text-2xl">
                      {activity.icon}
                    </div>
                    <span
                      className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full ${
                        activity.tagColor === 'green'
                          ? 'bg-crimson-50 text-crimson-600'
                          : 'bg-dark-100 text-dark-600'
                      }`}
                    >
                      {activity.tag}
                    </span>
                  </div>
                  <h3 className="font-bold text-dark-900 mb-2">{activity.title}</h3>
                  <p className="text-sm text-dark-500 leading-relaxed flex-1">
                    {activity.description}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Upcoming Events Calendar ────────────────── */}
      <section className="px-6 py-20 bg-white">
        <div className="max-w-3xl mx-auto">
          <Reveal>
            <div className="text-center mb-12">
              <span className="text-xs font-bold uppercase tracking-widest text-crimson-600 bg-crimson-50 px-3 py-1.5 rounded-full">
                Mark Your Calendar
              </span>
              <h2 className="text-3xl font-bold text-dark-900 mt-4 mb-3">
                Upcoming Events
              </h2>
            </div>
          </Reveal>

          {CALENDAR_EVENTS.map((monthGroup) => (
            <div key={monthGroup.month} className="mb-10 last:mb-0">
              <Reveal>
                <h3 className="text-xl font-bold text-dark-900 mb-4 flex items-center gap-2">
                  📅 {monthGroup.month}
                </h3>
              </Reveal>
              <div className="space-y-3">
                {monthGroup.events.map((event, i) => {
                  const style = TYPE_STYLES[event.type] || TYPE_STYLES.workshop
                  return (
                    <Reveal key={event.date + event.title} delay={i * 50}>
                      <div className="flex items-center gap-4 bg-dark-50 rounded-xl p-4 hover:bg-white hover:shadow-sm hover:border-dark-200 border border-transparent transition-all duration-200">
                        <div className="shrink-0 w-12 h-12 rounded-lg bg-dark-900 text-white flex flex-col items-center justify-center">
                          <span className="text-[10px] font-semibold text-dark-400">{event.day}</span>
                          <span className="text-sm font-bold leading-tight">{event.date}</span>
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-semibold text-dark-900 text-sm truncate">{event.title}</p>
                        </div>
                        <span className={`w-2.5 h-2.5 rounded-full ${style.dot} shrink-0`} />
                      </div>
                    </Reveal>
                  )
                })}
              </div>
            </div>
          ))}

          {/* Legend */}
          <Reveal>
            <div className="flex flex-wrap items-center gap-4 mt-8 text-xs text-dark-500 bg-dark-50 rounded-xl px-4 py-3">
              <span className="font-semibold text-dark-600">Legend:</span>
              <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-crimson-500" /> Game Day</span>
              <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-dark-500" /> Workshop</span>
              <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-blue-500" /> Speaker</span>
              <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-yellow-500" /> Cooking</span>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  )
}
