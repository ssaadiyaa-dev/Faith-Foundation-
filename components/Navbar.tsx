'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'

const links = ['Work', 'Services', 'Process', 'About']

export default function Navbar() {
  const navRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const nav = navRef.current
    if (!nav) return

    // Animate in after preloader
    gsap.fromTo(
      nav,
      { y: -30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out', delay: 2.8 }
    )

    const onScroll = () => {
      if (window.scrollY > 60) {
        nav.classList.add('scrolled')
      } else {
        nav.classList.remove('scrolled')
      }
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const scrollTo = (id: string) => {
    const el = document.getElementById(id.toLowerCase())
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <nav id="navbar" ref={navRef} style={{ opacity: 0 }}>
      <a href="#" className="nav-logo" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }) }}>
        CL<span>A</span>W
      </a>
      <ul className="nav-links">
        {links.map((link) => (
          <li key={link}>
            <a
              href={`#${link.toLowerCase()}`}
              onClick={(e) => { e.preventDefault(); scrollTo(link) }}
            >
              {link}
            </a>
          </li>
        ))}
      </ul>
      <a
        href="#cta"
        className="nav-cta"
        onClick={(e) => { e.preventDefault(); scrollTo('cta') }}
      >
        Start a Project
      </a>
    </nav>
  )
}
