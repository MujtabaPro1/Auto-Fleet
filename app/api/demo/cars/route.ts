import { NextRequest, NextResponse } from 'next/server'
import { createCar, listCars, getHighestBidForCar } from '@/lib/demo/store'
import { isAuctionActive } from '@/lib/demo/auction'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    const status = searchParams.get('status')

    const cars = await listCars()
    const filtered = status
      ? cars.filter((c) => {
          if (c.status !== status) return false
          if (status === 'IN_AUCTION') return isAuctionActive(c.auctionStartAt, c.auctionDurationMinutes)
          return true
        })
      : cars

    const carsWithHighestBid = await Promise.all(
      filtered.map(async (car) => {
        const highest = await getHighestBidForCar(car.id)
        return { ...car, highestBid: highest?.amount ?? null }
      }),
    )

    return NextResponse.json({ cars: carsWithHighestBid })
  } catch (e) {
    console.error('demo cars GET error:', e)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { title, make, model, year, description, minimumBid } = body || {}

    if (!title || !make || !model || !year || !description || typeof minimumBid !== 'number') {
      return NextResponse.json(
        { error: 'Missing required fields: title, make, model, year, description, minimumBid' },
        { status: 400 },
      )
    }

    const car = await createCar({
      title,
      make,
      model,
      year: Number(year),
      description,
      minimumBid,
    })

    return NextResponse.json({ car })
  } catch (e) {
    console.error('demo cars POST error:', e)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
