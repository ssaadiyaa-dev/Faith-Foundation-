'use client'
import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const QUOTES = [
  {
    text: 'The Friday meal is the only hot food some of our neighbors will receive all week. It is delivered with dignity, every single time.',
    attrib: '— Local imam · Islamabad',
  },
  {
    text: 'Our village has waited many years for a mosque. Seeing the walls rise — it is a mercy we did not expect in our lifetime.',
    attrib: '— Village elder · Jhelum, Pakistan',
  },
  {
    text: 'Sadia shares photos of every family helped. I can see where my sadaqah went. That\'s why I give monthly.',
    attrib: '— Monthly donor · New Jersey',
  },
]

function QuoteIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" style={{ width: '22px', height: '22px' }}>
      <path d="M7 17h-2l1.5-3h-2v-6h6v6l-3.5 3zm8 0h-2l1.5-3h-2v-6h6v6l-3.5 3z" />
    </svg>
  )
}

export default function TestimonialsSection() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    const ctx = gsap.context(() => {
      gsap.from('.testi-head', {
        opacity: 0,
        y: 28,
        duration: 0.9,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.testi-head',
          start: 'top 80%',
        },
      })

      gsap.from('.testi .card', {
        opacity: 0,
        y: 40,
        stagger: 0.15,
        duration: 0.9,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.testi',
          start: 'top 75%',
        },
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      className="section"
      ref={sectionRef}
      style={{ background: 'var(--c-green-900)', color: 'var(--c-cream)' }}
    >
      <div className="container">
        {/* Header */}
        <div className="testi-head section-head" style={{ color: 'var(--c-cream)' }}>
          <span className="eyebrow on-dark">Voices from the ground</span>
          <h2 style={{ color: 'var(--c-cream)', fontFamily: 'var(--f-display)', fontWeight: 500, fontSize: 'clamp(34px,4vw,54px)', lineHeight: 1.08, margin: '14px 0', letterSpacing: '-0.01em' }}>
            What the community is saying.
          </h2>
        </div>

        <div className="testi">
          {QUOTES.map((q, i) => (
            <div
              key={i}
              className="card"
              style={{
                background: 'rgba(250,246,239,0.05)',
                borderColor: 'rgba(250,246,239,0.12)',
                color: 'var(--c-cream)',
                padding: '32px',
                display: 'flex',
                flexDirection: 'column',
                gap: '16px',
              }}
            >
              <div className="rule-orn" style={{ justifyContent: 'flex-start', color: 'var(--c-gold-soft)' }}>
                <QuoteIcon />
              </div>
              <q style={{ fontFamily: 'var(--f-display)', fontStyle: 'italic', fontSize: '22px', lineHeight: 1.35, color: 'var(--c-cream)', quotes: 'none' }}>
                {q.text}
              </q>
              <div style={{ fontSize: '13px', color: 'rgba(250,246,239,0.7)', letterSpacing: '0.04em' }}>
                {q.attrib}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
