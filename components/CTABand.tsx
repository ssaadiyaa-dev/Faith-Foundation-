'use client'
import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const AMOUNTS = ['$10', '$25', '$50', '$100']

export default function CTABand() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    const ctx = gsap.context(() => {
      gsap.from('.cta-band-left', {
        opacity: 0,
        x: -40,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 78%',
        },
      })
      gsap.from('.cta-band-right', {
        opacity: 0,
        x: 40,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 78%',
        },
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section className="section" ref={sectionRef} id="donate">
      <div className="container">
        <div className="cta-band">
          {/* Left text */}
          <div className="cta-band-left">
            <span className="eyebrow" style={{ color: 'var(--c-terracotta-700)' }}>Give today</span>
            <h2
              style={{
                fontFamily: 'var(--f-display)',
                fontSize: 'clamp(32px, 4vw, 52px)',
                fontWeight: 500,
                lineHeight: 1.08,
                margin: '14px 0 20px',
                letterSpacing: '-0.01em',
                color: 'var(--c-ink)',
              }}
            >
              Your sadaqah builds something that outlasts us all.
            </h2>
            <p
              style={{
                color: 'var(--c-ink-60)',
                fontSize: '17px',
                lineHeight: 1.65,
                maxWidth: '44ch',
                marginBottom: '24px',
              }}
            >
              Every gift — large or small — goes directly to mosques under construction,
              Friday meal distributions, and the communities we serve. No admin fees, ever.
            </p>

            <div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap' }}>
              <div>
                <div style={{ fontFamily: 'var(--f-display)', fontSize: '40px', fontWeight: 500, color: 'var(--c-green-900)', lineHeight: 1 }}>$25</div>
                <div style={{ fontSize: '13px', color: 'var(--c-ink-60)', marginTop: '4px' }}>feeds a family this Friday</div>
              </div>
              <div>
                <div style={{ fontFamily: 'var(--f-display)', fontSize: '40px', fontWeight: 500, color: 'var(--c-green-900)', lineHeight: 1 }}>$500</div>
                <div style={{ fontSize: '13px', color: 'var(--c-ink-60)', marginTop: '4px' }}>funds a door for the mosque</div>
              </div>
            </div>
          </div>

          {/* Right donate box */}
          <div
            className="cta-band-right"
            style={{
              background: 'var(--c-white)',
              borderRadius: 'var(--r-lg)',
              padding: '36px',
              boxShadow: 'var(--sh-md)',
              border: '1px solid var(--c-line)',
            }}
          >
            <p style={{ fontSize: '13px', fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--c-ink-60)', marginBottom: '16px' }}>
              Choose an amount
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '10px', marginBottom: '16px' }}>
              {AMOUNTS.map((amt) => (
                <button
                  key={amt}
                  style={{
                    padding: '14px',
                    border: '1.5px solid var(--c-line)',
                    borderRadius: 'var(--r-md)',
                    background: 'transparent',
                    fontFamily: 'var(--f-display)',
                    fontSize: '22px',
                    fontWeight: 500,
                    color: 'var(--c-green-900)',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                  }}
                  onMouseEnter={(e) => {
                    const el = e.currentTarget
                    el.style.background = 'var(--c-green-100)'
                    el.style.borderColor = 'var(--c-green-700)'
                  }}
                  onMouseLeave={(e) => {
                    const el = e.currentTarget
                    el.style.background = 'transparent'
                    el.style.borderColor = 'var(--c-line)'
                  }}
                >
                  {amt}
                </button>
              ))}
            </div>

            <div style={{ marginBottom: '16px' }}>
              <input
                type="number"
                placeholder="Custom amount"
                style={{
                  width: '100%',
                  padding: '14px 16px',
                  border: '1.5px solid var(--c-line)',
                  borderRadius: 'var(--r-md)',
                  fontFamily: 'var(--f-body)',
                  fontSize: '16px',
                  color: 'var(--c-ink)',
                  background: 'transparent',
                  outline: 'none',
                }}
              />
            </div>

            <a href="#give" className="btn btn-accent" style={{ width: '100%', justifyContent: 'center', fontSize: '16px', padding: '18px' }}>
              Give with purpose <span className="arr">→</span>
            </a>

            <p style={{ textAlign: 'center', fontSize: '12px', color: 'var(--c-ink-40)', marginTop: '14px' }}>
              Secure · 501(c)(3) · Tax-deductible in the USA
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
