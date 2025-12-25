import type { DemoBid, DemoCar, DemoUser } from './types'

export type DemoCarWithHighestBid = DemoCar & { highestBid: number | null }
export type DemoBidWithUser = DemoBid & { user?: DemoUser }

const jsonHeaders = { 'Content-Type': 'application/json' }

export const demoApi = {
  adminLogin: async (input: { email: string; password: string }) => {
    const res = await fetch('/api/demo/admin/login', {
      method: 'POST',
      headers: jsonHeaders,
      body: JSON.stringify(input),
    })
    const data = await res.json()
    if (!res.ok) throw new Error(data?.error || 'Login failed')
    return data as { ok: true; admin: { email: string } }
  },

  listUsers: async (): Promise<DemoUser[]> => {
    const res = await fetch('/api/demo/users', { cache: 'no-store' })
    const data = await res.json()
    if (!res.ok) throw new Error(data?.error || 'Failed to load users')
    return data.users as DemoUser[]
  },

  createOrUpdateUser: async (input: { name: string; phone: string; email: string }): Promise<DemoUser> => {
    const res = await fetch('/api/demo/users', {
      method: 'POST',
      headers: jsonHeaders,
      body: JSON.stringify(input),
    })
    const data = await res.json()
    if (!res.ok) throw new Error(data?.error || 'Failed to save user')
    return data.user as DemoUser
  },

  uploadEmiratesId: async (userId: string, file: File): Promise<DemoUser> => {
    const form = new FormData()
    form.append('file', file)

    const res = await fetch(`/api/demo/users/${userId}/emirates-id`, {
      method: 'POST',
      body: form,
    })
    const data = await res.json()
    if (!res.ok) throw new Error(data?.error || 'Failed to upload Emirates ID')
    return data.user as DemoUser
  },

  listCars: async (opts?: { status?: string }): Promise<DemoCarWithHighestBid[]> => {
    const url = new URL('/api/demo/cars', window.location.origin)
    if (opts?.status) url.searchParams.set('status', opts.status)
    const res = await fetch(url.toString(), { cache: 'no-store' })
    const data = await res.json()
    if (!res.ok) throw new Error(data?.error || 'Failed to load cars')
    return data.cars as DemoCarWithHighestBid[]
  },

  createCar: async (input: {
    title: string
    make: string
    model: string
    year: number
    description: string
    minimumBid: number
  }): Promise<DemoCar> => {
    const res = await fetch('/api/demo/cars', {
      method: 'POST',
      headers: jsonHeaders,
      body: JSON.stringify(input),
    })
    const data = await res.json()
    if (!res.ok) throw new Error(data?.error || 'Failed to create car')
    return data.car as DemoCar
  },

  getCar: async (carId: string): Promise<DemoCarWithHighestBid> => {
    const res = await fetch(`/api/demo/cars/${carId}`, { cache: 'no-store' })
    const data = await res.json()
    if (!res.ok) throw new Error(data?.error || 'Failed to load car')
    return data.car as DemoCarWithHighestBid
  },

  updateCar: async (carId: string, patch: any): Promise<DemoCar> => {
    const res = await fetch(`/api/demo/cars/${carId}`, {
      method: 'PATCH',
      headers: jsonHeaders,
      body: JSON.stringify(patch),
    })
    const data = await res.json()
    if (!res.ok) throw new Error(data?.error || 'Failed to update car')
    return data.car as DemoCar
  },

  deleteCar: async (carId: string): Promise<void> => {
    const res = await fetch(`/api/demo/cars/${carId}`, { method: 'DELETE' })
    const data = await res.json()
    if (!res.ok) throw new Error(data?.error || 'Failed to delete car')
  },

  uploadCarImage: async (carId: string, file: File): Promise<DemoCar> => {
    const form = new FormData()
    form.append('file', file)

    const res = await fetch(`/api/demo/cars/${carId}/images`, {
      method: 'POST',
      body: form,
    })
    const data = await res.json()
    if (!res.ok) throw new Error(data?.error || 'Failed to upload image')
    return data.car as DemoCar
  },

  listBids: async (carId: string): Promise<DemoBidWithUser[]> => {
    const res = await fetch(`/api/demo/cars/${carId}/bids`, { cache: 'no-store' })
    const data = await res.json()
    if (!res.ok) throw new Error(data?.error || 'Failed to load bids')
    return data.bids as DemoBidWithUser[]
  },

  placeBid: async (carId: string, input: { userId: string; amount: number }): Promise<DemoBid> => {
    const res = await fetch(`/api/demo/cars/${carId}/bids`, {
      method: 'POST',
      headers: jsonHeaders,
      body: JSON.stringify(input),
    })
    const data = await res.json()
    if (!res.ok) throw new Error(data?.error || 'Failed to place bid')
    return data.bid as DemoBid
  },
}
