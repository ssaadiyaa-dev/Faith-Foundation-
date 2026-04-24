'use client'
import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'

export default function BismillahIntro() {
  const [show, setShow] = useState(false)
  const overlayRef = useRef<HTMLDivElement>(null)
  const arabicRef = useRef<HTMLDivElement>(null)
  const transRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const seen = sessionStorage.getItem('sff-intro-seen')
    if (seen) return
    sessionStorage.setItem('sff-intro-seen', '1')
    setShow(true)
  }, [])

  useEffect(() => {
    if (!show || !overlayRef.current) return

    const ctx = gsap.context(() => {
      const tl = gsap.timeline()

      tl.from(arabicRef.current, {
        opacity: 0,
        y: 20,
        duration: 1.1,
        ease: 'power3.out',
        delay: 0.2,
      })
        .from(transRef.current, {
          opacity: 0,
          y: 10,
          duration: 0.9,
          ease: 'power2.out',
        }, '-=0.4')
        .to(overlayRef.current, {
          opacity: 0,
          duration: 0.9,
          ease: 'power2.inOut',
          delay: 1.6,
          onComplete: () => {
            if (overlayRef.current) overlayRef.current.style.display = 'none'
          },
        })
    }, overlayRef)

    return () => ctx.revert()
  }, [show])

  if (!show) return null

  return (
    <div id="bismillah-intro" ref={overlayRef} aria-hidden="true">
      <div style={{ textAlign: 'center', padding: '0 24px' }}>
        <div
          ref={arabicRef}
          style={{
            fontFamily: 'var(--f-arabic)',
            color: 'var(--c-gold-soft)',
            fontSize: 'clamp(36px, 7vw, 72px)',
            lineHeight: 1.4,
            direction: 'rtl',
            textShadow: '0 2px 24px rgba(217,178,106,0.3)',
          }}
        >
          بِسْمِ ٱللَّٰهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ
        </div>
        <div
          ref={transRef}
          style={{
            fontFamily: 'var(--f-display)',
            fontStyle: 'italic',
            color: 'rgba(250,246,239,0.75)',
            fontSize: 'clamp(14px, 1.6vw, 18px)',
            marginTop: '24px',
            letterSpacing: '0.02em',
          }}
        >
          In the name of God, the Most Gracious, the Most Merciful
        </div>
      </div>
    </div>
  )
}
