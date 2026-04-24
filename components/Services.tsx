'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const services = [
  {
    num: '01',
    title: 'Brand Identity',
    desc: 'We build brands that stand for something. Logos, colour systems, typography, guidelines — everything you need to show up consistently.',
    tags: ['Logo Design', 'Brand Guidelines', 'Visual Identity', 'Naming'],
    icon: (
      <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.2" className="service-icon">
        <circle cx="16" cy="16" r="12" />
        <path d="M16 4v24M4 16h24" />
        <circle cx="16" cy="16" r="4" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
  {
    num: '02',
    title: 'Web Design',
    desc: 'Pixel-perfect interfaces crafted for humans. We design websites and apps that are intuitive, beautiful, and impossible to forget.',
    tags: ['UI Design', 'UX Research', 'Prototyping', 'Design Systems'],
    icon: (
      <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.2" className="service-icon">
        <rect x="3" y="6" width="26" height="20" rx="2" />
        <path d="M3 12h26" />
        <circle cx="7" cy="9" r="1" fill="currentColor" stroke="none" />
        <circle cx="11" cy="9" r="1" fill="currentColor" stroke="none" />
        <circle cx="15" cy="9" r="1" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
  {
    num: '03',
    title: 'Development',
    desc: 'Clean, fast, scalable code. We build with Next.js, React, and modern tooling — delivering performance-first digital products.',
    tags: ['Next.js', 'React', 'TypeScript', 'Headless CMS'],
    icon: (
      <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.2" className="service-icon">
        <path d="M10 10l-6 6 6 6M22 10l6 6-6 6M18 6l-4 20" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    num: '04',
    title: 'Motion & Animation',
    desc: 'Motion that has purpose. We use GSAP, Framer Motion, and After Effects to bring interfaces to life without sacrificing performance.',
    tags: ['GSAP', 'After Effects', 'Lottie', 'WebGL'],
    icon: (
      <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.2" className="service-icon">
        <path d="M6 16c0-5.5 4.5-10 10-10s10 4.5 10 10" strokeLinecap="round" />
        <path d="M16 6v4M26 16h-4" strokeLinecap="round" />
        <circle cx="16" cy="16" r="3" />
        <path d="M16 19v7" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    num: '05',
    title: 'Strategy',
    desc: 'Good design follows clear thinking. We help define positioning, messaging, and go-to-market strategy before a single pixel is placed.',
    tags: ['Brand Strategy', 'Positioning', 'Messaging', 'Competitor Analysis'],
    icon: (
      <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.2" className="service-icon">
        <path d="M4 26l7-8 5 4 5-10 7 4" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="28" cy="16" r="2" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
  {
    num: '06',
    title: 'Creative Direction',
    desc: 'The glue that holds everything together. Our creative directors ensure every touchpoint tells a coherent, compelling story.',
    tags: ['Art Direction', 'Campaigns', 'Photography', 'Copywriting'],
    icon: (
      <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.2" className="service-icon">
        <path d="M16 3l4 8 9 1.3-6.5 6.3 1.5 9L16 23l-8 4.6 1.5-9L3 12.3l9-1.3z" strokeLinejoin="round" />
      </svg>
    ),
  },
]

export default function Services() {
  const sectionRef = useRef<HTMLElement>(null)
  const cardsRef = useRef<HTMLDivElement[]>([])

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.services-heading-block',
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.9,
          ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' },
        }
      )

      cardsRef.current.forEach((card, i) => {
        if (!card) return
        gsap.fromTo(
          card,
          { y: 50, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: 'power3.out',
            delay: (i % 3) * 0.1,
            scrollTrigger: {
              trigger: card,
              start: 'top 90%',
            },
          }
        )
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section id="services" ref={sectionRef}>
      <div className="services-heading-block">
        <p className="section-label">What We Do</p>
        <h2 className="section-heading">
          End-to-end<br />
          <span style={{ color: 'var(--red)' }}>creative</span> services.
        </h2>
      </div>

      <div className="services-grid">
        {services.map((service, i) => (
          <div
            key={service.num}
            className="service-card"
            ref={(el) => { if (el) cardsRef.current[i] = el }}
          >
            <p className="service-number">{service.num}</p>
            {service.icon}
            <h3 className="service-title">{service.title}</h3>
            <p className="service-desc">{service.desc}</p>
            <div className="service-tags">
              {service.tags.map((tag) => (
                <span key={tag} className="service-tag">{tag}</span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
