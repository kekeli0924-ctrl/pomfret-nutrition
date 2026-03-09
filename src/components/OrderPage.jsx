import { useState } from 'react'
import GameDayBanner from './GameDayBanner'
import SmoothieBuilder from './SmoothieBuilder'
import SnackSelector from './SnackSelector'
import StudentInfo from './StudentInfo'
import { useGameDay } from '../hooks/useGameDay'

const STEPS = ['smoothie', 'snack', 'info']
const STEP_LABELS = ['Build Smoothie', 'Pick Snack', 'Your Info']

export default function OrderPage({ smoothie, onSmoothieChange, snack, onSnackChange, studentInfo, onStudentInfoChange, onSubmit, onBack }) {
  const [step, setStep] = useState(0)
  const [errors, setErrors] = useState([])
  const { fullDate } = useGameDay()

  const currentStep = STEPS[step]

  const validate = () => {
    const errs = []
    if (step === 0) {
      if (!smoothie.base) errs.push('Please select a base for your smoothie')
      if (smoothie.fruits.length === 0) errs.push('Please select at least one fruit')
    } else if (step === 1) {
      if (!snack) errs.push('Please select a pregame snack')
    } else if (step === 2) {
      if (!studentInfo.name.trim()) errs.push('Please enter your name')
      if (!studentInfo.grade) errs.push('Please select your grade')
      if (!studentInfo.team) errs.push('Please select your team')
    }
    setErrors(errs)
    return errs.length === 0
  }

  const handleNext = () => {
    if (!validate()) return
    if (step < STEPS.length - 1) {
      setStep(step + 1)
      setErrors([])
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  const handleBack = () => {
    if (step > 0) {
      setStep(step - 1)
      setErrors([])
    } else {
      onBack()
    }
  }

  const handleSubmit = () => {
    if (!validate()) return
    onSubmit()
  }

  return (
    <div className="min-h-dvh bg-dark-50 flex flex-col">
      <GameDayBanner />

      {/* Step indicator */}
      <div className="bg-white border-b border-dark-200 px-4 py-4">
        <div className="max-w-2xl mx-auto">
          {/* Progress bar */}
          <div className="flex items-center gap-2 mb-3">
            {STEPS.map((_, i) => (
              <div key={i} className="flex items-center flex-1">
                <div className={`h-1.5 w-full rounded-full transition-colors duration-300 ${
                  i <= step ? 'bg-crimson-500' : 'bg-dark-200'
                }`} />
              </div>
            ))}
          </div>

          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-dark-400">Step {step + 1} of {STEPS.length}</p>
              <p className="font-bold text-dark-900">{STEP_LABELS[step]}</p>
            </div>
            {fullDate && (
              <p className="text-xs text-dark-400">
                Ordering for <span className="text-crimson-600 font-semibold">{fullDate}</span>
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Step content */}
      <div className="flex-1 px-4 py-8">
        <div className="max-w-2xl mx-auto" style={{ animation: 'fadeSlideUp 0.3s ease-out' }}>
          {currentStep === 'smoothie' && (
            <SmoothieBuilder smoothie={smoothie} onChange={onSmoothieChange} />
          )}
          {currentStep === 'snack' && (
            <SnackSelector selectedSnack={snack} onSelect={onSnackChange} />
          )}
          {currentStep === 'info' && (
            <StudentInfo info={studentInfo} onChange={onStudentInfoChange} />
          )}

          {/* Validation errors */}
          {errors.length > 0 && (
            <div className="mt-6 bg-red-50 border border-red-200 rounded-xl p-4"
              style={{ animation: 'scaleIn 0.2s ease-out' }}
            >
              {errors.map((err, i) => (
                <p key={i} className="text-sm text-red-600 font-medium">
                  {err}
                </p>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Navigation buttons — sticky bottom */}
      <div className="sticky bottom-0 bg-white border-t border-dark-200 px-4 py-4">
        <div className="max-w-2xl mx-auto flex gap-3">
          <button
            onClick={handleBack}
            className="btn-bounce flex-1 bg-dark-100 hover:bg-dark-200 text-dark-700 font-semibold py-4 rounded-2xl transition-colors cursor-pointer border-0 text-sm"
          >
            {step === 0 ? '← Home' : '← Back'}
          </button>
          {step < STEPS.length - 1 ? (
            <button
              onClick={handleNext}
              className="btn-bounce flex-[2] bg-crimson-500 hover:bg-crimson-600 text-white font-bold py-4 rounded-2xl transition-all duration-200 cursor-pointer border-0 text-base shadow-lg shadow-crimson-500/20"
            >
              Continue →
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              className="btn-bounce flex-[2] bg-crimson-500 hover:bg-crimson-600 text-white font-bold py-4 rounded-2xl transition-all duration-200 cursor-pointer border-0 text-base shadow-lg shadow-crimson-500/20"
            >
              Submit Order 🎉
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
