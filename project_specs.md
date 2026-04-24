# Project Specs — Sadia Faith Foundation

## What the app does
A premium nonprofit marketing website for the Sadia Faith Foundation — a gratitude-led
organisation building mosques, distributing Friday meals, and investing in education and
healthcare in Pakistan, funded from the USA.

## Who uses it
- Potential donors (USA-based) researching where to give
- Community members following field updates
- Partners and media seeking credibility information

## Tech Stack
- Framework: Next.js 14 (App Router)
- Language: TypeScript
- Styling: Tailwind CSS + custom CSS in globals.css
- Animations: GSAP + ScrollTrigger
- Fonts: Cormorant Garamond (display serif), Inter (body), Amiri (Arabic) via next/font/google
- Deployment: Vercel

## Pages
- `/` — Single scrolling page with all sections (home only for now)

## Sections (in order)
1. BismillahIntro — full-screen Arabic opening, shown once per session, fades out
2. SiteHeader — transparent → dark green on scroll, logo + nav + donate CTA
3. HeroSection — full-viewport deep green animated background, heading, verse card, donor proof chip
4. ImpactStrip — 4 animated counters (mosques, Fridays, meals, 100%)
5. MissionSection — two-column: clip-path image reveal + text stagger
6. ProgramsSection — 3 program cards (mosque, meals, education) on cream-2 bg
7. MosqueCampaign — interactive SVG mosque (6 stages scrubber) + brick-wall progress bar
8. PullQuote — hadith pull-quote with ornament
9. FieldUpdates — dated timeline of on-the-ground updates
10. TestimonialsSection — 3 quotes on dark green background
11. TrustStrip — 4 trust indicators (501(c)(3), transparency, 100%, local teams)
12. CTABand — split CTA with amount selector and donate box
13. SiteFooter — dark green, link grid, Arabic verse, wordmark

## Design System
- Primary: Deep forest green (#1d5639), cream (#fdf8ed), warm gold (#d9b26a)
- Accent: Terracotta (#c47e5a)
- Display font: Cormorant Garamond (serif, italic for elegance)
- Body font: Inter (clean, readable)
- Arabic font: Amiri (for Quranic text)

## Animations (GSAP)
- BismillahIntro: fade in → fade out on timeline
- SiteHeader: scroll-driven class toggle
- HeroSection: animated floating blobs + twinkling stars, entrance timeline, parallax
- ImpactStrip: count-up on scroll
- MissionSection: clip-path image reveal, text stagger
- ProgramsSection: stagger card reveal
- MosqueCampaign: SVG stage transitions (CSS), brick-wall stagger on scroll
- PullQuote: ornament spin-in + quote reveal
- FieldUpdates: stagger updates from bottom
- Testimonials: stagger cards
- TrustStrip: stagger items
- CTABand: split left/right reveal

## What "done" looks like
- `npm run build` passes with zero TypeScript/build errors
- All GSAP animations run smoothly in browser
- Responsive across mobile/tablet/desktop
- Mosque SVG scrubber interactive (click stages)
- Bismillah intro shows on first session visit and auto-dismisses
