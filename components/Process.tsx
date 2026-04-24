'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const steps = [
  {
    num: '01',
    title: 'Discover',
    desc: 'We begin every engagement with deep discovery. Stakeholder interviews, competitor audits, audience research — we don\'t skip steps. Understanding your world is non-negotiable before we touch a single deliverable.',
  },
  {
    num: '02',
    title: 'Define',
    desc: 'Raw insight becomes clear direction. We align on positioning, messaging, and creative vision. This is where strategy crystallises into a shared north star that guides every decision moving forward.',
  },
  {
    num: '03',
    title: 'Design',
    desc: 'Concepts are pressure-tested through iterations. We prototype fast, gather feedback, and refine relentlessly until every element earns its place. Craft without compromise.',
  },
  {
    num: '04',
    title: 'Build',
    desc: 'Design comes to life in code. We engineer for performance, accessibility, and longevity — writing clean, maintainable systems your team can grow with for years to come.',
  },
  {
    num: '05',
    title: 'Launch',
    desc: 'We don\'t hand off and disappear. Launch is just the beginning. We monitor, optimise, and iterate alongside you to ensure the work performs as beautifully in the wild as it did in our studio.',
  },
]

export default function Process() {
  const sectionRef = useRef<HTMLElement>(null)
  const stepsRef = useRef<HTMLDivElement[]>([])
  const lineRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.process-sticky',
        { x: -50, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' },
        }
      )

      stepsRef.current.forEach((step, i) => {
        if (!step) return

        ScrollTrigger.create({
          trigger: step,
          start: 'top 55%',
          end: 'bottom 45%',
          onEnter: () => step.classList.add('active'),
          onLeave: () => step.classList.remove('active'),
          onEnterBack: () => step.classList.add('active'),
          onLeaveBack: () => step.classList.remove('active'),
        })

        gsap.fromTo(
          step,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: { trigger: step, start: 'top 85%' },
          }
        )
      })

      // Animated line fill on scroll
      if (lineRef.current) {
        gsap.fromTo(
          lineRef.current,
          { scaleY: 0 },
          {
            scaleY: 1,
            ease: 'none',
            scrollTrigger: {
              trigger: '.process-steps',
              start: 'top 70%',
              end: 'bottom 30%',
              scrub: 1,
            },
          }
        )
      }
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section id="process" ref={sectionRef}>
      <div className="process-layout">
        <div className="process-sticky">
          <p className="section-label">How We Work</p>
          <h2 className="section-heading">
            Our<br />
            <span style={{ color: 'var(--red)' }}>process</span><br />
            is the<br />product.
          </h2>
          <div
            style={{
              marginTop: '2rem',
              width: '1px',
              height: '200px',
              background: 'var(--border)',
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            <div
              ref={lineRef}
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                background: 'var(--red)',
                transformOrigin: 'top',
                transform: 'scaleY(0)',
              }}
            />
          </div>
        </div>

        <div className="process-steps">
          {steps.map((step, i) => (
            <div
              key={step.num}
              className="process-step"
              ref={(el) => { if (el) stepsRef.current[i] = el }}
            >
              <div className="process-step-num">{step.num}</div>
              <div>
                <h3 className="process-step-title">{step.title}</h3>
                <p className="process-step-desc">{step.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
