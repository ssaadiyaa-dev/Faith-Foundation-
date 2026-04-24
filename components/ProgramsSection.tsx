'use client'
import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const PROGRAMS = [
  {
    badge: 'Sadaqah Jariyah',
    title: 'Mosque construction',
    desc: 'Two mosques are rising in Pakistan right now — houses of worship built to serve for generations.',
    link: '#mosque',
    linkText: 'Fund a brick',
    bg: 'linear-gradient(160deg, #1a4a2e 0%, #1d5639 40%, #2e7150 70%, #1a3422 100%)',
    pattern: 'arch',
  },
  {
    badge: 'Weekly',
    title: 'Friday meals after Jummah',
    desc: 'Every Friday, hot meals are distributed to families and individuals — with dignity, without question.',
    link: '#friday',
    linkText: 'Feed this Friday',
    bg: 'linear-gradient(160deg, #5c3318 0%, #8a4e25 40%, #b87030 70%, #4a2510 100%)',
    pattern: 'food',
  },
  {
    badge: 'Coming soon',
    title: 'Education & healthcare',
    desc: 'Our next chapter — long-term projects for learning and care in the communities we serve.',
    link: '#future',
    linkText: 'See the roadmap',
    bg: 'linear-gradient(160deg, #1e3c3e 0%, #2a5a5e 40%, #387080 70%, #152e30 100%)',
    pattern: 'edu',
  },
]

function PatternOverlay({ type }: { type: string }) {
  if (type === 'arch') {
    return (
      <svg viewBox="0 0 300 400" style={{ position: 'absolute', bottom: 0, left: 0, right: 0, width: '100%', opacity: 0.15 }} fill="none">
        <path d="M50 400 L50 260 Q 150 140, 250 260 L250 400 Z" fill="rgba(253,248,237,0.8)" />
        <path d="M30 400 L30 270 Q 150 120, 270 270 L270 400 Z" fill="none" stroke="rgba(217,178,106,0.8)" strokeWidth="1.5" />
        <circle cx="150" cy="135" r="22" fill="rgba(217,178,106,0.9)" />
        <path d="M135 140 a18 18 0 1 0 12 18 a 14 14 0 1 1 -12 -18 Z" fill="rgba(217,178,106,1)" />
      </svg>
    )
  }
  if (type === 'food') {
    return (
      <svg viewBox="0 0 300 400" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', opacity: 0.1 }} fill="none">
        {[0, 1, 2, 3].map(i => (
          <circle key={i} cx={75 + i * 60} cy={200 + (i % 2) * 40} r={30 + i * 8} stroke="rgba(253,248,237,0.6)" strokeWidth="1" />
        ))}
        <path d="M60 300 Q 150 240, 240 300" stroke="rgba(253,220,120,0.6)" strokeWidth="2" fill="none" />
      </svg>
    )
  }
  return (
    <svg viewBox="0 0 300 400" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', opacity: 0.1 }} fill="none">
      {[0, 1, 2, 3].map(i => (
        <rect key={i} x={40 + i * 10} y={180 + i * 18} width={220 - i * 20} height={10} rx={2} fill="rgba(253,248,237,0.5)" />
      ))}
      <circle cx="150" cy="120" r="40" stroke="rgba(200,230,200,0.5)" strokeWidth="2" fill="none" />
      <path d="M130 120 h40 M150 100 v40" stroke="rgba(200,230,200,0.8)" strokeWidth="2" />
    </svg>
  )
}

export default function ProgramsSection() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    const ctx = gsap.context(() => {
      gsap.from('.section-head', {
        opacity: 0,
        y: 30,
        duration: 0.9,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.section-head',
          start: 'top 80%',
        },
      })

      gsap.from('.prog', {
        opacity: 0,
        y: 50,
        stagger: 0.15,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.programs-grid',
          start: 'top 80%',
        },
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      className="section"
      ref={sectionRef}
      id="programs"
      style={{ background: 'var(--c-cream-2)', paddingBottom: '128px' }}
    >
      <div className="container">
        <div className="section-head">
          <span className="eyebrow">What we do</span>
          <h2>Three commitments, one foundation.</h2>
          <p className="lead">
            Every program we run answers a specific, human need — and every dollar is tracked
            to its outcome.
          </p>
        </div>

        <div className="programs-grid">
          {PROGRAMS.map((prog) => (
            <article key={prog.title} className="prog">
              {/* Background */}
              <div className="prog-bg" style={{ background: prog.bg }}>
                <PatternOverlay type={prog.pattern} />
              </div>

              <div className="prog-body">
                <span
                  className="badge"
                  style={{ background: 'rgba(184,137,59,0.2)', color: 'var(--c-gold-soft)' }}
                >
                  {prog.badge}
                </span>
                <h3>{prog.title}</h3>
                <p>{prog.desc}</p>
                <a href={prog.link} className="prog-link">
                  {prog.linkText} <span className="arr">→</span>
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
