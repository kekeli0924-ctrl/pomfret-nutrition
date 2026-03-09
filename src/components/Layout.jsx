import { Outlet, Link } from 'react-router-dom'
import Navbar from './Navbar'

export default function Layout() {
  return (
    <div className="min-h-dvh flex flex-col">
      <Navbar />

      {/* Main content — offset for fixed navbar */}
      <main className="flex-1 pt-16">
        <Outlet />
      </main>

      {/* Site-wide footer */}
      <footer className="bg-dark-900 text-dark-400">
        <div className="max-w-6xl mx-auto px-6 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            {/* Brand */}
            <div className="md:col-span-1">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-2xl">🥗</span>
                <span className="text-xl font-black text-white tracking-tight">
                  Pomfret <span className="text-crimson-400">Nutrition</span>
                </span>
              </div>
              <p className="text-sm text-dark-500 leading-relaxed">
                Pomfret Nutrition Club — fueling athletes and building healthy habits across campus.
              </p>
            </div>

            {/* Quick links */}
            <div>
              <h4 className="text-white font-semibold text-sm mb-3">Quick Links</h4>
              <div className="flex flex-col gap-2">
                {['/', '/about', '/activities', '/smoothie-bar', '/join'].map((path) => (
                  <Link
                    key={path}
                    to={path}
                    className="text-sm text-dark-500 hover:text-white transition-colors"
                  >
                    {path === '/' ? 'Home' : path.slice(1).replace('-', ' ').replace(/\b\w/g, (c) => c.toUpperCase())}
                  </Link>
                ))}
              </div>
            </div>

            {/* Programs */}
            <div>
              <h4 className="text-white font-semibold text-sm mb-3">Programs</h4>
              <div className="flex flex-col gap-2 text-sm text-dark-500">
                <span>Nutrition Labels</span>
                <span>Performance Packs</span>
                <span>Smoothie Bar</span>
                <span>Cooking Demos</span>
              </div>
            </div>

            {/* Game days */}
            <div>
              <h4 className="text-white font-semibold text-sm mb-3">Smoothie Bar</h4>
              <div className="text-sm text-dark-500 space-y-2">
                <p>Game Days: <span className="text-crimson-300 font-semibold">Wed & Fri</span></p>
                <p>Orders close at <span className="text-crimson-400 font-semibold">10:00 AM</span></p>
                <Link
                  to="/smoothie-bar"
                  className="inline-flex items-center gap-1 text-crimson-400 hover:text-crimson-200 font-semibold transition-colors"
                >
                  Order Now →
                </Link>
              </div>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="border-t border-dark-800 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
            <p className="text-xs text-dark-600">
              Pomfret Nutrition Club — Fueling Student Athletes
            </p>
            <Link
              to="/admin"
              className="text-xs text-dark-700 hover:text-dark-400 transition-colors"
            >
              Admin Dashboard
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
