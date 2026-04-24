'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'

export default function Preloader() {
  const preloaderRef = useRef<HTMLDivElement>(null)
  const lettersRef = useRef<HTMLSpanElement[]>([])
  const barRef = useRef<HTMLDivElement>(null)
  const countRef = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete: () => {
          if (preloaderRef.current) {
            preloaderRef.current.style.display = 'none'
            document.body.style.overflow = 'auto'
          }
        },
      })

      document.body.style.overflow = 'hidden'

      // Letters stagger in
      tl.to(lettersRef.current, {
        y: 0,
        duration: 0.9,
        ease: 'power4.out',
        stagger: 0.08,
      })

      // Progress bar + counter
      const countObj = { val: 0 }
      tl.to(
        countObj,
        {
          val: 100,
          duration: 1.2,
          ease: 'power2.inOut',
          onUpdate() {
            if (countRef.current) countRef.current.textContent = `${Math.round(countObj.val)}%`
          },
        },
        '<0.1'
      )
      tl.to(barRef.current, { width: '100%', duration: 1.2, ease: 'power2.inOut' }, '<')

      // Brief pause
      tl.addLabel('done', '+=0.3')

      // Letters scatter up
      tl.to(
        lettersRef.current,
        {
          y: '-120%',
          duration: 0.7,
          ease: 'power4.in',
          stagger: 0.05,
        },
        'done'
      )

      // Preloader slides up
      tl.to(
        preloaderRef.current,
        {
          yPercent: -100,
          duration: 0.9,
          ease: 'power4.inOut',
        },
        'done+=0.2'
      )
    }, preloaderRef)

    return () => ctx.revert()
  }, [])

  const addToLetters = (el: HTMLSpanElement | null, i: number) => {
    if (el) lettersRef.current[i] = el
  }

  return (
    <div id="preloader" ref={preloaderRef}>
      <div className="preloader-letters">
        {['C', 'L', 'A', 'W'].map((char, i) => (
          <span key={char} className="preloader-letter" ref={(el) => addToLetters(el, i)}>
            {char}
          </span>
        ))}
      </div>
      <div className="preloader-bar-track">
        <div className="preloader-bar-fill" ref={barRef} />
      </div>
      <p className="preloader-count">
        Loading — <span ref={countRef}>0%</span>
      </p>
    </div>
  )
}
