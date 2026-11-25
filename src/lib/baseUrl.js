import { headers } from 'next/headers'

// The site's own address, taken from the incoming request so server-side
// calls to our API work on localhost, Vercel previews and the live domain.
export async function getBaseUrl() {
  try {
    const h = await headers()
    const host = h.get('x-forwarded-host') || h.get('host')
    if (host) {
      const proto = h.get('x-forwarded-proto') ||
        (host.startsWith('localhost') || host.startsWith('127.') ? 'http' : 'https')
      return `${proto}://${host}`
    }
  } catch {}
  return process.env.NEXTAUTH_URL || 'http://localhost:3000'
}
