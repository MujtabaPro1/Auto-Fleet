import type { Metadata } from 'next'
import Link from 'next/link'
import AdminNav from './AdminNav'
import { Shield } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Auto Fleet Admin',
  description: 'Admin dashboard for managing car auctions',
}

export default function DemoAdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200 shadow-sm">
        <div className="container mx-auto px-6 py-3 flex items-center justify-between">
          <Link href="/demo-admin/cars" className="flex items-center gap-3 group">
            <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-slate-800 to-slate-900 shadow-lg group-hover:shadow-xl transition-shadow">
              <Shield className="h-5 w-5 text-white" />
            </div>
            <div>
              <div className="font-bold text-slate-900 text-lg leading-tight">Auto Fleet</div>
              <div className="text-xs text-slate-500 font-medium">Admin Panel</div>
            </div>
          </Link>
          <AdminNav />
        </div>
      </header>
      <main className="container mx-auto px-6 py-8">{children}</main>
    </div>
  )
}
