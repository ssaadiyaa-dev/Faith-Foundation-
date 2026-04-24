'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function CTA() {
  const sectionRef = useRef<HTMLElement>(null)
  const headingRef = useRef<HTMLHeadingElement>(null)
  const btnRef = useRef<HTMLAnchorElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
        },
      })

      tl.fromTo(
        '.cta-eyebrow',
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, ease: 'power3.out' }
      )

      tl.fromTo(
        headingRef.current,
        { y: 60, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: 'power4.out' },
        '-=0.2'
      )

      tl.fromTo(
        '.cta-sub',
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.7, ease: 'power3.out' },
        '-=0.5'
      )

      tl.fromTo(
        btnRef.current,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, ease: 'power3.out' },
        '-=0.4'
      )

      // Subtle pulse on the outer ring
      gsap.to('.cta-bg-circle:first-child', {
        scale: 1.05,
        duration: 3,
        ease: 'sine.inOut',
        repeat: -1,
        yoyo: true,
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section id="cta" ref={sectionRef}>
      <div className="cta-bg-circle" />
      <div className="cta-bg-circle" />

      <p className="cta-eyebrow">Ready to Begin?</p>
      <h2 className="cta-heading" ref={headingRef}>
        LET&apos;S BUILD<br />
        SOMETHING <em>GREAT.</em>
      </h2>
      <p className="cta-sub">
        Tell us about your project. We&apos;ll get back to you within 24 hours
        with honest thoughts and a clear path forward.
      </p>
      <a href="mailto:hello@clawstudio.co" className="cta-btn magnetic-btn" ref={btnRef}>
        <span>Get in Touch</span>
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M3 8h10M9 4l4 4-4 4" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </a>
    </section>
  )
}
