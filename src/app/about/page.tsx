import { Shield, Heart, Star, TrendingUp, Award, Users, ExternalLink } from 'lucide-react'
import { products, SOCIAL_LINKS } from '@/lib/data'

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#020817] via-[#0a1020] to-[#020817]">
      <section className="relative pt-32 pb-20 text-center overflow-hidden">
        <div className="absolute inset-0 bg-dots opacity-50" />
        <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[500px] h-[400px] bg-violet-500/6 rounded-full blur-3xl" />
        <div className="relative max-w-4xl mx-auto px-8">
          <span className="text-6xl block mb-6 animate-float">🌿</span>
          <h1 className="font-playfair text-5xl font-bold text-slate-800 mb-4">
            About <span className="shimmer-green">FatimaZehraTopPicks</span>
          </h1>
          <div className="divider divider-violet mx-auto mb-6" />
          <p className="font-outfit text-xl text-slate-500 leading-relaxed max-w-2xl mx-auto">
            We bridge the gap between verified Alibaba suppliers and UK, USA & Canada customers — delivering premium health & wellness at honest prices.
          </p>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
          <div>
            <span className="font-outfit text-xs text-violet-400 uppercase tracking-widest mb-3 block">Our Mission</span>
            <h2 className="font-playfair text-4xl font-bold text-slate-800 mb-6">
              Making Premium Health<br /><span className="shimmer-gold">Accessible to Everyone</span>
            </h2>
            <div className="space-y-4 font-outfit text-slate-500 leading-relaxed text-sm">
              <p>FatimaZehraTopPicks was founded with one goal: help everyday people in the UK, USA, and Canada access the same quality health & wellness products that celebrities and professionals use — without the luxury price tag.</p>
              <p>We work exclusively with verified Alibaba suppliers with demonstrated quality, reliable shipping, and excellent customer service. Every product is carefully evaluated against strict quality standards before we recommend it.</p>
              <p>As an official Alibaba Affiliate Partner (ID: <span className="font-mono text-emerald-400">lrccn27i</span>), we earn a small commission on qualifying purchases — our interests are aligned with yours. We only recommend products we genuinely believe in.</p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {[
              { icon: Shield, t:'Verified Suppliers', d:'Gold-rated Alibaba suppliers with Trade Assurance only', c:'text-emerald-400', bg:'bg-emerald-500/10' },
              { icon: Heart, t:'Customer First', d:'Every recommendation based on real customer needs', c:'text-rose-400', bg:'bg-rose-500/10' },
              { icon: Star, t:'Quality Tested', d:'We research thousands of reviews before recommending', c:'text-amber-400', bg:'bg-amber-500/10' },
              { icon: TrendingUp, t:'Best Value', d:'Luxury quality at honest, transparent prices', c:'text-violet-400', bg:'bg-violet-500/10' },
            ].map(({ icon: Icon, t, d, c, bg }) => (
              <div key={t} className="glass rounded-2xl p-6 border border-slate-800 hover-lift hover-glow-green transition-all">
                <div className={`w-10 h-10 rounded-xl ${bg} flex items-center justify-center mb-3`}>
                  <Icon className={`w-5 h-5 ${c}`} />
                </div>
                <h3 className="font-playfair text-base font-bold text-slate-800 mb-1">{t}</h3>
                <p className="font-outfit text-xs text-slate-500 leading-relaxed">{d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-slate-900/40">
        <div className="max-w-4xl mx-auto px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {[{ v:'8K+', l:'Customers', icon: Users },{ v:'4', l:'Products', icon: TrendingUp },{ v:'4.8★', l:'Avg Rating', icon: Star },{ v:'100%', l:'Verified', icon: Award }].map(({ v, l, icon: Icon }) => (
              <div key={l} className="glass rounded-2xl p-6 border border-slate-800 hover-lift hover-glow-green transition-all">
                <Icon className="w-6 h-6 text-emerald-400 mx-auto mb-3" />
                <p className="font-playfair text-3xl font-bold shimmer-gold">{v}</p>
                <p className="font-outfit text-xs text-slate-500 mt-1">{l}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 max-w-4xl mx-auto px-8">
        <h2 className="font-playfair text-3xl font-bold text-slate-800 text-center mb-10">Our <span className="shimmer-green">Products</span></h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {products.map(p => (
            <div key={p.id} className="glass rounded-3xl p-8 border border-slate-800 text-center hover-lift hover-glow-green transition-all group">
              <span className="text-5xl block mb-4 group-hover:scale-110 transition-transform">{p.emoji}</span>
              <h3 className="font-playfair text-xl font-bold text-slate-800 mb-1">{p.name}</h3>
              <p className="font-outfit text-xs text-slate-500 mb-2">{p.category}</p>
              <p className="font-playfair text-xl font-bold shimmer-gold mb-4">{p.price}</p>
              <a href={p.affiliateLink} target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-5 py-2.5 btn-primary rounded-xl text-slate-800 font-outfit font-semibold text-sm">
                Buy Now <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
