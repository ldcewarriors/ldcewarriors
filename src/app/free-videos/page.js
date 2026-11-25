'use client'

import { useEffect, useRef, useState } from 'react'
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
  const [selectedVideo, setSelectedVideo] = useState(null)
  const startingRef = useRef(false)

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
          <img
            src="/demo-classes-banner.png"
            alt="Demo Classes - Watch demo classes"
            className="fv-banner"
          />
          <p>Open to everyone — no sign-in needed. Tap any video to play.</p>
        </header>

        {error ? (
          <p className="fv-empty">{error}</p>
        ) : loading ? (
          <div className="fv-grid">
            {[1, 2, 3, 4, 5, 6].map(i => <div key={i} className="fv-skeleton" />)}
          </div>
        ) : videos.length === 0 ? (
          <p className="fv-empty">Demo classes are coming soon. Stay tuned!</p>
        ) : (
          <div className="fv-grid">
            {videos.map(v => (
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
          margin: 0 auto 14px;
          mix-blend-mode: multiply;
        }
        .fv-hero p {
          color: #6B7280;
          font-size: 15px;
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
          .fv-banner { margin: 0 auto 10px; }
          .fv-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 10px; }
        }
      `}</style>
    </>
  )
}
