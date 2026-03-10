import { Component } from 'react'

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError() {
    return { hasError: true }
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-[#F5F0EB] flex items-center justify-center px-6">
          <div className="text-center max-w-md">
            <p className="text-6xl mb-4">😵</p>
            <h1 className="font-[Playfair_Display] text-3xl font-bold text-dark-800 mb-3">
              Something went wrong
            </h1>
            <p className="text-dark-600 mb-6">
              An unexpected error occurred. Try refreshing the page.
            </p>
            <button
              onClick={() => window.location.reload()}
              className="bg-crimson-500 hover:bg-crimson-600 text-white font-semibold px-6 py-3 rounded-full transition"
            >
              Refresh Page
            </button>
          </div>
        </div>
      )
    }

    return this.props.children
  }
}
