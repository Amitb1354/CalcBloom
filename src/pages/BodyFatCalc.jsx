import { useState } from 'react'
import PageWrapper from '../components/PageWrapper'
import AdSlot from '../components/AdSlot'

const CATEGORIES_MALE = [
  { max: 6,        label: 'Essential fat', color: 'text-blue-500',      bg: 'bg-blue-50 border-blue-200' },
  { max: 14,       label: 'Athletes',      color: 'text-mint-DEFAULT',  bg: 'bg-mint-light border-mint-mid' },
  { max: 18,       label: 'Fitness',       color: 'text-mint-DEFAULT',  bg: 'bg-mint-light border-mint-mid' },
  { max: 25,       label: 'Acceptable',    color: 'text-amber-500',     bg: 'bg-amber-50 border-amber-200' },
  { max: Infinity, label: 'Obese',         color: 'text-peach-DEFAULT', bg: 'bg-peach-light border-peach-mid' },
]
const CATEGORIES_FEMALE = [
  { max: 14,       label: 'Essential fat', color: 'text-blue-500',      bg: 'bg-blue-50 border-blue-200' },
  { max: 21,       label: 'Athletes',      color: 'text-mint-DEFAULT',  bg: 'bg-mint-light border-mint-mid' },
  { max: 25,       label: 'Fitness',       color: 'text-mint-DEFAULT',  bg: 'bg-mint-light border-mint-mid' },
  { max: 32,       label: 'Acceptable',    color: 'text-amber-500',     bg: 'bg-amber-50 border-amber-200' },
  { max: Infinity, label: 'Obese',         color: 'text-peach-DEFAULT', bg: 'bg-peach-light border-peach-mid' },
]

function calcBodyFat({ gender, waist, neck, height, hip, unit }) {
  let w = parseFloat(waist), n = parseFloat(neck), h = parseFloat(height), hp = parseFloat(hip)
  if (unit === 'imperial') {
    w = w * 2.54; n = n * 2.54; h = h * 2.54
    if (gender === 'female') hp = hp * 2.54
  }
  if (!w || !n || !h) return null
  if (gender === 'female' && !hp) return null

  let bf
  if (gender === 'male') {
    bf = 495 / (1.0324 - 0.19077 * Math.log10(w - n) + 0.15456 * Math.log10(h)) - 450
  } else {
    bf = 495 / (1.29579 - 0.35004 * Math.log10(w + hp - n) + 0.22100 * Math.log10(h)) - 450
  }
  return Math.max(0, Math.round(bf * 10) / 10)
}

function getCategory(bf, gender) {
  const cats = gender === 'male' ? CATEGORIES_MALE : CATEGORIES_FEMALE
  return cats.find(c => bf < c.max)
}

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      "name": "Body Fat Calculator",
      "url": "https://calcbloom1.vercel.app/bodyfat",
      "description": "Free body fat percentage calculator using the US Navy circumference method for men and women. Enter neck, waist, and hip measurements for an instant estimate.",
      "applicationCategory": "HealthApplication",
      "operatingSystem": "All",
      "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" }
    },
    {
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "What is a healthy body fat percentage?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "For men, 6–13% is athletic, 14–17% is fitness level, 18–24% is acceptable, and 25%+ is considered obese. For women, 14–20% is athletic, 21–24% is fitness, 25–31% is acceptable, and 32%+ is obese."
          }
        },
        {
          "@type": "Question",
          "name": "How does the US Navy body fat formula work?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "The US Navy circumference method estimates body fat from measurements of the neck, waist (and hips for women), and height. It uses a logarithmic formula and is one of the most widely used non-invasive body fat estimation methods."
          }
        },
        {
          "@type": "Question",
          "name": "How accurate is the Navy body fat calculator?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "The US Navy method typically has an error margin of 3–5% compared to DEXA scans. For best accuracy, measure in the morning, stand straight, and use a flexible tape measure pulled snug but not tight."
          }
        }
      ]
    }
  ]
}

