'use client'

import { Button } from '@/components/ui/button'
import { Share2 } from 'lucide-react'
import { useState } from 'react'

export function ShareButton() {
  const [copied, setCopied] = useState(false)

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <Button 
      variant="outline" 
      className="flex-1 gap-2"
      onClick={handleShare}
    >
      <Share2 className="h-4 w-4" />
      {copied ? 'Copied!' : 'Share'}
    </Button>
  )
}
