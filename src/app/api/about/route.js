// src/app/api/about/route.js
// Public, read-only About Us content (used by the mobile app).
import { NextResponse } from 'next/server'
import { loadAbout, loadLiveCounts } from '@/lib/aboutData'

export const dynamic = 'force-dynamic'

export async function GET() {
  const [about, counts] = await Promise.all([loadAbout(), loadLiveCounts()])
  return NextResponse.json(
    { success: true, about, counts },
    { headers: { 'Cache-Control': 'no-store' } }
  )
}
