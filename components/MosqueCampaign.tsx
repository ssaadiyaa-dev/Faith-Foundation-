'use client'
import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const STAGES = [
  { stage: 1, label: 'Foundation', caption: 'Foundation laid — $12,000 raised; first concrete poured on site.' },
  { stage: 2, label: 'Walls', caption: 'Walls rising — $28,500 raised; main structure taking shape.' },
  { stage: 3, label: 'Arches', caption: 'Arches shaped — $43,700 of $95,000 raised; window frames underway.' },
  { stage: 4, label: 'Minarets', caption: 'Roof & minarets — $62,000 raised; towers rising.' },
  { stage: 5, label: 'Dome', caption: 'Dome placed — $78,000 raised; interior work begins.' },
  { stage: 6, label: 'Finishing', caption: 'Finishing — $95,000 raised; mosque opens its gates.' },
]

const TOTAL_BRICKS = 50
const FILLED_COUNT = Math.round(TOTAL_BRICKS * 0.46)

export default function MosqueCampaign() {
  const [activeStage, setActiveStage] = useState(3)
  const sectionRef = useRef<HTMLElement>(null)
  const brickWallRef = useRef<HTMLDivElement>(null)
  const campaignRef = useRef<HTMLDivElement>(null)
  const bricksAnimated = useRef(false)

  const fillPct = ((activeStage - 1) / (STAGES.length - 1)) * 100

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    const ctx = gsap.context(() => {
      // Reveal campaign card
      gsap.from(campaignRef.current, {
        opacity: 0,
        y: 40,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
        },
      })

      // Brick wall stagger
      ScrollTrigger.create({
        trigger: brickWallRef.current,
        start: 'top 80%',
        once: true,
        onEnter: () => {
          if (bricksAnimated.current) return
          bricksAnimated.current = true
          const bricks = brickWallRef.current?.querySelectorAll('.brick.laid')
          if (!bricks) return
          gsap.from(Array.from(bricks), {
            opacity: 0,
            scaleY: 0,
            transformOrigin: 'top center',
            stagger: { amount: 1.8, from: 'start' },
            ease: 'back.out(1.2)',
            duration: 0.35,
          })
        },
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section className="section" ref={sectionRef}>
      <div className="container">
        <div className="campaign" ref={campaignRef}>
          {/* SVG Mosque + Scrubber */}
          <div className="mosque-build">
            <svg viewBox="0 0 600 500" className="mb-svg" aria-label="Mosque build progress">
              <defs>
                <linearGradient id="mbSky" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#3a6147" />
                  <stop offset="100%" stopColor="#1b3422" />
                </linearGradient>
                <linearGradient id="mbBrick" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#d9b26a" />
                  <stop offset="100%" stopColor="#8a6229" />
                </linearGradient>
                <linearGradient id="mbGround" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#4a3a28" />
                  <stop offset="100%" stopColor="#2b2115" />
                </linearGradient>
              </defs>
              <rect width="600" height="500" fill="url(#mbSky)" />
              <g opacity="0.5">
                <circle cx="80" cy="60" r="1" fill="#fdf8ed" />
                <circle cx="520" cy="90" r="1.2" fill="#fdf8ed" />
                <circle cx="140" cy="120" r="0.8" fill="#fdf8ed" />
                <circle cx="460" cy="50" r="1" fill="#fdf8ed" />
                <circle cx="320" cy="40" r="0.8" fill="#fdf8ed" />
              </g>
              <g transform="translate(90 80)" opacity="0.8">
                <path d="M0 0 a 18 18 0 1 0 12 18 a 14 14 0 1 1 -12 -18 Z" fill="#d9b26a" />
              </g>
              <rect x="0" y="410" width="600" height="90" fill="url(#mbGround)" />

              {/* Stage 1: Foundation */}
              <g className={`mb-s mb-s1 ${activeStage >= 1 ? 'on' : ''}`} style={{ transitionDelay: '0s' }}>
                <rect x="120" y="400" width="360" height="18" fill="#6b5532" />
                <rect x="130" y="395" width="340" height="8" fill="#8a6229" opacity="0.8" />
              </g>

              {/* Stage 2: Walls */}
              <g className={`mb-s mb-s2 ${activeStage >= 2 ? 'on' : ''}`} style={{ transitionDelay: '0.1s' }}>
                <rect x="140" y="280" width="50" height="120" fill="url(#mbBrick)" />
                <rect x="410" y="280" width="50" height="120" fill="url(#mbBrick)" />
                <rect x="190" y="260" width="220" height="140" fill="url(#mbBrick)" opacity="0.9" />
                <g stroke="#5d4220" strokeWidth="0.5" opacity="0.5">
                  <line x1="140" y1="300" x2="460" y2="300" />
                  <line x1="140" y1="320" x2="460" y2="320" />
                  <line x1="140" y1="340" x2="460" y2="340" />
                  <line x1="140" y1="360" x2="460" y2="360" />
                  <line x1="140" y1="380" x2="460" y2="380" />
                </g>
              </g>

              {/* Stage 3: Arches & windows */}
              <g className={`mb-s mb-s3 ${activeStage >= 3 ? 'on' : ''}`} style={{ transitionDelay: '0.2s' }}>
                <path d="M270 400 L270 340 Q 300 300, 330 340 L330 400 Z" fill="#1b3422" />
                <path d="M200 400 L200 360 Q 215 345, 230 360 L230 400 Z" fill="#1b3422" opacity="0.85" />
                <path d="M370 400 L370 360 Q 385 345, 400 360 L400 400 Z" fill="#1b3422" opacity="0.85" />
                <rect x="140" y="275" width="320" height="4" fill="#d9b26a" />
              </g>

              {/* Stage 4: Roof + minarets */}
              <g className={`mb-s mb-s4 ${activeStage >= 4 ? 'on' : ''}`} style={{ transitionDelay: '0.3s' }}>
                <rect x="130" y="255" width="340" height="15" fill="#6b5532" />
                <rect x="125" y="180" width="22" height="80" fill="url(#mbBrick)" />
                <rect x="120" y="178" width="32" height="6" fill="#d9b26a" />
                <rect x="453" y="180" width="22" height="80" fill="url(#mbBrick)" />
                <rect x="448" y="178" width="32" height="6" fill="#d9b26a" />
              </g>

              {/* Stage 5: Dome */}
              <g className={`mb-s mb-s5 ${activeStage >= 5 ? 'on' : ''}`} style={{ transitionDelay: '0.4s' }}>
                <ellipse cx="300" cy="250" rx="90" ry="15" fill="#6b5532" />
                <path d="M210 250 Q 210 160, 300 160 Q 390 160, 390 250 Z" fill="url(#mbBrick)" />
                <path d="M230 230 Q 245 180, 290 170" fill="none" stroke="#fff" strokeWidth="1.5" opacity="0.25" />
                <g transform="translate(293 135)">
                  <path d="M0 0 a 10 10 0 1 0 7 10 a 7 7 0 1 1 -7 -10 Z" fill="#d9b26a" />
                </g>
                <path d="M125 185 Q 136 160, 147 185 Z" fill="#d9b26a" />
                <path d="M453 185 Q 464 160, 475 185 Z" fill="#d9b26a" />
              </g>

              {/* Stage 6: Finishing */}
              <g className={`mb-s mb-s6 ${activeStage >= 6 ? 'on' : ''}`} style={{ transitionDelay: '0.5s' }}>
                <rect x="272" y="345" width="56" height="55" fill="#f4c97a" opacity="0.55" />
                <rect x="70" y="380" width="4" height="30" fill="#3d2a15" />
                <circle cx="72" cy="378" r="14" fill="#2f5c3a" />
                <rect x="526" y="385" width="4" height="25" fill="#3d2a15" />
                <circle cx="528" cy="383" r="12" fill="#2f5c3a" />
                <path d="M290 400 Q 300 430, 310 500" stroke="#8a6229" strokeWidth="18" fill="none" opacity="0.4" strokeLinecap="round" />
              </g>
            </svg>

            {/* Scrubber */}
            <div className="mb-scrubber">
              <div className="mb-track">
                <div className="mb-fill" id="mb-fill" style={{ width: `${fillPct}%` }} />
                <div className="mb-milestones">
                  {STAGES.map(({ stage, label }) => (
                    <button
                      key={stage}
                      className={`mb-ms ${stage <= activeStage ? 'reached' : ''} ${stage === activeStage ? 'active' : ''}`}
                      onClick={() => setActiveStage(stage)}
                      title={label}
                      aria-label={`Build stage: ${label}`}
                    >
                      <span>{label}</span>
                    </button>
                  ))}
                </div>
              </div>
              <div className="mb-caption" id="mb-caption">
                {STAGES.find(s => s.stage === activeStage)?.caption}
              </div>
            </div>
          </div>

          {/* Campaign body */}
          <div className="campaign-body">
            <span className="eyebrow on-dark">Active campaign</span>
            <h2>A mosque in progress — help us finish.</h2>
            <p style={{ color: 'rgba(250,246,239,0.85)', fontSize: '17px', maxWidth: '44ch' }}>
              Brick by brick, the walls are rising. We're raising the remaining funds for doors,
              windows, flooring, and finishing — so this mosque can open its gates to worshippers
              before the end of the year.
            </p>

            {/* Progress */}
            <div style={{ marginTop: '32px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px', fontSize: '14px' }}>
                <span style={{ color: 'var(--c-gold-soft)', fontWeight: 600 }}>$43,700 raised</span>
                <span style={{ color: 'rgba(250,246,239,0.7)' }}>of $95,000 goal</span>
              </div>
              <div className="brick-wall" ref={brickWallRef} aria-label="46% funded">
                {Array.from({ length: TOTAL_BRICKS }, (_, i) => (
                  <div key={i} className={`brick ${i < FILLED_COUNT ? 'laid' : ''}`} />
                ))}
              </div>
            </div>

            {/* Stats */}
            <div className="campaign-stats">
              <div>
                <div className="n">46<span style={{ fontSize: '20px' }}>%</span></div>
                <div className="l">Funded</div>
              </div>
              <div>
                <div className="n">142</div>
                <div className="l">Givers</div>
              </div>
              <div>
                <div className="n">73</div>
                <div className="l">Days remaining</div>
              </div>
            </div>

            <div style={{ marginTop: '32px', display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
              <a href="#donate" className="btn btn-accent">
                Contribute to this mosque <span className="arr">→</span>
              </a>
              <a href="#build" className="btn btn-ghost on-dark">See the build</a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
