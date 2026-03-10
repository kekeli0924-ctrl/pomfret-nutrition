import Reveal from '../components/Reveal'

const ACTIVITIES = [
  {
    title: 'Cafeteria Menu Audits',
    description:
      'We review the weekly cafeteria menu and apply our color-coded label system so students can make informed choices.',
    tag: 'Weekly',
  },
  {
    title: 'Cooking Demos',
    description:
      'Hands-on sessions where we show students how to prepare quick, healthy meals and snacks with simple ingredients.',
    tag: 'Monthly',
  },
  {
    title: 'Guest Speaker Events',
    description:
      'Local nutritionists, college athletes, and coaches share their insights on performance nutrition and healthy living.',
    tag: 'Quarterly',
  },
  {
    title: 'Nutrition Myth Busters',
    description:
      'Interactive sessions where we debunk common nutrition myths — like "carbs are bad" or "you need supplements to be fit."',
    tag: 'Bi-weekly',
  },
  {
    title: 'Athlete Meal Prep Tutorials',
    description:
      'Step-by-step meal prep tutorials designed for student athletes — affordable, easy, and packed with performance fuel.',
    tag: 'Monthly',
  },
  {
    title: 'Nutrition Workshops',
    description:
      'Deep dives into topics like hydration, pre/post-game nutrition, reading food labels, and building balanced plates.',
    tag: 'Bi-weekly',
  },
  {
    title: 'CertaFuel Operations',
    description:
      'Every Wednesday and Friday, our crew runs CertaFuel — blending custom orders and serving performance packs.',
    tag: 'Game Days',
  },
  {
    title: 'Social Media & Outreach',
    description:
      'Creating content that makes nutrition fun and shareable — recipe posts, myth busts, athlete features, and more.',
    tag: 'Ongoing',
  },
]

const CALENDAR_EVENTS = [
  { month: 'March', events: [
    { date: '12', day: 'Wed', title: 'CertaFuel — Game Day', type: 'certafuel' },
    { date: '14', day: 'Fri', title: 'CertaFuel — Game Day', type: 'certafuel' },
    { date: '18', day: 'Tue', title: 'Nutrition Myth Busters: Protein Edition', type: 'workshop' },
    { date: '19', day: 'Wed', title: 'CertaFuel — Game Day', type: 'certafuel' },
    { date: '21', day: 'Fri', title: 'CertaFuel — Game Day', type: 'certafuel' },
    { date: '25', day: 'Tue', title: 'Athlete Meal Prep 101', type: 'workshop' },
  ]},
  { month: 'April', events: [
    { date: '2', day: 'Wed', title: 'CertaFuel — Game Day', type: 'certafuel' },
    { date: '4', day: 'Fri', title: 'CertaFuel — Game Day', type: 'certafuel' },
    { date: '8', day: 'Tue', title: 'Guest Speaker: Sports Nutrition', type: 'speaker' },
    { date: '15', day: 'Tue', title: 'Cooking Demo: Post-Game Recovery Meals', type: 'cooking' },
    { date: '22', day: 'Tue', title: 'Cafeteria Audit Review + New Labels', type: 'workshop' },
  ]},
]

const TYPE_STYLES = {
  certafuel: { dot: 'bg-crimson-500' },
  workshop: { dot: 'bg-dark-500' },
  speaker: { dot: 'bg-blue-500' },
  cooking: { dot: 'bg-yellow-500' },
}

export default function ActivitiesPage() {
  return (
    <div>
      {/* ── Hero ──────────────────────────────────── */}
      <section className="px-6 py-20 md:py-28 text-center bg-dark-800">
        <div style={{ animation: 'fadeSlideUp 0.6s ease-out' }}>
          <span className="text-xs font-semibold uppercase tracking-widest text-crimson-500">
            Get Involved
          </span>
          <h1 className="text-4xl md:text-5xl font-black mt-4 mb-4 tracking-tight" style={{ color: '#F5F0EB' }}>
            Activities & Events
          </h1>
          <p className="text-lg text-dark-400 max-w-xl mx-auto">
            From cooking demos to myth-busting sessions — here's everything our club does throughout the year.
          </p>
        </div>
      </section>

      {/* ── Activity Cards ────────────────────────── */}
      <section className="px-6 py-20 bg-dark-50">
        <div className="max-w-5xl mx-auto">
          <Reveal>
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-dark-900 mb-3">What We Do</h2>
              <p className="text-dark-500 max-w-lg mx-auto">
                Our activities span nutrition education, hands-on cooking, and running CertaFuel
              </p>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {ACTIVITIES.map((activity, i) => (
              <Reveal key={activity.title} delay={i * 70}>
                <div className="bg-white rounded-lg border border-dark-200 shadow-[0_2px_12px_rgba(0,0,0,0.06)] p-6 hover:border-crimson-500 transition-colors duration-200 h-full flex flex-col">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-[10px] font-semibold uppercase tracking-wider px-2.5 py-1 rounded bg-crimson-50 text-crimson-500">
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

      {/* ── Calendar ──────────────────────────────── */}
      <section className="px-6 py-20 bg-white">
        <div className="max-w-3xl mx-auto">
          <Reveal>
            <div className="text-center mb-12">
              <span className="text-xs font-semibold uppercase tracking-widest text-crimson-500">
                Mark Your Calendar
              </span>
              <h2 className="text-3xl font-bold text-dark-900 mt-3 mb-3">
                Upcoming Events
              </h2>
            </div>
          </Reveal>

          {CALENDAR_EVENTS.map((monthGroup) => (
            <div key={monthGroup.month} className="mb-10 last:mb-0">
              <Reveal>
                <h3 className="text-xl font-bold text-dark-900 mb-4">
                  {monthGroup.month}
                </h3>
              </Reveal>
              <div className="space-y-3">
                {monthGroup.events.map((event, i) => {
                  const style = TYPE_STYLES[event.type] || TYPE_STYLES.workshop
                  return (
                    <Reveal key={event.date + event.title} delay={i * 50}>
                      <div className="flex items-center gap-4 bg-dark-50 rounded-lg p-4 hover:bg-white hover:shadow-[0_2px_12px_rgba(0,0,0,0.06)] border border-transparent hover:border-dark-200 transition-all duration-200">
                        <div className="shrink-0 w-12 h-12 rounded-md bg-dark-900 text-white flex flex-col items-center justify-center">
                          <span className="text-[10px] font-medium text-dark-400">{event.day}</span>
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
            <div className="flex flex-wrap items-center gap-4 mt-8 text-xs text-dark-500 bg-dark-50 rounded-lg px-4 py-3">
              <span className="font-semibold text-dark-700">Legend:</span>
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
