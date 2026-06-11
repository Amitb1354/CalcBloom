import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="bg-white border-t border-slate-100 mt-20 py-10">
      <div className="max-w-5xl mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="text-xl">🌿</span>
            <span className="font-display font-extrabold text-slate-DEFAULT">CalcBloom</span>
          </div>
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm text-slate-soft">
            <Link to="/bmi"        className="hover:text-mint transition-colors">BMI Calculator</Link>
            <Link to="/age"        className="hover:text-mint transition-colors">Age Calculator</Link>
            <Link to="/percentage" className="hover:text-mint transition-colors">Percentage Calculator</Link>
            <Link to="/tdee"       className="hover:text-mint transition-colors">TDEE Calculator</Link>
            <Link to="/bodyfat"    className="hover:text-mint transition-colors">Body Fat Calculator</Link>
          </div>
        </div>
        <p className="text-center text-xs text-slate-soft mt-6">
          © {new Date().getFullYear()} CalcBloom · Free calculators for everyone · Results are estimates, not medical advice.
        </p>
      </div>
    </footer>
  )
}
