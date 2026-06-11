import { Link } from 'react-router-dom'

const CALC_LINKS = [
  { to: '/bmi',        label: 'BMI Calculator' },
  { to: '/age',        label: 'Age Calculator' },
  { to: '/percentage', label: 'Percentage Calculator' },
  { to: '/tdee',       label: 'TDEE Calculator' },
  { to: '/bodyfat',    label: 'Body Fat Calculator' },
]

export default function Footer() {
  return (
    <footer className="bg-white border-t border-slate-100 mt-20 py-10">
      <div className="max-w-5xl mx-auto px-4">
        <div className="flex flex-col md:flex-row items-start justify-between gap-8 mb-8">
          {/* Brand */}
          <div>
            <Link to="/" className="flex items-center gap-2 mb-2">
              <span className="text-xl" aria-hidden="true">🌿</span>
              <span className="font-display font-extrabold text-slate-DEFAULT">CalcBloom</span>
            </Link>
            <p className="text-xs text-slate-soft max-w-xs leading-relaxed">
              Free health and life calculators. No signup, no ads blocking results, instant answers.
            </p>
          </div>

          {/* Sitemap-style nav — all pages linked for SEO crawlability */}
          <nav aria-label="Calculator links">
            <p className="text-xs font-semibold text-slate-DEFAULT uppercase tracking-wider mb-3">Calculators</p>
            <ul className="space-y-2">
              {CALC_LINKS.map(({ to, label }) => (
                <li key={to}>
                  <Link to={to} className="text-sm text-slate-soft hover:text-mint-DEFAULT transition-colors">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="border-t border-slate-100 pt-6 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-xs text-slate-soft">
            © {new Date().getFullYear()} CalcBloom · Free calculators for everyone
          </p>
          <p className="text-xs text-slate-soft">
            Results are estimates, not medical advice.
          </p>
        </div>
      </div>
    </footer>
  )
}
