'use client'
import { useState } from 'react'
import { ExternalLink, ShoppingCart, ChevronDown, ChevronUp, Star, Shield, Truck, Zap } from 'lucide-react'
import { products } from '@/lib/data'

const faqs: Record<number, { q: string; a: string }[]> = {
  1: [
    { q: "Does the LED Face Mask really work for acne?", a: "Yes! The blue 415nm light kills acne-causing bacteria deep in pores. Clinical studies show 77% reduction in acne lesions after 4 weeks of daily 10-minute sessions. Thousands of customers have seen visible results within 2 weeks." },
    { q: "How long until I see results from LED therapy?", a: "Most users notice brighter, clearer skin within 7 days. Anti-aging benefits like reduced fine lines and improved collagen typically become visible after 4-6 weeks of consistent use — 10 minutes daily is all it takes." },
    { q: "Is this LED mask safe for sensitive skin?", a: "Absolutely. Our LED mask uses clinically proven wavelengths with zero UV rays, making it completely safe for all skin types including sensitive skin. It carries CE, UKCA, and ISO certifications for peace of mind." },
  ],
  2: [
    { q: "Will the posture corrector help with my back pain?", a: "Yes — it's specifically designed for desk workers and WFH professionals. The smart vibration alert triggers when you slouch, retraining your muscles over 2-3 weeks. 89% of users report significant back pain relief within 14 days." },
    { q: "Can I wear it under my clothes to work?", a: "Absolutely! At just 85g and made from breathable mesh fabric, it's completely invisible under a shirt or blouse. No one in your office will know you're wearing it — only that your posture suddenly looks amazing." },
    { q: "How long should I wear it each day?", a: "Start with 30 minutes daily for the first week, then increase to 2 hours as your muscles adapt. Most users reach 4+ hours daily by week 3. The 30-hour battery means you only charge it every few days." },
  ],
  3: [
    { q: "Is this massage gun as powerful as a Theragun?", a: "Our massage gun delivers 2400-3200 RPM with 30 speed levels — matching Theragun Pro specs at a fraction of the price. It uses the same percussion therapy technology trusted by professional athletes and physios worldwide." },
    { q: "How quiet is the massage gun during use?", a: "Incredibly quiet at just 40dB — quieter than a normal conversation. You can use it while watching TV or at the gym without disturbing anyone. The brushless motor technology is what makes this possible at this price point." },
    { q: "What muscles can I target with the 6 attachments?", a: "The 6 professional heads cover every muscle group: ball head for large muscles, flat head for dense tissue, bullet head for trigger points, fork head for spine & Achilles, paddle head for back, and round head for general use." },
  ],
  4: [
    { q: "Is this Father's Day Gift Set worth the price?", a: "Absolutely — you get a premium quartz watch, genuine leather wallet, stainless steel keychain, AND signature cologne all in luxury gift box packaging for just $12-14. Comparable gift sets in retail stores cost $50-80. It's the best value Father's Day gift on the market." },
    { q: "How long does shipping take to UK, USA & Canada?", a: "Express shipping takes 7-15 business days to UK/USA/Canada. Standard shipping is 15-25 days. The supplier is a verified Alibaba vendor with a 25% reorder rate — meaning customers love it enough to buy again." },
    { q: "Can I get this in different colors?", a: "Yes! The Business Gift Set comes in Burgundy and Black. Both colors feature the same premium quartz watch, genuine leather wallet, stainless steel keychain and cologne set — just in different elegant colorways to suit different styles." },
  ],
}

