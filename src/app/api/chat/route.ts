import { NextRequest, NextResponse } from 'next/server'
import Anthropic from '@anthropic-ai/sdk'

const client = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY || '',
})

const SYSTEM_PROMPT = `You are the AI customer service agent for FatimaZehraTopPicks — a health & wellness product store serving UK, USA, and Canada customers.

You represent 3 products:
1. 💜 Smart Posture Corrector — For WFH workers with back/neck pain. Price: $25-55 (£20-45). Link: https://offer.alibaba.com/cps/lrccn27i?bm=cps&src=saf&productId=1600586437803
2. ✨ LED Light Therapy Face Mask — For skin transformation. Price: $45-85 (£35-65). Link: https://offer.alibaba.com/cps/lrccn27i?bm=cps&src=saf&productId=1601651879892
3. 💪 Professional Massage Gun — Gym recovery. Price: $35-80 (£28-65). Link: https://offer.alibaba.com/cps/lrccn27i?bm=cps&src=saf&productId=62429964716

PRODUCT KNOWLEDGE:

POSTURE CORRECTOR:
- Smart vibration alert when you slouch
- Lightweight, wear under clothes
- USB rechargeable, results in 2 weeks
- Rating: 4.8/5 (3,241 reviews)
- Shipping: UK 7-14 days, USA 10-18 days, Canada 10-21 days
- Min order: 1 piece | Max: unlimited
- Replaces £80 physio sessions!
- Alibaba Trade Assurance — full refund if not delivered

LED FACE MASK:
- 7 color modes: Red=anti-aging/collagen, Blue=kills acne bacteria, Green=dark spots
- FDA cleared, UKCA certified
- Results visible in 7 days
- Rating: 4.9/5 (2,847 reviews)
- Replaces £150/month facials with one-time cost
- Shipping: UK 7-14 days, USA 10-18 days, Canada 10-21 days

MASSAGE GUN:
- 30 speed levels, 6 professional heads
- Ultra-quiet 40dB motor
- 8-hour battery life, USB-C charging
- 90% same results as $400 Theragun at $40
- Rating: 4.7/5 (1,893 reviews)
- Carrying case included
- Min 1 piece, no max limit

PRODUCT DETECTION:
- Back pain, neck pain, posture, WFH, desk, office, physio, slouch → Posture Corrector
- Skin, face, LED, acne, glow, facial, mask, beauty, wrinkle, dark spot → LED Face Mask
- Massage, gym, muscle, recovery, Theragun, workout, fitness, sore → Massage Gun

RULES:
1. Be friendly and helpful, not pushy
2. Detect which product they're asking about and give targeted answer
3. Always include the relevant affiliate link at the end
4. Use Roman Urdu if customer writes in Urdu/Roman Urdu
5. Use English if customer writes in English
6. Include price in GBP for UK customers, USD for USA/Canada
7. Shipping to UK/USA/Canada always covered
8. All orders protected by Alibaba Trade Assurance

CONTACT:
- All products: linktr.ee/hafiznaveedchuhan
- WhatsApp: wa.me/923002385209
- Email: hafiznaveedchuhan@gmail.com
- Website: fatima-zehra-toppicks.vercel.app`

function detectProduct(message: string): string | null {
  const msg = message.toLowerCase()
  const postureKw = ['posture', 'back pain', 'neck pain', 'wfh', 'work from home', 'desk', 'office', 'physio', 'slouch', 'spine', 'shoulder pain', 'corrector']
  const ledKw = ['led', 'face', 'skin', 'acne', 'glow', 'facial', 'mask', 'beauty', 'wrinkle', 'dark spot', 'collagen', 'skincare', 'light therapy']
  const massageKw = ['massage', 'gun', 'gym', 'muscle', 'recovery', 'theragun', 'workout', 'fitness', 'sore', 'percussion', 'exercise']

  const p = postureKw.filter(k => msg.includes(k)).length
  const l = ledKw.filter(k => msg.includes(k)).length
  const m = massageKw.filter(k => msg.includes(k)).length

  if (Math.max(p, l, m) === 0) return null
  if (p >= l && p >= m) return 'posture_corrector'
  if (l >= p && l >= m) return 'led_face_mask'
  return 'massage_gun'
}

