'use client'
import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const LINKS = {
  Foundation: ['About', 'Mission', 'Founder story', 'Annual report'],
  Programs: ['Mosque construction', 'Friday meals', 'Education (coming soon)', 'Healthcare (coming soon)'],
  Give: ['One-time gift', 'Monthly giving', 'Sponsor a Friday', 'Fund a brick'],
  Connect: ['Field updates', 'Contact', 'Newsletter', 'Social media'],
}

export default function SiteFooter() {
  const footerRef = useRef<HTMLElement>(null)

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    const ctx = gsap.context(() => {
      gsap.from('.footer-col', {
        opacity: 0,
        y: 30,
        stagger: 0.1,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: footerRef.current,
          start: 'top 85%',
        },
      })
    }, footerRef)

    return () => ctx.revert()
  }, [])

  return (
    <footer className="site-footer" ref={footerRef}>
      <div className="container">
        {/* Top grid */}
        <div className="footer-grid">
          {/* Brand */}
          <div className="footer-col footer-brand-col">
            <div
              style={{
                fontFamily: 'var(--f-display)',
                fontSize: '28px',
                fontWeight: 500,
                lineHeight: 1.1,
                marginBottom: '16px',
                color: 'var(--c-cream)',
              }}
            >
              Sadia Faith<br />
              <span style={{ color: 'var(--c-gold-soft)', fontStyle: 'italic' }}>Foundation</span>
            </div>
            <p style={{ fontSize: '14px', color: 'rgba(250,246,239,0.65)', lineHeight: 1.7, maxWidth: '260px', marginBottom: '24px' }}>
              A gratitude-led nonprofit building mosques, sharing food every Friday, and
              investing in education and care — from the USA, serving Pakistan.
            </p>
            <div
              style={{
                fontFamily: 'var(--f-arabic)',
                fontSize: '20px',
                color: 'var(--c-gold-soft)',
                direction: 'rtl',
                opacity: 0.7,
              }}
            >
              وَأَمَّا بِنِعْمَةِ رَبِّكَ فَحَدِّثْ
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(LINKS).map(([col, links]) => (
            <div key={col} className="footer-col">
              <div
                style={{
                  fontSize: '11px',
                  letterSpacing: '0.18em',
                  textTransform: 'uppercase',
                  color: 'rgba(250,246,239,0.45)',
                  fontWeight: 700,
                  marginBottom: '20px',
                }}
              >
                {col}
              </div>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      style={{
                        fontSize: '14px',
                        color: 'rgba(250,246,239,0.65)',
                        textDecoration: 'none',
                        transition: 'color 0.2s',
                      }}
                      onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = 'var(--c-cream)' }}
                      onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = 'rgba(250,246,239,0.65)' }}
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingTop: '32px',
            flexWrap: 'wrap',
            gap: '16px',
          }}
        >
          <p style={{ fontSize: '13px', color: 'rgba(250,246,239,0.4)' }}>
            © {new Date().getFullYear()} Sadia Faith Foundation · EIN 39-2477609 · 501(c)(3)
          </p>
          <p style={{ fontSize: '13px', color: 'rgba(250,246,239,0.4)' }}>
            Built with gratitude · Designed for purpose
          </p>
        </div>

        {/* Wordmark */}
        <div
          style={{
            fontFamily: 'var(--f-display)',
            fontSize: 'clamp(48px, 12vw, 160px)',
            lineHeight: 0.85,
            color: 'transparent',
            WebkitTextStroke: '1px rgba(250,246,239,0.07)',
            textAlign: 'center',
            marginTop: '48px',
            userSelect: 'none',
            pointerEvents: 'none',
            letterSpacing: '-0.02em',
            fontWeight: 500,
            fontStyle: 'italic',
          }}
        >
          Sadia Faith Foundation
        </div>
      </div>
    </footer>
  )
}
