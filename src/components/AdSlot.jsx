// AdSense Ad Slot Component
// Replace YOUR_AD_SLOT_ID with real slot IDs from your AdSense dashboard
// Uncomment the ins tag and script once you have AdSense approval

export default function AdSlot({ slot = 'horizontal', className = '' }) {
  const sizes = {
    horizontal: 'h-24 w-full',
    square:     'h-64 w-full max-w-xs mx-auto',
    vertical:   'h-[600px] w-36',
  }
  return (
    <div className={`${sizes[slot]} ${className} bg-slate-50 border border-dashed border-slate-200 rounded-2xl flex items-center justify-center`}>
      <span className="text-slate-soft text-xs font-medium tracking-wide uppercase">Ad</span>
      {/* Uncomment when AdSense approved:
      <ins
        className="adsbygoogle"
        style={{ display: 'block' }}
        data-ad-client="ca-pub-XXXXXXXXXXXXXXXX"
        data-ad-slot="XXXXXXXXXX"
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
      <script>(adsbygoogle = window.adsbygoogle || []).push({});</script>
      */}
    </div>
  )
}
