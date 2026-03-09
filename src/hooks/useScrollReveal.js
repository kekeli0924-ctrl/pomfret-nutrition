import { useEffect, useRef, useState } from 'react'

/**
 * Hook that detects when an element enters the viewport.
 * Returns a ref to attach to the element and a boolean `visible`.
 * Once visible, stays visible (no re-hiding on scroll out).
 */
export function useScrollReveal(threshold = 0.15) {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          observer.unobserve(el) // only animate once
        }
      },
      { threshold }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [threshold])

  return { ref, visible }
}
