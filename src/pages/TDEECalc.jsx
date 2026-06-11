import { useState } from 'react'
import PageWrapper from '../components/PageWrapper'
import AdSlot from '../components/AdSlot'

const ACTIVITY = [
  { val: 1.2,   label: 'Sedentary',       desc: 'Little to no exercise' },
  { val: 1.375, label: 'Lightly active',  desc: 'Light exercise 1–3 days/week' },
  { val: 1.55,  label: 'Moderately active', desc: 'Moderate exercise 3–5 days/week' },
  { val: 1.725, label: 'Very active',     desc: 'Hard exercise 6–7 days/week' },
  { val: 1.9,   label: 'Extremely active', desc: 'Physical job + hard training' },
]

function calcTDEE({ age, weight, height, gender, activity, unit }) {
  let w = parseFloat(weight), h = parseFloat(height)
  if (unit === 'imperial') { w = w * 0.453592; h = h * 2.54 }
  const a = parseFloat(age)
  if (!w || !h || !a) return null

  // Mifflin-St Jeor
  const bmr = gender === 'male'
    ? (10 * w) + (6.25 * h) - (5 * a) + 5
    : (10 * w) + (6.25 * h) - (5 * a) - 161

  const tdee = Math.round(bmr * activity)
  return {
    tdee,
    bmr:     Math.round(bmr),
    lose2:   Math.round(tdee - 1000),
    lose1:   Math.round(tdee - 500),
    maintain: tdee,
    gain:    Math.round(tdee + 500),
    protein: Math.round(w * 2.2 * 0.8),  // 0.8g per lb lean
    carbs:   Math.round((tdee * 0.45) / 4),
    fat:     Math.round((tdee * 0.25) / 9),
  }
}

const GOALS = [
  { key: 'lose2',   label: 'Lose weight fast',  sub: '~2 lbs/week', color: 'text-blue-500' },
  { key: 'lose1',   label: 'Lose weight',        sub: '~1 lb/week',  color: 'text-mint-DEFAULT' },
  { key: 'maintain',label: 'Maintain weight',    sub: 'Stay the same', color: 'text-slate-DEFAULT' },
  { key: 'gain',    label: 'Build muscle',       sub: '~1 lb/week',  color: 'text-peach-DEFAULT' },
]

