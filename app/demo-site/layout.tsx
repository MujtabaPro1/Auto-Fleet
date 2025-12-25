import type { Metadata } from 'next'
import Link from 'next/link'
import { Gavel, Car } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Auto Fleet Auctions',
  description: 'Premium car auctions - bid on quality vehicles',
}

export default function DemoSiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200 shadow-sm">
        <div className="container mx-auto px-6 py-3 flex items-center justify-between">
          <Link href="/demo-site" className="flex items-center gap-3 group">
            <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 to-blue-700 shadow-lg group-hover:shadow-xl transition-shadow">
              <Gavel className="h-5 w-5 text-white" />
            </div>
            <div>
              <div className="font-bold text-slate-900 text-lg leading-tight">Auto Fleet</div>
              <div className="text-xs text-blue-600 font-medium">Live Auctions</div>
            </div>
          </Link>
          <nav className="flex items-center gap-1">
            <Link
              href="/demo-site"
              className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-slate-700 hover:bg-blue-50 hover:text-blue-700 transition-colors"
            >
              <Car className="h-4 w-4" />
              Browse Auctions
            </Link>
          </nav>
        </div>
      </header>
      <main className="container mx-auto px-6 py-8">{children}</main>
      <footer className="border-t border-slate-200 bg-white/50 mt-12">
        <div className="container mx-auto px-6 py-6 text-center text-sm text-slate-500">
          <p>Auto Fleet Auctions • Premium Vehicle Marketplace</p>
        </div>
      </footer>
    </div>
  )
}
