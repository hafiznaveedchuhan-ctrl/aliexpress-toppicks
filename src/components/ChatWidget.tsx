'use client'
import { useState, useRef, useEffect } from 'react'
import { MessageCircle, X, Send, Loader2, ShoppingCart, Sparkles } from 'lucide-react'

interface Message {
  id: string
  role: 'user' | 'assistant'
  content: string
  product_id?: string
  link?: string
  time: string
}

const PRODUCT_COLORS: Record<string, string> = {
  posture_corrector: '#7F77DD',
  led_face_mask: '#E24B4A',
  massage_gun: '#F59E0B',
}

const PRODUCT_LABELS: Record<string, string> = {
  posture_corrector: '💜 Buy Posture Corrector',
  led_face_mask: '✨ Buy LED Face Mask',
  massage_gun: '💪 Buy Massage Gun',
}

const QUICK_QUESTIONS = [
  "Tell me about posture corrector",
  "LED mask results?",
  "Massage gun vs Theragun?",
  "Shipping to UK?",
]

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([{
    id: '0',
    role: 'assistant',
    content: "Hi! 👋 I'm the AI assistant for FatimaZehraTopPicks!\n\nAsk me about:\n💜 Smart Posture Corrector\n✨ LED Face Mask\n💪 Massage Gun\n\nWhat would you like to know?",
    time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  }])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [streamText, setStreamText] = useState('')
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, streamText])

  const sendMessage = async (text?: string) => {
    const msg = text || input.trim()
    if (!msg || loading) return

    const userMsg: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: msg,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
    setMessages(prev => [...prev, userMsg])
    setInput('')
    setLoading(true)
    setStreamText('')

    const history = messages.map(m => ({ role: m.role, content: m.content }))

    try {
      // Use streaming GET endpoint
      const url = `/api/chat?message=${encodeURIComponent(msg)}`
      const response = await fetch(url)
      
      if (!response.ok) throw new Error('API error')
      
      const reader = response.body?.getReader()
      const decoder = new TextDecoder()
      
      let fullText = ''
      let productId = ''
      let affiliateLink = ''

      while (reader) {
        const { done, value } = await reader.read()
        if (done) break

        const chunk = decoder.decode(value)
        const lines = chunk.split('\n').filter(l => l.startsWith('data: '))

        for (const line of lines) {
          try {
            const data = JSON.parse(line.slice(6))
            if (data.type === 'product') {
              productId = data.product_id || ''
              affiliateLink = data.link || ''
            } else if (data.type === 'text') {
              fullText += data.content
              setStreamText(fullText)
            }
          } catch {}
        }
      }

      setMessages(prev => [...prev, {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: fullText,
        product_id: productId,
        link: affiliateLink,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }])
      setStreamText('')

    } catch {
      // Fallback to POST
      try {
        const res = await fetch('/api/chat', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ message: msg, history })
        })
        const data = await res.json()
        setMessages(prev => [...prev, {
          id: (Date.now() + 1).toString(),
          role: 'assistant',
          content: data.reply || "Sorry, please WhatsApp: wa.me/923002385209",
          product_id: data.product_id,
          link: data.affiliate_link,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }])
      } catch {
        setMessages(prev => [...prev, {
          id: (Date.now() + 1).toString(),
          role: 'assistant',
          content: "Connection error. Please contact us:\n📱 wa.me/923002385209\n📧 hafiznaveedchuhan@gmail.com",
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }])
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {!isOpen && (
        <button onClick={() => setIsOpen(true)}
          className="relative w-16 h-16 rounded-full flex items-center justify-center shadow-2xl hover:scale-110 transition-all duration-300"
          style={{ background: 'linear-gradient(135deg, #1D9E75, #10b981)' }}>
          <MessageCircle className="w-7 h-7 text-white" />
          <span className="absolute inset-0 rounded-full animate-ping opacity-20 bg-emerald-400" />
          <span className="absolute -top-1 -right-1 w-6 h-6 rounded-full bg-amber-400 flex items-center justify-center">
            <Sparkles className="w-3 h-3 text-white" />
          </span>
        </button>
      )}

      {isOpen && (
        <div className="w-96 max-w-[calc(100vw-2rem)] rounded-2xl shadow-2xl overflow-hidden"
          style={{ background: '#0a0f1e', border: '1px solid rgba(29,158,117,0.3)' }}>
          
          {/* Header */}
          <div className="p-4 flex items-center justify-between"
            style={{ background: 'linear-gradient(135deg,#0f172a,#1e293b)', borderBottom: '1px solid rgba(29,158,117,0.2)' }}>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center"
                style={{ background: 'linear-gradient(135deg,#1D9E75,#10b981)' }}>
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="text-white font-semibold text-sm">FatimaZehra AI Agent</p>
                <div className="flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="text-emerald-400 text-xs">Online — Powered by Claude</span>
                </div>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white transition-colors"
              style={{ background: 'rgba(255,255,255,0.05)' }}>
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Messages */}
          <div className="h-80 overflow-y-auto p-4 space-y-3" style={{ background: '#0a0f1e' }}>
            {messages.map((msg) => (
              <div key={msg.id} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[80%] rounded-2xl px-4 py-2.5 ${msg.role === 'user' ? 'rounded-br-sm text-white' : 'rounded-bl-sm text-slate-200'}`}
                  style={{
                    background: msg.role === 'user' ? 'linear-gradient(135deg,#1D9E75,#10b981)' : '#1e293b',
                    border: msg.role === 'assistant' ? '1px solid rgba(255,255,255,0.08)' : 'none'
                  }}>
                  <p className="text-sm leading-relaxed whitespace-pre-wrap">{msg.content}</p>
                  {msg.link && msg.product_id && (
                    <a href={msg.link} target="_blank" rel="noopener noreferrer"
                      className="mt-2 flex items-center gap-2 px-3 py-2 rounded-xl text-white text-xs font-semibold hover:opacity-90 transition-opacity"
                      style={{ background: PRODUCT_COLORS[msg.product_id] || '#1D9E75' }}>
                      <ShoppingCart className="w-3.5 h-3.5" />
                      {PRODUCT_LABELS[msg.product_id] || 'Buy on Alibaba'}
                    </a>
                  )}
                  <p className="text-xs opacity-40 mt-1">{msg.time}</p>
                </div>
              </div>
            ))}
            {streamText && (
              <div className="flex justify-start">
                <div className="max-w-[80%] rounded-2xl rounded-bl-sm px-4 py-2.5 text-slate-200"
                  style={{ background: '#1e293b', border: '1px solid rgba(255,255,255,0.08)' }}>
                  <p className="text-sm leading-relaxed whitespace-pre-wrap">{streamText}<span className="animate-pulse">▊</span></p>
                </div>
              </div>
            )}
            {loading && !streamText && (
              <div className="flex justify-start">
                <div className="px-4 py-3 rounded-2xl rounded-bl-sm" style={{ background: '#1e293b' }}>
                  <div className="flex gap-1">
                    {[0,1,2].map(i => (
                      <span key={i} className="w-2 h-2 rounded-full bg-emerald-400 animate-bounce"
                        style={{ animationDelay: `${i * 0.15}s` }} />
                    ))}
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Questions */}
          {messages.length <= 2 && (
            <div className="px-4 pb-2 flex gap-2 overflow-x-auto scrollbar-hide" style={{ background: '#0a0f1e' }}>
              {QUICK_QUESTIONS.map(q => (
                <button key={q} onClick={() => sendMessage(q)}
                  className="flex-shrink-0 text-xs px-3 py-1.5 rounded-full text-emerald-400 hover:text-white transition-all"
                  style={{ background: 'rgba(29,158,117,0.1)', border: '1px solid rgba(29,158,117,0.3)' }}>
                  {q}
                </button>
              ))}
            </div>
          )}

          {/* Input */}
          <div className="p-4 pt-2" style={{ background: '#0f172a', borderTop: '1px solid rgba(29,158,117,0.1)' }}>
            <div className="flex gap-2">
              <input value={input} onChange={e => setInput(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && !e.shiftKey && sendMessage()}
                placeholder="Ask about our products..."
                disabled={loading}
                className="flex-1 bg-slate-800 text-white placeholder-slate-500 rounded-xl px-4 py-2.5 text-sm outline-none border border-slate-700 focus:border-emerald-500 transition-colors disabled:opacity-50" />
              <button onClick={() => sendMessage()} disabled={loading || !input.trim()}
                className="w-10 h-10 rounded-xl flex items-center justify-center transition-all disabled:opacity-50 hover:scale-105"
                style={{ background: loading ? '#1e293b' : 'linear-gradient(135deg,#1D9E75,#10b981)' }}>
                {loading ? <Loader2 className="w-4 h-4 text-white animate-spin" /> : <Send className="w-4 h-4 text-white" />}
              </button>
            </div>
            <p className="text-center text-xs text-slate-600 mt-2">Powered by Claude AI</p>
          </div>
        </div>
      )}
    </div>
  )
}
