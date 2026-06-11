import { Link } from 'react-router-dom'
import { useSEO } from '../useSEO'
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

const structuredData = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  "name": "Free Health Calculators",
  "description": "A collection of free, accurate health and life calculators — BMI, age, TDEE, body fat, and percentage.",
  "url": "https://calcbloom1.vercel.app/",
  "numberOfItems": 5,
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "BMI Calculator", "url": "https://calcbloom1.vercel.app/bmi" },
    { "@type": "ListItem", "position": 2, "name": "Age Calculator", "url": "https://calcbloom1.vercel.app/age" },
    { "@type": "ListItem", "position": 3, "name": "Percentage Calculator", "url": "https://calcbloom1.vercel.app/percentage" },
    { "@type": "ListItem", "position": 4, "name": "TDEE Calculator", "url": "https://calcbloom1.vercel.app/tdee" },
    { "@type": "ListItem", "position": 5, "name": "Body Fat Calculator", "url": "https://calcbloom1.vercel.app/bodyfat" },
  ]
}

export default function Home() {
  useSEO({
    title: 'CalcBloom – Free Health & Life Calculators',
    description: 'Free BMI calculator, age calculator, TDEE calculator, body fat calculator and percentage calculator. Fast, accurate, no signup needed.',
    path: '/',
    structuredData,
  })

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
      <section className="max-w-3xl mx-auto px-4 pb-16" aria-label="Available calculators">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {TOOLS.map(t => (
            <Link key={t.to} to={t.to}
              className="card p-6 hover:shadow-md hover:-translate-y-0.5 transition-all group"
              aria-label={t.title}>
              <div className={`w-12 h-12 rounded-2xl border flex items-center justify-center text-2xl mb-4 ${t.accent}`}
                aria-hidden="true">
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
      <section className="border-t border-slate-100 bg-white py-8" aria-label="Site stats">
        <div className="max-w-3xl mx-auto px-4 flex flex-wrap justify-center gap-8 text-center">
          {[['100%', 'Free forever'], ['0', 'Signups needed'], ['5', 'Calculators'], ['Instant', 'Results']].map(([val, label]) => (
            <div key={label}>
              <p className="font-display font-extrabold text-2xl text-mint-DEFAULT">{val}</p>
              <p className="text-slate-soft text-sm">{label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* SEO content block */}
      <section className="max-w-3xl mx-auto px-4 py-12 text-slate-mid text-sm leading-relaxed space-y-4">
        <h2 className="font-display font-bold text-2xl text-slate-DEFAULT">Free health calculators, no strings attached</h2>
        <p>
          CalcBloom offers a growing suite of health and everyday calculators — all completely free, with no account required and no paywalls. Whether you need to check your BMI before a doctor's appointment, calculate your exact age for a visa application, figure out how many calories to eat to lose weight, or work out a discount at checkout, you'll find a clean and accurate tool here.
        </p>
        <p>
          Every calculator works entirely in your browser. Your data is never sent to a server — it stays on your device. Results are instant, and each tool supports both metric and imperial units.
        </p>
        <h3 className="font-display font-bold text-lg text-slate-DEFAULT mt-6">What calculators are available?</h3>
        <ul className="list-disc list-inside space-y-1">
          <li><strong>BMI Calculator</strong> — calculate your Body Mass Index from height and weight, with a health category and visual gauge.</li>
          <li><strong>Age Calculator</strong> — find your exact age in years, months, and days, plus your birth day of the week and next birthday countdown.</li>
          <li><strong>Percentage Calculator</strong> — handle discounts, percentage change, tips, tax, and more with four calculation modes.</li>
          <li><strong>TDEE Calculator</strong> — find your Total Daily Energy Expenditure using the Mifflin-St Jeor equation, with calorie targets for weight loss, maintenance, and muscle gain.</li>
          <li><strong>Body Fat Calculator</strong> — estimate body fat percentage using the US Navy circumference method for men and women.</li>
        </ul>
      </section>
    </div>
  )
}
