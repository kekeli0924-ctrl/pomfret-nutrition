import { useState, useCallback } from 'react'
import GameDayBanner from '../components/GameDayBanner'
import SmoothieBuilder from '../components/SmoothieBuilder'
import SnackSelector from '../components/SnackSelector'
import StudentInfo from '../components/StudentInfo'
import Confirmation from '../components/Confirmation'
import { POPULAR_COMBOS, BASES, FRUITS, BOOSTERS } from '../data/menu'
import Reveal from '../components/Reveal'

const EMPTY_SMOOTHIE = { base: '', fruits: [], boosters: [], customName: '' }
const EMPTY_INFO = { name: '', grade: '', team: '' }

const STEPS = ['smoothie', 'snack', 'info']
const STEP_LABELS = ['Build Smoothie', 'Pick Snack', 'Your Info']

export default function SmoothieBarPage({ orders, addOrder, gameDay }) {
  // ── Order state ─────────────────────────────────────
  const [mode, setMode] = useState('landing') // landing | ordering | confirmation
  const [step, setStep] = useState(0)
  const [smoothie, setSmoothie] = useState(EMPTY_SMOOTHIE)
  const [snack, setSnack] = useState('')
  const [studentInfo, setStudentInfo] = useState(EMPTY_INFO)
  const [lastOrder, setLastOrder] = useState(null)
  const [errors, setErrors] = useState([])

  const { isOpen, fullDate } = gameDay

  const allItems = [...BASES, ...FRUITS, ...BOOSTERS]
  const findItem = (id) => allItems.find((i) => i.id === id)

  // ── Reset ───────────────────────────────────────────
  const resetOrder = useCallback(() => {
    setSmoothie(EMPTY_SMOOTHIE)
    setSnack('')
    setStudentInfo(EMPTY_INFO)
    setLastOrder(null)
    setStep(0)
    setErrors([])
  }, [])

  // ── Start ordering ──────────────────────────────────
  const handleStartOrder = useCallback(() => {
    resetOrder()
    setMode('ordering')
  }, [resetOrder])

  // ── Apply a preset combo ────────────────────────────
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

  // ── Validation ──────────────────────────────────────
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
              <SmoothieBuilder smoothie={smoothie} onChange={setSmoothie} />
            )}
            {currentStep === 'snack' && (
              <SnackSelector selectedSnack={snack} onSelect={setSnack} />
            )}
            {currentStep === 'info' && (
              <StudentInfo info={studentInfo} onChange={setStudentInfo} />
            )}

            {/* Validation errors */}
            {errors.length > 0 && (
              <div className="mt-6 bg-red-50 border border-red-200 rounded-xl p-4"
                style={{ animation: 'scaleIn 0.2s ease-out' }}
              >
                {errors.map((err, i) => (
                  <p key={i} className="text-sm text-red-600 font-medium">{err}</p>
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
              {step === 0 ? '← Back' : '← Back'}
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

  // ── Smoothie Bar Landing ───────────────────────────
  return (
    <div>
      <GameDayBanner />

      {/* Hero */}
      <section
        className="px-6 py-20 md:py-28 text-center"
        style={{
          background: 'linear-gradient(135deg, #0E2034 0%, #192D44 50%, #1A1520 100%)',
        }}
      >
        <div style={{ animation: 'fadeSlideUp 0.6s ease-out' }}>
          <div className="text-6xl mb-4">🥤</div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-white tracking-tight mb-3">
            Pomfret <span className="text-crimson-400">Nutrition</span>
          </h1>
          <p className="text-xl text-crimson-300 font-semibold mb-2">
            Smoothie Bar & Pregame Snacks
          </p>
          <p className="text-dark-400 max-w-md mx-auto mb-8">
            Build a custom smoothie, pick a pregame snack, and fuel up for game day
          </p>

          {isOpen ? (
            <button
              onClick={handleStartOrder}
              className="btn-bounce inline-flex items-center gap-2 bg-crimson-500 hover:bg-crimson-600 text-white font-bold text-lg px-8 py-4 rounded-2xl transition-all duration-200 cursor-pointer shadow-lg shadow-crimson-500/30 hover:shadow-crimson-500/50 hover:-translate-y-0.5 border-0"
            >
              Start Your Order
              <span className="text-xl">→</span>
            </button>
          ) : (
            <div className="bg-dark-800/80 border border-dark-600 rounded-2xl px-8 py-4 text-dark-300 inline-block">
              <p className="font-semibold text-lg">Ordering is currently closed</p>
              <p className="text-sm mt-1">Check back before the next game day!</p>
            </div>
          )}

          {fullDate && isOpen && (
            <p className="text-dark-400 text-sm mt-4">
              Ordering for <span className="text-crimson-300 font-semibold">{fullDate}</span>
            </p>
          )}
        </div>
      </section>

      {/* Popular Combos */}
      <section className="px-6 py-16 bg-dark-50">
        <div className="max-w-4xl mx-auto">
          <Reveal>
            <h2 className="text-3xl font-bold text-center text-dark-900 mb-2">Popular Combos</h2>
            <p className="text-center text-dark-500 mb-10">One-click favorites to get you started</p>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {POPULAR_COMBOS.map((combo, i) => (
              <Reveal key={combo.id} delay={i * 100}>
                <div
                  className="bg-white rounded-2xl p-6 border border-dark-200 hover:border-crimson-400 hover:shadow-lg transition-all duration-200 cursor-pointer group h-full flex flex-col"
                  onClick={() => { if (isOpen) handleApplyCombo(combo) }}
                >
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-bold uppercase tracking-wider text-crimson-600 bg-crimson-50 px-3 py-1 rounded-full">
                      {combo.badge}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-dark-900 mb-1">{combo.name}</h3>
                  <p className="text-sm text-dark-500 mb-4 flex-1">{combo.description}</p>

                  <div className="flex flex-wrap gap-1.5">
                    {[combo.base, ...combo.fruits, ...combo.boosters].map((itemId) => {
                      const item = findItem(itemId)
                      return item ? (
                        <span key={itemId} className="text-xs bg-dark-100 text-dark-600 px-2 py-1 rounded-full">
                          {item.emoji} {item.name}
                        </span>
                      ) : null
                    })}
                  </div>

                  {isOpen && (
                    <div className="mt-4 text-sm font-semibold text-crimson-500 group-hover:text-crimson-600 transition-colors">
                      Select this combo →
                    </div>
                  )}
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="px-6 py-16 bg-white">
        <div className="max-w-4xl mx-auto">
          <Reveal>
            <h2 className="text-3xl font-bold text-center text-dark-900 mb-10">How It Works</h2>
          </Reveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            {[
              { step: '1', icon: '🍹', title: 'Build Your Smoothie', desc: 'Pick your base, fruits, and boosters' },
              { step: '2', icon: '🥪', title: 'Choose a Snack', desc: 'Select a pregame snack to fuel up' },
              { step: '3', icon: '✅', title: 'Pick Up on Game Day', desc: 'Grab your order at the smoothie bar' },
            ].map((s, i) => (
              <Reveal key={s.step} delay={i * 100}>
                <div className="flex flex-col items-center">
                  <div className="w-16 h-16 rounded-2xl bg-crimson-50 flex items-center justify-center text-3xl mb-4">
                    {s.icon}
                  </div>
                  <h3 className="font-bold text-lg text-dark-900 mb-1">{s.title}</h3>
                  <p className="text-dark-500 text-sm">{s.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Game Day Info */}
      <section className="px-6 py-16 bg-dark-50">
        <div className="max-w-2xl mx-auto text-center">
          <Reveal>
            <div className="bg-white rounded-2xl border border-dark-200 p-8">
              <div className="text-4xl mb-4">📅</div>
              <h2 className="text-2xl font-bold text-dark-900 mb-3">Game Day Schedule</h2>
              <div className="space-y-3 text-left max-w-sm mx-auto">
                <div className="flex items-center gap-3 text-sm">
                  <span className="w-3 h-3 bg-crimson-500 rounded-full shrink-0" />
                  <span className="text-dark-700"><strong>Wednesday & Friday</strong> — Smoothie bar is open</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <span className="w-3 h-3 bg-crimson-400 rounded-full shrink-0" />
                  <span className="text-dark-700"><strong>10:00 AM cutoff</strong> — Orders close at 10 AM on game day</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <span className="w-3 h-3 bg-dark-400 rounded-full shrink-0" />
                  <span className="text-dark-700"><strong>Pickup</strong> — Grab your order at the smoothie bar before your game</span>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  )
}
