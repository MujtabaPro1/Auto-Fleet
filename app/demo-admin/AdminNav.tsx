'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { LogOut, Car, Users, LayoutDashboard } from 'lucide-react'

const TOKEN_KEY = 'demo_admin_authed'

export default function AdminNav() {
  const router = useRouter()
  const pathname = usePathname()
  const [authed, setAuthed] = useState<boolean | null>(null)

  useEffect(() => {
    setAuthed(localStorage.getItem(TOKEN_KEY) === 'true')
  }, [pathname])

  const logout = () => {
    localStorage.removeItem(TOKEN_KEY)
    setAuthed(false)
    router.replace('/demo-admin/login')
  }

  if (authed === null) return null

  return (
    <nav className="flex items-center gap-1">
      {authed ? (
        <>
          <Link
            href="/demo-admin/cars"
            className={`flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-colors hover:bg-slate-100 ${
              pathname?.startsWith('/demo-admin/cars') ? 'bg-slate-100 text-slate-900' : 'text-slate-600'
            }`}
          >
            <Car className="h-4 w-4" />
            Cars
          </Link>
          <Link
            href="/demo-admin/users"
            className={`flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-colors hover:bg-slate-100 ${
              pathname?.startsWith('/demo-admin/users') ? 'bg-slate-100 text-slate-900' : 'text-slate-600'
            }`}
          >
            <Users className="h-4 w-4" />
            Users
          </Link>
          <div className="w-px h-6 bg-slate-200 mx-2" />
          <Button variant="ghost" size="sm" onClick={logout} className="text-slate-600 hover:text-slate-900 hover:bg-slate-100">
            <LogOut className="h-4 w-4 mr-2" />
            Logout
          </Button>
        </>
      ) : (
        <Link href="/demo-admin/login">
          <Button variant="default" size="sm">
            Login
          </Button>
        </Link>
      )}
    </nav>
  )
}
