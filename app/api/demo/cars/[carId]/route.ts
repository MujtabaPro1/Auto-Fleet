import { NextRequest, NextResponse } from 'next/server'
import { deleteCar, getCar, getHighestBidForCar, updateCar } from '@/lib/demo/store'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

export async function GET(_req: NextRequest, { params }: { params: { carId: string } }) {
  try {
    const car = await getCar(params.carId)
    if (!car) return NextResponse.json({ error: 'Not found' }, { status: 404 })

    const highest = await getHighestBidForCar(car.id)

    return NextResponse.json({ car: { ...car, highestBid: highest?.amount ?? null } })
  } catch (e) {
    console.error('demo car GET error:', e)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function PATCH(req: NextRequest, { params }: { params: { carId: string } }) {
  try {
    const body = await req.json()

    const car = await updateCar(params.carId, body || {})
    return NextResponse.json({ car })
  } catch (e: any) {
    const message = e?.message || 'Internal server error'
    const status = message === 'CAR_NOT_FOUND' ? 404 : 500
    console.error('demo car PATCH error:', e)
    return NextResponse.json({ error: message }, { status })
  }
}

export async function DELETE(_req: NextRequest, { params }: { params: { carId: string } }) {
  try {
    await deleteCar(params.carId)
    return NextResponse.json({ ok: true })
  } catch (e) {
    console.error('demo car DELETE error:', e)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
