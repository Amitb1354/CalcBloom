import { useState } from 'react'
import PageWrapper from '../components/PageWrapper'
import AdSlot from '../components/AdSlot'

const DAYS_OF_WEEK = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday']
const MONTHS = ['January','February','March','April','May','June','July','August','September','October','November','December']

function calcAge(dob) {
  const today = new Date()
  const birth = new Date(dob)
  if (isNaN(birth.getTime()) || birth > today) return null

  let years  = today.getFullYear() - birth.getFullYear()
  let months = today.getMonth()    - birth.getMonth()
  let days   = today.getDate()     - birth.getDate()

  if (days < 0) {
    months--
    const prevMonth = new Date(today.getFullYear(), today.getMonth(), 0)
    days += prevMonth.getDate()
  }
  if (months < 0) { years--; months += 12 }

  const totalDays = Math.floor((today - birth) / 86400000)
  const totalWeeks = Math.floor(totalDays / 7)
  const totalMonths = years * 12 + months

  const nextBday = new Date(today.getFullYear(), birth.getMonth(), birth.getDate())
  if (nextBday <= today) nextBday.setFullYear(today.getFullYear() + 1)
  const daysUntilBday = Math.ceil((nextBday - today) / 86400000)

  return {
    years, months, days,
    totalDays, totalWeeks, totalMonths,
    dayOfWeek: DAYS_OF_WEEK[birth.getDay()],
    birthMonth: MONTHS[birth.getMonth()],
    daysUntilBday,
    nextBdayYear: nextBday.getFullYear(),
  }
}

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      "name": "Age Calculator",
      "url": "https://calcbloom1.vercel.app/age",
      "description": "Free online age calculator. Find your exact age in years, months, days, weeks and total days from your date of birth.",
      "applicationCategory": "UtilityApplication",
      "operatingSystem": "All",
      "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" }
    },
    {
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "How do I calculate my exact age?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Enter your date of birth into the age calculator above and click Calculate Age. The tool will instantly show your exact age in years, months, and days, plus your total days and weeks lived and how many days until your next birthday."
          }
        },
        {
          "@type": "Question",
          "name": "What day of the week was I born?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Enter your date of birth in our age calculator and it will tell you which day of the week you were born — whether that's Monday, Tuesday, or any other day."
          }
        },
        {
          "@type": "Question",
          "name": "How many days old am I?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Use our age calculator by entering your birthdate. It calculates the exact number of days you have been alive, updated to today's date."
          }
        }
      ]
    }
  ]
}

export default function AgeCalculator() {
  const [dob, setDob] = useState('')
  const [result, setResult] = useState(null)
  const [error, setError]   = useState('')

  const calculate = () => {
    setError('')
    if (!dob) { setError('Please enter your date of birth.'); return }
    const r = calcAge(dob)
    if (!r) { setError('Date must be in the past.'); return }
    setResult(r)
  }

  const today = new Date().toISOString().split('T')[0]

  return (
    <PageWrapper
      title="Age Calculator"
      description="Calculate your exact age in years, months and days from your date of birth. Find out what day you were born and how many days until your next birthday. Free and instant."
      path="/age"
      accent="peach"
      structuredData={structuredData}
    >
      <div className="max-w-xl mx-auto px-4 py-12">
        <div className="text-center mb-8">
          <div className="w-14 h-14 bg-peach-light border border-peach-mid rounded-2xl flex items-center justify-center text-3xl mx-auto mb-4" aria-hidden="true">🎂</div>
          <h1 className="font-display font-extrabold text-4xl text-slate-DEFAULT mb-2">Age Calculator</h1>
          <p className="text-slate-mid">Your exact age — down to the day.</p>
        </div>

        <AdSlot slot="horizontal" className="mb-6" />

        <div className="card p-6 md:p-8">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-slate-mid mb-1.5" htmlFor="dob-input">Date of birth</label>
              <input id="dob-input" type="date" className="input-field" max={today}
                value={dob} onChange={e => { setDob(e.target.value); setResult(null); setError('') }} />
            </div>
            {error && <p className="text-peach-DEFAULT text-sm" role="alert">{error}</p>}
            <button onClick={calculate} className="calc-btn" style={{ background: '#F4845F' }}>Calculate Age</button>
          </div>

          {result && (
            <div className="result-pill mt-6 bg-peach-light border-peach-mid" role="region" aria-label="Age result" aria-live="polite">
              <p className="text-sm font-semibold text-slate-soft mb-2">You are</p>
              <p className="font-display font-extrabold text-5xl text-peach-DEFAULT">
                {result.years} <span className="text-2xl">years</span>
              </p>
              <p className="text-slate-mid font-medium mt-1">
                {result.months} months · {result.days} days
              </p>

              <div className="grid grid-cols-3 gap-3 mt-5">
                {[
                  { val: result.totalDays.toLocaleString(), label: 'Total days' },
                  { val: result.totalWeeks.toLocaleString(), label: 'Total weeks' },
                  { val: result.totalMonths.toLocaleString(), label: 'Total months' },
                ].map(s => (
                  <div key={s.label} className="bg-white rounded-2xl py-3 px-2">
                    <p className="font-display font-bold text-xl text-slate-DEFAULT">{s.val}</p>
                    <p className="text-xs text-slate-soft">{s.label}</p>
                  </div>
                ))}
              </div>

              <div className="mt-4 bg-white rounded-2xl p-4 text-left space-y-2">
                <p className="text-sm text-slate-mid">
                  <span className="font-semibold text-slate-DEFAULT">Born on a</span> {result.dayOfWeek} in {result.birthMonth}
                </p>
                <p className="text-sm text-slate-mid">
                  <span className="font-semibold text-slate-DEFAULT">Next birthday</span>{' '}
                  {result.daysUntilBday === 0 ? '🎉 Today!' : `in ${result.daysUntilBday} days`} ({result.nextBdayYear})
                </p>
              </div>
            </div>
          )}
        </div>

        <div className="mt-10 space-y-4 text-slate-mid text-sm leading-relaxed">
          <h2 className="font-display font-bold text-xl text-slate-DEFAULT">When do you need an age calculator?</h2>
          <p>Passport and visa applications, insurance forms, school enrollment, pension calculations, and legal documents often require your exact age. This tool gives you the precise answer instantly — in years, months, and days, with no manual counting required.</p>

          <h2 className="font-display font-bold text-xl text-slate-DEFAULT pt-2">Frequently asked questions</h2>

          <details className="border border-slate-100 rounded-2xl p-4 cursor-pointer">
            <summary className="font-semibold text-slate-DEFAULT">How do I calculate my exact age?</summary>
            <p className="mt-2">Simply enter your date of birth above and press Calculate Age. The result shows your age in years, months, and days as of today.</p>
          </details>

          <details className="border border-slate-100 rounded-2xl p-4 cursor-pointer">
            <summary className="font-semibold text-slate-DEFAULT">What day of the week was I born?</summary>
            <p className="mt-2">Our calculator automatically tells you the day of the week for any birthdate — just enter your date of birth and the result will show it alongside your age.</p>
          </details>

          <details className="border border-slate-100 rounded-2xl p-4 cursor-pointer">
            <summary className="font-semibold text-slate-DEFAULT">How many days old am I?</summary>
            <p className="mt-2">The calculator shows your total number of days lived, total weeks, and total months, updated to today's date.</p>
          </details>
        </div>

        <AdSlot slot="horizontal" className="mt-8" />
      </div>
    </PageWrapper>
  )
}
