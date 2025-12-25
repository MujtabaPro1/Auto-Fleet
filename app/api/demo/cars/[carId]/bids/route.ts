import { NextRequest, NextResponse } from 'next/server'
import { listBidsForCar, placeBid } from '@/lib/demo/store'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

export async function GET(_req: NextRequest, { params }: { params: { carId: string } }) {
  try {
    const bids = await listBidsForCar(params.carId)
    return NextResponse.json({ bids })
  } catch (e) {
    console.error('demo bids GET error:', e)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function POST(req: NextRequest, { params }: { params: { carId: string } }) {
  try {
    const body = await req.json()
    const { userId, amount } = body || {}

    if (!userId || typeof amount !== 'number') {
      return NextResponse.json({ error: 'Missing required fields: userId, amount' }, { status: 400 })
    }

    const bid = await placeBid({ carId: params.carId, userId, amount })
    return NextResponse.json({ bid })
  } catch (e: any) {
    const message = e?.message || 'Internal server error'
    const status =
      message === 'CAR_NOT_FOUND'
        ? 404
        : message === 'USER_NOT_FOUND'
          ? 404
          : message === 'CAR_NOT_IN_AUCTION'
            ? 400
            : message === 'AUCTION_ENDED'
              ? 400
              : message === 'EMIRATES_ID_REQUIRED'
                ? 400
                : message === 'BID_TOO_LOW'
                  ? 400
                  : 500

    console.error('demo bids POST error:', e)
    return NextResponse.json({ error: message }, { status })
  }
}
