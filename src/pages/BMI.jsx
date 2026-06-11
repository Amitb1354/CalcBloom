import { useState } from 'react'
import PageWrapper from '../components/PageWrapper'
import AdSlot from '../components/AdSlot'

const CATEGORIES = [
  { max: 18.5, label: 'Underweight',   color: 'text-blue-500',        bg: 'bg-blue-50  border-blue-200',    tip: 'Consider speaking with a healthcare provider about healthy weight gain strategies.' },
  { max: 25,   label: 'Normal weight', color: 'text-mint-DEFAULT',    bg: 'bg-mint-light border-mint-mid',  tip: 'Great work — maintain your weight with a balanced diet and regular activity.' },
  { max: 30,   label: 'Overweight',    color: 'text-amber-500',       bg: 'bg-amber-50 border-amber-200',   tip: 'Small lifestyle changes in diet and movement can help reach a healthier range.' },
  { max: Infinity, label: 'Obese',     color: 'text-peach-DEFAULT',   bg: 'bg-peach-light border-peach-mid',tip: 'Speaking with a doctor or dietitian can help create a safe, sustainable plan.' },
]

function getCategory(bmi) {
  return CATEGORIES.find(c => bmi < c.max)
}

function GaugeBar({ bmi }) {
  const pct = Math.min(100, Math.max(0, ((bmi - 10) / (45 - 10)) * 100))
  return (
    <div className="mt-4" role="img" aria-label={`BMI gauge showing ${bmi}`}>
      <div className="relative h-3 rounded-full overflow-hidden bg-gradient-to-r from-blue-300 via-mint-mid via-amber-300 to-peach-mid">
        <div
          className="absolute top-1/2 -translate-y-1/2 w-4 h-4 bg-white border-2 border-slate-DEFAULT rounded-full shadow transition-all"
          style={{ left: `calc(${pct}% - 8px)` }}
        />
      </div>
      <div className="flex justify-between text-xs text-slate-soft mt-1">
        <span>10</span><span>18.5</span><span>25</span><span>30</span><span>45+</span>
      </div>
    </div>
  )
}

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      "name": "BMI Calculator",
      "url": "https://calcbloom1.vercel.app/bmi",
      "description": "Free online BMI calculator. Calculate your Body Mass Index instantly from height and weight in metric or imperial units.",
      "applicationCategory": "HealthApplication",
      "operatingSystem": "All",
      "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" }
    },
    {
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "What is a healthy BMI?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "A BMI between 18.5 and 24.9 is considered a healthy weight. A BMI under 18.5 is underweight, 25–29.9 is overweight, and 30 or above is considered obese."
          }
        },
        {
          "@type": "Question",
          "name": "How is BMI calculated?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "BMI is calculated by dividing your weight in kilograms by the square of your height in metres: BMI = kg/m². In imperial units, the formula is BMI = (lbs × 703) / (inches²)."
          }
        },
        {
          "@type": "Question",
          "name": "Is BMI accurate?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "BMI is a useful screening tool but has limitations. It does not measure body fat directly and cannot distinguish between muscle and fat mass. Athletes may have a high BMI despite low body fat. Always consult a healthcare professional for a complete health assessment."
          }
        },
        {
          "@type": "Question",
          "name": "What BMI is considered obese?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "A BMI of 30 or higher is classified as obese by the World Health Organization. BMI 25–29.9 is overweight, and BMI 18.5–24.9 is normal weight."
          }
        }
      ]
    }
  ]
}

