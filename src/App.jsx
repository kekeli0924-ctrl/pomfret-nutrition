import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import HomePage from './pages/HomePage'
import AboutPage from './pages/AboutPage'
import ActivitiesPage from './pages/ActivitiesPage'
import SmoothieBarPage from './pages/SmoothieBarPage'
import JoinUsPage from './pages/JoinUsPage'
import AdminPage from './pages/AdminPage'
import { useOrders } from './hooks/useOrders'
import { useGameDay } from './hooks/useGameDay'
import ScrollToTop from './components/ScrollToTop'

export default function App() {
  const { orders, addOrder, clearOrders } = useOrders()
  const gameDay = useGameDay()

  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        {/* Main site pages — wrapped in Layout (nav + footer) */}
        <Route element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="about" element={<AboutPage />} />
          <Route path="activities" element={<ActivitiesPage />} />
          <Route
            path="smoothie-bar"
            element={
              <SmoothieBarPage
                orders={orders}
                addOrder={addOrder}
                gameDay={gameDay}
              />
            }
          />
          <Route path="join" element={<JoinUsPage />} />
        </Route>

        {/* Admin route — standalone, no nav/footer */}
        <Route
          path="admin"
          element={
            <AdminPage
              orders={orders}
              clearOrders={clearOrders}
              gameDay={gameDay}
            />
          }
        />
      </Routes>
    </BrowserRouter>
  )
}
