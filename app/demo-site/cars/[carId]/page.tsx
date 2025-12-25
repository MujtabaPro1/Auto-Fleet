'use client'

import { useEffect, useMemo, useState } from 'react'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import { Badge } from '@/components/ui/badge'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { demoApi } from '@/lib/demo/client'
import type { DemoCar } from '@/lib/demo/types'
import { formatRemaining, getAuctionRemainingMs, isAuctionActive } from '@/lib/demo/auction'
import { useToast } from '@/hooks/use-toast'
import { ArrowLeft, Timer, TrendingUp, Tag, User, Phone, Mail, FileCheck, Upload, Gavel, Clock, CheckCircle2, AlertCircle, Car } from 'lucide-react'

type BidRow = {
  id: string
  amount: number
  createdAt: string
  user?: { name: string }
}

export default function DemoSiteCarDetailsPage() {
  const { toast } = useToast()
  const params = useParams<{ carId: string }>()
  const carId = params.carId

  const [car, setCar] = useState<(DemoCar & { highestBid?: number | null }) | null>(null)
  const [bids, setBids] = useState<BidRow[]>([])

  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')
  const [emiratesFile, setEmiratesFile] = useState<File | null>(null)
  const [userId, setUserId] = useState<string | null>(null)
  const [emiratesUploaded, setEmiratesUploaded] = useState(false)

  const [bidAmount, setBidAmount] = useState<number>(0)
  const [loading, setLoading] = useState(false)
  const [now, setNow] = useState<Date>(new Date())

  const load = async () => {
    setLoading(true)
    try {
      const c = await demoApi.getCar(carId)
      setCar(c)
      const b = await demoApi.listBids(carId)
      setBids(b as any)

      const highest = c.highestBid ?? 0
      const min = Math.max(c.minimumBid, highest)
      setBidAmount(min + 100)
    } catch (e: any) {
      toast({ title: 'Failed to load car', description: e?.message, variant: 'destructive' })
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (!carId) return
    load()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [carId])

  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 1000)
    return () => clearInterval(t)
  }, [])

  const canIdentify = useMemo(() => !!name && !!phone && !!email, [name, phone, email])
  const auctionActive = useMemo(
    () => isAuctionActive(car?.auctionStartAt, car?.auctionDurationMinutes, now),
    [car?.auctionStartAt, car?.auctionDurationMinutes, now],
  )
  const canBid = useMemo(() => !!userId && emiratesUploaded && auctionActive, [userId, emiratesUploaded, auctionActive])

  const onStart = async () => {
    try {
      const user = await demoApi.createOrUpdateUser({ name, phone, email })
      setUserId(user.id)
      setEmiratesUploaded(!!user.emiratesIdUrl)
      toast({ title: 'Details saved', description: 'Now upload Emirates ID to enable bidding.' })
    } catch (e: any) {
      toast({ title: 'Failed', description: e?.message, variant: 'destructive' })
    }
  }

  const onUploadEmirates = async () => {
    if (!userId || !emiratesFile) return
    try {
      await demoApi.uploadEmiratesId(userId, emiratesFile)
      setEmiratesUploaded(true)
      toast({ title: 'Emirates ID uploaded', description: 'You can now place bids.' })
    } catch (e: any) {
      toast({ title: 'Upload failed', description: e?.message, variant: 'destructive' })
    }
  }

  const onPlaceBid = async () => {
    if (!userId) return
    try {
      await demoApi.placeBid(carId, { userId, amount: bidAmount })
      toast({ title: 'Bid placed' })
      await load()
    } catch (e: any) {
      toast({ title: 'Bid failed', description: e?.message, variant: 'destructive' })
    }
  }

  if (car && car.status !== 'IN_AUCTION') {
    return (
      <div className="max-w-2xl mx-auto text-center py-16">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-slate-100 mb-4">
          <Car className="h-8 w-8 text-slate-400" />
        </div>
        <h2 className="text-xl font-semibold text-slate-900 mb-2">Car Not Available</h2>
        <p className="text-slate-500 mb-6">This vehicle is currently not listed for auction.</p>
        <Button asChild variant="outline">
          <Link href="/demo-site">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Auctions
          </Link>
        </Button>
      </div>
    )
  }

  const remaining = getAuctionRemainingMs(car?.auctionStartAt, car?.auctionDurationMinutes, now)
  const timerLabel = formatRemaining(remaining)

  return (
    <div className="space-y-8">
      <Link 
        href="/demo-site" 
        className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-blue-600 transition-colors"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Auctions
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <Card className="overflow-hidden border-0 shadow-lg">
            {car?.images?.length ? (
              <div className="relative">
                <img src={car.images[0]} alt={car.title} className="w-full h-72 object-cover" />
                {car.images.length > 1 && (
                  <div className="grid grid-cols-4 gap-2 p-3 bg-slate-50">
                    {car.images.slice(0, 4).map((src, i) => (
                      <img key={src} src={src} alt={`${car.title} ${i + 1}`} className="w-full h-20 object-cover rounded-lg" />
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <div className="w-full h-72 bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center">
                <Car className="h-16 w-16 text-slate-300" />
              </div>
            )}
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="text-2xl font-bold text-slate-900">{car?.title || 'Car'}</CardTitle>
                  {car && (
                    <CardDescription className="text-base mt-1">
                      {car.make} {car.model} • {car.year}
                    </CardDescription>
                  )}
                </div>
                <Badge 
                  className={`${auctionActive 
                    ? 'bg-green-500 hover:bg-green-600 text-white' 
                    : 'bg-slate-500 text-white'
                  } flex items-center gap-1.5 px-3 py-1.5`}
                >
                  <Timer className="h-3.5 w-3.5" />
                  {timerLabel}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="text-sm font-medium text-slate-700 mb-2">Description</h3>
                <p className="text-slate-600">{car?.description}</p>
              </div>

              <Separator />

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-slate-50 rounded-xl p-4">
                  <div className="flex items-center gap-2 text-sm text-slate-500 mb-1">
                    <TrendingUp className="h-4 w-4" />
                    Highest Bid
                  </div>
                  <div className="text-xl font-bold text-slate-900">
                    {car?.highestBid ? `AED ${car.highestBid.toLocaleString()}` : '—'}
                  </div>
                </div>
                <div className="bg-blue-50 rounded-xl p-4">
                  <div className="flex items-center gap-2 text-sm text-blue-600 mb-1">
                    <Tag className="h-4 w-4" />
                    Minimum Bid
                  </div>
                  <div className="text-xl font-bold text-blue-700">
                    {car ? `AED ${car.minimumBid.toLocaleString()}` : '—'}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-slate-500" />
                Recent Bids
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Bidder</TableHead>
                    <TableHead className="text-right">Amount</TableHead>
                    <TableHead className="text-right">Time</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {bids.map((b, i) => (
                    <TableRow key={b.id}>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-medium ${i === 0 ? 'bg-green-500' : 'bg-slate-400'}`}>
                            {(b.user?.name || 'U')[0].toUpperCase()}
                          </div>
                          <span className="font-medium">{b.user?.name || 'Unknown'}</span>
                          {i === 0 && <Badge className="bg-green-100 text-green-700 hover:bg-green-100">Leading</Badge>}
                        </div>
                      </TableCell>
                      <TableCell className="text-right font-semibold">AED {b.amount.toLocaleString()}</TableCell>
                      <TableCell className="text-right text-slate-500">{new Date(b.createdAt).toLocaleString()}</TableCell>
                    </TableRow>
                  ))}
                  {bids.length === 0 && (
                    <TableRow>
                      <TableCell colSpan={3} className="text-center py-8 text-slate-500">
                        No bids yet. Be the first to bid!
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card className="border-0 shadow-lg sticky top-24">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-2">
                <Gavel className="h-5 w-5 text-blue-600" />
                Place Your Bid
              </CardTitle>
              <CardDescription>
                Complete the steps below to place your bid
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {!auctionActive && (
                <div className="flex items-center gap-3 p-3 bg-amber-50 border border-amber-200 rounded-lg">
                  <AlertCircle className="h-5 w-5 text-amber-600 flex-shrink-0" />
                  <p className="text-sm text-amber-700">Auction has ended. Bidding is disabled.</p>
                </div>
              )}

              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium ${userId ? 'bg-green-500 text-white' : 'bg-slate-200 text-slate-600'}`}>
                    {userId ? <CheckCircle2 className="h-4 w-4" /> : '1'}
                  </div>
                  <span className="font-medium text-slate-700">Your Details</span>
                </div>
                
                <div className="space-y-3 pl-8">
                  <div className="space-y-1.5">
                    <Label className="text-slate-600">Full Name</Label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                      <Input 
                        value={name} 
                        onChange={(e) => setName(e.target.value)} 
                        className="pl-10 bg-slate-50 border-slate-200"
                        placeholder="John Doe"
                      />
                    </div>
                  </div>
                  <div className="space-y-1.5">
                    <Label className="text-slate-600">Phone Number</Label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                      <Input 
                        value={phone} 
                        onChange={(e) => setPhone(e.target.value)} 
                        className="pl-10 bg-slate-50 border-slate-200"
                        placeholder="+971 50 123 4567"
                      />
                    </div>
                  </div>
                  <div className="space-y-1.5">
                    <Label className="text-slate-600">Email Address</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                      <Input 
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)} 
                        className="pl-10 bg-slate-50 border-slate-200"
                        placeholder="john@example.com"
                      />
                    </div>
                  </div>
                  <Button 
                    onClick={onStart} 
                    disabled={!canIdentify}
                    variant={userId ? "outline" : "default"}
                    className="w-full"
                  >
                    {userId ? 'Update Details' : 'Save Details'}
                  </Button>
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium ${emiratesUploaded ? 'bg-green-500 text-white' : 'bg-slate-200 text-slate-600'}`}>
                    {emiratesUploaded ? <CheckCircle2 className="h-4 w-4" /> : '2'}
                  </div>
                  <span className="font-medium text-slate-700">Emirates ID</span>
                </div>
                
                <div className="space-y-3 pl-8">
                  {emiratesUploaded ? (
                    <div className="flex items-center gap-2 p-3 bg-green-50 border border-green-200 rounded-lg">
                      <FileCheck className="h-5 w-5 text-green-600" />
                      <span className="text-sm text-green-700 font-medium">Emirates ID Verified</span>
                    </div>
                  ) : (
                    <>
                      <Input
                        type="file"
                        className="bg-slate-50 border-slate-200"
                        onChange={(e) => {
                          const f = e.target.files?.[0] || null
                          setEmiratesFile(f)
                        }}
                      />
                      <Button 
                        variant="outline" 
                        onClick={onUploadEmirates} 
                        disabled={!userId || !emiratesFile}
                        className="w-full"
                      >
                        <Upload className="mr-2 h-4 w-4" />
                        Upload Emirates ID
                      </Button>
                      <p className="text-xs text-slate-500">Required for verification before bidding</p>
                    </>
                  )}
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium ${canBid ? 'bg-blue-500 text-white' : 'bg-slate-200 text-slate-600'}`}>
                    3
                  </div>
                  <span className="font-medium text-slate-700">Place Bid</span>
                </div>
                
                <div className="space-y-3 pl-8">
                  <div className="space-y-1.5">
                    <Label className="text-slate-600">Bid Amount (AED)</Label>
                    <Input 
                      type="number" 
                      value={bidAmount} 
                      onChange={(e) => setBidAmount(Number(e.target.value))} 
                      className="bg-slate-50 border-slate-200 text-lg font-semibold"
                    />
                  </div>
                  <Button 
                    onClick={onPlaceBid} 
                    disabled={!canBid || loading} 
                    className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 h-12 text-base shadow-lg"
                  >
                    <Gavel className="mr-2 h-5 w-5" />
                    Place Bid
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
