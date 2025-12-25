import { NextRequest, NextResponse } from 'next/server'
import { saveUploadedFile } from '@/lib/demo/uploads'
import { addCarImage } from '@/lib/demo/store'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

export async function POST(req: NextRequest, { params }: { params: { carId: string } }) {
  try {
    const form = await req.formData()
    const file = form.get('file')

    if (!file || !(file instanceof File)) {
      return NextResponse.json({ error: 'Missing file' }, { status: 400 })
    }

    const url = await saveUploadedFile(file, `car_${params.carId}`)
    const car = await addCarImage(params.carId, url)

    return NextResponse.json({ car })
  } catch (e: any) {
    const message = e?.message || 'Internal server error'
    const status = message === 'CAR_NOT_FOUND' ? 404 : 500
    console.error('demo car image POST error:', e)
    return NextResponse.json({ error: message }, { status })
  }
}
