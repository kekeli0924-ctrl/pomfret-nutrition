import { useState, useEffect } from 'react'
import { NavLink, useLocation } from 'react-router-dom'

const NAV_LINKS = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About' },
  { to: '/nutrition-labels', label: 'Nutrition Labels' },
  { to: '/activities', label: 'Activities' },
  { to: '/certafuel', label: 'CertaFuel' },
  { to: '/join', label: 'Join Us' },
]

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const location = useLocation()

  useEffect(() => {
    setMenuOpen(false)
  }, [location.pathname])

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-200 ${
        scrolled
          ? 'bg-white shadow-[0_1px_6px_rgba(0,0,0,0.06)]'
          : 'bg-white'
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <NavLink to="/" className="shrink-0">
            <span className="text-xl font-black text-dark-900 tracking-widest uppercase font-heading">
              Pomfret <span className="text-crimson-500">Nutrition</span>
            </span>
          </NavLink>

          {/* Desktop nav links */}
          <div className="hidden md:flex items-center gap-1">
            {NAV_LINKS.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.to === '/'}
                className={({ isActive }) =>
                  `px-4 py-2 text-xs font-semibold uppercase tracking-wider transition-colors duration-200 ${
                    isActive
                      ? 'text-crimson-500'
                      : 'text-dark-500 hover:text-dark-900'
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
          </div>

          {/* Desktop CTA */}
          <NavLink
            to="/certafuel"
            className="hidden md:inline-flex items-center bg-crimson-500 hover:bg-crimson-600 text-white font-semibold text-xs uppercase tracking-wider px-5 py-2.5 rounded-md transition-colors duration-200"
          >
            Order Now
          </NavLink>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden flex flex-col gap-1.5 p-2 cursor-pointer bg-transparent border-0"
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
          >
            <span
              className={`block w-6 h-0.5 bg-dark-900 transition-all duration-300 ${
                menuOpen ? 'rotate-45 translate-y-2' : ''
              }`}
            />
            <span
              className={`block w-6 h-0.5 bg-dark-900 transition-all duration-300 ${
                menuOpen ? 'opacity-0' : ''
              }`}
            />
            <span
              className={`block w-6 h-0.5 bg-dark-900 transition-all duration-300 ${
                menuOpen ? '-rotate-45 -translate-y-2' : ''
              }`}
            />
          </button>
        </div>
      </div>

      {/* Mobile overlay */}
      {menuOpen && (
        <div
          className="md:hidden fixed inset-0 top-16 bg-black/20 z-40"
          onClick={() => setMenuOpen(false)}
        />
      )}

      {/* Mobile menu panel */}
      <div
        className={`md:hidden fixed top-16 right-0 w-72 h-[calc(100dvh-4rem)] bg-white z-50 shadow-[0_2px_12px_rgba(0,0,0,0.06)] transition-transform duration-300 ease-out ${
          menuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex flex-col p-6 gap-1">
          {NAV_LINKS.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.to === '/'}
              className={({ isActive }) =>
                `px-4 py-3 text-sm font-semibold uppercase tracking-wider transition-colors duration-200 ${
                  isActive
                    ? 'text-crimson-500'
                    : 'text-dark-500 hover:text-dark-900'
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}

          <div className="mt-4 pt-4 border-t border-dark-200">
            <NavLink
              to="/certafuel"
              className="flex items-center justify-center bg-crimson-500 hover:bg-crimson-600 text-white font-semibold text-sm uppercase tracking-wider py-3 rounded-md transition-colors duration-200"
            >
              Order Now
            </NavLink>
          </div>
        </div>
      </div>
    </nav>
  )
}
