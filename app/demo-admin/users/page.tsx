'use client'

import { useEffect, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import { demoApi } from '@/lib/demo/client'
import type { DemoUser } from '@/lib/demo/types'
import { useDemoAdminAuth } from '../_auth'
import { useToast } from '@/hooks/use-toast'

export default function DemoAdminUsersPage() {
  const { ready } = useDemoAdminAuth()
  const { toast } = useToast()
  const [users, setUsers] = useState<DemoUser[]>([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (!ready) return
    setLoading(true)
    demoApi
      .listUsers()
      .then(setUsers)
      .catch((e: any) => toast({ title: 'Failed to load users', description: e?.message, variant: 'destructive' }))
      .finally(() => setLoading(false))
  }, [ready, toast])

  if (!ready) return null

  return (
    <Card>
      <CardHeader>
        <CardTitle>Users</CardTitle>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="text-sm text-muted-foreground">Loading...</div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Phone</TableHead>
                <TableHead>Emirates ID</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.map((u) => (
                <TableRow key={u.id}>
                  <TableCell className="font-medium">{u.name}</TableCell>
                  <TableCell>{u.email}</TableCell>
                  <TableCell>{u.phone}</TableCell>
                  <TableCell>
                    {u.emiratesIdUrl ? <Badge>Uploaded</Badge> : <Badge variant="secondary">Missing</Badge>}
                  </TableCell>
                </TableRow>
              ))}
              {users.length === 0 && (
                <TableRow>
                  <TableCell colSpan={4} className="text-sm text-muted-foreground">
                    No users yet. Users are created when someone starts bidding on Demo Site.
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
