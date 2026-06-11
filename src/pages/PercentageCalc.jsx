import { useState } from 'react'
import PageWrapper from '../components/PageWrapper'
import AdSlot from '../components/AdSlot'

const MODES = [
  { id: 'whatIs',    label: 'What is X% of Y?',    eg: 'e.g. 15% of 200 = 30' },
  { id: 'isWhat',    label: 'X is what % of Y?',   eg: 'e.g. 30 is 15% of 200' },
  { id: 'change',    label: '% change (increase / decrease)', eg: 'e.g. 100 → 120 = +20%' },
  { id: 'discount',  label: '% off (discount)',     eg: 'e.g. 20% off $80 = $64' },
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

export default function PercentageCalc() {
  const [mode, setMode]   = useState('whatIs')
  const [a, setA]         = useState('')
  const [b, setB]         = useState('')
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
    <PageWrapper title="Percentage Calculator" description="Free percentage calculator — what is X% of Y, percentage change, discount calculator, and more." accent="lavender">
      <div className="max-w-xl mx-auto px-4 py-12">
        <div className="text-center mb-8">
          <div className="w-14 h-14 bg-lavender-light border border-lavender-mid rounded-2xl flex items-center justify-center text-3xl mx-auto mb-4">🔢</div>
          <h1 className="font-display font-extrabold text-4xl text-slate-DEFAULT mb-2">Percentage Calculator</h1>
          <p className="text-slate-mid">Discounts, tips, tax, change — any percentage instantly.</p>
        </div>

        <AdSlot slot="horizontal" className="mb-6" />

        <div className="card p-6 md:p-8">
          {/* Mode tabs */}
          <div className="grid grid-cols-2 gap-2 mb-6">
            {MODES.map(m => (
              <button key={m.id} onClick={() => { setMode(m.id); setResult(null) }}
                className={`text-xs font-semibold px-3 py-2.5 rounded-xl border text-left transition-all leading-snug ${
                  mode === m.id
                    ? 'bg-lavender-light border-lavender-mid text-lavender-DEFAULT'
                    : 'bg-cream border-slate-100 text-slate-soft hover:border-lavender-mid'
                }`}>
                {m.label}
              </button>
            ))}
          </div>

          <p className="text-xs text-slate-soft mb-4">{MODES.find(m => m.id === mode)?.eg}</p>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-slate-mid mb-1.5">{labels[mode][0]}</label>
              <input type="number" className="input-field" placeholder="Enter number"
                value={a} onChange={e => { setA(e.target.value); setResult(null) }} />
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-mid mb-1.5">{labels[mode][1]}</label>
              <input type="number" className="input-field" placeholder="Enter number"
                value={b} onChange={e => { setB(e.target.value); setResult(null) }} />
            </div>
            <button onClick={handleCalc} className="calc-btn" style={{ background: '#7C6FCD' }}>Calculate</button>
          </div>

          {result && (
            <div className="result-pill mt-6 bg-lavender-light border-lavender-mid">
              <p className="text-sm font-semibold text-slate-soft mb-1">{result.label}</p>
              <p className={`font-display font-extrabold text-6xl text-lavender-DEFAULT`}>
                {fmt(result.val, result.signed)}{result.suffix || ''}
              </p>
              {result.extra && <p className="text-sm text-slate-mid mt-2">{result.extra}</p>}
            </div>
          )}
        </div>

        <div className="mt-10 space-y-3 text-slate-mid text-sm leading-relaxed">
          <h2 className="font-display font-bold text-xl text-slate-DEFAULT">When do you need a percentage calculator?</h2>
          <p>Calculating a restaurant tip, working out sale discounts, figuring out tax, or tracking a score on a test — percentage calculations come up every day. This tool handles all the common cases in one place.</p>
        </div>

        <AdSlot slot="horizontal" className="mt-8" />
      </div>
    </PageWrapper>
  )
}
