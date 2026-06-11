import { Link, useLocation } from 'react-router-dom'

const LINKS = [
  { to: '/',          label: 'Home' },
  { to: '/bmi',       label: 'BMI' },
  { to: '/age',       label: 'Age' },
  { to: '/percentage',label: 'Percentage' },
  { to: '/tdee',      label: 'TDEE' },
  { to: '/bodyfat',   label: 'Body Fat' },
]

export default function Navbar() {
  const { pathname } = useLocation()
  return (
    <nav className="bg-white/80 backdrop-blur-md border-b border-slate-100 sticky top-0 z-50">
      <div className="max-w-5xl mx-auto px-4 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 font-display font-800">
          <span className="w-8 h-8 rounded-xl bg-mint-light flex items-center justify-center text-lg">🌿</span>
          <span className="font-extrabold text-slate-DEFAULT text-lg tracking-tight">CalcBloom</span>
        </Link>
        <div className="hidden md:flex items-center gap-1">
          {LINKS.map(l => (
            <Link key={l.to} to={l.to}
              className={pathname === l.to ? 'nav-link-active' : 'nav-link'}>
              {l.label}
            </Link>
          ))}
        </div>
        {/* Mobile scroll nav */}
        <div className="md:hidden flex overflow-x-auto gap-1 scrollbar-hide">
          {LINKS.slice(1).map(l => (
            <Link key={l.to} to={l.to}
              className={`whitespace-nowrap text-xs font-medium px-3 py-1.5 rounded-xl flex-shrink-0 transition-colors ${pathname === l.to ? 'bg-mint-light text-mint-DEFAULT' : 'text-slate-mid hover:bg-slate-50'}`}>
              {l.label}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  )
}
