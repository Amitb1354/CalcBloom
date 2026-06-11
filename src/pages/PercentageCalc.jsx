import { useState } from 'react'
import PageWrapper from '../components/PageWrapper'
import AdSlot from '../components/AdSlot'

const MODES = [
  { id: 'whatIs',   label: 'What is X% of Y?',             eg: 'e.g. 15% of 200 = 30' },
  { id: 'isWhat',   label: 'X is what % of Y?',            eg: 'e.g. 30 is 15% of 200' },
  { id: 'change',   label: '% change (increase / decrease)', eg: 'e.g. 100 → 120 = +20%' },
  { id: 'discount', label: '% off (discount)',              eg: 'e.g. 20% off $80 = $64' },
]

function calc(mode, a, b) {
  const x = parseFloat(a), y = parseFloat(b)
  if (isNaN(x) || isNaN(y)) return null
  switch (mode) {
    case 'whatIs':   return { val: ((x / 100) * y).toFixed(4), label: `${x}% of ${y}` }
    case 'isWhat':   return { val: ((x / y) * 100).toFixed(4), label: `${x} is __% of ${y}`, suffix: '%' }
    case 'change':   return { val: (((y - x) / Math.abs(x)) * 100).toFixed(4), label: `Change from ${x} to ${y}`, suffix: '%', signed: true }
    case 'discount': return {
      val: (y - (x / 100) * y).toFixed(4),
      label: `${x}% off ${y}`,
      extra: `You save: ${((x / 100) * y).toFixed(2)}`,
    }
    default: return null
  }
}

function fmt(val, signed) {
  const n = parseFloat(val)
  const formatted = n % 1 === 0 ? n.toString() : parseFloat(n.toFixed(2)).toString()
  if (signed) return (n >= 0 ? '+' : '') + formatted
  return formatted
}

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      "name": "Percentage Calculator",
      "url": "https://calcbloom1.vercel.app/percentage",
      "description": "Free percentage calculator with four modes: find X% of Y, find what percentage X is of Y, calculate percentage change, and calculate discounts.",
      "applicationCategory": "UtilityApplication",
      "operatingSystem": "All",
      "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" }
    },
    {
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "How do I calculate a percentage of a number?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "To find X% of Y, multiply Y by X and divide by 100. For example, 15% of 200 = (200 × 15) / 100 = 30. Use the 'What is X% of Y?' mode in our calculator for instant results."
          }
        },
        {
          "@type": "Question",
          "name": "How do I calculate percentage change?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Percentage change = ((New Value - Old Value) / |Old Value|) × 100. For example, going from 100 to 120 is a 20% increase. Our calculator handles both increases and decreases automatically."
          }
        },
        {
          "@type": "Question",
          "name": "How do I calculate a discount?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "To find the price after a discount: Final price = Original price × (1 - discount% / 100). For example, 20% off $80 = $80 × 0.80 = $64. Use the '% off (discount)' mode in our calculator."
          }
        }
      ]
    }
  ]
}

