import Link from 'next/link'
import { Sparkles, Mail, MessageCircle, ExternalLink } from 'lucide-react'
import { SOCIAL_LINKS, products } from '@/lib/data'

export default function Footer() {
  return (
    <footer className="relative bg-[#020817] border-t border-slate-800/60">
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-emerald-500/40 to-transparent" />

      <div className="max-w-7xl mx-auto px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          <div className="md:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-emerald-500 to-emerald-700 flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-slate-800" />
              </div>
              <span className="font-playfair font-bold text-slate-800">FatimaZehraTopPicks</span>
            </Link>
            <p className="font-outfit text-sm text-slate-500 leading-relaxed mb-5">
              Premium health & wellness products for UK, USA & Canada — sourced directly from verified Alibaba suppliers.
            </p>
            <div className="flex gap-2 flex-wrap">
              {[
                { label:'TT', href:SOCIAL_LINKS.tiktok, title:'TikTok' },
                { label:'RD', href:SOCIAL_LINKS.reddit, title:'Reddit' },
                { label:'PT', href:SOCIAL_LINKS.pinterest, title:'Pinterest' },
                { label:'LT', href:"/shop-now", title:'Linktree' },
              ].map(s => (
                <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" title={s.title}
                  className="w-9 h-9 rounded-lg glass border border-slate-700 hover:border-emerald-500/50 hover:text-emerald-400 flex items-center justify-center text-slate-500 text-xs font-bold transition-all hover-scale">
                  {s.label}
                </a>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-space font-semibold text-slate-800 mb-4 text-sm uppercase tracking-wider">Navigation</h3>
            {['/', '/products', '/reviews', '/blog', '/about', '/contact'].map((href, i) => (
              <Link key={href} href={href}
                className="block font-outfit text-sm text-slate-500 hover:text-emerald-400 transition-colors py-1 hover:translate-x-1 transform duration-200">
                {['Home','Products','Reviews','Blog','About','Contact'][i]}
              </Link>
            ))}
          </div>

          <div>
            <h3 className="font-space font-semibold text-slate-800 mb-4 text-sm uppercase tracking-wider">Our Products</h3>
            {products.map(p => (
              <a key={p.id} href={p.affiliateLink} target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-1.5 font-outfit text-sm text-slate-500 hover:text-emerald-400 transition-colors py-1 group hover:translate-x-1 transform duration-200">
                <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0" />
                {p.shortName}
              </a>
            ))}
            <a href={"/shop-now"} target="_blank" rel="noopener noreferrer"
              className="mt-3 flex items-center gap-1.5 font-outfit text-xs text-emerald-400 hover:text-emerald-300 transition-colors">
              <ExternalLink className="w-3 h-3" /> All on Linktree
            </a>
          </div>

          <div>
            <h3 className="font-space font-semibold text-slate-800 mb-4 text-sm uppercase tracking-wider">Follow Us</h3>
            <a href={SOCIAL_LINKS.tiktok} target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-2 text-slate-500 hover:text-emerald-400 transition-colors font-outfit text-sm py-1 hover:translate-x-1 transform duration-200">
              🎵 TikTok — @hafiznaveedchuhan
            </a>
            <a href={SOCIAL_LINKS.reddit} target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-2 text-slate-500 hover:text-emerald-400 transition-colors font-outfit text-sm py-1 hover:translate-x-1 transform duration-200">
              🟠 Reddit — TheDealsDetective
            </a>
            <a href={SOCIAL_LINKS.pinterest} target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-2 text-slate-500 hover:text-emerald-400 transition-colors font-outfit text-sm py-1 hover:translate-x-1 transform duration-200">
              📌 Pinterest — TheDealsDetective
            </a>
            <a href={`mailto:${SOCIAL_LINKS.email}`}
              className="flex items-center gap-2 text-slate-500 hover:text-emerald-400 transition-colors font-outfit text-sm py-1 hover:translate-x-1 transform duration-200">
              <Mail className="w-3.5 h-3.5 flex-shrink-0" /> {SOCIAL_LINKS.email}
            </a>
            <a href={SOCIAL_LINKS.whatsapp} target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-2 text-slate-500 hover:text-emerald-400 transition-colors font-outfit text-sm py-1 hover:translate-x-1 transform duration-200">
              <MessageCircle className="w-3.5 h-3.5 flex-shrink-0" /> WhatsApp Chat
            </a>
            <div className="mt-4 pt-4 border-t border-slate-800">
              <p className="font-outfit text-xs text-slate-500 mb-2">Serving</p>
              <div className="flex gap-2 flex-wrap">
                {['🇬🇧 UK','🇺🇸 USA','🇨🇦 Canada'].map(c => (
                  <span key={c} className="px-2 py-1 rounded-lg glass border border-slate-700 text-xs font-outfit text-slate-600">{c}</span>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-slate-800/60 flex flex-col md:flex-row items-center justify-between gap-3">
          <p className="font-outfit text-slate-500 text-xs">© 2026 FatimaZehraTopPicks. All rights reserved.</p>
          <p className="font-outfit text-slate-600 text-xs text-center max-w-md">
            ⚠️ Affiliate Disclosure: We earn a commission on qualifying purchases through our Alibaba affiliate links. This does not affect the price you pay.
          </p>
        </div>
      </div>
    </footer>
  )
}
