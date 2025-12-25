'use client'

import { useEffect, useMemo, useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import { demoApi } from '@/lib/demo/client'
import type { DemoCar } from '@/lib/demo/types'
import { useDemoAdminAuth } from '../_auth'
import { useToast } from '@/hooks/use-toast'

const statusBadgeVariant = (status: DemoCar['status']) => {
  if (status === 'IN_AUCTION') return 'default'
  if (status === 'DRAFT') return 'secondary'
  if (status === 'SOLD') return 'default'
  return 'secondary'
}

export default function DemoAdminCarsPage() {
  const { ready } = useDemoAdminAuth()
  const { toast } = useToast()
  const [cars, setCars] = useState<(DemoCar & { highestBid?: number | null })[]>([])
  const [loading, setLoading] = useState(false)

  const [open, setOpen] = useState(false)
  const [title, setTitle] = useState('')
  const [make, setMake] = useState('')
  const [model, setModel] = useState('')
  const [year, setYear] = useState<number>(2024)
  const [minimumBid, setMinimumBid] = useState<number>(10000)
  const [description, setDescription] = useState('')
  const canCreate = useMemo(
    () => !!title && !!make && !!model && !!description && Number.isFinite(year) && Number.isFinite(minimumBid),
    [title, make, model, description, year, minimumBid],
  )

  const load = async () => {
    setLoading(true)
    try {
      const data = await demoApi.listCars()
      setCars(data)
    } catch (e: any) {
      toast({ title: 'Failed to load cars', description: e?.message, variant: 'destructive' })
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (!ready) return
    load()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ready])

  const onCreate = async () => {
    try {
      const car = await demoApi.createCar({ title, make, model, year, description, minimumBid })
      setOpen(false)
      setTitle('')
      setMake('')
      setModel('')
      setDescription('')
      setYear(2024)
      setMinimumBid(10000)
      toast({ title: 'Car created', description: car.title })
      await load()
    } catch (e: any) {
      toast({ title: 'Failed to create car', description: e?.message, variant: 'destructive' })
    }
  }

  if (!ready) return null

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Cars</CardTitle>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button>Create Car</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create Car</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Title</Label>
                <Input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="e.g. 2023 Toyota Land Cruiser" />
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
              </div>
              <div className="space-y-2">
                <Label>Description</Label>
                <Input value={description} onChange={(e) => setDescription(e.target.value)} />
              </div>
              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={onCreate} disabled={!canCreate}>
                  Create
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="text-sm text-muted-foreground">Loading...</div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Min Bid</TableHead>
                <TableHead className="text-right">Highest Bid</TableHead>
                <TableHead className="text-right">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {cars.map((c) => (
                <TableRow key={c.id}>
                  <TableCell className="font-medium">{c.title}</TableCell>
                  <TableCell>
                    <Badge variant={statusBadgeVariant(c.status)}>{c.status}</Badge>
                  </TableCell>
                  <TableCell className="text-right">AED {c.minimumBid.toLocaleString()}</TableCell>
                  <TableCell className="text-right">{c.highestBid ? `AED ${c.highestBid.toLocaleString()}` : '-'}</TableCell>
                  <TableCell className="text-right">
                    <Button asChild variant="outline" size="sm">
                      <Link href={`/demo-admin/cars/${c.id}`}>Open</Link>
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
              {cars.length === 0 && (
                <TableRow>
                  <TableCell colSpan={5} className="text-sm text-muted-foreground">
                    No cars yet.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        )}
      </CardContent>
    </Card>
  )
}
