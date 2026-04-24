'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function Hero() {
  const heroRef = useRef<HTMLElement>(null)
  const eyebrowRef = useRef<HTMLParagraphElement>(null)
  const line1Ref = useRef<HTMLSpanElement>(null)
  const line2Ref = useRef<HTMLSpanElement>(null)
  const line3Ref = useRef<HTMLSpanElement>(null)
  const descRef = useRef<HTMLParagraphElement>(null)
  const scrollRef = useRef<HTMLDivElement>(null)
  const bgTextRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 2.5 })

      tl.to(eyebrowRef.current, { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' })

      tl.to(
        [line1Ref.current, line2Ref.current, line3Ref.current],
        {
          y: 0,
          duration: 1,
          ease: 'power4.out',
          stagger: 0.12,
        },
        '-=0.3'
      )

      tl.to(
        [descRef.current, scrollRef.current],
        { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out', stagger: 0.1 },
        '-=0.4'
      )

      // Parallax on bg text
      if (bgTextRef.current) {
        gsap.to(bgTextRef.current, {
          y: '30%',
          ease: 'none',
          scrollTrigger: {
            trigger: heroRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: 1.5,
          },
        })
      }

      // Parallax on description
      if (descRef.current) {
        gsap.to(descRef.current, {
          y: '-20%',
          opacity: 0,
          ease: 'none',
          scrollTrigger: {
            trigger: heroRef.current,
            start: '60% top',
            end: 'bottom top',
            scrub: 1,
          },
        })
      }
    }, heroRef)

    return () => ctx.revert()
  }, [])

  return (
    <section id="hero" ref={heroRef}>
      <div className="hero-bg-text" ref={bgTextRef} aria-hidden>CLAW</div>

      <p className="hero-eyebrow" ref={eyebrowRef} style={{ transform: 'translateY(10px)' }}>
        Creative Studio — Est. 2019
      </p>

      <h1 className="hero-headline" aria-label="Design that leaves its mark">
        <span className="hero-line">
          <span className="hero-line-inner" ref={line1Ref}>DESIGN</span>
        </span>
        <span className="hero-line">
          <span className="hero-line-inner" ref={line2Ref}>
            THAT <span className="accent">LEAVES</span>
          </span>
        </span>
        <span className="hero-line">
          <span className="hero-line-inner" ref={line3Ref}>ITS MARK</span>
        </span>
      </h1>

      <div className="hero-sub-row">
        <p className="hero-description" ref={descRef} style={{ transform: 'translateY(10px)' }}>
          We partner with ambitious brands to craft digital experiences that are impossible to ignore.
          Strategy, design, and code — all under one roof.
        </p>
        <div className="hero-scroll-indicator" ref={scrollRef} style={{ transform: 'translateY(10px)' }}>
          <div className="scroll-line" />
          <span>Scroll to explore</span>
        </div>
      </div>
    </section>
  )
}
