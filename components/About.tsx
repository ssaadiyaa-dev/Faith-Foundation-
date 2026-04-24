'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const stats = [
  { number: 50, suffix: '+', label: 'Projects Delivered' },
  { number: 98, suffix: '%', label: 'Client Satisfaction' },
  { number: 7, suffix: '', label: 'Years of Excellence' },
  { number: 30, suffix: '+', label: 'Global Clients' },
]

export default function About() {
  const sectionRef = useRef<HTMLElement>(null)
  const headingRef = useRef<HTMLHeadingElement>(null)
  const bodyRef = useRef<HTMLParagraphElement>(null)
  const statsRef = useRef<HTMLDivElement>(null)
  const statNumsRef = useRef<HTMLSpanElement[]>([])

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Heading reveal
      gsap.fromTo(
        headingRef.current,
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: 'power4.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
          },
        }
      )

      // Body text
      gsap.fromTo(
        bodyRef.current,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.9,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: bodyRef.current,
            start: 'top 85%',
          },
        }
      )

      // Stats container
      gsap.fromTo(
        statsRef.current,
        { x: 50, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.9,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: statsRef.current,
            start: 'top 85%',
          },
        }
      )

      // Counter animation for each stat
      statNumsRef.current.forEach((el, i) => {
        if (!el) return
        const target = stats[i].number
        const obj = { val: 0 }
        gsap.to(obj, {
          val: target,
          duration: 1.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 90%',
            once: true,
          },
          onUpdate() {
            el.textContent = Math.round(obj.val).toString()
          },
        })
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section id="about" ref={sectionRef}>
      <p className="section-label">About Us</p>
      <h2 className="section-heading" ref={headingRef}>
        We don&apos;t just<br />
        build websites.<br />
        We build <span style={{ color: 'var(--red)' }}>legacies.</span>
      </h2>

      <div className="about-grid">
        <div>
          <p className="about-body" ref={bodyRef}>
            CLAW is a full-service creative studio built for brands that refuse to blend in.
            We combine strategic thinking with obsessive craft to produce work that cuts through
            the noise and drives real results.
            <br /><br />
            From early-stage startups to global enterprises, we&apos;ve partnered with companies
            at every stage of growth — always bringing the same relentless attention to detail
            and creative ambition.
          </p>
          <a href="#work" className="about-cta-link" onClick={(e) => { e.preventDefault(); document.getElementById('work')?.scrollIntoView({ behavior: 'smooth' }) }}>
            View our work
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M3 8h10M9 4l4 4-4 4" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
        </div>

        <div className="stats-grid" ref={statsRef}>
          {stats.map((stat, i) => (
            <div key={stat.label} className="stat-item">
              <div className="stat-number">
                <span ref={(el) => { if (el) statNumsRef.current[i] = el }}>0</span>
                <span style={{ color: 'var(--red)' }}>{stat.suffix}</span>
              </div>
              <p className="stat-label">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
