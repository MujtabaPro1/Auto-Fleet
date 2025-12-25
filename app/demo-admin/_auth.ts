'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

const TOKEN_KEY = 'demo_admin_authed'

export function useDemoAdminAuth() {
  const router = useRouter()
  const [ready, setReady] = useState(false)

  useEffect(() => {
    const ok = localStorage.getItem(TOKEN_KEY) === 'true'
    if (!ok) {
      router.replace('/demo-admin/login')
      return
    }
    setReady(true)
  }, [router])

  return { ready }
}
