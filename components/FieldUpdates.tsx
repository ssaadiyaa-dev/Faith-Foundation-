'use client'
import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const UPDATES = [
  {
    day: '23',
    month: 'Apr 2026',
    tag: 'Friday meals',
    tagClass: 'tag-meals',
    meta: 'Islamabad · Friday distribution',
    title: '84 families served after Jummah this month.',
    body: 'Meals distributed individually, door-to-door where needed, to families identified by the local imam. Menu this week: chicken biryani, daal, naan, and fresh fruit.',
    bg: 'linear-gradient(135deg, #6b3318 0%, #a05a35 40%, #c4803a 100%)',
  },
  {
    day: '30',
    month: 'Apr 2026',
    tag: 'Mosque build',
    tagClass: 'tag-mosque',
    meta: 'Jhelum · Construction log',
    title: 'Both archways complete — roof work begins next.',
    body: 'The main entrance and interior archways are fully bricked. Masons start on the roof this week. We're 47% of the way to our finishing goal.',
    bg: 'linear-gradient(135deg, #1a4a2e 0%, #1d5639 40%, #2e7150 100%)',
  },
  {
    day: '17',
    month: 'Apr 2026',
    tag: 'Friday meals',
    tagClass: 'tag-meals',
    meta: 'Islamabad · Friday distribution',
    title: 'A new monthly donor covered this week\'s entire distribution.',
    body: 'A single recurring gift funded all 78 meals shared this Friday. If you've been thinking about monthly giving — this is what it does.',
    bg: 'linear-gradient(135deg, #5c3a1a 0%, #8a5530 40%, #b87840 100%)',
  },
  {
    day: '28',
    month: 'Feb 2026',
    tag: 'Mosque build',
    tagClass: 'tag-mosque',
    meta: 'Jhelum · Milestone',
    title: 'Walls pass the second row — foundation blessing held on site.',
    body: 'Local elders gathered at dusk for a short du\'a as the second row of brickwork was completed. Walkthrough video from the site coming this week.',
    bg: 'linear-gradient(135deg, #1e3a28 0%, #256142 40%, #2e7150 100%)',
  },
]

export default function FieldUpdates() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    const ctx = gsap.context(() => {
      gsap.from('.field-header', {
        opacity: 0,
        y: 30,
        duration: 0.9,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.field-header',
          start: 'top 80%',
        },
      })

      gsap.from('.update', {
        opacity: 0,
        y: 40,
        stagger: 0.12,
        duration: 0.9,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.updates-feed',
          start: 'top 80%',
        },
      })

      gsap.from('.fu-cta', {
        opacity: 0,
        y: 16,
        duration: 0.7,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: '.fu-cta',
          start: 'top 90%',
        },
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section className="section" ref={sectionRef} id="field-updates">
      <div className="container">
        {/* Header */}
        <div
          className="field-header"
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
            marginBottom: '56px',
            flexWrap: 'wrap',
            gap: '32px',
          }}
        >
          <div style={{ maxWidth: '620px' }}>
            <span className="eyebrow">This week on the ground</span>
            <h2
              style={{
                fontFamily: 'var(--f-display)',
                fontWeight: 500,
                fontSize: 'clamp(34px, 4vw, 54px)',
                lineHeight: 1.08,
                margin: '14px 0',
                letterSpacing: '-0.01em',
              }}
            >
              The work, as it happens.
            </h2>
            <p className="lead">
              Short, dated notes from the field — posted as distributions happen and construction
              progresses.
            </p>
          </div>
          <div style={{ display: 'flex', gap: '8px', alignItems: 'center', color: 'var(--c-green-700)', fontSize: '13px', fontWeight: 600 }}>
            <span style={{ width: '8px', height: '8px', background: '#e24f3a', borderRadius: '50%', display: 'inline-block', animation: 'pulse-dot 2s infinite' }} />
            Updated weekly
          </div>
        </div>

        {/* Feed */}
        <div className="updates-feed">
          {UPDATES.map((u, i) => (
            <article key={i} className="update">
              <div className="u-date">
                <div className="u-d">{u.day}</div>
                <div className="u-m">{u.month}</div>
              </div>

              <div className="u-thumb">
                <div
                  style={{
                    width: '100%',
                    height: '100%',
                    background: u.bg,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  {u.tagClass === 'tag-mosque' ? (
                    <svg viewBox="0 0 120 100" style={{ width: '60%', opacity: 0.3 }} fill="none">
                      <rect x="20" y="70" width="80" height="25" fill="rgba(253,248,237,0.8)" />
                      <rect x="35" y="45" width="50" height="28" fill="rgba(253,248,237,0.7)" />
                      <path d="M45 70 L45 55 Q 60 40, 75 55 L75 70 Z" fill="rgba(27,52,34,0.5)" />
                      <path d="M35 40 Q 60 10, 85 40 Z" fill="rgba(253,248,237,0.6)" />
                      <path d="M55 12 a8 8 0 1 0 5 8 a6 6 0 1 1 -5 -8Z" fill="rgba(217,178,106,0.9)" />
                    </svg>
                  ) : (
                    <svg viewBox="0 0 120 100" style={{ width: '60%', opacity: 0.3 }} fill="none">
                      {[0, 1, 2].map(i => (
                        <ellipse key={i} cx={30 + i * 30} cy={55 + (i % 2) * 10} rx={22} ry={16} fill="rgba(253,248,237,0.6)" />
                      ))}
                      <path d="M10 80 Q 60 60, 110 80" stroke="rgba(253,220,120,0.8)" strokeWidth="3" fill="none" strokeLinecap="round" />
                    </svg>
                  )}
                </div>
              </div>

              <div className="u-body">
                <div className="u-tags">
                  <span className={`u-tag ${u.tagClass}`}>{u.tag}</span>
                  <span className="u-meta">{u.meta}</span>
                </div>
                <h3>{u.title}</h3>
                <p>{u.body}</p>
              </div>
            </article>
          ))}
        </div>

        <div className="fu-cta" style={{ textAlign: 'center', marginTop: '32px' }}>
          <a href="#contact" className="link-underline">
            Get these updates by email, monthly <span className="arr">→</span>
          </a>
        </div>
      </div>
    </section>
  )
}
