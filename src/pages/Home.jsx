import { Link } from 'react-router-dom'
import { useEffect } from 'react'
import AdSlot from '../components/AdSlot'

const TOOLS = [
  {
    to: '/bmi', emoji: '⚖️', accent: 'bg-mint-light border-mint-mid text-mint-DEFAULT',
    title: 'BMI Calculator',
    desc: 'Find out if your weight is in a healthy range for your height.',
    searches: '13M searches/mo',
  },
  {
    to: '/age', emoji: '🎂', accent: 'bg-peach-light border-peach-mid text-peach-DEFAULT',
    title: 'Age Calculator',
    desc: 'Your exact age in years, months, days — and next birthday countdown.',
    searches: '12M searches/mo',
  },
  {
    to: '/percentage', emoji: '🔢', accent: 'bg-lavender-light border-lavender-mid text-lavender-DEFAULT',
    title: 'Percentage Calculator',
    desc: 'Discounts, tips, tax, increases, decreases — any percentage instantly.',
    searches: '5M searches/mo',
  },
  {
    to: '/tdee', emoji: '🔥', accent: 'bg-mint-light border-mint-mid text-mint-DEFAULT',
    title: 'TDEE Calculator',
    desc: 'How many calories your body burns daily based on your activity level.',
    searches: '1.2M searches/mo',
  },
  {
    to: '/bodyfat', emoji: '💪', accent: 'bg-peach-light border-peach-mid text-peach-DEFAULT',
    title: 'Body Fat Calculator',
    desc: 'Estimate your body fat percentage using the US Navy method.',
    searches: '800K searches/mo',
  },
]

export default function Home() {
  useEffect(() => {
    document.title = 'CalcBloom – Free Health & Life Calculators'
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-b from-mint-light via-cream to-cream">
      {/* Hero */}
      <section className="max-w-3xl mx-auto px-4 pt-16 pb-12 text-center">
        <div className="inline-flex items-center gap-2 bg-white border border-mint-mid text-mint-DEFAULT text-sm font-medium px-4 py-1.5 rounded-full mb-6">
          <span>🌿</span> Free · No signup · Instant results
        </div>
        <h1 className="font-display font-extrabold text-5xl md:text-6xl text-slate-DEFAULT leading-tight mb-4">
          Calculators that<br />
          <span className="text-mint-DEFAULT">actually help</span>
        </h1>
        <p className="text-slate-mid text-lg max-w-lg mx-auto">
          BMI, age, TDEE, body fat, percentages — all free, no ads blocking your results, no account needed.
        </p>
      </section>

      {/* Ad slot */}
      <div className="max-w-3xl mx-auto px-4 mb-8">
        <AdSlot slot="horizontal" />
      </div>

      {/* Tools grid */}
      <section className="max-w-3xl mx-auto px-4 pb-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {TOOLS.map(t => (
            <Link key={t.to} to={t.to}
              className="card p-6 hover:shadow-md hover:-translate-y-0.5 transition-all group">
              <div className={`w-12 h-12 rounded-2xl border flex items-center justify-center text-2xl mb-4 ${t.accent}`}>
                {t.emoji}
              </div>
              <h2 className="font-display font-bold text-slate-DEFAULT text-lg mb-1 group-hover:text-mint-DEFAULT transition-colors">
                {t.title}
              </h2>
              <p className="text-slate-soft text-sm leading-relaxed mb-3">{t.desc}</p>
              <span className="text-xs font-medium text-slate-soft bg-cream px-2.5 py-1 rounded-full">
                {t.searches}
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* Trust strip */}
      <section className="border-t border-slate-100 bg-white py-8">
        <div className="max-w-3xl mx-auto px-4 flex flex-wrap justify-center gap-8 text-center">
          {[['100%', 'Free forever'], ['0', 'Signups needed'], ['5', 'Calculators'], ['Instant', 'Results']].map(([val, label]) => (
            <div key={label}>
              <p className="font-display font-extrabold text-2xl text-mint-DEFAULT">{val}</p>
              <p className="text-slate-soft text-sm">{label}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
