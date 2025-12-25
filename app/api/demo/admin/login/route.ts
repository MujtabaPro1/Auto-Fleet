import { NextRequest, NextResponse } from 'next/server'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

const ADMIN_EMAIL = process.env.DEMO_ADMIN_EMAIL || 'admin@demo.com'
const ADMIN_PASSWORD = process.env.DEMO_ADMIN_PASSWORD || 'password'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { email, password } = body || {}

    if (!email || !password) {
      return NextResponse.json({ error: 'Missing email or password' }, { status: 400 })
    }

    if (email !== ADMIN_EMAIL || password !== ADMIN_PASSWORD) {
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 })
    }

    return NextResponse.json({ ok: true, admin: { email: ADMIN_EMAIL } })
  } catch (e) {
    console.error('demo admin login error:', e)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
