'use client'
import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

export default function PullQuote() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
        },
      })

      tl.from('.pq-ornament', {
        opacity: 0,
        scale: 0.5,
        rotation: 180,
        duration: 0.9,
        ease: 'back.out(1.7)',
      })
        .from('.pq-text', {
          opacity: 0,
          y: 24,
          duration: 1,
          ease: 'power3.out',
        }, '-=0.4')
        .from('.pq-attr', {
          opacity: 0,
          y: 12,
          duration: 0.7,
          ease: 'power2.out',
        }, '-=0.3')

      // Subtle scale in
      gsap.from(sectionRef.current, {
        scale: 0.97,
        duration: 1.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
        },
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      className="section-lg"
      ref={sectionRef}
      style={{ background: 'var(--c-cream-2)' }}
    >
      <div className="container-narrow center">
        <div className="pq-ornament rule-orn" style={{ marginBottom: '32px' }}>
          <svg viewBox="0 0 24 24" fill="currentColor" style={{ width: '24px', height: '24px' }}>
            <path d="M12 2l2.4 7.4H22l-6.2 4.5L18.2 22 12 17.5 5.8 22l2.4-8.1L2 9.4h7.6L12 2z" />
          </svg>
        </div>

        <p className="pull-quote pq-text">
          "The best of people are those who are most beneficial to people."
        </p>

        <p
          className="pq-attr"
          style={{
            marginTop: '20px',
            fontSize: '14px',
            letterSpacing: '0.14em',
            textTransform: 'uppercase',
            color: 'var(--c-ink-60)',
            fontWeight: 600,
          }}
        >
          — Prophet Muhammad ﷺ · Hadith, Al-Mu&apos;jam Al-Awsat
        </p>
      </div>
    </section>
  )
}
