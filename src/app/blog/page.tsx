import { ExternalLink, Clock, ArrowRight, BookOpen } from 'lucide-react'

const articles = [
  { t:"Best LED Light Therapy Face Masks Under $100 — Tested", cat:"Skincare", min:"8 min", emoji:"✨", tag:"Most Popular", link:"https://deals-hub-2026.blogspot.com", desc:"We tested 12 LED masks from Alibaba. Here's our honest breakdown of which ones actually work." },
  { t:"Best Posture Correctors for Desk Workers 2026 — UK & USA Guide", cat:"Wellness", min:"10 min", emoji:"🧘", tag:"Editor's Pick", link:"https://deals-hub-2026.blogspot.com", desc:"With 40M+ people WFH, back pain is at an all-time high. We ranked the best correctors by comfort, effectiveness, and price." },
  { t:"$40 Alibaba Massage Gun vs $400 Theragun — Honest Comparison", cat:"Fitness", min:"7 min", emoji:"💪", tag:"Trending", link:"https://deals-hub-2026.blogspot.com", desc:"Is there really a $360 difference? We put them head-to-head. The results will shock you." },
  { t:"Does LED Light Therapy Actually Work? Science-Backed Answer", cat:"Science", min:"12 min", emoji:"🔬", tag:"Deep Dive", link:"https://deals-hub-2026.blogspot.com", desc:"We dove deep into clinical research on photobiomodulation to answer: does LED therapy actually work?" },
  { t:"How to Fix Bad Posture Working from Home: Complete 2026 Guide", cat:"WFH Health", min:"15 min", emoji:"🏠", tag:"Complete Guide", link:"https://deals-hub-2026.blogspot.com", desc:"Everything you need: desk setup tips, exercises, and the best wearable devices that actually work." },
  { t:"Best Massage Gun for Legs After Leg Day — UK/Canada Guide", cat:"Recovery", min:"9 min", emoji:"🏋️", tag:"New", link:"https://deals-hub-2026.blogspot.com", desc:"Leg day soreness is real. We tested top guns specifically for quad, hamstring & calf recovery." },
  { t:"Best Father's Day Gift Ideas 2026 — Premium Business Gift Set Under $15", cat:"Father's Day", min:"6 min", emoji:"🎁", tag:"Father's Day", link:"https://deals-hub-2026.blogspot.com", desc:"Dad deserves more than a card. We found the ultimate business gift set — premium watch, leather wallet, keychain & cologne — all under $15. Ships direct to UK, USA & Canada." },
]

const tagColors: Record<string, string> = {
  'Most Popular':'bg-emerald-500/15 text-emerald-400 border-emerald-500/25',
  "Editor's Pick":'bg-violet-500/15 text-violet-400 border-violet-500/25',
  'Trending':'bg-amber-500/15 text-amber-400 border-amber-500/25',
  'Deep Dive':'bg-blue-500/15 text-blue-400 border-blue-500/25',
  'Complete Guide':'bg-teal-500/15 text-teal-400 border-teal-500/25',
  'New':'bg-rose-500/15 text-rose-400 border-rose-500/25',
  "Father's Day":'bg-emerald-500/15 text-emerald-400 border-emerald-500/25',
}

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#020817] via-[#060d1a] to-[#020817]">
      <section className="relative pt-32 pb-16 text-center overflow-hidden">
        <div className="absolute inset-0 bg-grid opacity-40" />
        <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[400px] h-[300px] bg-blue-500/6 rounded-full blur-3xl" />
        <div className="relative max-w-4xl mx-auto px-8">
          <span className="badge-pill glass border border-blue-500/20 text-blue-400 mb-4"><BookOpen className="w-3.5 h-3.5"/>Our Blog</span>
          <h1 className="font-playfair text-5xl font-bold text-white mb-4">
            Expert <span className="shimmer-green">Guides</span> & Reviews
          </h1>
          <div className="divider mx-auto mb-4" />
          <p className="font-outfit text-slate-400 text-lg max-w-xl mx-auto">In-depth reviews & buying guides for UK, USA & Canada health shoppers</p>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-8 pb-24">
        {/* Featured */}
        <div className="glass rounded-3xl border border-emerald-500/15 hover-lift hover-glow-green transition-all mb-12 overflow-hidden">
          <div className="bg-gradient-to-br from-emerald-500/10 to-blue-500/5 p-10 md:p-14">
            <div className="flex flex-col md:flex-row items-center gap-10">
              <span className="text-7xl animate-float flex-shrink-0">{articles[0].emoji}</span>
              <div>
                <div className="flex flex-wrap gap-2 mb-3">
                  <span className={`badge-pill border text-xs ${tagColors[articles[0].tag]}`}>{articles[0].tag}</span>
                  <span className="badge-pill glass border border-slate-700 text-slate-400 text-xs">{articles[0].cat}</span>
                </div>
                <h2 className="font-playfair text-2xl md:text-3xl font-bold text-white mb-3">{articles[0].t}</h2>
                <p className="font-outfit text-slate-300 mb-5 leading-relaxed max-w-xl">{articles[0].desc}</p>
                <div className="flex items-center gap-4 flex-wrap">
                  <span className="flex items-center gap-1.5 text-slate-400 font-outfit text-sm"><Clock className="w-4 h-4"/>{articles[0].min}</span>
                  <a href={articles[0].link} target="_blank" rel="noopener noreferrer"
                    className="flex items-center gap-2 px-6 py-2.5 btn-primary rounded-xl text-white font-outfit font-semibold text-sm">
                    Read Article <ExternalLink className="w-4 h-4"/>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {articles.slice(1).map((a,i)=>(
            <div key={i} className="glass rounded-2xl border border-slate-800 hover-lift hover-glow-green transition-all overflow-hidden group">
              <div className="h-32 bg-gradient-to-br from-slate-800 to-slate-900 flex items-center justify-center">
                <span className="text-5xl group-hover:scale-110 transition-transform duration-300">{a.emoji}</span>
              </div>
              <div className="p-6">
                <div className="flex flex-wrap gap-2 mb-3">
                  <span className={`badge-pill border text-xs ${tagColors[a.tag]}`}>{a.tag}</span>
                  <span className="font-outfit text-xs text-slate-500">{a.cat}</span>
                </div>
                <h3 className="font-playfair text-lg font-bold text-white mb-2 group-hover:text-emerald-400 transition-colors line-clamp-2">{a.t}</h3>
                <p className="font-outfit text-sm text-slate-400 mb-4 line-clamp-2 leading-relaxed">{a.desc}</p>
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-1 text-slate-500 font-outfit text-xs"><Clock className="w-3 h-3"/>{a.min}</span>
                  <a href={a.link} target="_blank" rel="noopener noreferrer"
                    className="flex items-center gap-1 text-emerald-400 hover:text-emerald-300 font-outfit text-sm font-semibold group-hover:gap-2 transition-all">
                    Read <ArrowRight className="w-4 h-4"/>
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="text-center mt-10">
          <a href="https://deals-hub-2026.blogspot.com" target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-4 btn-primary rounded-2xl text-white font-outfit font-bold">
            Visit Full Blog <ExternalLink className="w-5 h-5"/>
          </a>
        </div>
      </section>
    </div>
  )
}