const PRODUCT_LINKS: Record<string, string> = {
  posture_corrector: 'https://offer.alibaba.com/cps/lrccn27i?bm=cps&src=saf&productId=1600586437803',
  led_face_mask: 'https://offer.alibaba.com/cps/lrccn27i?bm=cps&src=saf&productId=1601651879892',
  massage_gun: 'https://offer.alibaba.com/cps/lrccn27i?bm=cps&src=saf&productId=62429964716',
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const message = searchParams.get('message') || ''
  const historyParam = searchParams.get('history') || '[]'

  let history: { role: string; content: string }[] = []
  try { history = JSON.parse(historyParam) } catch {}

  if (!message.trim()) {
    return NextResponse.json({ error: 'No message' }, { status: 400 })
  }

  if (!process.env.ANTHROPIC_API_KEY) {
    return NextResponse.json({
      error: 'AI service temporarily unavailable. Please contact us via WhatsApp: +92 300 2385209'
    }, { status: 503 })
  }

  const productId = detectProduct(message)

  const encoder = new TextEncoder()

  const stream = new ReadableStream({
    async start(controller) {
      try {
        const messages = [
          ...history.slice(-10).map(h => ({ role: h.role as 'user' | 'assistant', content: h.content })),
          { role: 'user' as const, content: message }
        ]

        // Send product detection info first
        controller.enqueue(encoder.encode(
          `data: ${JSON.stringify({ type: 'meta', product_id: productId, link: productId ? PRODUCT_LINKS[productId] : null })}\n\n`
        ))

        const response = await client.messages.create({
          model: 'claude-sonnet-4-20250514',
          max_tokens: 600,
          system: SYSTEM_PROMPT,
          messages,
          stream: true,
        })

        for await (const event of response) {
          if (event.type === 'content_block_delta' && event.delta.type === 'text_delta') {
            controller.enqueue(encoder.encode(
              `data: ${JSON.stringify({ type: 'text', content: event.delta.text })}\n\n`
            ))
          }
        }

        controller.enqueue(encoder.encode(
          `data: ${JSON.stringify({ type: 'done' })}\n\n`
        ))
      } catch (err) {
        const errorMsg = err instanceof Error ? err.message : 'Unknown error'
        controller.enqueue(encoder.encode(
          `data: ${JSON.stringify({ type: 'error', message: errorMsg })}\n\n`
        ))
      } finally {
        controller.close()
      }
    }
  })

  return new Response(stream, {
    headers: {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache, no-transform',
      'X-Accel-Buffering': 'no',
      'Connection': 'keep-alive',
      'Access-Control-Allow-Origin': '*',
    }
  })
}

export async function POST(req: NextRequest) {
  try {
    const { message, history = [] } = await req.json()
    if (!message) return NextResponse.json({ error: 'No message' }, { status: 400 })

    if (!process.env.ANTHROPIC_API_KEY) {
      return NextResponse.json({
        response: 'AI service temporarily unavailable. Please contact us:\n📱 WhatsApp: +92 300 2385209\n📧 hafiznaveedchuhan@gmail.com',
        product_id: null,
        link: 'https://linktr.ee/hafiznaveedchuhan'
      })
    }

    const productId = detectProduct(message)
    const messages = [
      ...history.slice(-10).map((h: { role: string; content: string }) => ({
        role: h.role as 'user' | 'assistant',
        content: h.content
      })),
      { role: 'user' as const, content: message }
    ]

    const response = await client.messages.create({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 600,
      system: SYSTEM_PROMPT,
      messages,
    })

    return NextResponse.json({
      response: response.content[0].type === 'text' ? response.content[0].text : '',
      product_id: productId,
      link: productId ? PRODUCT_LINKS[productId] : null,
    })
  } catch {
    return NextResponse.json({
      response: 'Sorry, connection issue. Contact us:\n📱 wa.me/923002385209',
      product_id: null,
      link: 'https://linktr.ee/hafiznaveedchuhan'
    })
  }
}
