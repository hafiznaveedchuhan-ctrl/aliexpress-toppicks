import type { Metadata } from 'next'
import './globals.css'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import ChatWidget from '@/components/ChatWidget'

export const metadata: Metadata = {
  title: 'FatimaZehraTopPicks — Best AliExpress Deals | UK USA Canada',
  description: 'Premium LED Face Masks, Posture Correctors & Massage Guns. Verified AliExpress suppliers. Serving UK, USA & Canada.',
  keywords: 'LED face mask, posture corrector, massage gun, fathers day gifts, AliExpress deals UK USA Canada',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        <main>{children}</main>
        <Footer />
        <ChatWidget />
      </body>
    </html>
  )
}
