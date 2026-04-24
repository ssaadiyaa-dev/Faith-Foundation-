'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const navLinks = ['Work', 'Services', 'Process', 'About']
const socialLinks = ['Twitter', 'Instagram', 'LinkedIn', 'Dribbble']
const legalLinks = ['Privacy Policy', 'Terms of Use', 'Cookies']

export default function Footer() {
  const footerRef = useRef<HTMLElement>(null)
  const wordmarkRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.footer-top',
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: { trigger: footerRef.current, start: 'top 85%' },
        }
      )

      gsap.fromTo(
        wordmarkRef.current,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.2,
          ease: 'power3.out',
          scrollTrigger: { trigger: wordmarkRef.current, start: 'top 95%' },
        }
      )
    }, footerRef)

    return () => ctx.revert()
  }, [])

  const scrollTo = (id: string) => {
    document.getElementById(id.toLowerCase())?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <footer id="footer" ref={footerRef}>
      <div className="footer-top">
        <div className="footer-brand">
          <a
            href="#"
            className="nav-logo"
            style={{ fontSize: '2rem', display: 'inline-block' }}
            onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }) }}
          >
            CL<span>A</span>W
          </a>
          <p>
            A creative studio building digital experiences that leave a lasting mark on the brands and people they touch.
          </p>
        </div>

        <div>
          <p className="footer-col-title">Navigation</p>
          <ul className="footer-links">
            {navLinks.map((link) => (
              <li key={link}>
                <a href={`#${link.toLowerCase()}`} onClick={(e) => { e.preventDefault(); scrollTo(link) }}>
                  {link}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="footer-col-title">Social</p>
          <ul className="footer-links">
            {socialLinks.map((link) => (
              <li key={link}>
                <a href="#">{link}</a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="footer-col-title">Contact</p>
          <ul className="footer-links">
            <li><a href="mailto:hello@clawstudio.co">hello@clawstudio.co</a></li>
            <li><a href="tel:+12125550100">+1 (212) 555-0100</a></li>
            <li>
              <a href="#">
                New York, NY<br />
                10001, USA
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <p className="footer-copy">&copy; {new Date().getFullYear()} CLAW Studio. All rights reserved.</p>
        <div style={{ display: 'flex', gap: '2rem' }}>
          {legalLinks.map((link) => (
            <a key={link} href="#" className="footer-copy" style={{ color: 'var(--gray)', textDecoration: 'none' }}>
              {link}
            </a>
          ))}
        </div>
      </div>

      <div className="footer-wordmark" ref={wordmarkRef} aria-hidden>CLAW</div>
    </footer>
  )
}
