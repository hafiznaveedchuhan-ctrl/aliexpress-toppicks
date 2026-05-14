import { Star, CheckCircle, TrendingUp, Quote } from 'lucide-react'
import { testimonials, products } from '@/lib/data'

export default function ReviewsPage() {
  const avg = (testimonials.reduce((a,b)=>a+b.rating,0)/testimonials.length).toFixed(1)
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a0800] via-[#0f0c00] to-[#020817]">
      <section className="relative pt-32 pb-16 text-center overflow-hidden">
        <div className="absolute inset-0 bg-dots opacity-40" />
        <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[400px] h-[300px] bg-amber-500/8 rounded-full blur-3xl" />
        <div className="relative max-w-4xl mx-auto px-8">
          <span className="badge-pill glass border border-amber-500/20 text-amber-400 mb-4">⭐ Customer Reviews</span>
          <h1 className="font-playfair text-5xl font-bold text-slate-800 mb-4">
            Real Results, <span className="shimmer-gold">Real People</span>
          </h1>
          <div className="divider divider-amber mx-auto mb-6" />
          <div className="flex flex-wrap items-center justify-center gap-10">
            {[{ v:avg, l:'Average Rating'},{v:'8,000+',l:'Happy Customers'},{v:'3',l:'Countries'}].map(({v,l})=>(
              <div key={l} className="text-center">
                <p className="font-playfair text-4xl font-bold shimmer-gold">{v}</p>
                <p className="font-outfit text-sm text-slate-500 mt-1">{l}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-8 py-10">
        {/* Featured quote */}
        <div className="glass rounded-3xl p-10 border border-amber-500/20 hover-glow-amber transition-all mb-12 relative overflow-hidden">
          <Quote className="absolute top-6 right-6 w-16 h-16 text-amber-500/10" />
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center flex-shrink-0 shadow-xl shadow-amber-500/30">
              <span className="font-playfair text-slate-800 font-bold text-3xl">{testimonials[2].avatar}</span>
            </div>
            <div>
              <div className="flex mb-3">{[...Array(5)].map((_,i)=><Star key={i} className="w-5 h-5 text-amber-400 fill-amber-400"/>)}</div>
              <p className="font-playfair text-xl text-slate-800 italic leading-relaxed mb-4">&ldquo;{testimonials[2].text}&rdquo;</p>
              <div className="flex items-center gap-3">
                <p className="font-space font-bold text-slate-800">{testimonials[2].name}</p>
                <span className="text-slate-600">—</span>
                <p className="font-outfit text-slate-500 text-sm">{testimonials[2].location}</p>
                <span className="badge-pill text-xs text-emerald-400 border border-emerald-500/20 glass"><CheckCircle className="w-3 h-3"/>Verified</span>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {testimonials.map((r,i)=>(
            <div key={i} className="glass rounded-2xl p-6 border border-slate-800 hover-lift hover-glow-amber transition-all group cursor-default">
              <div className="flex justify-between items-start mb-3">
                <span className="px-3 py-1 rounded-full bg-slate-800 text-xs font-outfit text-slate-500 border border-slate-700">{r.product}</span>
                {r.verified && <span className="flex items-center gap-1 text-xs font-outfit text-emerald-400"><CheckCircle className="w-3 h-3"/>Verified</span>}
              </div>
              <div className="flex mb-3">{[...Array(r.rating)].map((_,j)=><Star key={j} className="w-4 h-4 text-amber-400 fill-amber-400"/>)}</div>
              <p className="font-outfit text-sm text-slate-600 italic leading-relaxed mb-4">&ldquo;{r.text}&rdquo;</p>
              <div className="flex items-center gap-3 pt-3 border-t border-slate-800">
                <div className="w-9 h-9 rounded-full bg-gradient-to-br from-emerald-500 to-emerald-700 flex items-center justify-center flex-shrink-0">
                  <span className="font-playfair text-slate-800 font-bold text-sm">{r.avatar}</span>
                </div>
                <div>
                  <p className="font-space text-sm font-semibold text-slate-800">{r.name}</p>
                  <p className="font-outfit text-xs text-slate-500">{r.location}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-8 py-16">
        <h2 className="font-playfair text-3xl font-bold text-slate-800 text-center mb-10">
          Product <span className="shimmer-gold">Ratings</span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {products.map(p=>(
            <div key={p.id} className="glass rounded-3xl p-8 border border-slate-800 text-center hover-lift hover-glow-amber transition-all">
              <span className="text-5xl block mb-4 animate-float-d1">{p.emoji}</span>
              <h3 className="font-playfair text-lg font-bold text-slate-800 mb-2">{p.shortName}</h3>
              <div className="flex justify-center mb-2">
                {[...Array(5)].map((_,i)=><Star key={i} className={`w-5 h-5 ${i<Math.floor(p.rating)?'text-amber-400 fill-amber-400':'text-slate-700'}`}/>)}
              </div>
              <p className="font-playfair text-3xl font-bold shimmer-gold">{p.rating}</p>
              <p className="font-outfit text-xs text-slate-500 mt-1">{p.reviews.toLocaleString()} reviews</p>
              <div className="mt-4 pt-4 border-t border-slate-800 flex items-center justify-center gap-2 text-emerald-400">
                <TrendingUp className="w-4 h-4"/>
                <span className="font-outfit text-xs">#{p.id} in {p.category}</span>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
