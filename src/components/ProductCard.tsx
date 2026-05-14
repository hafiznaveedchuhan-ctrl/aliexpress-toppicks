'use client'
import { useState } from 'react'
import Link from 'next/link'
import { Star, ShoppingCart, Check, ExternalLink } from 'lucide-react'

interface Product {
  id: number; name: string; shortName: string; tagline: string; price: string;
  badge: string; badgeColor: string; emoji: string; category: string;
  rating: number; reviews: number; features: string[]; benefits: string[];
  affiliateLink: string; affiliateId: string; productId: string;
  targetAudience: string; images: string[]; fallbackImage: string;
  gradient: string; borderColor: string; glowColor: string; description: string;
}

export default function ProductCard({ product, featured = false }: { product: Product; featured?: boolean }) {
  const [imgSrc, setImgSrc] = useState(product.images[0] || product.fallbackImage)
  const badgeColors: Record<string, string> = {
    emerald: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
    purple: 'bg-violet-500/20 text-violet-400 border-violet-500/30',
    amber: 'bg-amber-500/20 text-amber-400 border-amber-500/30',
  }

  return (
    <div className={`product-card relative glass-card rounded-2xl overflow-hidden ${featured ? 'lg:scale-105' : ''}`}>
      <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${product.gradient.replace('/20', '')}`} />

      {/* Product image */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={imgSrc}
          alt={product.name}
          className="w-full h-full object-cover"
          onError={() => setImgSrc(product.fallbackImage)}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-navy-900/80 to-transparent" />
        <div className="absolute top-3 right-3">
          <span className={`px-3 py-1 rounded-full text-xs font-semibold border font-outfit ${badgeColors[product.badgeColor]}`}>
            {product.badge}
          </span>
        </div>
        <div className="absolute bottom-3 left-3">
          <span className="text-2xl">{product.emoji}</span>
        </div>
      </div>

      <div className="p-6">
        <span className="font-outfit text-xs text-slate-500 uppercase tracking-widest">{product.category}</span>
        <h3 className="font-playfair text-xl font-bold text-slate-800 mb-1 mt-1">{product.name}</h3>
        <p className="font-outfit text-sm text-emerald-400 font-medium mb-3">{product.tagline}</p>
        <p className="font-outfit text-sm text-slate-500 leading-relaxed mb-4 line-clamp-2">{product.description}</p>

        <div className="flex items-center gap-2 mb-4">
          <div className="flex">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className={`w-4 h-4 ${i < Math.floor(product.rating) ? 'text-amber-400 fill-amber-400' : 'text-slate-600'}`} />
            ))}
          </div>
          <span className="font-outfit text-sm text-slate-800 font-semibold">{product.rating}</span>
          <span className="font-outfit text-xs text-slate-500">({product.reviews.toLocaleString()})</span>
        </div>

        <div className="space-y-1.5 mb-5">
          {product.features.slice(0, 3).map((feature) => (
            <div key={feature} className="flex items-center gap-2">
              <Check className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
              <span className="font-outfit text-xs text-slate-600">{feature}</span>
            </div>
          ))}
        </div>

        <div className="flex items-center justify-between mb-4 p-3 rounded-xl bg-slate-800/50">
          <div>
            <p className="font-outfit text-xs text-slate-500">Price Range</p>
            <p className="font-playfair text-xl font-bold text-shimmer">{product.price}</p>
          </div>
          <div className="text-right text-xs font-outfit text-slate-500">
            <div>Affiliate ID: <span className="text-emerald-400">{product.affiliateId}</span></div>
          </div>
        </div>

        <div className="flex gap-3">
          <a href={product.affiliateLink} target="_blank" rel="noopener noreferrer"
            className="flex-1 flex items-center justify-center gap-2 py-3 buy-btn rounded-xl text-slate-800 font-outfit font-semibold text-sm">
            <ShoppingCart className="w-4 h-4" />
            Buy on Alibaba
          </a>
          <Link href={`/products#product-${product.id}`}
            className="px-4 py-3 rounded-xl border border-slate-700 hover:border-emerald-500/50 text-slate-500 hover:text-slate-800 transition-all flex items-center">
            <ExternalLink className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  )
}
