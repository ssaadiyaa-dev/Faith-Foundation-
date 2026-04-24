'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'

const items = [
  'Brand Identity',
  'Web Design',
  'Development',
  'Motion',
  'Strategy',
  'UX Research',
  'Design Systems',
  'Creative Direction',
]

export default function Marquee() {
  const track1Ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const duration = 28

      gsap.to(track1Ref.current, {
        x: '-50%',
        duration,
        ease: 'none',
        repeat: -1,
      })
    })

    return () => ctx.revert()
  }, [])

  const doubled = [...items, ...items]

  return (
    <div className="marquee-section">
      <div ref={track1Ref} className="marquee-track">
        {doubled.map((item, i) => (
          <div key={i} className="marquee-item">
            <span className="marquee-dot" />
            <span>{item}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