export default function BMI() {
  const [unit, setUnit]     = useState('metric')
  const [weight, setWeight] = useState('')
  const [height, setHeight] = useState('')
  const [heightFt, setHeightFt] = useState('')
  const [heightIn, setHeightIn] = useState('')
  const [result, setResult] = useState(null)

  const calculate = () => {
    let w = parseFloat(weight)
    let h
    if (unit === 'metric') {
      h = parseFloat(height) / 100
    } else {
      w = w * 0.453592
      h = ((parseFloat(heightFt) || 0) * 12 + (parseFloat(heightIn) || 0)) * 0.0254
    }
    if (!w || !h || h === 0) return
    const bmi = w / (h * h)
    setResult(Math.round(bmi * 10) / 10)
  }

  const cat = result ? getCategory(result) : null

  return (
    <PageWrapper
      title="BMI Calculator"
      description="Calculate your Body Mass Index (BMI) instantly. Free BMI calculator for adults — metric and imperial units. Check if your weight is healthy for your height."
      path="/bmi"
      accent="mint"
      structuredData={structuredData}
    >
      <div className="max-w-xl mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-14 h-14 bg-mint-light border border-mint-mid rounded-2xl flex items-center justify-center text-3xl mx-auto mb-4" aria-hidden="true">⚖️</div>
          <h1 className="font-display font-extrabold text-4xl text-slate-DEFAULT mb-2">BMI Calculator</h1>
          <p className="text-slate-mid">Find out if your weight is healthy for your height.</p>
        </div>

        <AdSlot slot="horizontal" className="mb-6" />

        {/* Card */}
        <div className="card p-6 md:p-8">
          {/* Unit toggle */}
          <div className="flex bg-cream rounded-2xl p-1 mb-6" role="group" aria-label="Unit system">
            {['metric', 'imperial'].map(u => (
              <button key={u} onClick={() => { setUnit(u); setResult(null) }}
                className={`flex-1 py-2 rounded-xl text-sm font-semibold capitalize transition-all ${unit === u ? 'bg-white text-slate-DEFAULT shadow-sm' : 'text-slate-soft hover:text-slate-mid'}`}
                aria-pressed={unit === u}>
                {u}
              </button>
            ))}
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-slate-mid mb-1.5" htmlFor="bmi-weight">
                Weight {unit === 'metric' ? '(kg)' : '(lbs)'}
              </label>
              <input id="bmi-weight" type="number" className="input-field" placeholder={unit === 'metric' ? 'e.g. 70' : 'e.g. 154'}
                value={weight} onChange={e => { setWeight(e.target.value); setResult(null) }} />
            </div>

            {unit === 'metric' ? (
              <div>
                <label className="block text-sm font-semibold text-slate-mid mb-1.5" htmlFor="bmi-height">Height (cm)</label>
                <input id="bmi-height" type="number" className="input-field" placeholder="e.g. 175"
                  value={height} onChange={e => { setHeight(e.target.value); setResult(null) }} />
              </div>
            ) : (
              <div>
                <label className="block text-sm font-semibold text-slate-mid mb-1.5">Height</label>
                <div className="grid grid-cols-2 gap-3">
                  <input type="number" className="input-field" placeholder="ft" aria-label="Height feet"
                    value={heightFt} onChange={e => { setHeightFt(e.target.value); setResult(null) }} />
                  <input type="number" className="input-field" placeholder="in" aria-label="Height inches"
                    value={heightIn} onChange={e => { setHeightIn(e.target.value); setResult(null) }} />
                </div>
              </div>
            )}

            <button onClick={calculate} className="calc-btn">Calculate BMI</button>
          </div>

          {/* Result */}
          {result && cat && (
            <div className={`result-pill mt-6 border ${cat.bg}`} role="region" aria-label="BMI result" aria-live="polite">
              <p className="text-sm font-semibold text-slate-soft mb-1">Your BMI</p>
              <p className={`font-display font-extrabold text-6xl ${cat.color}`}>{result}</p>
              <p className={`font-semibold text-lg mt-1 ${cat.color}`}>{cat.label}</p>
              <GaugeBar bmi={result} />
              <p className="text-sm text-slate-mid mt-4 leading-relaxed">{cat.tip}</p>
            </div>
          )}
        </div>

        {/* SEO Info */}
        <div className="mt-10 space-y-4 text-slate-mid text-sm leading-relaxed">
          <h2 className="font-display font-bold text-xl text-slate-DEFAULT">What is BMI?</h2>
          <p>Body Mass Index (BMI) is a simple calculation using your height and weight. The formula is BMI = kg/m². It's widely used as a screening tool to indicate whether a person has a healthy body weight for their height.</p>

          <div className="grid grid-cols-2 gap-3">
            {CATEGORIES.map(c => (
              <div key={c.label} className={`rounded-2xl border p-3 ${c.bg}`}>
                <p className={`font-semibold text-sm ${c.color}`}>{c.label}</p>
                <p className="text-xs text-slate-soft">BMI {c.max === Infinity ? '≥ 30' : `< ${c.max}`}</p>
              </div>
            ))}
          </div>

          <h2 className="font-display font-bold text-xl text-slate-DEFAULT pt-4">Frequently asked questions</h2>

          <details className="border border-slate-100 rounded-2xl p-4 cursor-pointer">
            <summary className="font-semibold text-slate-DEFAULT">What is a healthy BMI range?</summary>
            <p className="mt-2">A BMI between 18.5 and 24.9 is considered a healthy weight. Below 18.5 is underweight; 25–29.9 is overweight; 30 and above is obese.</p>
          </details>

          <details className="border border-slate-100 rounded-2xl p-4 cursor-pointer">
            <summary className="font-semibold text-slate-DEFAULT">How is BMI calculated?</summary>
            <p className="mt-2">In metric: BMI = weight (kg) ÷ height² (m). In imperial: BMI = (weight in lbs × 703) ÷ height² (in). Our calculator handles both automatically.</p>
          </details>

          <details className="border border-slate-100 rounded-2xl p-4 cursor-pointer">
            <summary className="font-semibold text-slate-DEFAULT">Is BMI accurate for everyone?</summary>
            <p className="mt-2">BMI doesn't distinguish between muscle and fat, so athletes or very muscular people may show a high BMI despite being healthy. It's a useful starting point but not a full health assessment. Consult a healthcare professional for personalised advice.</p>
          </details>

          <p className="text-xs text-slate-soft">BMI is a screening tool, not a diagnostic measure. Consult a healthcare professional for medical advice.</p>
        </div>

        <AdSlot slot="horizontal" className="mt-8" />
      </div>
    </PageWrapper>
  )
}
