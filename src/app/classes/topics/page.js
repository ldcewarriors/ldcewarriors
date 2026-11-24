'use client'

import Link from 'next/link'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'

const choices = [
  {
    href: '/free-videos',
    banner: '/demo-classes-banner.png',
    alt: 'Demo Classes - Watch demo classes',
  },
  {
    href: '/classes/full',
    banner: '/full-length-classes-banner.png',
    alt: 'Full Length Classes - Watch complete classes',
  },
]

export default function ClassesChooserPage() {
  return (
    <>
      <Navbar />

      <main className="cc-page">
        <header className="cc-hero">
          <h1>In-Depth Technical Classes</h1>
          <p>Choose how you want to learn.</p>
        </header>

        <div className="cc-grid">
          {choices.map(c => (
            <Link key={c.href} href={c.href} className="cc-choice">
              <img
                src="/learning-classes.png"
                alt="LDCE Warriors technical class"
                className="cc-photo"
              />
              <img
                src={c.banner}
                alt={c.alt}
                className="cc-banner"
              />
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
          margin-bottom: 32px;
        }
        .cc-hero h1 {
          font-family: 'Playfair Display', serif;
          font-size: clamp(28px, 5vw, 44px);
          font-weight: 800;
          color: #C8102E;
          margin-bottom: 8px;
        }
        .cc-hero p {
          color: #6B7280;
          font-size: 15px;
        }
        .cc-grid {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 32px;
          max-width: 1100px;
          margin: 0 auto;
        }
        .cc-choice {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 16px;
          text-decoration: none;
        }
        .cc-photo {
          display: block;
          width: 100%;
          aspect-ratio: 16 / 9;
          object-fit: cover;
          border-radius: 20px;
          border: 1px solid #E5E7EB;
          box-shadow: 0 8px 24px rgba(27, 42, 74, 0.08);
          transition: transform .25s ease, box-shadow .25s ease;
        }
        .cc-banner {
          display: block;
          width: 88%;
          height: auto;
          border-radius: 14px;
          mix-blend-mode: multiply;
          transition: transform .25s ease;
        }
        .cc-choice:hover .cc-photo {
          transform: translateY(-4px);
          box-shadow: 0 14px 32px rgba(27, 42, 74, 0.15);
        }
        .cc-choice:hover .cc-banner {
          transform: scale(1.03);
        }
        @media (max-width: 680px) {
          .cc-page { padding: 96px 14px 50px; }
          .cc-grid {
            grid-template-columns: 1fr;
            max-width: 480px;
            gap: 36px;
          }
        }
      `}</style>
    </>
  )
}
