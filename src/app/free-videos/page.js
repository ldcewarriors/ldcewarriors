'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import Link from 'next/link'
import toast from 'react-hot-toast'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import VideoCard from '@/components/home/VideoCard'
import VideoPlayerModal from '@/components/ui/VideoPlayerModal'

export default function DemoClassesPage() {
  const [videos, setVideos] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [topic, setTopic] = useState('all')
  const [selectedVideo, setSelectedVideo] = useState(null)
  const startingRef = useRef(false)
  const [banner, setBanner] = useState(null)

  // Use the Demo Classes banner once it is added to /public
  useEffect(() => {
    const probe = new Image()
    probe.onload = () => setBanner('/demo-classes-banner.png')
    probe.onerror = () => setBanner('/free-videos-banner.png')
    probe.src = '/demo-classes-banner.png'
  }, [])

  useEffect(() => {
    let cancelled = false
    fetch('/api/videos?type=free&limit=100', { cache: 'no-store' })
      .then(r => r.json())
      .then(data => {
        if (cancelled) return
        if (!data.success) throw new Error(data.error)
        setVideos(data.videos || [])
      })
      .catch(() => !cancelled && setError('Unable to load demo classes right now.'))
      .finally(() => !cancelled && setLoading(false))
    return () => { cancelled = true }
  }, [])

  const topics = useMemo(() => {
    const map = new Map()
    videos.forEach(v => {
      if (v.topic?.id) map.set(v.topic.id, v.topic.name)
    })
    return [...map].map(([id, name]) => ({ id, name }))
  }, [videos])

  const visible = topic === 'all'
    ? videos
    : videos.filter(v => v.topic?.id === topic)

  async function play(video) {
    if (startingRef.current) return
    startingRef.current = true
    try {
      const res = await fetch('/api/videos/play', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ videoId: video._id || video.id }),
      })
      const data = await res.json()
      if (data.success && data.canPlay && data.streamUrl) {
        setSelectedVideo({ ...video, videoUrl: data.streamUrl })
      } else {
        toast.error(data.error || 'Unable to play video.')
      }
    } catch {
      toast.error('Network error. Please try again.')
    } finally {
      startingRef.current = false
    }
  }

  return (
    <>
      <Navbar />

      <main className="fv-page">
        <header className="fv-hero">
          {banner && (
            <img
              src={banner}
              alt="Demo Classes - Watch demo classes"
              className="fv-banner"
            />
          )}
          <p>Open to everyone — no sign-in needed. Tap any video to play.</p>
        </header>

        {topics.length > 1 && (
          <div className="fv-chips">
            {[{ id: 'all', name: 'All' }, ...topics].map(t => (
              <button
                key={t.id}
                type="button"
                className={`fv-chip${topic === t.id ? ' is-active' : ''}`}
                onClick={() => setTopic(t.id)}
              >
                {t.name}
              </button>
            ))}
          </div>
        )}

        {error ? (
          <p className="fv-empty">{error}</p>
        ) : loading ? (
          <div className="fv-grid">
            {[1, 2, 3, 4, 5, 6].map(i => <div key={i} className="fv-skeleton" />)}
          </div>
        ) : visible.length === 0 ? (
          <p className="fv-empty">Demo classes are coming soon. Stay tuned!</p>
        ) : (
          <div className="fv-grid">
            {visible.map(v => (
              <VideoCard
                key={v._id || v.id}
                video={v}
                onClick={() => play(v)}
              />
            ))}
          </div>
        )}

        <div className="fv-cta">
          <span>Want the full subject-wise course?</span>
          <Link href="/classes/full">Explore Full Length Classes →</Link>
        </div>
      </main>

      {selectedVideo && (
        <VideoPlayerModal
          video={selectedVideo}
          onClose={() => setSelectedVideo(null)}
        />
      )}

      <Footer />

      <style>{`
        .fv-page {
          min-height: 100vh;
          background: #F5F3EF;
          padding: 110px 20px 70px;
        }
        .fv-hero {
          max-width: 760px;
          margin: 0 auto 26px;
          text-align: center;
        }
        .fv-banner {
          display: block;
          width: 100%;
          max-width: 420px;
          height: auto;
          margin: -40px auto -30px;
          mix-blend-mode: multiply;
        }
        .fv-hero p {
          color: #6B7280;
          font-size: 15px;
        }
        .fv-chips {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          gap: 10px;
          max-width: 1200px;
          margin: 0 auto 26px;
        }
        .fv-chip {
          padding: 9px 16px;
          border-radius: 999px;
          border: 1px solid #E5E7EB;
          background: #FFFFFF;
          color: #1B2A4A;
          font-weight: 700;
          font-size: 13px;
          cursor: pointer;
        }
        .fv-chip.is-active {
          background: #1B2A4A;
          border-color: #1B2A4A;
          color: #FFFFFF;
        }
        .fv-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(min(100%, 300px), 1fr));
          gap: 20px;
          max-width: 1200px;
          margin: 0 auto;
        }
        .fv-skeleton {
          aspect-ratio: 16 / 12;
          border-radius: 14px;
          background: linear-gradient(90deg, #ECE9E3 25%, #F7F5F1 50%, #ECE9E3 75%);
          background-size: 200% 100%;
          animation: fv-shimmer 1.4s infinite;
        }
        @keyframes fv-shimmer {
          0% { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }
        .fv-empty {
          text-align: center;
          color: #6B7280;
          padding: 40px 0;
        }
        .fv-cta {
          max-width: 1200px;
          margin: 44px auto 0;
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          justify-content: center;
          gap: 12px;
          color: #1B2A4A;
          font-weight: 700;
        }
        .fv-cta a {
          background: #E8A838;
          color: #1B2A4A;
          padding: 10px 20px;
          border-radius: 10px;
          text-decoration: none;
          font-weight: 800;
        }
        @media (max-width: 600px) {
          .fv-page { padding: 90px 14px 50px; }
          .fv-banner { margin: -24px auto -18px; }
        }
      `}</style>
    </>
  )
}
