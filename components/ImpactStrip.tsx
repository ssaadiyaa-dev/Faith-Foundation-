'use client'
import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const STATS = [
  { count: 2, suffix: '', label: 'Mosques under construction', id: 'mosques' },
  { count: 52, suffix: '+', label: 'Fridays of giving, and counting', id: 'fridays' },
  { count: 3800, suffix: '+', label: 'Meals shared this year', id: 'meals' },
  { count: 100, suffix: '%', label: 'Donations go to the cause', id: 'pct' },
]

export default function ImpactStrip() {
  const stripRef = useRef<HTMLElement>(null)

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    const ctx = gsap.context(() => {
      // Stagger entrance
      gsap.from('.impact-item', {
        opacity: 0,
        y: 30,
        stagger: 0.12,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: stripRef.current,
          start: 'top 80%',
        },
      })

      // Count up each stat
      STATS.forEach(({ count, id }) => {
        const el = stripRef.current?.querySelector(`[data-stat="${id}"]`) as HTMLElement | null
        if (!el) return

        ScrollTrigger.create({
          trigger: stripRef.current,
          start: 'top 80%',
          once: true,
          onEnter: () => {
            gsap.to({ val: 0 }, {
              val: count,
              duration: count > 100 ? 2.5 : 1.8,
              ease: 'power2.out',
              onUpdate: function () {
                const v = Math.round((this.targets()[0] as { val: number }).val)
                el.textContent = v.toLocaleString()
              },
            })
          },
        })
      })
    }, stripRef)

    return () => ctx.revert()
  }, [])

  return (
    <section className="impact-strip" ref={stripRef}>
      <div className="container">
        <div className="impact-grid" id="counters">
          {STATS.map(({ count, suffix, label, id }) => (
            <div key={id} className="impact-item">
              <div className="stat-num">
                <span data-stat={id}>0</span>
                {suffix}
              </div>
              <div className="stat-label">{label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
