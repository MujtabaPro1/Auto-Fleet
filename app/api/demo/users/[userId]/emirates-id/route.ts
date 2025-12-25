import { NextRequest, NextResponse } from 'next/server'
import { saveUploadedFile } from '@/lib/demo/uploads'
import { setUserEmiratesIdUrl } from '@/lib/demo/store'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

export async function POST(req: NextRequest, { params }: { params: { userId: string } }) {
  try {
    const form = await req.formData()
    const file = form.get('file')

    if (!file || !(file instanceof File)) {
      return NextResponse.json({ error: 'Missing file' }, { status: 400 })
    }

    const url = await saveUploadedFile(file, `emirates_${params.userId}`)
    const user = await setUserEmiratesIdUrl(params.userId, url)

    return NextResponse.json({ user })
  } catch (e: any) {
    const message = e?.message || 'Internal server error'
    const status = message === 'USER_NOT_FOUND' ? 404 : 500
    console.error('demo emirates-id POST error:', e)
    return NextResponse.json({ error: message }, { status })
  }
}