export default function ShopNowPage() {
  return (
    <div className="min-h-screen" style={{background: 'linear-gradient(135deg, #0a0a0a 0%, #0d1117 40%, #0a0f1e 100%)'}}>

      {/* Hero */}
      <section className="relative pt-32 pb-16 text-center overflow-hidden">
        {/* Background Video */}
        <video
          autoPlay muted loop playsInline
          className="absolute inset-0 w-full h-full object-cover"
          style={{opacity: 0.3, filter: 'blur(2px) brightness(0.5) saturate(0.8)'}}>
          <source src="https://videos.pexels.com/video-files/8342158/8342158-hd_1080_1920_30fps.mp4" type="video/mp4" />
        </video>
        {/* Overlay */}
        <div className="absolute inset-0" style={{background: 'linear-gradient(135deg, rgba(0,0,0,0.85) 0%, rgba(10,15,30,0.75) 50%, rgba(0,0,0,0.9) 100%)'}} />
        <div className="absolute inset-0" style={{backgroundImage: 'radial-gradient(ellipse at 50% 50%, rgba(16,185,129,0.08) 0%, transparent 70%)'}} />
        <div className="relative max-w-4xl mx-auto px-8">
          <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full border border-emerald-400/30 text-emerald-400 font-outfit text-sm mb-6"
            style={{background: 'rgba(16,185,129,0.08)'}}>
            <Zap className="w-4 h-4" />
            <span>Direct Alibaba Links · Affiliate Tracked · Best Prices</span>
          </div>
          <h1 className="font-playfair text-5xl md:text-6xl font-bold text-slate-800 mb-4">
            Shop <span style={{background: 'linear-gradient(135deg, #10b981, #34d399)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent'}}>Now</span>
          </h1>
          <p className="font-outfit text-lg mb-3" style={{color: '#94a3b8'}}>
            Click any product below — goes straight to Alibaba with our affiliate link.
          </p>
          <div className="flex flex-wrap justify-center gap-6 mt-8">
            {[
              { icon: Shield, text: 'Verified Suppliers' },
              { icon: Truck, text: 'Ships UK/USA/CA' },
              { icon: Star, text: '4.6-4.9 Rated' },
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-2 font-outfit text-sm" style={{color: '#64748b'}}>
                <item.icon className="w-4 h-4" style={{color: '#10b981'}} />
                {item.text}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Products */}
      <section className="max-w-4xl mx-auto px-8 pb-24 space-y-10">
        {products.map((p, idx) => (
          <ProductShopCard key={p.id} product={p} index={idx} faqs={faqs[p.id] || []} />
        ))}
      </section>

      {/* Disclosure */}
      <div className="text-center pb-12 px-8">
        <p className="font-outfit text-xs" style={{color: '#334155'}}>
          ⚠️ Affiliate Disclosure: We earn a small commission when you purchase through our links. Your price stays exactly the same.
        </p>
      </div>
    </div>
  )
}

function ProductShopCard({ product: p, index, faqs }: {
  product: typeof products[0]; index: number; faqs: { q: string; a: string }[]
}) {
  const [imgSrc, setImgSrc] = useState(p.images[0])
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  const accentColors: Record<string, string> = {
    rose: '#f43f5e', violet: '#8b5cf6', amber: '#f59e0b', emerald: '#10b981'
  }
  const accent = accentColors[p.badgeColor] || '#10b981'

  return (
    <div className="rounded-3xl overflow-hidden" style={{background: 'rgba(255,255,255,0.03)', border: `1px solid ${accent}30`}}>

      {/* Top accent line */}
      <div className="h-1 w-full" style={{background: `linear-gradient(90deg, ${accent}, transparent)`}} />

      <div className="p-8">
        {/* Product Header */}
        <div className="flex flex-col md:flex-row gap-8 mb-8">
          {/* Image */}
          <div className="w-full md:w-56 h-56 rounded-2xl overflow-hidden flex-shrink-0"
            style={{border: `1px solid ${accent}20`}}>
            <img src={imgSrc} alt={p.name} className="w-full h-full object-cover"
              onError={() => setImgSrc(p.fallback)} />
          </div>

          {/* Info */}
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <span className="text-3xl">{p.emoji}</span>
              <span className="font-outfit text-xs uppercase tracking-widest px-3 py-1 rounded-full"
                style={{color: accent, background: `${accent}15`, border: `1px solid ${accent}30`}}>
                {p.category}
              </span>
            </div>
            <h2 className="font-playfair text-2xl font-bold text-slate-800 mb-2">{p.name}</h2>
            <p className="font-outfit text-sm mb-4" style={{color: '#94a3b8'}}>{p.tagline}</p>

            <div className="flex items-center gap-1 mb-4">
              {[...Array(Math.floor(p.rating))].map((_, i) => (
                <Star key={i} className="w-4 h-4" style={{fill: '#fbbf24', color: '#fbbf24'}} />
              ))}
              <span className="font-outfit text-sm ml-2" style={{color: '#64748b'}}>{p.rating} · {p.reviews.toLocaleString()} reviews</span>
            </div>

            <div className="flex items-end gap-4 mb-6">
              <div>
                <p className="font-outfit text-xs mb-1" style={{color: '#64748b'}}>Price</p>
                <p className="font-playfair text-3xl font-bold text-slate-800">{p.price}</p>
                <p className="font-outfit text-xs mt-1" style={{color: '#64748b'}}>{p.priceNote}</p>
              </div>
              <div className="ml-4">
                <p className="font-outfit text-xs mb-1" style={{color: '#64748b'}}>Affiliate ID</p>
                <p className="font-mono text-sm" style={{color: accent}}>{p.affiliateId}</p>
              </div>
            </div>

            <a href={p.affiliateLink} target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-8 py-4 rounded-2xl text-slate-800 font-outfit font-bold text-base transition-all hover:scale-105"
              style={{background: `linear-gradient(135deg, ${accent}, ${accent}cc)`, boxShadow: `0 8px 32px ${accent}30`}}>
              <ShoppingCart className="w-5 h-5" />
              Buy on Alibaba
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* Features */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-8">
          {p.features.map((f, i) => (
            <div key={i} className="flex items-start gap-2 font-outfit text-sm" style={{color: '#94a3b8'}}>
              <span style={{color: accent}} className="mt-0.5">✓</span> {f}
            </div>
          ))}
        </div>

        {/* FAQs */}
        <div>
          <h3 className="font-playfair text-lg font-bold text-slate-800 mb-4">
            Frequently Asked Questions
          </h3>
          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <div key={i} className="rounded-xl overflow-hidden"
                style={{border: `1px solid ${accent}20`, background: 'rgba(255,255,255,0.02)'}}>
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between p-4 text-left font-outfit font-semibold text-slate-800 text-sm hover:text-emerald-400 transition-colors">
                  <span>{faq.q}</span>
                  {openFaq === i
                    ? <ChevronUp className="w-4 h-4 flex-shrink-0 ml-2" style={{color: accent}} />
                    : <ChevronDown className="w-4 h-4 flex-shrink-0 ml-2" style={{color: '#64748b'}} />
                  }
                </button>
                {openFaq === i && (
                  <div className="px-4 pb-4 font-outfit text-sm leading-relaxed" style={{color: '#94a3b8'}}>
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
