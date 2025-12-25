export type DemoCarStatus = 'DRAFT' | 'IN_AUCTION' | 'UNLISTED' | 'SOLD'

export type DemoUser = {
  id: string
  name: string
  phone: string
  email: string
  emiratesIdUrl?: string
  createdAt: string
  updatedAt: string
}

export type DemoCar = {
  id: string
  title: string
  make: string
  model: string
  year: number
  description: string
  status: DemoCarStatus
  minimumBid: number
  auctionStartAt?: string
  auctionDurationMinutes?: 30 | 60 | 120
  images: string[]
  createdAt: string
  updatedAt: string
}

export type DemoBid = {
  id: string
  carId: string
  userId: string
  amount: number
  createdAt: string
}

export type DemoDb = {
  users: DemoUser[]
  cars: DemoCar[]
  bids: DemoBid[]
}
