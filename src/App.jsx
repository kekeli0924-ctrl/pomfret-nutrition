import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import ErrorBoundary from './components/ErrorBoundary'
import HomePage from './pages/HomePage'
import AboutPage from './pages/AboutPage'
import ActivitiesPage from './pages/ActivitiesPage'
import CertaFuelPage from './pages/CertaFuelPage'
import JoinUsPage from './pages/JoinUsPage'
import NutritionLabelsPage from './pages/NutritionLabelsPage'
import AdminPage from './pages/AdminPage'
import NotFoundPage from './pages/NotFoundPage'
import { useOrders } from './hooks/useOrders'
import { useGameDay } from './hooks/useGameDay'
import ScrollToTop from './components/ScrollToTop'

export default function App() {
  const { orders, addOrder, clearOrders, fetchOrders } = useOrders()
  const gameDay = useGameDay()

  return (
    <ErrorBoundary>
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          {/* Main site pages — wrapped in Layout (nav + footer) */}
          <Route element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route path="about" element={<AboutPage />} />
            <Route path="activities" element={<ActivitiesPage />} />
            <Route
              path="certafuel"
              element={
                <CertaFuelPage
                  orders={orders}
                  addOrder={addOrder}
                  gameDay={gameDay}
                />
              }
            />
            <Route path="nutrition-labels" element={<NutritionLabelsPage />} />
            <Route path="join" element={<JoinUsPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Route>

          {/* Admin route — standalone, no nav/footer */}
          <Route
            path="admin"
            element={
              <AdminPage
                orders={orders}
                clearOrders={clearOrders}
                fetchOrders={fetchOrders}
                gameDay={gameDay}
              />
            }
          />
        </Routes>
      </BrowserRouter>
    </ErrorBoundary>
  )
}
