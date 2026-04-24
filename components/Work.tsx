'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const projects = [
  {
    title: 'APEX Brand Identity',
    tag: 'Brand / Identity',
    year: '2024',
    bg: 'work-bg-1',
    accent: '#FF2D55',
    desc: 'Complete brand overhaul for a Series B SaaS company.',
  },
  {
    title: 'Luminary Digital',
    tag: 'Web Design / Dev',
    year: '2024',
    bg: 'work-bg-2',
    accent: '#4D7EFF',
    desc: 'Award-winning website for a luxury hospitality brand.',
  },
  {
    title: 'Noir Fashion',
    tag: 'E-Commerce / Motion',
    year: '2023',
    bg: 'work-bg-3',
    accent: '#FFE600',
    desc: 'High-performance Shopify store with custom animations.',
  },
  {
    title: 'Vortex App',
    tag: 'UX / Development',
    year: '2023',
    bg: 'work-bg-4',
    accent: '#00D4AA',
    desc: 'Fintech app redesign resulting in 40% higher conversion.',
  },
]

export default function Work() {
  const sectionRef = useRef<HTMLElement>(null)
  const cardsRef = useRef<HTMLDivElement[]>([])

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.work-header',
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
          { y: 80, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1,
            ease: 'power4.out',
            delay: i * 0.1,
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
    <section id="work" ref={sectionRef}>
      <div className="work-header">
        <div>
          <p className="section-label">Selected Work</p>
          <h2 className="section-heading">
            Projects that<br />
            <span style={{ color: 'var(--red)' }}>moved</span> the needle.
          </h2>
        </div>
        <a href="#" className="work-all-link">
          View all projects &rarr;
        </a>
      </div>

      <div className="work-grid">
        {projects.map((project, i) => (
          <div
            key={project.title}
            className="work-card"
            ref={(el) => { if (el) cardsRef.current[i] = el }}
          >
            <div className={`work-card-bg ${project.bg}`} />
            <div className="work-card-grid-lines" />
            <div
              className="work-card-color"
              style={{ background: project.accent }}
            />
            <div className="work-card-content">
              <p className="work-card-tag">{project.tag}</p>
              <h3 className="work-card-title">{project.title}</h3>
            </div>
            <span className="work-card-index">0{i + 1}</span>
          </div>
        ))}
      </div>
    </section>
  )
}
