'use client'
import { useState } from 'react'
import Link from 'next/link'
import { Star, ShoppingCart, ExternalLink, TrendingUp, Shield, Truck, Users, ChevronRight, Sparkles, Heart, Zap } from 'lucide-react'
import { products, testimonials, SOCIAL_LINKS } from '@/lib/data'

export default function Home() {
  return (
    <div className="min-h-screen" style={{background: 'linear-gradient(135deg, #f0f9ff 0%, #fdf4ff 50%, #fff7ed 100%)'}}>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 text-center overflow-hidden">
        {/* Colorful background blobs */}
        <div className="absolute top-20 left-10 w-72 h-72 rounded-full opacity-20 blur-3xl" style={{background: 'linear-gradient(135deg, #7c3aed, #f43f5e)'}}></div>
        <div className="absolute top-40 right-10 w-72 h-72 rounded-full opacity-20 blur-3xl" style={{background: 'linear-gradient(135deg, #2563eb, #0d9488)'}}></div>
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-96 h-96 rounded-full opacity-15 blur-3xl" style={{background: 'linear-gradient(135deg, #f59e0b, #f43f5e)'}}></div>

        <div className="relative max-w-5xl mx-auto px-6">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold mb-6 shadow-sm" style={{background: 'linear-gradient(135deg, #7c3aed22, #f43f5e22)', color: '#7c3aed', border: '1px solid #7c3aed33'}}>
            <Sparkles className="w-4 h-4" />
            Verified AliExpress Products · UK, USA &amp; Canada
          </div>

          {/* Main title */}
          <h1 className="hero-title mb-6" style={{color: '#0f172a'}}>
            <span style={{background: 'linear-gradient(135deg, #7c3aed, #f43f5e)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text'}}>Premium Picks</span>
            <br />
            <span style={{color: '#0f172a'}}>for Real Results</span>
          </h1>

          <p className="text-xl mb-10 max-w-2xl mx-auto" style={{color: '#475569'}}>
            7 curated products. Verified AliExpress suppliers. Ships to <strong style={{color: '#0f172a'}}>USA · UK · Canada</strong> & <strong style={{color: '#0f172a'}}>🌍 All Over the World</strong>.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="/shop-now"
              className="btn-primary inline-flex items-center gap-2 px-8 py-4 rounded-2xl font-semibold text-lg">
              <ShoppingCart className="w-5 h-5" />
              Shop All Products
            </a>
            <a href="/shop-now"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl font-semibold text-lg"
              style={{background: 'white', color: '#0f172a', border: '2px solid #e2e8f0', boxShadow: '0 4px 15px rgba(0,0,0,0.08)'}}>
              All Links
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-12 px-6">
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { icon: <Users className="w-6 h-6" />, value: "10K+", label: "Happy Customers", color: "#7c3aed" },
            { icon: <Shield className="w-6 h-6" />, value: "100%", label: "Verified Suppliers", color: "#059669" },
            { icon: <Truck className="w-6 h-6" />, value: "Fast", label: "Ships Worldwide", color: "#2563eb" },
            { icon: <TrendingUp className="w-6 h-6" />, value: "4", label: "Premium Products", color: "#f59e0b" },
          ].map((s, i) => (
            <div key={i} className="stat-card">
              <div className="w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-3" style={{background: s.color + '18', color: s.color}}>
                {s.icon}
              </div>
              <div className="text-2xl font-bold mb-1" style={{color: s.color}}>{s.value}</div>
              <div className="text-sm" style={{color: '#64748b'}}>{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Products Section */}
      <section className="py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <span className="section-label">🔥 Trending Now</span>
            <h2 className="text-4xl font-bold mt-4 mb-4" style={{color: '#0f172a'}}>Our Top 4 Picks</h2>
            <p style={{color: '#64748b'}}>Handpicked for UK, USA &amp; Canada customers</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <div key={product.id} className="product-card overflow-hidden group">
                {/* Image */}
                <div className="relative h-52 overflow-hidden rounded-t-2xl" style={{background: product.accentLight}}>
                  <img
                    src={product.images[0]}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    onError={(e) => { (e.target as HTMLImageElement).src = product.fallback }}
                  />
                  <div className={`absolute top-3 left-3 badge-${product.badgeColor} text-xs font-bold px-3 py-1 rounded-full shadow-md`}>
                    {product.badge}
                  </div>
                  <div className="absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center" style={{background: 'white', boxShadow: '0 2px 10px rgba(0,0,0,0.15)'}}>
                    <Heart className="w-4 h-4" style={{color: product.accent}} />
                  </div>
                </div>

                {/* Content */}
                <div className="p-5">
                  <div className="flex items-center gap-1 mb-2">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3 h-3" fill={i < Math.floor(product.rating) ? product.accent : "none"} style={{color: product.accent}} />
                    ))}
                    <span className="text-xs ml-1" style={{color: '#64748b'}}>{product.rating} ({product.reviews.toLocaleString()})</span>
                  </div>

                  <h3 className="font-bold text-base mb-1" style={{color: '#0f172a'}}>{product.shortName}</h3>
                  <p className="text-xs mb-3" style={{color: '#64748b'}}>{product.tagline}</p>

                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xl font-bold" style={{color: product.accent}}>{product.price}</span>
                    <span className="text-xs" style={{color: '#94a3b8'}}>{product.soldCount}</span>
                  </div>

                  <a
                    href={product.affiliateLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full flex items-center justify-center gap-2 py-3 rounded-xl font-semibold text-sm text-white transition-all duration-300 hover:opacity-90 hover:-translate-y-0.5"
                    style={{background: `linear-gradient(135deg, ${product.accent}, #7c3aed)`, color: 'white'}}
                  >
                    <ShoppingCart className="w-4 h-4" />
                    Buy on AliExpress
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Banner */}
      <section className="py-14 px-6" style={{background: 'linear-gradient(135deg, #7c3aed, #f43f5e)'}}>
        <div className="max-w-5xl mx-auto text-center text-white">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
            {[
              { icon: <Shield className="w-8 h-8" />, title: "Buyer Protection", desc: "AliExpress secure checkout & money back guarantee" },
              { icon: <Truck className="w-8 h-8" />, title: "Ships Worldwide", desc: "Fast delivery worldwide" },
              { icon: <Zap className="w-8 h-8" />, title: "Best Prices", desc: "Direct from manufacturers — no middleman" },
            ].map((f, i) => (
              <div key={i} className="flex flex-col items-center gap-3">
                <div className="w-16 h-16 rounded-2xl flex items-center justify-center" style={{background: 'rgba(255,255,255,0.2)'}}>
                  {f.icon}
                </div>
                <h3 className="text-lg font-bold">{f.title}</h3>
                <p className="text-sm opacity-80">{f.desc}</p>
              </div>
            ))}
          </div>
          <div className="flex flex-wrap justify-center gap-3">
            {["🇺🇸 USA","🇬🇧 UK","🇨🇦 Canada","🇰🇷 Korea","🇪🇸 Spain","🇫🇷 France","🇩🇪 Germany","🇮🇹 Italy","🇵🇱 Poland","🇵🇰 Pakistan","🇧🇷 Brazil","🌍 All Over the World"].map((c,i)=>(
              <span key={i} className="px-4 py-2 rounded-full text-sm font-semibold" style={{background:'rgba(255,255,255,0.2)', border:'1px solid rgba(255,255,255,0.4)'}}>
                {c}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 px-6" style={{background: 'linear-gradient(135deg, #f0f9ff, #fdf4ff)'}}>
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <span className="section-label">💬 Real Reviews</span>
            <h2 className="text-4xl font-bold mt-4" style={{color: '#0f172a'}}>What Customers Say</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {testimonials.slice(0, 6).map((t, i) => (
              <div key={i} className="product-card p-6">
                <div className="flex items-center gap-1 mb-3">
                  {[...Array(t.rating)].map((_, j) => (
                    <Star key={j} className="w-4 h-4" fill="#f59e0b" style={{color: '#f59e0b'}} />
                  ))}
                </div>
                <p className="text-sm mb-4 italic" style={{color: '#475569'}}>"{t.text}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm" style={{background: 'linear-gradient(135deg, #7c3aed, #f43f5e)'}}>
                    {t.avatar}
                  </div>
                  <div>
                    <div className="font-semibold text-sm" style={{color: '#0f172a'}}>{t.name}</div>
                    <div className="text-xs" style={{color: '#94a3b8'}}>{t.location}</div>
                  </div>
                  {t.verified && <span className="ml-auto text-xs font-medium px-2 py-1 rounded-full" style={{background: '#ecfdf5', color: '#059669'}}>✓ Verified</span>}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6 text-center" style={{background: 'linear-gradient(135deg, #7c3aed, #f43f5e)'}}>
        <div className="max-w-3xl mx-auto">
          <h2 className="text-4xl font-bold text-white mb-4">Ready to Shop?</h2>
          <p className="text-lg mb-8" style={{color: '#94a3b8'}}>4 premium products. Direct from verified suppliers. Ships worldwide.</p>
          <a href="/shop-now" className="btn-primary inline-flex items-center gap-2 px-10 py-4 rounded-2xl font-bold text-lg">
            <ShoppingCart className="w-5 h-5" />
            Shop All Products
            <ChevronRight className="w-5 h-5" />
          </a>
          <p className="mt-6 text-sm" style={{color: '#64748b'}}>*Affiliate disclosure: We earn commission from qualifying AliExpress purchases</p>
        </div>
      </section>

    </div>
  )
}
