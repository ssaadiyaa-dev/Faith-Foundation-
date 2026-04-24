'use client'
import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const STARS = [
  { top: '8%', left: '12%', size: 1.5, opacity: 0.7 },
  { top: '15%', left: '55%', size: 1, opacity: 0.5 },
  { top: '6%', left: '78%', size: 2, opacity: 0.6 },
  { top: '22%', left: '88%', size: 1.2, opacity: 0.4 },
  { top: '30%', left: '34%', size: 1, opacity: 0.35 },
  { top: '11%', left: '42%', size: 1.5, opacity: 0.55 },
  { top: '19%', left: '66%', size: 1, opacity: 0.45 },
  { top: '5%', left: '92%', size: 1.8, opacity: 0.5 },
  { top: '28%', left: '6%', size: 1, opacity: 0.4 },
  { top: '35%', left: '75%', size: 1.2, opacity: 0.35 },
  { top: '42%', left: '90%', size: 1, opacity: 0.3 },
  { top: '14%', left: '24%', size: 0.8, opacity: 0.4 },
]

const BLOBS = [
  { top: '20%', left: '-10%', size: 500, color: 'rgba(46,113,80,0.18)' },
  { top: '50%', left: '60%', size: 400, color: 'rgba(29,86,57,0.22)' },
  { top: '70%', left: '20%', size: 350, color: 'rgba(14,38,24,0.3)' },
]

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const bgRef = useRef<HTMLDivElement>(null)
  const blobsRef = useRef<HTMLDivElement>(null)
  const eyebrowRef = useRef<HTMLSpanElement>(null)
  const h1Ref = useRef<HTMLHeadingElement>(null)
  const leadRef = useRef<HTMLParagraphElement>(null)
  const actionsRef = useRef<HTMLDivElement>(null)
  const proofRef = useRef<HTMLDivElement>(null)
  const verseCardRef = useRef<HTMLElement>(null)
  const verseArabicRef = useRef<HTMLDivElement>(null)
  const verseTransRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    const ctx = gsap.context(() => {
      // Blob ambient animation
      if (blobsRef.current) {
        const blobs = blobsRef.current.children
        Array.from(blobs).forEach((blob, i) => {
          gsap.to(blob, {
            x: `random(-40, 40)`,
            y: `random(-40, 40)`,
            duration: `random(8, 14)`,
            ease: 'sine.inOut',
            repeat: -1,
            yoyo: true,
            delay: i * 1.5,
          })
          gsap.to(blob, {
            scale: `random(0.85, 1.15)`,
            duration: `random(10, 18)`,
            ease: 'sine.inOut',
            repeat: -1,
            yoyo: true,
            delay: i * 2,
          })
        })
      }

      // Stars twinkling
      const stars = sectionRef.current?.querySelectorAll('.hero-star')
      stars?.forEach((star) => {
        gsap.to(star, {
          opacity: `random(0.1, 0.8)`,
          duration: `random(2, 5)`,
          ease: 'sine.inOut',
          repeat: -1,
          yoyo: true,
          delay: `random(0, 3)`,
        })
      })

      // Entrance timeline
      const tl = gsap.timeline({ delay: 0.4 })

      tl.from(eyebrowRef.current, { opacity: 0, y: 16, duration: 0.7, ease: 'power3.out' })
        .from(h1Ref.current, { opacity: 0, y: 36, duration: 1, ease: 'power3.out' }, '-=0.4')
        .from(leadRef.current, { opacity: 0, y: 20, duration: 0.8, ease: 'power2.out' }, '-=0.5')
        .from(actionsRef.current, { opacity: 0, y: 16, duration: 0.7, ease: 'power2.out' }, '-=0.4')
        .from(proofRef.current, { opacity: 0, y: 12, duration: 0.6, ease: 'power2.out' }, '-=0.3')
        .from(verseCardRef.current, { opacity: 0, x: 40, duration: 1, ease: 'power3.out' }, '-=0.9')
        .from(verseArabicRef.current, { opacity: 0, y: 12, duration: 0.7, ease: 'power2.out' }, '-=0.3')
        .from(verseTransRef.current, { opacity: 0, y: 8, duration: 0.6, ease: 'power2.out' }, '-=0.3')

      // Parallax on blobs / bg
      gsap.to(blobsRef.current, {
        y: -80,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 1.5,
        },
      })

      // Count up the donor number
      const countEl = sectionRef.current?.querySelector('[data-hero-count]') as HTMLElement | null
      if (countEl) {
        const target = parseInt(countEl.dataset.heroCount || '47')
        gsap.to({ val: 0 }, {
          val: target,
          duration: 2.5,
          delay: 1.8,
          ease: 'power2.out',
          onUpdate: function () {
            countEl.textContent = Math.round((this.targets()[0] as { val: number }).val).toString()
          },
        })
      }
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section className="hero" ref={sectionRef}>
      {/* Animated background */}
      <div className="hero-bg" ref={bgRef} />

      {/* Blob lights */}
      <div ref={blobsRef} style={{ position: 'absolute', inset: 0, zIndex: 0, pointerEvents: 'none' }}>
        {BLOBS.map((b, i) => (
          <div
            key={i}
            className="hero-blob"
            style={{
              top: b.top,
              left: b.left,
              width: b.size,
              height: b.size,
              background: b.color,
            }}
          />
        ))}
      </div>

      {/* Stars */}
      {STARS.map((s, i) => (
        <div
          key={i}
          className="hero-star"
          style={{
            top: s.top,
            left: s.left,
            width: s.size,
            height: s.size,
            opacity: s.opacity,
          }}
        />
      ))}

      <div className="hero-overlay" />

      <div className="container">
        <div className="hero-content">
          {/* Left */}
          <div>
            <span className="eyebrow on-dark" ref={eyebrowRef}>
              A nonprofit foundation · USA serving Pakistan
            </span>

            <h1
              ref={h1Ref}
              className="display-xl"
              style={{ color: '#fdf8ed', margin: '18px 0 20px', textShadow: '0 2px 24px rgba(0,0,0,0.35)' }}
            >
              Gratitude,{' '}
              <em style={{ fontStyle: 'italic', color: '#f3d58a' }}>in action.</em>
            </h1>

            <p
              ref={leadRef}
              className="lead"
              style={{ color: 'rgba(250,246,239,0.9)', maxWidth: '42ch', textShadow: '0 1px 12px rgba(0,0,0,0.4)' }}
            >
              Sadia Faith Foundation builds mosques, shares free food every Friday after
              Jummah, and invests in education and care — a lifelong commitment rooted in
              gratitude to Allah.
            </p>

            <div ref={actionsRef} style={{ display: 'flex', gap: '14px', flexWrap: 'wrap', marginTop: '32px' }}>
              <a href="#donate" className="btn btn-accent btn-lg">
                Give with purpose <span className="arr">→</span>
              </a>
              <a href="#about" className="btn btn-ghost on-dark btn-lg">
                Our story
              </a>
            </div>

            <div ref={proofRef} className="hero-proof">
              <span className="hp-dot" aria-hidden="true" />
              Join{' '}
              <strong style={{ color: 'var(--c-gold-soft)', fontWeight: 600 }}>
                <span data-hero-count="47">0</span>
              </strong>{' '}
              donors giving this month
            </div>
          </div>

          {/* Right — verse card */}
          <aside className="verse-card" ref={verseCardRef}>
            <div
              ref={verseArabicRef}
              style={{
                fontFamily: 'var(--f-arabic)',
                fontSize: '28px',
                lineHeight: 1.6,
                color: 'var(--c-gold-soft)',
                direction: 'rtl',
                textAlign: 'right',
                marginBottom: '16px',
              }}
            >
              وَأَمَّا بِنِعْمَةِ رَبِّكَ فَحَدِّثْ
            </div>

            <div
              ref={verseTransRef}
              style={{
                fontFamily: 'var(--f-display)',
                fontStyle: 'italic',
                fontSize: '20px',
                lineHeight: 1.4,
                color: 'var(--c-cream)',
                marginBottom: '12px',
              }}
            >
              "And as for the favor of your Lord, proclaim it."
            </div>

            <div
              style={{
                fontSize: '12px',
                letterSpacing: '0.18em',
                textTransform: 'uppercase',
                color: 'rgba(250,246,239,0.5)',
              }}
            >
              — Qur'an 93:11
            </div>

          </aside>
        </div>
      </div>
    </section>
  )
}
