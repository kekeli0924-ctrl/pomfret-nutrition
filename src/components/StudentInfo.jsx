import { GRADES, TEAMS } from '../data/menu'

export default function StudentInfo({ info, onChange }) {
  const update = (field) => (e) => onChange({ ...info, [field]: e.target.value })

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-dark-900">Your Info</h2>
        <p className="text-dark-500 text-sm mt-1">So we know who to make this for!</p>
      </div>

      <div className="max-w-md mx-auto space-y-4">
        {/* Name */}
        <div>
          <label className="block text-sm font-semibold text-dark-700 mb-1.5">
            Your Name <span className="text-crimson-500">*</span>
          </label>
          <input
            type="text"
            value={info.name}
            onChange={update('name')}
            placeholder="First and last name"
            className="w-full px-4 py-3 rounded-md border border-dark-200 bg-white focus:border-crimson-500 focus:outline-none transition-colors text-sm"
          />
        </div>

        {/* Grade */}
        <div>
          <label className="block text-sm font-semibold text-dark-700 mb-1.5">
            Grade <span className="text-crimson-500">*</span>
          </label>
          <select
            value={info.grade}
            onChange={update('grade')}
            className="w-full px-4 py-3 rounded-md border border-dark-200 bg-white focus:border-crimson-500 focus:outline-none transition-colors text-sm cursor-pointer"
          >
            <option value="">Select your grade</option>
            {GRADES.map((g) => (
              <option key={g} value={g}>{g}</option>
            ))}
          </select>
        </div>

        {/* Team */}
        <div>
          <label className="block text-sm font-semibold text-dark-700 mb-1.5">
            Team <span className="text-crimson-500">*</span>
          </label>
          <select
            value={info.team}
            onChange={update('team')}
            className="w-full px-4 py-3 rounded-md border border-dark-200 bg-white focus:border-crimson-500 focus:outline-none transition-colors text-sm cursor-pointer"
          >
            <option value="">Select your team</option>
            {TEAMS.map((t) => (
              <option key={t} value={t}>{t}</option>
            ))}
          </select>
        </div>
      </div>
    </div>
  )
}
