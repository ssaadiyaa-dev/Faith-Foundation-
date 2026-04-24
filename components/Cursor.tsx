'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'

export default function Cursor() {
  const dotRef = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (typeof window === 'undefined') return

    const dot = dotRef.current
    const ring = ringRef.current
    if (!dot || !ring) return

    gsap.set([dot, ring], { xPercent: -50, yPercent: -50 })

    const moveDotX = gsap.quickTo(dot, 'x', { duration: 0.08, ease: 'power3.out' })
    const moveDotY = gsap.quickTo(dot, 'y', { duration: 0.08, ease: 'power3.out' })
    const moveRingX = gsap.quickTo(ring, 'x', { duration: 0.4, ease: 'power3.out' })
    const moveRingY = gsap.quickTo(ring, 'y', { duration: 0.4, ease: 'power3.out' })

    const onMove = (e: MouseEvent) => {
      moveDotX(e.clientX)
      moveDotY(e.clientY)
      moveRingX(e.clientX)
      moveRingY(e.clientY)
    }

    const onEnterLink = () => document.body.classList.add('cursor-hover')
    const onLeaveLink = () => document.body.classList.remove('cursor-hover')

    window.addEventListener('mousemove', onMove)

    const links = document.querySelectorAll('a, button, .magnetic-btn, .work-card, .service-card')
    links.forEach((el) => {
      el.addEventListener('mouseenter', onEnterLink)
      el.addEventListener('mouseleave', onLeaveLink)
    })

    return () => {
      window.removeEventListener('mousemove', onMove)
      links.forEach((el) => {
        el.removeEventListener('mouseenter', onEnterLink)
        el.removeEventListener('mouseleave', onLeaveLink)
      })
    }
  }, [])

  return (
    <>
      <div id="cursor-dot" ref={dotRef} />
      <div id="cursor-ring" ref={ringRef} />
    </>
  )
}
