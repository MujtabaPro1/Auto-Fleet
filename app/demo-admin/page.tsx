'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function DemoAdminIndexPage() {
  const router = useRouter()

  useEffect(() => {
    router.replace('/demo-admin/login')
  }, [router])

  return null
}
