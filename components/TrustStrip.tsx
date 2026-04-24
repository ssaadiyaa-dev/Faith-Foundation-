'use client'
import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const ITEMS = [
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M12 2l8 4v6c0 5-3.5 8.5-8 10-4.5-1.5-8-5-8-10V6l8-4z" />
        <path d="M8.5 12l2.5 2.5L15.5 10" />
      </svg>
    ),
    head: 'Registered 501(c)(3)',
    sub: 'EIN 39-2477609 · tax-deductible in the U.S.',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <circle cx="12" cy="12" r="10" />
        <path d="M12 6v6l4 2" />
      </svg>
    ),
    head: 'Full transparency',
    sub: 'Photos and field reports shared with every donor.',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <rect x="3" y="3" width="7" height="7" rx="1" />
        <rect x="14" y="3" width="7" height="7" rx="1" />
        <rect x="3" y="14" width="7" height="7" rx="1" />
        <rect x="14" y="14" width="7" height="7" rx="1" />
      </svg>
    ),
    head: '100% to the cause',
    sub: 'Zero admin fees taken from your donation.',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" />
        <circle cx="12" cy="9" r="2.5" />
      </svg>
    ),
    head: 'On-the-ground delivery',
    sub: 'Verified local teams in Islamabad and Jhelum, Pakistan.',
  },
]

export default function TrustStrip() {
  const stripRef = useRef<HTMLElement>(null)

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    const ctx = gsap.context(() => {
      gsap.from('.ts-item', {
        opacity: 0,
        y: 24,
        stagger: 0.12,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: stripRef.current,
          start: 'top 80%',
        },
      })
    }, stripRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={stripRef}
      style={{
        background: 'var(--c-cream-2)',
        borderTop: '1px solid var(--c-line)',
        borderBottom: '1px solid var(--c-line)',
      }}
    >
      <div className="container">
        <div className="trust-strip">
          {ITEMS.map((item, i) => (
            <div key={i} className="ts-item">
              <div className="ts-icon" aria-hidden="true">
                {item.icon}
              </div>
              <div>
                <div className="ts-head">{item.head}</div>
                <div className="ts-sub">{item.sub}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
