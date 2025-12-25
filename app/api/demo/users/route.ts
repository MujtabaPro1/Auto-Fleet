import { NextRequest, NextResponse } from 'next/server'
import { createUser, listUsers } from '@/lib/demo/store'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

export async function GET() {
  try {
    const users = await listUsers()
    return NextResponse.json({ users })
  } catch (e) {
    console.error('demo users GET error:', e)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { name, phone, email } = body || {}

    if (!name || !phone || !email) {
      return NextResponse.json({ error: 'Missing required fields: name, phone, email' }, { status: 400 })
    }

    const user = await createUser({ name, phone, email })
    return NextResponse.json({ user })
  } catch (e) {
    console.error('demo users POST error:', e)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
