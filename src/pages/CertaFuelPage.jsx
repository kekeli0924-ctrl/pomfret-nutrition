import { useState, useCallback } from 'react'
import GameDayBanner from '../components/GameDayBanner'
import SmoothieBuilder from '../components/SmoothieBuilder'
import SnackSelector from '../components/SnackSelector'
import StudentInfo from '../components/StudentInfo'
import Confirmation from '../components/Confirmation'
import { POPULAR_COMBOS, BASES, FRUITS, BOOSTERS } from '../data/menu'

const EMPTY_SMOOTHIE = { base: '', fruits: [], boosters: [], customName: '' }
const EMPTY_INFO = { name: '', grade: '', team: '' }

const STEPS = ['smoothie', 'snack', 'info']
const STEP_LABELS = ['Build Smoothie', 'Pick Snack', 'Your Info']

export default function CertaFuelPage({ orders, addOrder, gameDay }) {
  const [mode, setMode] = useState('landing')
  const [step, setStep] = useState(0)
  const [smoothie, setSmoothie] = useState(EMPTY_SMOOTHIE)
  const [snack, setSnack] = useState('')
  const [studentInfo, setStudentInfo] = useState(EMPTY_INFO)
  const [lastOrder, setLastOrder] = useState(null)
  const [errors, setErrors] = useState([])

  const { isOpen, fullDate } = gameDay

  const allItems = [...BASES, ...FRUITS, ...BOOSTERS]
  const findItem = (id) => allItems.find((i) => i.id === id)

  const resetOrder = useCallback(() => {
    setSmoothie(EMPTY_SMOOTHIE)
    setSnack('')
    setStudentInfo(EMPTY_INFO)
    setLastOrder(null)
    setStep(0)
    setErrors([])
  }, [])

  const handleStartOrder = useCallback(() => {
    resetOrder()
    setMode('ordering')
  }, [resetOrder])

  const handleApplyCombo = useCallback((combo) => {
    setSmoothie({
      base: combo.base,
      fruits: [...combo.fruits],
      boosters: [...combo.boosters],
      customName: combo.name,
    })
    setSnack('')
    setStudentInfo(EMPTY_INFO)
    setStep(0)
    setErrors([])
    setMode('ordering')
  }, [])

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
      setMode('landing')
    }
  }

  const handleSubmit = async () => {
    if (!validate()) return
    const order = await addOrder({
      smoothie,
      snack,
      studentInfo,
      gameDay: fullDate || 'Next game day',
    })
    setLastOrder(order)
    setMode('confirmation')
  }

  // ── Confirmation view ──────────────────────────────
  if (mode === 'confirmation' && lastOrder) {
    return (
      <Confirmation
        order={lastOrder}
        onNewOrder={() => {
          resetOrder()
          setMode('landing')
        }}
      />
    )
  }

  // ── Order flow (3 steps) ───────────────────────────
  if (mode === 'ordering') {
    const currentStep = STEPS[step]
    return (
      <div className="min-h-dvh bg-dark-50 flex flex-col">
        <GameDayBanner />

        {/* Step indicator */}
        <div className="bg-white border-b border-dark-200 px-4 py-4">
          <div className="max-w-2xl mx-auto">
            <div className="flex items-center gap-2 mb-3">
              {STEPS.map((_, i) => (
                <div key={i} className="flex items-center flex-1">
                  <div className={`h-1 w-full rounded-full transition-colors duration-300 ${
                    i <= step ? 'bg-crimson-500' : 'bg-dark-200'
                  }`} />
                </div>
              ))}
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-dark-500">Step {step + 1} of {STEPS.length}</p>
                <p className="font-bold text-dark-900">{STEP_LABELS[step]}</p>
              </div>
              {fullDate && (
                <p className="text-xs text-dark-500">
                  Ordering for <span className="text-crimson-500 font-semibold">{fullDate}</span>
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Step content */}
        <div className="flex-1 px-4 py-8">
          <div className="max-w-2xl mx-auto" style={{ animation: 'fadeSlideUp 0.3s ease-out' }}>
            {currentStep === 'smoothie' && (
              <SmoothieBuilder smoothie={smoothie} onChange={setSmoothie} />
            )}
            {currentStep === 'snack' && (
              <SnackSelector selectedSnack={snack} onSelect={setSnack} />
            )}
            {currentStep === 'info' && (
              <StudentInfo info={studentInfo} onChange={setStudentInfo} />
            )}

            {errors.length > 0 && (
              <div className="mt-6 bg-red-50 border border-red-200 rounded-lg p-4"
                style={{ animation: 'scaleIn 0.2s ease-out' }}
              >
                {errors.map((err, i) => (
                  <p key={i} className="text-sm text-red-600 font-medium">{err}</p>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Navigation — sticky bottom */}
        <div className="sticky bottom-0 bg-white border-t border-dark-200 px-4 py-4">
          <div className="max-w-2xl mx-auto flex gap-3">
            <button
              onClick={handleBack}
              className="btn-bounce flex-1 bg-dark-100 hover:bg-dark-200 text-dark-700 font-semibold py-3 rounded-md transition-colors cursor-pointer border-0 text-sm"
            >
              Back
            </button>
            {step < STEPS.length - 1 ? (
              <button
                onClick={handleNext}
                className="btn-bounce flex-[2] bg-crimson-500 hover:bg-crimson-600 text-white font-semibold py-3 rounded-md transition-colors duration-200 cursor-pointer border-0 text-base"
              >
                Continue
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                className="btn-bounce flex-[2] bg-crimson-500 hover:bg-crimson-600 text-white font-semibold py-3 rounded-md transition-colors duration-200 cursor-pointer border-0 text-base"
              >
                Submit Order
              </button>
            )}
          </div>
        </div>
      </div>
    )
  }

  // ── CertaFuel Landing — minimal centered splash ────
  return (
    <div
      className="flex items-center justify-center px-6"
      style={{ minHeight: 'calc(100dvh - 4rem)', background: '#F5F0EB' }}
    >
      <div className="text-center" style={{ animation: 'fadeSlideUp 0.6s ease-out' }}>
        {/* Wordmark */}
        <h1
          className="inline-block relative"
          style={{
            fontFamily: 'var(--font-montserrat)',
            fontWeight: 800,
            fontSize: 'clamp(40px, 8vw, 56px)',
            color: '#1A1A1A',
            lineHeight: 1.1,
          }}
        >
          CertaFuel
          {/* Red underline accent */}
          <span
            className="absolute left-0 right-0"
            style={{ bottom: '-6px', height: '4px', background: '#C41E3A' }}
          />
        </h1>

        {/* Divider */}
        <div
          className="mx-auto"
          style={{ width: '40px', height: '1px', background: '#CCCCCC', margin: '20px auto 14px' }}
        />

        {/* Descriptor */}
        <p
          style={{
            fontFamily: 'var(--font-montserrat)',
            fontWeight: 600,
            fontSize: '10px',
            letterSpacing: '6px',
            textTransform: 'uppercase',
            color: '#8A8A8A',
          }}
        >
          Pomfret School Nutrition
        </p>

        {/* Order Now button */}
        <div style={{ marginTop: '32px' }}>
          <button
            onClick={handleStartOrder}
            style={{
              display: 'inline-block',
              background: '#C41E3A',
              color: '#FFFFFF',
              fontFamily: 'var(--font-montserrat)',
              fontWeight: 600,
              fontSize: '13px',
              letterSpacing: '2px',
              textTransform: 'uppercase',
              padding: '14px 36px',
              borderRadius: '6px',
              border: 'none',
              cursor: 'pointer',
              transition: 'background 0.2s ease',
            }}
            onMouseEnter={(e) => { e.currentTarget.style.background = '#9B1B30' }}
            onMouseLeave={(e) => { e.currentTarget.style.background = '#C41E3A' }}
          >
            Order Now
          </button>
        </div>
      </div>
    </div>
  )
}