export default function PercentageCalc() {
  const [mode, setMode]     = useState('whatIs')
  const [a, setA]           = useState('')
  const [b, setB]           = useState('')
  const [result, setResult] = useState(null)

  const handleCalc = () => {
    const r = calc(mode, a, b)
    setResult(r)
  }

  const labels = {
    whatIs:   ['Percentage (%)', 'Of this number'],
    isWhat:   ['This number (X)', 'Total number (Y)'],
    change:   ['Original value', 'New value'],
    discount: ['Discount (%)', 'Original price'],
  }

  return (
    <PageWrapper
      title="Percentage Calculator"
      description="Free percentage calculator — find what X% of Y is, calculate percentage change or increase/decrease, and calculate discounts. Four modes, instant results."
      path="/percentage"
      accent="lavender"
      structuredData={structuredData}
    >
      <div className="max-w-xl mx-auto px-4 py-12">
        <div className="text-center mb-8">
          <div className="w-14 h-14 bg-lavender-light border border-lavender-mid rounded-2xl flex items-center justify-center text-3xl mx-auto mb-4" aria-hidden="true">🔢</div>
          <h1 className="font-display font-extrabold text-4xl text-slate-DEFAULT mb-2">Percentage Calculator</h1>
          <p className="text-slate-mid">Discounts, tips, tax, change — any percentage instantly.</p>
        </div>

        <AdSlot slot="horizontal" className="mb-6" />

        <div className="card p-6 md:p-8">
          <div className="grid grid-cols-2 gap-2 mb-6" role="group" aria-label="Calculation mode">
            {MODES.map(m => (
              <button key={m.id} onClick={() => { setMode(m.id); setResult(null) }}
                className={`text-xs font-semibold px-3 py-2.5 rounded-xl border text-left transition-all leading-snug ${
                  mode === m.id
                    ? 'bg-lavender-light border-lavender-mid text-lavender-DEFAULT'
                    : 'bg-cream border-slate-100 text-slate-soft hover:border-lavender-mid'
                }`}
                aria-pressed={mode === m.id}>
                {m.label}
              </button>
            ))}
          </div>

          <p className="text-xs text-slate-soft mb-4">{MODES.find(m => m.id === mode)?.eg}</p>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-slate-mid mb-1.5" htmlFor="pct-a">{labels[mode][0]}</label>
              <input id="pct-a" type="number" className="input-field" placeholder="Enter number"
                value={a} onChange={e => { setA(e.target.value); setResult(null) }} />
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-mid mb-1.5" htmlFor="pct-b">{labels[mode][1]}</label>
              <input id="pct-b" type="number" className="input-field" placeholder="Enter number"
                value={b} onChange={e => { setB(e.target.value); setResult(null) }} />
            </div>
            <button onClick={handleCalc} className="calc-btn" style={{ background: '#7C6FCD' }}>Calculate</button>
          </div>

          {result && (
            <div className="result-pill mt-6 bg-lavender-light border-lavender-mid" role="region" aria-label="Calculation result" aria-live="polite">
              <p className="text-sm font-semibold text-slate-soft mb-1">{result.label}</p>
              <p className="font-display font-extrabold text-6xl text-lavender-DEFAULT">
                {fmt(result.val, result.signed)}{result.suffix || ''}
              </p>
              {result.extra && <p className="text-sm text-slate-mid mt-2">{result.extra}</p>}
            </div>
          )}
        </div>

        <div className="mt-10 space-y-4 text-slate-mid text-sm leading-relaxed">
          <h2 className="font-display font-bold text-xl text-slate-DEFAULT">When do you need a percentage calculator?</h2>
          <p>Calculating a restaurant tip, working out sale discounts, figuring out tax, comparing test scores, or tracking a price change — percentage calculations come up every day. This tool handles all the common cases in one place with four modes.</p>

          <h2 className="font-display font-bold text-xl text-slate-DEFAULT pt-2">Frequently asked questions</h2>

          <details className="border border-slate-100 rounded-2xl p-4 cursor-pointer">
            <summary className="font-semibold text-slate-DEFAULT">How do I calculate a percentage of a number?</summary>
            <p className="mt-2">Multiply the number by the percentage and divide by 100. Example: 15% of 200 = (200 × 15) ÷ 100 = 30. Use the first mode above for instant results.</p>
          </details>

          <details className="border border-slate-100 rounded-2xl p-4 cursor-pointer">
            <summary className="font-semibold text-slate-DEFAULT">How do I calculate percentage increase or decrease?</summary>
            <p className="mt-2">Formula: ((New − Old) ÷ |Old|) × 100. A result of +20% means a 20% increase; −20% means a 20% decrease. Use the % change mode above.</p>
          </details>

          <details className="border border-slate-100 rounded-2xl p-4 cursor-pointer">
            <summary className="font-semibold text-slate-DEFAULT">How do I work out a discount?</summary>
            <p className="mt-2">Final price = Original × (1 − discount/100). For 20% off $80: $80 × 0.80 = $64. The discount mode also shows how much you save.</p>
          </details>
        </div>

        <AdSlot slot="horizontal" className="mt-8" />
      </div>
    </PageWrapper>
  )
}
