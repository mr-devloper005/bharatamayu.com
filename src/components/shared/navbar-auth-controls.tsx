'use client'

import Link from 'next/link'
import { User } from 'lucide-react'
import { Button } from '@/components/ui/button'

export function NavbarAuthControls() {
  return (
    <Button size="sm" asChild className="rounded-full px-4">
      <Link href="/login-details">
        <User className="mr-2 h-4 w-4" />
        Login Details
      </Link>
    </Button>
  )
}
