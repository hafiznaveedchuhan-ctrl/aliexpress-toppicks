'use client'
import { useState } from 'react'
import { Star, Check, ShoppingCart, ExternalLink, Shield, Truck, Award, ChevronLeft, ChevronRight } from 'lucide-react'
import { products, SOCIAL_LINKS } from '@/lib/data'

export default function ProductsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#020817] via-[#0a0f20] to-[#020817]">
      {/* Header — violet accent theme */}
      <section className="relative pt-32 pb-16 text-center overflow-hidden">
        <div className="absolute inset-0 bg-dots opacity-50" />
        <div className="absolute top-20 left-1/3 w-72 h-72 bg-violet-500/8 rounded-full blur-3xl" />
        <div className="absolute top-20 right-1/3 w-72 h-72 bg-rose-500/6 rounded-full blur-3xl" />
        <div className="relative max-w-4xl mx-auto px-8">
          <span className="badge-pill glass border border-violet-500/20 text-violet-400 mb-4">🛍️ All Products</span>
          <h1 className="font-playfair text-5xl font-bold text-white mb-4">
            Our <span className="shimmer-gold">Premium</span> Collection
          </h1>
          <div className="divider divider-violet mx-auto mb-4" />
          <p className="font-outfit text-slate-400 text-lg">
            4 premium products. Verified Alibaba suppliers. Shipped to UK, USA & Canada.
          </p>
          <div className="flex flex-wrap gap-2 justify-center mt-6">
            {products.map(p => (
              <a key={p.id} href={`#product-${p.id}`}
                className="px-4 py-2 rounded-full glass border border-slate-700 font-outfit text-sm text-slate-300 hover:text-white hover:border-violet-500/40 transition-all hover-scale">
                {p.emoji} {p.shortName}
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Products — alternating design */}
      <section className="max-w-7xl mx-auto px-8 pb-24 space-y-24">
        {products.map((p, idx) => (
          <ProductDetail key={p.id} product={p} reverse={idx % 2 === 1} />
        ))}
      </section>

      {/* All-in-one links block */}
      <section className="py-16 bg-slate-900/50 border-t border-slate-800">
        <div className="max-w-4xl mx-auto px-8 text-center">
          <h2 className="font-playfair text-3xl font-bold text-white mb-3">
            Shop All <span className="shimmer-green">4 Products</span>
          </h2>
          <p className="font-outfit text-slate-400 mb-8">Each link contains your affiliate ID <span className="font-mono text-emerald-400">lrccn27i</span> — commission tracked automatically</p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
            {products.map(p => {
              const btnC = p.badgeColor === 'rose' ? 'btn-rose' : p.badgeColor === 'violet' ? 'btn-violet' : p.badgeColor === 'emerald' ? 'btn-primary' : 'btn-amber'
              return (
                <a key={p.id} href={p.affiliateLink} target="_blank" rel="noopener noreferrer"
                  className={`${btnC} rounded-xl py-4 px-5 text-white font-outfit font-bold flex items-center justify-center gap-2 text-sm`}>
                  <span>{p.emoji}</span> {p.shortName} <ExternalLink className="w-3.5 h-3.5" />
                </a>
              )
            })}
          </div>
          <a href={SOCIAL_LINKS.linktree} target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-3 btn-primary rounded-xl text-white font-outfit font-semibold">
            All Links on Linktree <ExternalLink className="w-4 h-4" />
          </a>
          <p className="font-outfit text-xs text-slate-600 mt-6">
            ⚠️ Affiliate Disclosure: We earn a commission when you buy through our links. Your price stays the same.
          </p>
        </div>
      </section>
    </div>
  )
}

