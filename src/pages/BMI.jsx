import { useState } from 'react'
import PageWrapper from '../components/PageWrapper'
import AdSlot from '../components/AdSlot'

const CATEGORIES = [
  { max: 18.5, label: 'Underweight', color: 'text-blue-500',  bg: 'bg-blue-50  border-blue-200',  tip: 'Consider speaking with a healthcare provider about healthy weight gain strategies.' },
  { max: 25,   label: 'Normal weight', color: 'text-mint-DEFAULT', bg: 'bg-mint-light border-mint-mid',   tip: 'Great work — maintain your weight with a balanced diet and regular activity.' },
  { max: 30,   label: 'Overweight', color: 'text-amber-500', bg: 'bg-amber-50 border-amber-200', tip: 'Small lifestyle changes in diet and movement can help reach a healthier range.' },
  { max: Infinity, label: 'Obese', color: 'text-peach-DEFAULT', bg: 'bg-peach-light border-peach-mid', tip: 'Speaking with a doctor or dietitian can help create a safe, sustainable plan.' },
]

function getCategory(bmi) {
  return CATEGORIES.find(c => bmi < c.max)
}

function GaugeBar({ bmi }) {
  const pct = Math.min(100, Math.max(0, ((bmi - 10) / (45 - 10)) * 100))
  return (
    <div className="mt-4">
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
    <PageWrapper title="BMI Calculator" description="Calculate your Body Mass Index (BMI) instantly. Free BMI calculator for adults — metric and imperial units." accent="mint">
      <div className="max-w-xl mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-14 h-14 bg-mint-light border border-mint-mid rounded-2xl flex items-center justify-center text-3xl mx-auto mb-4">⚖️</div>
          <h1 className="font-display font-extrabold text-4xl text-slate-DEFAULT mb-2">BMI Calculator</h1>
          <p className="text-slate-mid">Find out if your weight is healthy for your height.</p>
        </div>

        <AdSlot slot="horizontal" className="mb-6" />

        {/* Card */}
        <div className="card p-6 md:p-8">
          {/* Unit toggle */}
          <div className="flex bg-cream rounded-2xl p-1 mb-6">
            {['metric', 'imperial'].map(u => (
              <button key={u} onClick={() => { setUnit(u); setResult(null) }}
                className={`flex-1 py-2 rounded-xl text-sm font-semibold capitalize transition-all ${unit === u ? 'bg-white text-slate-DEFAULT shadow-sm' : 'text-slate-soft hover:text-slate-mid'}`}>
                {u}
              </button>
            ))}
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-slate-mid mb-1.5">
                Weight {unit === 'metric' ? '(kg)' : '(lbs)'}
              </label>
              <input type="number" className="input-field" placeholder={unit === 'metric' ? 'e.g. 70' : 'e.g. 154'}
                value={weight} onChange={e => { setWeight(e.target.value); setResult(null) }} />
            </div>

            {unit === 'metric' ? (
              <div>
                <label className="block text-sm font-semibold text-slate-mid mb-1.5">Height (cm)</label>
                <input type="number" className="input-field" placeholder="e.g. 175"
                  value={height} onChange={e => { setHeight(e.target.value); setResult(null) }} />
              </div>
            ) : (
              <div>
                <label className="block text-sm font-semibold text-slate-mid mb-1.5">Height</label>
                <div className="grid grid-cols-2 gap-3">
                  <input type="number" className="input-field" placeholder="ft"
                    value={heightFt} onChange={e => { setHeightFt(e.target.value); setResult(null) }} />
                  <input type="number" className="input-field" placeholder="in"
                    value={heightIn} onChange={e => { setHeightIn(e.target.value); setResult(null) }} />
                </div>
              </div>
            )}

            <button onClick={calculate} className="calc-btn mt-2">Calculate BMI</button>
          </div>

          {/* Result */}
          {result && cat && (
            <div className={`result-pill mt-6 border ${cat.bg}`}>
              <p className="text-sm font-semibold text-slate-soft mb-1">Your BMI</p>
              <p className={`font-display font-extrabold text-6xl ${cat.color}`}>{result}</p>
              <p className={`font-semibold text-lg mt-1 ${cat.color}`}>{cat.label}</p>
              <GaugeBar bmi={result} />
              <p className="text-sm text-slate-mid mt-4 leading-relaxed">{cat.tip}</p>
            </div>
          )}
        </div>

        {/* Info section — good for SEO */}
        <div className="mt-10 space-y-4 text-slate-mid text-sm leading-relaxed">
          <h2 className="font-display font-bold text-xl text-slate-DEFAULT">What is BMI?</h2>
          <p>Body Mass Index (BMI) is a simple calculation using your height and weight. The formula is BMI = kg/m². It's widely used as a screening tool to indicate whether a person has a healthy body weight.</p>
          <div className="grid grid-cols-2 gap-3">
            {CATEGORIES.map(c => (
              <div key={c.label} className={`rounded-2xl border p-3 ${c.bg}`}>
                <p className={`font-semibold text-sm ${c.color}`}>{c.label}</p>
                <p className="text-xs text-slate-soft">BMI {c.max === Infinity ? '≥ 30' : `< ${c.max}`}</p>
              </div>
            ))}
          </div>
          <p className="text-xs text-slate-soft">BMI is a screening tool, not a diagnostic measure. Consult a healthcare professional for medical advice.</p>
        </div>

        <AdSlot slot="horizontal" className="mt-8" />
      </div>
    </PageWrapper>
  )
}
