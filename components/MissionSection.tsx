'use client'
import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

export default function MissionSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const artRef = useRef<HTMLDivElement>(null)
  const badgeRef = useRef<HTMLDivElement>(null)
  const textRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    const ctx = gsap.context(() => {
      // Image clip-path reveal from left
      gsap.from(artRef.current, {
        clipPath: 'inset(0 100% 0 0)',
        duration: 1.3,
        ease: 'power4.inOut',
        scrollTrigger: {
          trigger: artRef.current,
          start: 'top 78%',
        },
      })

      // Badge float in
      gsap.from(badgeRef.current, {
        opacity: 0,
        scale: 0.8,
        duration: 0.8,
        ease: 'back.out(1.7)',
        delay: 0.4,
        scrollTrigger: {
          trigger: artRef.current,
          start: 'top 78%',
        },
      })

      // Text stagger
      const textEls = textRef.current?.children
      if (textEls) {
        gsap.from(Array.from(textEls), {
          opacity: 0,
          y: 28,
          stagger: 0.1,
          duration: 0.85,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: textRef.current,
            start: 'top 78%',
          },
        })
      }
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section className="section" ref={sectionRef} id="about">
      <div className="container">
        <div className="mission-grid">
          {/* Image side */}
          <div className="mission-art">
            <div
              className="mission-art-inner"
              ref={artRef}
              style={{ background: 'linear-gradient(160deg, #1d5639 0%, #2e7150 40%, #4a7a3a 70%, #1b3e25 100%)' }}
            >
              {/* Decorative overlay pattern */}
              <div style={{
                position: 'absolute', inset: 0,
                backgroundImage: `
                  repeating-linear-gradient(
                    0deg,
                    transparent,
                    transparent 38px,
                    rgba(250,246,239,0.04) 38px,
                    rgba(250,246,239,0.04) 40px
                  ),
                  repeating-linear-gradient(
                    90deg,
                    transparent,
                    transparent 38px,
                    rgba(250,246,239,0.04) 38px,
                    rgba(250,246,239,0.04) 40px
                  )
                `,
              }} />
              {/* Arch silhouette */}
              <svg
                viewBox="0 0 400 500"
                style={{ position: 'absolute', bottom: 0, left: '50%', transform: 'translateX(-50%)', width: '80%', opacity: 0.25 }}
                fill="none"
              >
                <path d="M80 500 L80 280 Q 200 140, 320 280 L320 500 Z" fill="rgba(253,248,237,0.8)" />
                <path d="M60 500 L60 290 Q 200 120, 340 290 L340 500 Z" fill="none" stroke="rgba(253,248,237,0.5)" strokeWidth="2" />
                <circle cx="200" cy="135" r="30" fill="rgba(217,178,106,0.6)" />
              </svg>
              {/* Gold accent bars */}
              <div style={{ position: 'absolute', bottom: '20%', left: 0, right: 0, display: 'flex', justifyContent: 'center', gap: '8px' }}>
                {[1, 2, 3].map(i => (
                  <div key={i} style={{ width: '3px', height: `${30 + i * 12}px`, background: 'rgba(217,178,106,0.4)', borderRadius: '2px' }} />
                ))}
              </div>
            </div>

            {/* Floating badge */}
            <div className="badge-float" ref={badgeRef}>
              <div style={{ fontSize: '36px', fontFamily: 'var(--f-display)', color: 'var(--c-terracotta-700)', lineHeight: 1 }}>❝</div>
              <div>
                <strong style={{ display: 'block', fontFamily: 'var(--f-display)', fontSize: '22px', color: 'var(--c-green-800)', lineHeight: 1.1 }}>
                  Built to last,
                </strong>
                <span style={{ fontSize: '13px', color: 'var(--c-ink-60)' }}>brick by brick, with your support.</span>
              </div>
            </div>
          </div>

          {/* Text side */}
          <div ref={textRef}>
            <span className="eyebrow">Our Mission</span>
            <h2
              className="display-md"
              style={{ margin: '14px 0 24px', color: 'var(--c-ink)' }}
            >
              From hardship to service — a promise to give for as long as I live.
            </h2>
            <p className="lead" style={{ marginBottom: '20px' }}>
              Our founder, <strong style={{ color: 'var(--c-ink)' }}>Sadia</strong>, has known hardship
              without support. By the blessing of Allah, she now has more than she once imagined —
              and has made it her lifelong commitment to give back.
            </p>
            <p style={{ color: 'var(--c-ink-60)', marginBottom: '28px', lineHeight: 1.7 }}>
              Sadia Faith Foundation is how that promise becomes practice: mosques rising where
              communities need them, meals served to neighbors every Friday, and long-term investments
              in the people and places we love.
            </p>
            <a href="#story" className="link-underline">
              Read our founder's story <span className="arr">→</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
