'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { ShoppingCart, Menu, X, Sparkles } from 'lucide-react'
import { SOCIAL_LINKS } from '@/lib/data'

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'navbar-colorful py-3' : 'py-5'}`}
      style={!isScrolled ? {background: 'rgba(255,255,255,0.85)', backdropFilter: 'blur(20px)'} : {}}>
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{background: 'linear-gradient(135deg, #7c3aed, #f43f5e)'}}>
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <span className="font-bold text-lg" style={{color: '#0f172a'}}>
            FatimaZehra<span style={{background: 'linear-gradient(135deg, #7c3aed, #f43f5e)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text'}}>TopPicks</span>
          </span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-6">
          {[
            ['Home', '/'],
            ['Products', '/products'],
            ['Reviews', '/reviews'],
            ['Blog', '/blog'],
            ['About', '/about'],
            ['Contact', '/contact'],
          ].map(([label, href]) => (
            <Link key={href} href={href} className="text-sm font-medium transition-colors hover:text-purple-600" style={{color: '#475569'}}>
              {label}
            </Link>
          ))}
        </div>

        {/* Right buttons */}
        <div className="hidden md:flex items-center gap-3">
          <a href={SOCIAL_LINKS.tiktok} target="_blank" rel="noopener noreferrer"
            className="text-sm font-medium px-4 py-2 rounded-xl transition-all" style={{color: '#475569', border: '1px solid #e2e8f0'}}>TikTok</a>
          <a href={SOCIAL_LINKS.pinterest} target="_blank" rel="noopener noreferrer"
            className="text-sm font-medium px-4 py-2 rounded-xl transition-all" style={{color: '#e11d48', border: '1px solid #fecdd3'}}>Pinterest</a>
          <a href="/shop-now"
            className="btn-primary text-sm font-semibold px-5 py-2.5 rounded-xl flex items-center gap-2">
            <ShoppingCart className="w-4 h-4" />
            Shop Now
          </a>
        </div>

        {/* Mobile menu */}
        <button onClick={() => setMobileOpen(!mobileOpen)} className="md:hidden p-2 rounded-lg" style={{color: '#0f172a'}}>
          {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile dropdown */}
      {mobileOpen && (
        <div className="md:hidden px-6 py-4 flex flex-col gap-3" style={{background: 'white', borderTop: '1px solid #e2e8f0'}}>
          {['/', '/products', '/reviews', '/blog', '/about', '/contact'].map((href, i) => (
            <Link key={href} href={href} onClick={() => setMobileOpen(false)}
              className="text-sm font-medium py-2" style={{color: '#475569'}}>
              {['Home', 'Products', 'Reviews', 'Blog', 'About', 'Contact'][i]}
            </Link>
          ))}
          <a href="/shop-now" className="btn-primary text-sm font-semibold px-5 py-3 rounded-xl text-center flex items-center justify-center gap-2">
            <ShoppingCart className="w-4 h-4" />
            Shop Now
          </a>
        </div>
      )}
    </nav>
  )
}