function ProductDetail({ product: p, reverse }: { product: typeof products[0]; reverse: boolean }) {
  const [activeImg, setActiveImg] = useState(0)
  const [imgSrc, setImgSrc] = useState(p.images[0])
  const btnC = p.badgeColor === 'rose' ? 'btn-rose' : p.badgeColor === 'violet' ? 'btn-violet' : p.badgeColor === 'emerald' ? 'btn-primary' : 'btn-amber'
  const glowC = p.badgeColor === 'rose' ? 'hover-glow-rose' : p.badgeColor === 'violet' ? 'hover-glow-violet' : p.badgeColor === 'emerald' ? 'hover-glow-green' : 'hover-glow-amber'
  const divC = p.badgeColor === 'rose' ? 'divider-rose' : p.badgeColor === 'violet' ? 'divider-violet' : p.badgeColor === 'emerald' ? 'divider' : 'divider-amber'
  const borderC = p.badgeColor === 'rose' ? 'border-rose-500/20 hover:border-rose-500/40' : p.badgeColor === 'violet' ? 'border-violet-500/20 hover:border-violet-500/40' : p.badgeColor === 'emerald' ? 'border-emerald-500/20 hover:border-emerald-500/40' : 'border-amber-500/20 hover:border-amber-500/40'

  const prevImg = () => { const i = (activeImg - 1 + p.images.length) % p.images.length; setActiveImg(i); setImgSrc(p.images[i]); }
  const nextImg = () => { const i = (activeImg + 1) % p.images.length; setActiveImg(i); setImgSrc(p.images[i]); }

  return (
    <div id={`product-${p.id}`} className={`grid grid-cols-1 lg:grid-cols-2 gap-14 items-start ${reverse ? 'lg:[&>*:first-child]:order-2' : ''}`}>
      {/* Image gallery */}
      <div className="space-y-4">
        <div className={`relative rounded-3xl overflow-hidden glass border ${borderC} transition-all ${glowC} aspect-square max-w-lg mx-auto lg:mx-0`}>
          <img src={imgSrc} alt={p.name} className="w-full h-full object-cover img-hover"
            onError={() => setImgSrc(p.fallback)} />
          <div className="absolute inset-0 bg-gradient-to-t from-[#020817]/60 via-transparent to-transparent pointer-events-none" />

          {/* Badge */}
          <div className="absolute top-4 left-4">
            <span className="px-3 py-1.5 rounded-full glass border border-white/10 text-sm font-outfit font-bold text-white">{p.badge}</span>
          </div>

          {/* Nav arrows */}
          {p.images.length > 1 && (
            <>
              <button onClick={prevImg} className="absolute left-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full glass-strong flex items-center justify-center text-white hover:text-emerald-400 transition-colors">
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button onClick={nextImg} className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full glass-strong flex items-center justify-center text-white hover:text-emerald-400 transition-colors">
                <ChevronRight className="w-4 h-4" />
              </button>
            </>
          )}

          {/* Rating pill */}
          <div className="absolute bottom-4 right-4 flex items-center gap-1.5 px-3 py-1.5 rounded-full glass-strong border border-amber-500/20">
            <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
            <span className="font-space text-sm text-white font-bold">{p.rating}</span>
          </div>
        </div>

        {/* Thumbnails */}
        <div className="flex gap-2 max-w-lg mx-auto lg:mx-0 flex-wrap">
          {p.images.slice(0, 5).map((img, i) => (
            <button key={i} onClick={() => { setActiveImg(i); setImgSrc(img); }}
              className={`w-14 h-14 rounded-xl overflow-hidden border-2 transition-all hover-scale ${i === activeImg ? 'border-emerald-500 shadow-lg shadow-emerald-500/30' : 'border-slate-700 opacity-60 hover:opacity-100'}`}>
              <img src={img} alt={`${p.name} ${i+1}`} className="w-full h-full object-cover"
                onError={(e) => { (e.target as HTMLImageElement).src = p.fallback }} />
            </button>
          ))}
        </div>
      </div>

      {/* Product info */}
      <div className="lg:sticky lg:top-28">
        <span className="font-outfit text-xs uppercase tracking-widest text-slate-500 mb-2 block">{p.category}</span>
        <h2 className="font-playfair text-3xl lg:text-4xl font-bold text-white mb-2">{p.name}</h2>
        <p className="font-outfit font-medium mb-4" style={{color: p.accent}}>{p.tagline}</p>

        <div className="flex items-center gap-3 mb-5">
          <div className="flex">{[...Array(5)].map((_,i) => <Star key={i} className={`w-4 h-4 ${i < Math.floor(p.rating) ? 'text-amber-400 fill-amber-400' : 'text-slate-700'}`} />)}</div>
          <span className="font-outfit text-sm text-white font-semibold">{p.rating}</span>
          <span className="font-outfit text-sm text-slate-500">({p.reviews.toLocaleString()} reviews)</span>
          <span className="font-outfit text-xs text-emerald-400 border border-emerald-500/30 px-2 py-0.5 rounded-full">{p.soldCount}</span>
        </div>

        <p className="font-outfit text-slate-400 leading-relaxed mb-6 text-sm">{p.description}</p>

        {/* Features */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-6">
          {p.features.map(f => (
            <div key={f} className="flex items-start gap-2">
              <div className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5" style={{background: p.accent + '22'}}>
                <Check className="w-3 h-3" style={{color: p.accent}} />
              </div>
              <span className="font-outfit text-sm text-slate-300">{f}</span>
            </div>
          ))}
        </div>

        {/* Benefits */}
        <div className="glass rounded-2xl p-5 mb-6 border border-slate-800">
          <p className="font-space text-xs text-slate-500 uppercase tracking-wider mb-3">Why customers love it</p>
          <div className="grid grid-cols-2 gap-2">
            {p.benefits.map(b => (
              <div key={b} className="flex items-center gap-2">
                <span className="text-amber-400 text-sm">★</span>
                <span className="font-outfit text-xs text-slate-300">{b}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Price + CTA */}
        <div className="glass rounded-2xl p-5 border border-slate-800 mb-4">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="font-outfit text-xs text-slate-500">Alibaba Price</p>
              <p className="font-playfair text-4xl font-bold shimmer-gold">{p.price}</p>
              <p className="font-outfit text-xs text-slate-500 mt-1">{p.priceNote}</p>
            </div>
            <div className="text-right">
              <p className="font-outfit text-xs text-slate-600">Affiliate ID (embedded)</p>
              <p className="font-mono text-sm text-emerald-400 font-bold">{p.affiliateId}</p>
              <p className="font-outfit text-xs text-slate-600 mt-1">Product ID: {p.productId}</p>
            </div>
          </div>
          <a href={p.affiliateLink} target="_blank" rel="noopener noreferrer"
            className={`${btnC} rounded-xl py-4 text-white font-outfit font-bold flex items-center justify-center gap-2 w-full text-base`}>
            <ShoppingCart className="w-5 h-5" /> Buy on Alibaba — {p.price}
            <ExternalLink className="w-4 h-4" />
          </a>
          <p className="text-center font-outfit text-xs text-slate-600 mt-3">
            Full affiliate link: <span className="font-mono text-slate-500 break-all">{p.affiliateLink}</span>
          </p>
        </div>

        {/* Trust */}
        <div className="flex flex-wrap gap-3">
          {[[Shield,'Trade Assurance'],[Truck,'Free Shipping Available'],[Award,'Verified Supplier']].map(([Icon, t]: any) => (
            <div key={t} className="flex items-center gap-1.5 text-slate-500 text-xs font-outfit">
              <Icon className="w-3.5 h-3.5 text-emerald-500" /> {t}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
