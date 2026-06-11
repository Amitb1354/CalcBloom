import { useSEO } from '../useSEO'

export default function PageWrapper({ title, description, path, accent = 'mint', structuredData, children }) {
  useSEO({
    title: `${title} | CalcBloom`,
    description,
    path,
    structuredData,
  })

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
