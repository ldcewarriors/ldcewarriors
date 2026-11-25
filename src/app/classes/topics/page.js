'use client'

import Link from 'next/link'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'

function PlayIcon() {
  return (
    <svg viewBox="0 0 68 48" className="cc-icon" aria-hidden>
      <rect x="1" y="1" width="66" height="46" rx="13" fill="#E3171E" />
      <rect x="1" y="1" width="66" height="22" rx="11" fill="#FF3B30" opacity="0.55" />
      <path d="M27 14 L46 24 L27 34 Z" fill="#FFFFFF" />
    </svg>
  )
}

function FamilyIcon() {
  return (
    <svg viewBox="0 0 72 48" className="cc-icon" aria-hidden fill="#166534">
      <circle cx="16" cy="16" r="7" />
      <circle cx="56" cy="16" r="7" />
      <circle cx="36" cy="12" r="9" />
      <path d="M2 44c0-8 6-14 14-14s14 6 14 14z" />
      <path d="M42 44c0-8 6-14 14-14s14 6 14 14z" />
      <path d="M18 46c0-11 8-19 18-19s18 8 18 19z" />
    </svg>
  )
}

const choices = [
  {
    href: '/free-videos',
    theme: 'red',
    icon: <PlayIcon />,
    title: ['Demo', 'Classes'],
    button: 'Watch Demo Classes',
  },
  {
    href: '/classes/full',
    theme: 'blue',
    icon: <PlayIcon />,
    title: ['Full Length', 'Classes'],
    button: 'Watch Full Length Classes',
  },
  {
    href: '/join-family',
    theme: 'green',
    icon: <FamilyIcon />,
    title: ['Join the', 'Family'],
    button: 'Join Now',
  },
]

export default function ClassesChooserPage() {
  return (
    <>
      <Navbar />

      <main className="cc-page">
        <header className="cc-hero">
          <h1>In-Depth Technical Classes</h1>
        </header>

        <div className="cc-grid">
          {choices.map(c => (
            <Link key={c.href} href={c.href} className={`cc-tile cc-${c.theme}`}>
              <div className="cc-head">
                {c.icon}
                <span className="cc-divider" aria-hidden />
                <h2 className="cc-title">
                  <span className="cc-t1">{c.title[0]}</span>
                  <span className="cc-t2">{c.title[1]}</span>
                </h2>
              </div>
              <span className="cc-button">
                {c.button} <span aria-hidden>→</span>
              </span>
            </Link>
          ))}
        </div>
      </main>

      <Footer />

      <style>{`
        .cc-page {
          min-height: 100vh;
          background: #F5F3EF;
          padding: 120px 20px 70px;
        }
        .cc-hero {
          text-align: center;
          margin-bottom: 34px;
        }
        .cc-hero h1 {
          font-family: 'Playfair Display', serif;
          font-size: clamp(28px, 5vw, 44px);
          font-weight: 800;
          color: #C8102E;
          margin-bottom: 8px;
        }
        .cc-grid {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 24px;
          max-width: 1180px;
          margin: 0 auto;
        }

        /* TILE */
        .cc-tile {
          --c: #D3111B;
          --c-dark: #A00C14;
          --c-light: #F0262E;
          --tint: #FBF3EE;
          --accent: #FFD21F;
          position: relative;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 22px;
          padding: 30px 18px 28px;
          border: 4px solid var(--c);
          border-radius: 30px;
          background: var(--tint);
          text-decoration: none;
          box-shadow: 0 8px 22px rgba(0, 0, 0, 0.1);
          transition: transform .25s ease, box-shadow .25s ease;
        }
        .cc-tile:hover {
          transform: translateY(-4px);
          box-shadow: 0 14px 30px rgba(0, 0, 0, 0.16);
        }
        .cc-blue {
          --c: #1546C0;
          --c-dark: #0B2F8E;
          --c-light: #2F6BEA;
          --tint: #EEF4FF;
          --accent: #2EC5FF;
        }
        .cc-green {
          --c: #17731F;
          --c-dark: #0E5214;
          --c-light: #2C9A34;
          --tint: #FBFAEE;
          --accent: #FFD21F;
        }

        /* corner swooshes */
        .cc-tile::before,
        .cc-tile::after {
          content: '';
          position: absolute;
          width: 120px;
          height: 120px;
          pointer-events: none;
        }
        .cc-tile::before {
          top: 0;
          left: 0;
          background: radial-gradient(circle at 100% 100%,
            transparent 78%, var(--accent) 79%, var(--accent) 84%, var(--c) 85%);
        }
        .cc-tile::after {
          bottom: 0;
          right: 0;
          background: radial-gradient(circle at 0% 0%,
            transparent 78%, var(--accent) 79%, var(--accent) 84%, var(--c) 85%);
        }

        .cc-head {
          position: relative;
          z-index: 1;
          display: flex;
          align-items: center;
          gap: 10px;
        }
        .cc-icon {
          width: 48px;
          height: auto;
          flex-shrink: 0;
          filter: drop-shadow(0 2px 3px rgba(0, 0, 0, 0.18));
        }
        .cc-divider {
          width: 3px;
          align-self: stretch;
          min-height: 50px;
          border-radius: 2px;
          background: #8A8A8A;
        }
        .cc-title {
          margin: 0;
          display: flex;
          flex-wrap: wrap;
          column-gap: 8px;
          white-space: nowrap;
          font-family: 'Segoe UI', 'Helvetica Neue', Arial, sans-serif;
          font-size: clamp(19px, 1.8vw, 30px);
          font-weight: 800;
          line-height: 1.1;
          letter-spacing: -0.5px;
        }
        .cc-red .cc-t1   { color: #C8102E; }
        .cc-red .cc-t2   { color: #14183A; }
        .cc-blue .cc-t1  { color: #1033B5; }
        .cc-blue .cc-t2  { color: #0D0D0D; }
        .cc-green .cc-t1 { color: #17731F; }
        .cc-green .cc-t2 { color: #E8141E; }

        .cc-button {
          position: relative;
          z-index: 1;
          display: inline-flex;
          align-items: center;
          gap: 10px;
          padding: 12px 26px;
          border-radius: 999px;
          background: linear-gradient(to bottom, var(--c-light), var(--c-dark));
          color: #FFFFFF;
          font-size: 16px;
          font-weight: 800;
          white-space: nowrap;
          box-shadow: 0 5px 12px rgba(0, 0, 0, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.3);
        }
        .cc-tile:hover .cc-button {
          filter: brightness(1.08);
        }

        /* TABLET */
        @media (max-width: 1000px) {
          .cc-grid {
            grid-template-columns: 1fr;
            max-width: 560px;
            gap: 20px;
          }
          .cc-icon { width: 56px; }
          .cc-title { font-size: 30px; }
        }

        /* PHONE */
        @media (max-width: 600px) {
          .cc-page { padding: 96px 14px 50px; }
          .cc-hero { margin-bottom: 20px; }
          .cc-grid { gap: 14px; max-width: 340px; }
          .cc-tile { padding: 16px 12px 15px; gap: 12px; border-radius: 20px; border-width: 3px; }
          .cc-head { gap: 8px; }
          .cc-icon { width: 36px; }
          .cc-divider { min-height: 34px; width: 2px; }
          .cc-title { font-size: clamp(17px, 5vw, 20px); column-gap: 6px; }
          .cc-button { font-size: 13px; padding: 8px 16px; gap: 7px; }
          .cc-tile::before, .cc-tile::after { width: 64px; height: 64px; }
        }
      `}</style>
    </>
  )
}
