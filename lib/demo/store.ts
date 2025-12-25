import { promises as fs } from 'fs'
import path from 'path'
import crypto from 'crypto'
import type { DemoBid, DemoCar, DemoDb, DemoUser } from './types'
import { isAuctionActive } from './auction'

const DB_FILE_PATH = path.join(process.cwd(), '.demo-db.json')

const nowIso = () => new Date().toISOString()

const seedDb = (): DemoDb => {
  const now = nowIso()
  return {
    users: [],
    cars: [],
    bids: [],
  }
}

export const ensureDb = async (): Promise<void> => {
  try {
    await fs.access(DB_FILE_PATH)
  } catch {
    await fs.writeFile(DB_FILE_PATH, JSON.stringify(seedDb(), null, 2), 'utf8')
  }
}

export const readDb = async (): Promise<DemoDb> => {
  await ensureDb()
  const raw = await fs.readFile(DB_FILE_PATH, 'utf8')
  try {
    const parsed = JSON.parse(raw) as DemoDb
    return {
      users: parsed.users || [],
      cars: parsed.cars || [],
      bids: parsed.bids || [],
    }
  } catch {
    const fresh = seedDb()
    await fs.writeFile(DB_FILE_PATH, JSON.stringify(fresh, null, 2), 'utf8')
    return fresh
  }
}

export const writeDb = async (db: DemoDb): Promise<void> => {
  await fs.writeFile(DB_FILE_PATH, JSON.stringify(db, null, 2), 'utf8')
}

export const withDb = async <T>(fn: (db: DemoDb) => T | Promise<T>): Promise<T> => {
  const db = await readDb()
  const result = await fn(db)
  await writeDb(db)
  return result
}

export const newId = (prefix: string): string => {
  return `${prefix}_${crypto.randomBytes(8).toString('hex')}`
}

export const createUser = async (input: Pick<DemoUser, 'name' | 'phone' | 'email'>): Promise<DemoUser> => {
  return withDb((db) => {
    const now = nowIso()
    const existing = db.users.find((u) => u.email.toLowerCase() === input.email.toLowerCase())
    if (existing) {
      const updated: DemoUser = { ...existing, ...input, updatedAt: now }
      db.users = db.users.map((u) => (u.id === existing.id ? updated : u))
      return updated
    }

    const user: DemoUser = {
      id: newId('usr'),
      name: input.name,
      phone: input.phone,
      email: input.email,
      createdAt: now,
      updatedAt: now,
    }
    db.users.unshift(user)
    return user
  })
}

export const setUserEmiratesIdUrl = async (userId: string, emiratesIdUrl: string): Promise<DemoUser> => {
  return withDb((db) => {
    const now = nowIso()
    const user = db.users.find((u) => u.id === userId)
    if (!user) throw new Error('USER_NOT_FOUND')
    const updated: DemoUser = { ...user, emiratesIdUrl, updatedAt: now }
    db.users = db.users.map((u) => (u.id === userId ? updated : u))
    return updated
  })
}

export const listUsers = async (): Promise<DemoUser[]> => {
  const db = await readDb()
  return db.users
}

export const createCar = async (input: Pick<DemoCar, 'title' | 'make' | 'model' | 'year' | 'description' | 'minimumBid'>): Promise<DemoCar> => {
  return withDb((db) => {
    const now = nowIso()
    const car: DemoCar = {
      id: newId('car'),
      title: input.title,
      make: input.make,
      model: input.model,
      year: input.year,
      description: input.description,
      minimumBid: input.minimumBid,
      status: 'DRAFT',
      auctionStartAt: undefined,
      auctionDurationMinutes: undefined,
      images: [],
      createdAt: now,
      updatedAt: now,
    }
    db.cars.unshift(car)
    return car
  })
}

export const updateCar = async (
  carId: string,
  patch: Partial<
    Pick<
      DemoCar,
      'title' | 'make' | 'model' | 'year' | 'description' | 'minimumBid' | 'status' | 'auctionStartAt' | 'auctionDurationMinutes'
    >
  >,
): Promise<DemoCar> => {
  return withDb((db) => {
    const now = nowIso()
    const car = db.cars.find((c) => c.id === carId)
    if (!car) throw new Error('CAR_NOT_FOUND')
    const updated: DemoCar = { ...car, ...patch, updatedAt: now }
    db.cars = db.cars.map((c) => (c.id === carId ? updated : c))
    return updated
  })
}

export const deleteCar = async (carId: string): Promise<void> => {
  return withDb((db) => {
    db.cars = db.cars.filter((c) => c.id !== carId)
    db.bids = db.bids.filter((b) => b.carId !== carId)
  })
}

export const listCars = async (): Promise<DemoCar[]> => {
  const db = await readDb()
  return db.cars
}

export const getCar = async (carId: string): Promise<DemoCar | undefined> => {
  const db = await readDb()
  return db.cars.find((c) => c.id === carId)
}

export const addCarImage = async (carId: string, url: string): Promise<DemoCar> => {
  return withDb((db) => {
    const now = nowIso()
    const car = db.cars.find((c) => c.id === carId)
    if (!car) throw new Error('CAR_NOT_FOUND')

    const images = [url, ...car.images]
    const updated: DemoCar = { ...car, images, updatedAt: now }
    db.cars = db.cars.map((c) => (c.id === carId ? updated : c))
    return updated
  })
}

export const listBidsForCar = async (carId: string): Promise<(DemoBid & { user?: DemoUser })[]> => {
  const db = await readDb()
  const bids = db.bids
    .filter((b) => b.carId === carId)
    .slice()
    .sort((a, b) => b.createdAt.localeCompare(a.createdAt))

  return bids.map((b) => ({ ...b, user: db.users.find((u) => u.id === b.userId) }))
}

export const getHighestBidForCar = async (carId: string): Promise<DemoBid | undefined> => {
  const db = await readDb()
  const bids = db.bids.filter((b) => b.carId === carId)
  if (bids.length === 0) return undefined
  return bids.reduce((max, b) => (b.amount > max.amount ? b : max), bids[0])
}

export const placeBid = async (input: { carId: string; userId: string; amount: number }): Promise<DemoBid> => {
  return withDb((db) => {
    const now = nowIso()
    const car = db.cars.find((c) => c.id === input.carId)
    if (!car) throw new Error('CAR_NOT_FOUND')
    if (car.status !== 'IN_AUCTION') throw new Error('CAR_NOT_IN_AUCTION')

     if (!isAuctionActive(car.auctionStartAt, car.auctionDurationMinutes)) throw new Error('AUCTION_ENDED')

    const user = db.users.find((u) => u.id === input.userId)
    if (!user) throw new Error('USER_NOT_FOUND')
    if (!user.emiratesIdUrl) throw new Error('EMIRATES_ID_REQUIRED')

    const highest = db.bids
      .filter((b) => b.carId === input.carId)
      .reduce<number>((max, b) => (b.amount > max ? b.amount : max), 0)

    const minRequired = Math.max(car.minimumBid, highest)
    if (input.amount <= minRequired) throw new Error('BID_TOO_LOW')

    const bid: DemoBid = {
      id: newId('bid'),
      carId: input.carId,
      userId: input.userId,
      amount: input.amount,
      createdAt: now,
    }
    db.bids.unshift(bid)
    return bid
  })
}
