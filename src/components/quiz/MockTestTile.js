'use client'

import Link from 'next/link'

const STATS = [
  { key: 'q', label: 'Questions', bg: '#DCEBFC', label_c: '#1E3A8A', value_c: '#1D3FA6' },
  { key: 'm', label: 'Marks', bg: '#DFF5DF', label_c: '#14532D', value_c: '#166534' },
  { key: 't', label: 'Time', bg: '#FCEBD5', label_c: '#7C2D12', value_c: '#C2410C' },
]

export default function MockTestTile({ quiz, label }) {
  const locked = Boolean(quiz.locked)

  const values = {
    q: quiz.questionCount ?? 0,
    m: quiz.totalMarks ?? quiz.questionCount ?? 0,
    t: `${quiz.durationMinutes ?? 0}`,
  }

  return (
    <article className="mock-tile">
      <span className="mock-tile__ribbon mock-tile__ribbon--tl" aria-hidden />
      <span className="mock-tile__ribbon mock-tile__ribbon--br" aria-hidden />

      {quiz.accessType === 'PREMIUM' && (
        <span className="mock-tile__badge">
          {quiz.locked ? '🔒 Family' : '★ Family'}
        </span>
      )}

      {label && <span className="mock-tile__kicker">{label}</span>}

      <h2 className="mock-tile__title">{quiz.title}</h2>

      <div className="mock-tile__stats">
        {STATS.map((s, i) => (
          <div key={s.key} style={{ display: 'contents' }}>
            {i > 0 && <span className="mock-tile__divider" aria-hidden />}
            <div className="mock-tile__stat" style={{ background: s.bg }}>
              <span className="mock-tile__stat-label" style={{ color: s.label_c }}>
                {s.label}
              </span>
              <span className="mock-tile__stat-value" style={{ color: s.value_c }}>
                {values[s.key]}
                {s.key === 't' && <small> Min</small>}
              </span>
            </div>
          </div>
        ))}
      </div>

      <Link
        href={locked ? '/join-family' : `/exam/${quiz.id}`}
        className="mock-tile__start"
      >
        {locked ? 'Unlock Now' : 'Start Test'} <span aria-hidden>→</span>
      </Link>

      <style jsx global>{`
        .mock-tile {
          position: relative;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          gap: 18px;
          padding: 22px 20px 24px;
          background: #ffffff;
          border-radius: 24px;
          box-shadow: 0 10px 30px rgba(27, 42, 74, 0.1);
          border: 1px solid #f0e6cf;
          transition: transform 0.2s ease, box-shadow 0.2s ease;
        }
        .mock-tile:hover {
          transform: translateY(-4px);
          box-shadow: 0 16px 38px rgba(27, 42, 74, 0.16);
        }
        .mock-tile__ribbon {
          position: absolute;
          width: 120px;
          height: 120px;
          pointer-events: none;
        }
        .mock-tile__ribbon--tl {
          top: 0;
          left: 0;
          background: radial-gradient(circle at 100% 100%, transparent 72%, #e9a922 73%, #f7d26b 77%, #e9a922 80%, #1d3fa6 81%, #142c7a 100%);
        }
        .mock-tile__ribbon--br {
          bottom: 0;
          right: 0;
          background: radial-gradient(circle at 0% 0%, transparent 72%, #e9a922 73%, #f7d26b 77%, #e9a922 80%, #8b2fc9 81%, #5b1a8f 100%);
        }
        .mock-tile__badge {
          position: absolute;
          top: 10px;
          right: 14px;
          font-size: 11px;
          font-weight: 800;
          color: #7a4b00;
          background: #fff4d6;
          border: 1px solid #e9a922;
          border-radius: 20px;
          padding: 3px 9px;
        }
        .mock-tile__kicker {
          align-self: center;
          margin: 4px 0 -8px;
          font-size: 12px;
          font-weight: 800;
          letter-spacing: 2px;
          text-transform: uppercase;
          color: #b7791f;
        }
        .mock-tile__title {
          margin: 10px 0 0;
          padding: 16px 18px;
          min-height: 92px;
          display: flex;
          align-items: center;
          justify-content: center;
          text-align: center;
          font-family: 'Playfair Display', serif;
          font-size: clamp(19px, 2.2vw, 23px);
          font-weight: 800;
          line-height: 1.25;
          color: #14215c;
          background: #fff6dc;
          border: 3px solid #eab432;
          border-radius: 22px;
          box-shadow: inset 0 0 0 1px #fde9a8, 0 3px 8px rgba(233, 169, 34, 0.25);
        }
        .mock-tile__stats {
          display: flex;
          align-items: stretch;
          gap: 8px;
        }
        .mock-tile__divider {
          width: 2px;
          margin: 14px 0;
          background: #4b5563;
          border-radius: 2px;
          opacity: 0.6;
        }
        .mock-tile__stat {
          flex: 1;
          min-width: 0;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 12px 6px;
          border-radius: 16px;
          text-align: center;
        }
        .mock-tile__stat-label {
          font-family: 'Playfair Display', serif;
          font-weight: 800;
          font-size: 14px;
        }
        .mock-tile__stat-value {
          font-family: 'Playfair Display', serif;
          font-weight: 900;
          font-size: 32px;
          line-height: 1.1;
          white-space: nowrap;
        }
        .mock-tile__stat-value small {
          font-size: 0.7em;
        }
        @media (max-width: 480px) {
          .mock-tile__stats { gap: 5px; }
          .mock-tile__stat { padding: 10px 4px; }
          .mock-tile__stat-label { font-size: 12px; }
          .mock-tile__stat-value { font-size: 24px; }
          .mock-tile__start { font-size: 19px; }
        }
        .mock-tile__start {
          align-self: center;
          width: 88%;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          padding: 13px 18px;
          font-family: 'Playfair Display', serif;
          font-size: 22px;
          font-weight: 800;
          color: #ffffff;
          text-decoration: none;
          background: linear-gradient(90deg, #4a1078, #8b2fc9 50%, #4a1078);
          border: 3px solid #eab432;
          border-radius: 999px;
          box-shadow: 0 6px 14px rgba(91, 26, 143, 0.35);
          transition: filter 0.2s ease;
        }
        .mock-tile__start:hover {
          filter: brightness(1.12);
        }
      `}</style>
    </article>
  )
}
