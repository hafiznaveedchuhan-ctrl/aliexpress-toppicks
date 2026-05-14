import { Mail, MessageCircle, MapPin, ExternalLink, Heart } from 'lucide-react'
import { SOCIAL_LINKS, products } from '@/lib/data'

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-gradient-to-tl from-[#020817] via-[#0d1320] to-[#020817]">
      <section className="relative pt-32 pb-16 text-center overflow-hidden">
        <div className="absolute inset-0 bg-grid opacity-60" />
        <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[500px] h-[300px] bg-rose-500/5 rounded-full blur-3xl" />
        <div className="relative max-w-4xl mx-auto px-8">
          <span className="badge-pill glass border border-rose-500/20 text-rose-400 mb-4">📬 Get In Touch</span>
          <h1 className="font-playfair text-5xl font-bold text-slate-800 mb-4">
            Contact <span className="shimmer-gold">Us</span>
          </h1>
          <div className="divider divider-rose mx-auto mb-4" />
          <p className="font-outfit text-slate-500 text-lg">Questions? We respond within 24 hours via WhatsApp or email.</p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-8 pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">

          {/* Contact info */}
          <div className="space-y-5">
            <div className="glass rounded-3xl p-8 border border-slate-800 hover-lift hover-glow-green transition-all">
              <h2 className="font-playfair text-2xl font-bold text-slate-800 mb-6 flex items-center gap-2">
                <Heart className="w-5 h-5 text-rose-400" /> Reach Us Directly
              </h2>
              {[
                { icon: MessageCircle, label:'WhatsApp (Fastest)', val:'Chat Now — Instant Reply', href: SOCIAL_LINKS.whatsapp, color:'text-green-400', border:'hover:border-green-500/40' },
                { icon: Mail, label:'Email', val: SOCIAL_LINKS.email, href:`mailto:${SOCIAL_LINKS.email}`, color:'text-blue-400', border:'hover:border-blue-500/40' },
                { icon: MessageCircle, label:'TikTok', val:'@hafiznaveedchuhan', href: SOCIAL_LINKS.tiktok, color:'text-pink-400', border:'hover:border-pink-500/40' },
                { icon: MessageCircle, label:'Reddit', val:'u/TheDealsDetective', href: SOCIAL_LINKS.reddit, color:'text-orange-400', border:'hover:border-orange-500/40' },
                { icon: MessageCircle, label:'Pinterest', val:'TheDealsDetective', href: SOCIAL_LINKS.pinterest, color:'text-red-400', border:'hover:border-red-500/40' },
              ].map(({ icon: Icon, label, val, href, color, border }) => (
                <a key={label} href={href} target="_blank" rel="noopener noreferrer"
                  className={`flex items-center gap-4 p-4 rounded-xl bg-slate-800/40 border border-slate-700/50 ${border} transition-all hover-lift group mb-3`}>
                  <div className="w-10 h-10 rounded-xl glass-strong flex items-center justify-center">
                    <Icon className={`w-5 h-5 ${color}`} />
                  </div>
                  <div>
                    <p className="font-outfit text-xs text-slate-500">{label}</p>
                    <p className={`font-outfit text-sm font-semibold text-slate-800 group-hover:${color} transition-colors`}>{val}</p>
                  </div>
                  <ExternalLink className="w-4 h-4 text-slate-600 group-hover:text-slate-800 ml-auto transition-colors" />
                </a>
              ))}

              <div className="flex items-center gap-3 p-4 rounded-xl bg-slate-800/40 border border-slate-700/50">
                <div className="w-10 h-10 rounded-xl glass-strong flex items-center justify-center">
                  <MapPin className="w-5 h-5 text-emerald-400" />
                </div>
                <div>
                  <p className="font-outfit text-xs text-slate-500">Serving Countries</p>
                  <p className="font-outfit text-sm font-semibold text-slate-800">🇬🇧 UK | 🇺🇸 USA | 🇨🇦 Canada</p>
                </div>
              </div>
            </div>

            {/* Linktree */}
            <div className="glass rounded-3xl p-6 border border-emerald-500/20 hover-lift hover-glow-green transition-all">
              <p className="font-outfit text-sm text-slate-500 mb-4">Browse all 3 products on one page:</p>
              <a href="/shop-now" target="_blank" rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 py-3 btn-primary rounded-xl text-slate-800 font-outfit font-semibold text-sm w-full">
                Shop All Products <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Product Links */}
          <div className="space-y-5">
            <div className="glass rounded-3xl p-8 border border-slate-800">
              <h2 className="font-playfair text-2xl font-bold text-slate-800 mb-2">Shop Direct</h2>
              <p className="font-outfit text-sm text-slate-500 mb-6">Click any product below — goes straight to Alibaba with our affiliate link:</p>

              {products.map(p => {
                const btnC = p.badgeColor === 'rose' ? 'btn-rose' : p.badgeColor === 'violet' ? 'btn-violet' : 'btn-amber'
                const glowC = p.badgeColor === 'rose' ? 'hover-glow-rose' : p.badgeColor === 'violet' ? 'hover-glow-violet' : 'hover-glow-amber'
                return (
                  <div key={p.id} className={`glass rounded-2xl p-5 border border-slate-800 hover-lift ${glowC} transition-all mb-4`}>
                    <div className="flex items-start gap-4 mb-4">
                      <span className="text-3xl">{p.emoji}</span>
                      <div className="flex-1">
                        <h3 className="font-playfair text-lg font-bold text-slate-800">{p.name}</h3>
                        <p className="font-outfit text-sm text-slate-500">{p.tagline}</p>
                        <p className="font-playfair text-xl font-bold shimmer-gold mt-1">{p.price}</p>
                      </div>
                    </div>
                    <a href={p.affiliateLink} target="_blank" rel="noopener noreferrer"
                      className={`${btnC} rounded-xl py-3 text-slate-800 font-outfit font-bold flex items-center justify-center gap-2 text-sm w-full`}>
                      Buy {p.shortName} on Alibaba <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                    <p className="font-mono text-xs text-slate-600 mt-2 text-center truncate">{p.affiliateLink}</p>
                  </div>
                )
              })}
            </div>
          </div>
        </div>

        {/* FAQ */}
        <div className="mt-20">
          <h2 className="font-playfair text-3xl font-bold text-slate-800 text-center mb-10">
            Common <span className="shimmer-green">Questions</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl mx-auto">
            {[
              { q:"Are these genuine Alibaba products?", a:"Yes! All sourced from verified Alibaba suppliers with Trade Assurance, 4+ star ratings, and thousands of reviews." },
              { q:"Do UK, USA and Canada customers get shipping?", a:"Absolutely! All products ship internationally with free or low-cost shipping. Delivery: 7–21 business days." },
              { q:"What if my order has an issue?", a:"All orders are covered by Alibaba's Trade Assurance. Contact us via WhatsApp and we'll help resolve any issues." },
              { q:"Do you earn commission from these links?", a:"Yes — we earn a small commission at no extra cost to you. Your support helps us create more helpful content!" },
            ].map(({ q, a }) => (
              <div key={q} className="glass rounded-2xl p-6 border border-slate-800 hover-lift hover-glow-green transition-all group">
                <h3 className="font-space text-base font-semibold text-slate-800 mb-2 group-hover:text-emerald-400 transition-colors">{q}</h3>
                <p className="font-outfit text-sm text-slate-500 leading-relaxed">{a}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