export default function TDEECalc() {
  const [unit, setUnit]       = useState('metric')
  const [gender, setGender]   = useState('male')
  const [age, setAge]         = useState('')
  const [weight, setWeight]   = useState('')
  const [height, setHeight]   = useState('')
  const [activity, setActivity] = useState(1.55)
  const [result, setResult]   = useState(null)

  const handleCalc = () => {
    const r = calcTDEE({ age, weight, height, gender, activity, unit })
    setResult(r)
  }

  return (
    <PageWrapper title="TDEE Calculator" description="Calculate your Total Daily Energy Expenditure (TDEE) — how many calories you burn per day. Free TDEE calculator with BMR, macros, and weight loss goals." accent="mint">
      <div className="max-w-xl mx-auto px-4 py-12">
        <div className="text-center mb-8">
          <div className="w-14 h-14 bg-mint-light border border-mint-mid rounded-2xl flex items-center justify-center text-3xl mx-auto mb-4">🔥</div>
          <h1 className="font-display font-extrabold text-4xl text-slate-DEFAULT mb-2">TDEE Calculator</h1>
          <p className="text-slate-mid">Discover exactly how many calories your body burns daily.</p>
        </div>

        <AdSlot slot="horizontal" className="mb-6" />

        <div className="card p-6 md:p-8">
          {/* Unit + gender */}
          <div className="grid grid-cols-2 gap-3 mb-5">
            <div>
              <p className="text-xs font-semibold text-slate-soft mb-1.5">Units</p>
              <div className="flex bg-cream rounded-xl p-0.5">
                {['metric','imperial'].map(u => (
                  <button key={u} onClick={() => { setUnit(u); setResult(null) }}
                    className={`flex-1 py-1.5 rounded-lg text-xs font-semibold capitalize transition-all ${unit === u ? 'bg-white text-slate-DEFAULT shadow-sm' : 'text-slate-soft'}`}>
                    {u}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <p className="text-xs font-semibold text-slate-soft mb-1.5">Biological sex</p>
              <div className="flex bg-cream rounded-xl p-0.5">
                {['male','female'].map(g => (
                  <button key={g} onClick={() => { setGender(g); setResult(null) }}
                    className={`flex-1 py-1.5 rounded-lg text-xs font-semibold capitalize transition-all ${gender === g ? 'bg-white text-slate-DEFAULT shadow-sm' : 'text-slate-soft'}`}>
                    {g}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="grid grid-cols-3 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-mid mb-1.5">Age</label>
                <input type="number" className="input-field" placeholder="25"
                  value={age} onChange={e => { setAge(e.target.value); setResult(null) }} />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-mid mb-1.5">Weight ({unit === 'metric' ? 'kg' : 'lbs'})</label>
                <input type="number" className="input-field" placeholder={unit === 'metric' ? '70' : '154'}
                  value={weight} onChange={e => { setWeight(e.target.value); setResult(null) }} />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-mid mb-1.5">Height ({unit === 'metric' ? 'cm' : 'in'})</label>
                <input type="number" className="input-field" placeholder={unit === 'metric' ? '175' : '69'}
                  value={height} onChange={e => { setHeight(e.target.value); setResult(null) }} />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-mid mb-2">Activity level</label>
              <div className="space-y-2">
                {ACTIVITY.map(a => (
                  <button key={a.val} onClick={() => { setActivity(a.val); setResult(null) }}
                    className={`w-full text-left px-4 py-2.5 rounded-xl border text-sm transition-all ${
                      activity === a.val
                        ? 'bg-mint-light border-mint-mid text-mint-DEFAULT font-semibold'
                        : 'bg-cream border-slate-100 text-slate-mid hover:border-mint-mid'
                    }`}>
                    <span className="font-semibold">{a.label}</span>
                    <span className="text-slate-soft text-xs ml-2">{a.desc}</span>
                  </button>
                ))}
              </div>
            </div>

            <button onClick={handleCalc} className="calc-btn">Calculate TDEE</button>
          </div>

          {result && (
            <div className="mt-6 space-y-4 animate-pop-in">
              {/* Main result */}
              <div className="result-pill">
                <p className="text-sm font-semibold text-slate-soft mb-1">Your TDEE</p>
                <p className="font-display font-extrabold text-6xl text-mint-DEFAULT">{result.tdee.toLocaleString()}</p>
                <p className="text-slate-mid font-medium">calories / day to maintain weight</p>
                <p className="text-xs text-slate-soft mt-1">BMR: {result.bmr.toLocaleString()} cal</p>
              </div>

              {/* Goals grid */}
              <div className="grid grid-cols-2 gap-3">
                {GOALS.map(g => (
                  <div key={g.key} className="bg-cream rounded-2xl p-4 border border-slate-100">
                    <p className={`font-display font-bold text-xl ${g.color}`}>{result[g.key].toLocaleString()}</p>
                    <p className="text-xs font-semibold text-slate-mid">{g.label}</p>
                    <p className="text-xs text-slate-soft">{g.sub}</p>
                  </div>
                ))}
              </div>

              {/* Macro estimate */}
              <div className="bg-cream rounded-2xl p-4 border border-slate-100">
                <p className="text-sm font-semibold text-slate-mid mb-3">Estimated daily macros</p>
                <div className="grid grid-cols-3 gap-2 text-center">
                  {[
                    { label: 'Protein', val: result.protein, unit: 'g', color: 'text-peach-DEFAULT' },
                    { label: 'Carbs',   val: result.carbs,   unit: 'g', color: 'text-lavender-DEFAULT' },
                    { label: 'Fat',     val: result.fat,     unit: 'g', color: 'text-mint-DEFAULT' },
                  ].map(m => (
                    <div key={m.label}>
                      <p className={`font-display font-bold text-2xl ${m.color}`}>{m.val}{m.unit}</p>
                      <p className="text-xs text-slate-soft">{m.label}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="mt-10 space-y-3 text-slate-mid text-sm leading-relaxed">
          <h2 className="font-display font-bold text-xl text-slate-DEFAULT">What is TDEE?</h2>
          <p>TDEE stands for Total Daily Energy Expenditure. It's the total number of calories your body burns in a day, including your base metabolic rate (BMR) plus all physical activity. Eating below your TDEE creates a calorie deficit for weight loss; eating above it supports muscle gain.</p>
          <p>This calculator uses the Mifflin-St Jeor equation, considered the most accurate formula for estimating BMR for most people.</p>
        </div>

        <AdSlot slot="horizontal" className="mt-8" />
      </div>
    </PageWrapper>
  )
}
