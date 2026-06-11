import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Analytics } from '@vercel/analytics/react'
import Navbar   from './components/Navbar'
import Footer   from './components/Footer'
import Home     from './pages/Home'
import BMI      from './pages/BMI'
import AgeCalculator    from './pages/AgeCalculator'
import PercentageCalc   from './pages/PercentageCalc'
import TDEECalc         from './pages/TDEECalc'
import BodyFatCalc      from './pages/BodyFatCalc'

export default function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen flex flex-col bg-cream">
        <Navbar />
        <main className="flex-1">
          <Routes>
            <Route path="/"           element={<Home />} />
            <Route path="/bmi"        element={<BMI />} />
            <Route path="/age"        element={<AgeCalculator />} />
            <Route path="/percentage" element={<PercentageCalc />} />
            <Route path="/tdee"       element={<TDEECalc />} />
            <Route path="/bodyfat"    element={<BodyFatCalc />} />
          </Routes>
        </main>
        <Footer />
      </div>
      <Analytics />
    </BrowserRouter>
  )
}
