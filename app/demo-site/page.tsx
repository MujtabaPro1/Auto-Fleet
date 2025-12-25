'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { demoApi, type DemoCarWithHighestBid } from '@/lib/demo/client'
import { formatRemaining, getAuctionRemainingMs, isAuctionActive } from '@/lib/demo/auction'
import { useToast } from '@/hooks/use-toast'
import { Timer, TrendingUp, Tag, ArrowRight, Car, Loader2 } from 'lucide-react'

export default function DemoSiteAuctionCarsPage() {
  const { toast } = useToast()
  const [cars, setCars] = useState<DemoCarWithHighestBid[]>([])
  const [loading, setLoading] = useState(false)
  const [now, setNow] = useState<Date>(new Date())

  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 1000)
    return () => clearInterval(t)
  }, [])

  useEffect(() => {
    setLoading(true)
    demoApi
      .listCars({ status: 'IN_AUCTION' })
      .then(setCars)
      .catch((e: any) => toast({ title: 'Failed to load auction cars', description: e?.message, variant: 'destructive' }))
      .finally(() => setLoading(false))
  }, [toast])

  return (
    <div className="space-y-8">
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-green-100 text-green-700 text-sm font-medium">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-500 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-green-600"></span>
          </span>
          Live Auctions
        </div>
        <h1 className="text-3xl font-bold text-slate-900">Premium Vehicles</h1>
        <p className="text-slate-500 max-w-md mx-auto">
          Browse our selection of quality vehicles available for auction. Place your bid and drive away with your dream car.
        </p>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-20">
          <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {cars.map((c) => {
            const img = c.images?.[0]
            const remaining = getAuctionRemainingMs(c.auctionStartAt, c.auctionDurationMinutes, now)
            const active = isAuctionActive(c.auctionStartAt, c.auctionDurationMinutes, now)
            const timerLabel = formatRemaining(remaining)
            return (
              <Card key={c.id} className="overflow-hidden group hover:shadow-xl transition-all duration-300 border-0 shadow-md bg-white">
                <div className="relative">
                  {img ? (
                    <img src={img} alt={c.title} className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300" />
                  ) : (
                    <div className="w-full h-48 bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center">
                      <Car className="h-12 w-12 text-slate-300" />
                    </div>
                  )}
                  <div className="absolute top-3 right-3">
                    <Badge 
                      className={`${active 
                        ? 'bg-green-500 hover:bg-green-600 text-white shadow-lg' 
                        : 'bg-slate-500 text-white'
                      } flex items-center gap-1.5`}
                    >
                      <Timer className="h-3 w-3" />
                      {timerLabel}
                    </Badge>
                  </div>
                </div>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg font-semibold text-slate-900 line-clamp-1">{c.title}</CardTitle>
                  <div className="text-sm text-slate-500">
                    {c.make} {c.model} • {c.year}
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="grid grid-cols-2 gap-3">
                    <div className="bg-slate-50 rounded-lg p-3">
                      <div className="flex items-center gap-1.5 text-xs text-slate-500 mb-1">
                        <TrendingUp className="h-3 w-3" />
                        Highest Bid
                      </div>
                      <div className="font-semibold text-slate-900">
                        {c.highestBid ? `AED ${c.highestBid.toLocaleString()}` : '—'}
                      </div>
                    </div>
                    <div className="bg-blue-50 rounded-lg p-3">
                      <div className="flex items-center gap-1.5 text-xs text-blue-600 mb-1">
                        <Tag className="h-3 w-3" />
                        Min. Bid
                      </div>
                      <div className="font-semibold text-blue-700">
                        AED {c.minimumBid.toLocaleString()}
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="pt-0">
                  <Link href={`/demo-site/cars/${c.id}`} className="w-full">
                    <Button className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 shadow-md group/btn">
                      Place Bid
                      <ArrowRight className="ml-2 h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
                    </Button>
                  </Link>
                </CardFooter>
              </Card>
            )
          })}
        </div>
      )}

      {cars.length === 0 && !loading && (
        <div className="text-center py-16">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-slate-100 mb-4">
            <Car className="h-8 w-8 text-slate-400" />
          </div>
          <h3 className="text-lg font-semibold text-slate-900 mb-2">No Active Auctions</h3>
          <p className="text-slate-500 max-w-sm mx-auto">
            There are currently no vehicles available for auction. Check back soon for new listings.
          </p>
        </div>
      )}
    </div>
  )
}
