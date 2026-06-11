import { useEffect } from 'react'

export default function PageWrapper({ title, description, accent = 'mint', children }) {
  useEffect(() => {
    document.title = `${title} | CalcBloom`
    const meta = document.querySelector('meta[name="description"]')
    if (meta) meta.setAttribute('content', description)
  }, [title, description])

  const accentBg = {
    mint:     'from-mint-light via-cream to-cream',
    peach:    'from-peach-light via-cream to-cream',
    lavender: 'from-lavender-light via-cream to-cream',
  }

  return (
    <div className={`min-h-screen bg-gradient-to-b ${accentBg[accent] || accentBg.mint}`}>
      {children}
    </div>
  )
}
