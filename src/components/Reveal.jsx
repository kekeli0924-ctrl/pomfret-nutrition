import { useScrollReveal } from '../hooks/useScrollReveal'

/**
 * Wrapper component that animates children into view on scroll.
 * Supports different animation directions.
 * @param {'up'|'down'|'left'|'right'|'scale'} direction
 * @param {number} delay — delay in ms before animation starts
 */
export default function Reveal({
  children,
  direction = 'up',
  delay = 0,
  className = '',
  threshold = 0.15,
}) {
  const { ref, visible } = useScrollReveal(threshold)

  const transforms = {
    up: 'translateY(30px)',
    down: 'translateY(-30px)',
    left: 'translateX(30px)',
    right: 'translateX(-30px)',
    scale: 'scale(0.95)',
  }

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'none' : transforms[direction],
        transition: `opacity 0.6s ease-out ${delay}ms, transform 0.6s ease-out ${delay}ms`,
      }}
    >
      {children}
    </div>
  )
}
