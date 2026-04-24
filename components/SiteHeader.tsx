'use client'
import { useEffect, useRef } from 'react'
import gsap from 'gsap'

export default function SiteHeader() {
  const headerRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const header = headerRef.current
    if (!header) return

    const onScroll = () => {
      if (window.scrollY > 60) {
        header.classList.add('scrolled')
      } else {
        header.classList.remove('scrolled')
      }
    }

    // Entrance animation
    const ctx = gsap.context(() => {
      gsap.from(header, {
        y: -20,
        opacity: 0,
        duration: 0.9,
        ease: 'power3.out',
        delay: 0.1,
      })
    }, header)

    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      ctx.revert()
    }
  }, [])

  return (
    <header id="site-header" ref={headerRef}>
      <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '24px' }}>
        {/* Logo */}
        <a
          href="#"
          style={{
            fontFamily: 'var(--f-display)',
            fontSize: '22px',
            fontWeight: 500,
            color: 'var(--c-cream)',
            textDecoration: 'none',
            letterSpacing: '-0.01em',
            lineHeight: 1.1,
            flexShrink: 0,
          }}
        >
          Sadia Faith<br />
          <span style={{ color: 'var(--c-gold-soft)', fontStyle: 'italic' }}>Foundation</span>
        </a>

        {/* Nav */}
        <nav aria-label="Main navigation">
          <ul className="nav-links-list">
            {['About', 'Programs', 'Field Updates'].map((label) => (
              <li key={label}>
                <a href={`#${label.toLowerCase().replace(' ', '-')}`}>{label}</a>
              </li>
            ))}
          </ul>
        </nav>

        {/* CTA */}
        <a
          href="#donate"
          className="btn btn-accent"
          style={{ fontSize: '13px', padding: '10px 20px' }}
        >
          Donate <span className="arr">→</span>
        </a>
      </div>
    </header>
  )
}
