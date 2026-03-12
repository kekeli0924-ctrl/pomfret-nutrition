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
      <footer className="bg-dark-800 text-dark-400">
        <div className="max-w-6xl mx-auto px-6 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            {/* Brand */}
            <div className="md:col-span-1">
              <div className="mb-3">
                <span className="text-lg font-black tracking-widest uppercase font-heading" style={{ color: '#F5F0EB' }}>
                  Pomfret <span className="text-crimson-500">Nutrition</span>
                </span>
              </div>
              <p className="text-sm text-dark-500 leading-relaxed">
                Pomfret Nutrition Club — fueling athletes and building healthy habits across campus.
              </p>
            </div>

            {/* Quick links */}
            <div>
              <h4 className="font-semibold text-sm mb-3" style={{ color: '#F5F0EB' }}>Quick Links</h4>
              <div className="flex flex-col gap-2">
                {[['/', 'Home'], ['/about', 'About'], ['/activities', 'Activities'], ['/certafuel', 'CertaFuel']].map(([path, label]) => (
                  <Link
                    key={path}
                    to={path}
                    className="text-sm text-dark-500 hover:text-dark-300 transition-colors"
                  >
                    {label}
                  </Link>
                ))}
                <a
                  href="https://docs.google.com/forms/d/e/1FAIpQLSfi4ZBpX8CCXKujvJedAexCAnaVIKv0DSQJ2FD-CUm5jFHy_w/viewform"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-dark-500 hover:text-dark-300 transition-colors"
                >
                  Join Us
                </a>
              </div>
            </div>

            {/* Programs */}
            <div>
              <h4 className="font-semibold text-sm mb-3" style={{ color: '#F5F0EB' }}>Programs</h4>
              <div className="flex flex-col gap-2 text-sm text-dark-500">
                <span>Nutrition Labels</span>
                <span>Performance Packs</span>
                <span>CertaFuel</span>
                <span>Cooking Demos</span>
              </div>
            </div>

            {/* CertaFuel info */}
            <div>
              <h4 className="font-semibold text-sm mb-3" style={{ color: '#F5F0EB' }}>CertaFuel</h4>
              <div className="text-sm text-dark-500 space-y-2">
                <p>Game Days: <span className="text-crimson-500 font-semibold">Wed & Fri</span></p>
                <p>Orders close at <span className="text-crimson-500 font-semibold">10:00 AM</span></p>
                <Link
                  to="/certafuel"
                  className="inline-flex items-center gap-1 text-crimson-500 hover:text-crimson-400 font-semibold transition-colors"
                >
                  Order Now
                </Link>
              </div>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="border-t border-dark-700 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
            <p className="text-xs text-dark-600">
              Pomfret Nutrition Club
            </p>
            <Link
              to="/admin"
              className="text-xs text-dark-600 hover:text-dark-400 transition-colors"
            >
              Admin Dashboard
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
