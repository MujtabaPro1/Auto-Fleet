'use client'

import { useEffect, useMemo, useState } from 'react'
import Link from 'next/link'
import { useParams, useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { demoApi } from '@/lib/demo/client'
import type { DemoBid, DemoCar } from '@/lib/demo/types'
import { formatRemaining, getAuctionEndAt, getAuctionRemainingMs, isAuctionActive } from '@/lib/demo/auction'
import { useToast } from '@/hooks/use-toast'
import { useDemoAdminAuth } from '../../_auth'

type BidRow = DemoBid & {
  user?: { name: string; email: string }
}

export default function DemoAdminCarDetailPage() {
  const { ready } = useDemoAdminAuth()
  const { toast } = useToast()
  const router = useRouter()
  const params = useParams<{ carId: string }>()
  const carId = params.carId

  const [car, setCar] = useState<(DemoCar & { highestBid?: number | null }) | null>(null)
  const [bids, setBids] = useState<BidRow[]>([])
  const [loading, setLoading] = useState(false)

  const [title, setTitle] = useState('')
  const [make, setMake] = useState('')
  const [model, setModel] = useState('')
  const [year, setYear] = useState<number>(2024)
  const [minimumBid, setMinimumBid] = useState<number>(10000)
  const [description, setDescription] = useState('')
  const [auctionDuration, setAuctionDuration] = useState<30 | 60 | 120>(60)
  const [now, setNow] = useState<Date>(new Date())

  const canSave = useMemo(
    () => !!title && !!make && !!model && !!description && Number.isFinite(year) && Number.isFinite(minimumBid),
    [title, make, model, description, year, minimumBid],
  )

  const load = async () => {
    setLoading(true)
    try {
      const c = await demoApi.getCar(carId)
      setCar(c)
      setTitle(c.title)
      setMake(c.make)
      setModel(c.model)
      setYear(c.year)
      setMinimumBid(c.minimumBid)
      setDescription(c.description)

      const b = await demoApi.listBids(carId)
      setBids(b as any)
    } catch (e: any) {
      toast({ title: 'Failed to load car', description: e?.message, variant: 'destructive' })
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (!ready || !carId) return
    load()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ready, carId])

  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 1000)
    return () => clearInterval(t)
  }, [])

  const onSave = async () => {
    try {
      const updated = await demoApi.updateCar(carId, { title, make, model, year, minimumBid, description })
      toast({ title: 'Saved', description: updated.title })
      await load()
    } catch (e: any) {
      toast({ title: 'Save failed', description: e?.message, variant: 'destructive' })
    }
  }

  const onDelete = async () => {
    try {
      await demoApi.deleteCar(carId)
      toast({ title: 'Deleted' })
      router.push('/demo-admin/cars')
    } catch (e: any) {
      toast({ title: 'Delete failed', description: e?.message, variant: 'destructive' })
    }
  }

  const onUploadImage = async (file: File) => {
    try {
      await demoApi.uploadCarImage(carId, file)
      toast({ title: 'Image uploaded' })
      await load()
    } catch (e: any) {
      toast({ title: 'Upload failed', description: e?.message, variant: 'destructive' })
    }
  }

  const onPushToAuction = async () => {
    try {
      await demoApi.updateCar(carId, {
        status: 'IN_AUCTION',
        auctionStartAt: new Date().toISOString(),
        auctionDurationMinutes: auctionDuration,
      })
      toast({ title: 'Car pushed to auction' })
      await load()
    } catch (e: any) {
      toast({ title: 'Failed', description: e?.message, variant: 'destructive' })
    }
  }

  const onUnlist = async () => {
    try {
      await demoApi.updateCar(carId, { status: 'UNLISTED' })
      toast({ title: 'Car unlisted' })
      await load()
    } catch (e: any) {
      toast({ title: 'Failed', description: e?.message, variant: 'destructive' })
    }
  }

  if (!ready) return null

  const remaining = getAuctionRemainingMs(car?.auctionStartAt, car?.auctionDurationMinutes, now)
  const active = isAuctionActive(car?.auctionStartAt, car?.auctionDurationMinutes, now)
  const endAt =
    car?.auctionStartAt && car?.auctionDurationMinutes
      ? getAuctionEndAt(car.auctionStartAt, car.auctionDurationMinutes)
      : null

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <div className="text-sm text-muted-foreground">
            <Link href="/demo-admin/cars" className="hover:underline">
              Cars
            </Link>
            <span> / </span>
            <span>Detail</span>
          </div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-semibold">{car?.title || 'Car'}</h1>
            {car?.status && <Badge variant={car.status === 'IN_AUCTION' ? 'default' : 'secondary'}>{car.status}</Badge>}
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" onClick={onDelete}>
            Delete
          </Button>
          <Button onClick={onSave} disabled={!canSave}>
            Save
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Basic Details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label>Title</Label>
            <Input value={title} onChange={(e) => setTitle(e.target.value)} />
          </div>
          <div className="grid grid-cols-3 gap-3">
            <div className="space-y-2">
              <Label>Make</Label>
              <Input value={make} onChange={(e) => setMake(e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label>Model</Label>
              <Input value={model} onChange={(e) => setModel(e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label>Year</Label>
              <Input type="number" value={year} onChange={(e) => setYear(Number(e.target.value))} />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-2">
              <Label>Minimum Bid (AED)</Label>
              <Input type="number" value={minimumBid} onChange={(e) => setMinimumBid(Number(e.target.value))} />
            </div>
            <div className="space-y-2">
              <Label>Highest Bid</Label>
              <Input value={car?.highestBid ? `AED ${car.highestBid.toLocaleString()}` : '-'} readOnly />
            </div>
          </div>
          <div className="space-y-2">
            <Label>Description</Label>
            <Input value={description} onChange={(e) => setDescription(e.target.value)} />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div className="space-y-2">
              <Label>Auction Duration (minutes)</Label>
              <Input
                type="number"
                value={auctionDuration}
                onChange={(e) => {
                  const v = Number(e.target.value)
                  if (v === 30 || v === 60 || v === 120) setAuctionDuration(v)
                }}
              />
              <div className="text-xs text-muted-foreground">Allowed: 30, 60, 120</div>
            </div>
            <div className="space-y-2">
              <Label>Auction Start</Label>
              <Input value={car?.auctionStartAt ? new Date(car.auctionStartAt).toLocaleString() : '-'} readOnly />
            </div>
            <div className="space-y-2">
              <Label>Auction End</Label>
              <Input value={endAt ? new Date(endAt).toLocaleString() : '-'} readOnly />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div className="space-y-2">
              <Label>Time Left</Label>
              <Input value={formatRemaining(remaining)} readOnly />
              <div className="text-xs text-muted-foreground">{active ? 'Active' : 'Not active / ended'}</div>
            </div>
          </div>

          <Separator />
          <div className="flex items-center gap-2">
            <Button onClick={onPushToAuction} disabled={car?.status === 'IN_AUCTION' || loading}>
              Push to Auction
            </Button>
            <Button variant="outline" onClick={onUnlist} disabled={car?.status !== 'IN_AUCTION' || loading}>
              Unlist from Auction
            </Button>
            <Button asChild variant="outline">
              <Link href="/demo-site">View on Demo Site</Link>
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Images</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Input
              type="file"
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files?.[0]
                if (file) onUploadImage(file)
                e.currentTarget.value = ''
              }}
            />
            <div className="text-xs text-muted-foreground mt-2">Uploaded images are stored under `public/demo-uploads`.</div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {(car?.images || []).map((src) => (
              <div key={src} className="border rounded-md overflow-hidden bg-white">
                <img src={src} alt="Car" className="w-full h-32 object-cover" />
              </div>
            ))}
            {(car?.images || []).length === 0 && <div className="text-sm text-muted-foreground">No images uploaded.</div>}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Bids</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>User</TableHead>
                <TableHead className="text-right">Amount</TableHead>
                <TableHead className="text-right">Time</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {bids.map((b) => (
                <TableRow key={b.id}>
                  <TableCell>
                    <div className="font-medium">{b.user?.name || 'Unknown'}</div>
                    <div className="text-xs text-muted-foreground">{b.user?.email || '-'}</div>
                  </TableCell>
                  <TableCell className="text-right">AED {b.amount.toLocaleString()}</TableCell>
                  <TableCell className="text-right">{new Date(b.createdAt).toLocaleString()}</TableCell>
                </TableRow>
              ))}
              {bids.length === 0 && (
                <TableRow>
                  <TableCell colSpan={3} className="text-sm text-muted-foreground">
                    No bids yet.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