export default function BodyFatCalc() {
  const [unit, setUnit]     = useState('metric')
  const [gender, setGender] = useState('male')
  const [waist, setWaist]   = useState('')
  const [neck, setNeck]     = useState('')
  const [height, setHeight] = useState('')
  const [hip, setHip]       = useState('')
  const [result, setResult] = useState(null)
  const [error, setError]   = useState('')

  const handleCalc = () => {
    setError('')
    const r = calcBodyFat({ gender, waist, neck, height, hip, unit })
    if (r === null) { setError('Please fill in all required fields.'); return }
    setResult(r)
  }

  const u = unit === 'metric' ? 'cm' : 'in'

  return (
    <PageWrapper
      title="Body Fat Calculator"
      description="Estimate your body fat percentage using the US Navy method. Free body fat calculator for men and women — metric and imperial. Enter neck, waist, and hip measurements for instant results."
      path="/bodyfat"
      accent="peach"
      structuredData={structuredData}
    >
      <div className="max-w-xl mx-auto px-4 py-12">
        <div className="text-center mb-8">
          <div className="w-14 h-14 bg-peach-light border border-peach-mid rounded-2xl flex items-center justify-center text-3xl mx-auto mb-4" aria-hidden="true">💪</div>
          <h1 className="font-display font-extrabold text-4xl text-slate-DEFAULT mb-2">Body Fat Calculator</h1>
          <p className="text-slate-mid">Estimate your body fat percentage using the US Navy method.</p>
        </div>

        <AdSlot slot="horizontal" className="mb-6" />

        <div className="card p-6 md:p-8">
          <div className="grid grid-cols-2 gap-3 mb-5">
            <div>
              <p className="text-xs font-semibold text-slate-soft mb-1.5">Units</p>
              <div className="flex bg-cream rounded-xl p-0.5" role="group" aria-label="Unit system">
                {['metric','imperial'].map(u => (
                  <button key={u} onClick={() => { setUnit(u); setResult(null) }}
                    className={`flex-1 py-1.5 rounded-lg text-xs font-semibold capitalize transition-all ${unit === u ? 'bg-white text-slate-DEFAULT shadow-sm' : 'text-slate-soft'}`}
                    aria-pressed={unit === u}>{u}</button>
                ))}
              </div>
            </div>
            <div>
              <p className="text-xs font-semibold text-slate-soft mb-1.5">Sex</p>
              <div className="flex bg-cream rounded-xl p-0.5" role="group" aria-label="Biological sex">
                {['male','female'].map(g => (
                  <button key={g} onClick={() => { setGender(g); setResult(null) }}
                    className={`flex-1 py-1.5 rounded-lg text-xs font-semibold capitalize transition-all ${gender === g ? 'bg-white text-slate-DEFAULT shadow-sm' : 'text-slate-soft'}`}
                    aria-pressed={gender === g}>{g}</button>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-mid mb-1.5" htmlFor="bf-height">Height ({u})</label>
                <input id="bf-height" type="number" className="input-field" placeholder={unit === 'metric' ? '175' : '69'}
                  value={height} onChange={e => { setHeight(e.target.value); setResult(null) }} />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-mid mb-1.5" htmlFor="bf-neck">Neck ({u})</label>
                <input id="bf-neck" type="number" className="input-field" placeholder={unit === 'metric' ? '37' : '14.5'}
                  value={neck} onChange={e => { setNeck(e.target.value); setResult(null) }} />
              </div>
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-mid mb-1.5" htmlFor="bf-waist">
                Waist ({u}) <span className="text-slate-soft font-normal">— measure at narrowest point</span>
              </label>
              <input id="bf-waist" type="number" className="input-field" placeholder={unit === 'metric' ? '80' : '31.5'}
                value={waist} onChange={e => { setWaist(e.target.value); setResult(null) }} />
            </div>
            {gender === 'female' && (
              <div>
                <label className="block text-xs font-semibold text-slate-mid mb-1.5" htmlFor="bf-hip">
                  Hip ({u}) <span className="text-slate-soft font-normal">— measure at widest point</span>
                </label>
                <input id="bf-hip" type="number" className="input-field" placeholder={unit === 'metric' ? '95' : '37'}
                  value={hip} onChange={e => { setHip(e.target.value); setResult(null) }} />
              </div>
            )}
            {error && <p className="text-peach-DEFAULT text-sm" role="alert">{error}</p>}
            <button onClick={handleCalc} className="calc-btn" style={{ background: '#F4845F' }}>Calculate Body Fat</button>
          </div>

          {result !== null && result !== undefined && !isNaN(result) && (
            <div className={`result-pill mt-6 border ${getCategory(result, gender)?.bg}`} role="region" aria-label="Body fat result" aria-live="polite">
              <p className="text-sm font-semibold text-slate-soft mb-1">Estimated body fat</p>
              <p className={`font-display font-extrabold text-6xl ${getCategory(result, gender)?.color}`}>{result}%</p>
              <p className={`font-semibold text-lg mt-1 ${getCategory(result, gender)?.color}`}>
                {getCategory(result, gender)?.label}
              </p>
            </div>
          )}
        </div>

        <div className="mt-10 space-y-4 text-slate-mid text-sm leading-relaxed">
          <h2 className="font-display font-bold text-xl text-slate-DEFAULT">How is body fat calculated?</h2>
          <p>This calculator uses the <strong>US Navy circumference method</strong>, which estimates body fat based on measurements of the neck, waist (and hips for women), and height. It's one of the most widely used non-invasive methods, accepted by the US military for fitness assessments.</p>
          <p>For best accuracy: measure in the morning before eating, stand straight with relaxed muscles, and use a flexible tape measure pulled snug but not compressing the skin.</p>

          <h3 className="font-display font-bold text-lg text-slate-DEFAULT pt-2">Body fat percentage ranges</h3>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <p className="font-semibold text-slate-DEFAULT mb-1">Men</p>
              <ul className="space-y-1">
                <li>Essential fat: &lt;6%</li>
                <li>Athletes: 6–13%</li>
                <li>Fitness: 14–17%</li>
                <li>Acceptable: 18–24%</li>
                <li>Obese: 25%+</li>
              </ul>
            </div>
            <div>
              <p className="font-semibold text-slate-DEFAULT mb-1">Women</p>
              <ul className="space-y-1">
                <li>Essential fat: &lt;14%</li>
                <li>Athletes: 14–20%</li>
                <li>Fitness: 21–24%</li>
                <li>Acceptable: 25–31%</li>
                <li>Obese: 32%+</li>
              </ul>
            </div>
          </div>

          <h2 className="font-display font-bold text-xl text-slate-DEFAULT pt-2">Frequently asked questions</h2>

          <details className="border border-slate-100 rounded-2xl p-4 cursor-pointer">
            <summary className="font-semibold text-slate-DEFAULT">How accurate is the Navy body fat calculator?</summary>
            <p className="mt-2">The US Navy method has an error margin of approximately 3–5% compared to DEXA scans. It's a good estimate for tracking trends over time, though not as precise as lab methods.</p>
          </details>

          <details className="border border-slate-100 rounded-2xl p-4 cursor-pointer">
            <summary className="font-semibold text-slate-DEFAULT">What is a healthy body fat percentage?</summary>
            <p className="mt-2">For men, 14–24% is generally considered healthy. For women, 21–31%. Athletes typically sit lower; older adults may maintain health at slightly higher levels.</p>
          </details>

          <details className="border border-slate-100 rounded-2xl p-4 cursor-pointer">
            <summary className="font-semibold text-slate-DEFAULT">Where do I measure my waist for this calculator?</summary>
            <p className="mt-2">Measure at the narrowest point of your natural waist — typically just above the belly button. Breathe normally and measure after exhaling. Don't suck in your stomach.</p>
          </details>
        </div>

        <AdSlot slot="horizontal" className="mt-8" />
      </div>
    </PageWrapper>
  )
}
