import { Link } from 'react-router-dom'

export default function NotFoundPage() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center px-6">
      <div className="text-center max-w-md">
        <p className="text-7xl font-bold text-crimson-500 mb-2">404</p>
        <h1 className="font-[Playfair_Display] text-3xl font-bold text-dark-800 mb-3">
          Page not found
        </h1>
        <p className="text-dark-600 mb-6">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <Link
          to="/"
          className="inline-block bg-crimson-500 hover:bg-crimson-600 text-white font-semibold px-6 py-3 rounded-full transition"
        >
          Back to Home
        </Link>
      </div>
    </div>
  )
}
