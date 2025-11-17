'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Info } from 'lucide-react'
import Image from 'next/image'

interface KnowYourPlatformDialogProps {
  triggerClassName?: string
}

export function KnowYourPlatformDialog({ triggerClassName }: KnowYourPlatformDialogProps) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className={`h-5 w-5 p-0 hover:bg-muted cursor-pointer ${triggerClassName || ''}`}
        >
          <Info className="h-4 w-4 text-muted-foreground hover:text-foreground" />
        </Button>
      </DialogTrigger>
      <DialogContent className="!max-w-[75vw] !max-h-[90vh] !w-[75vw] !h-[90vh] overflow-hidden p-6 flex flex-col">
        <DialogHeader className="mb-4 flex-shrink-0">
          <DialogTitle>Know Your Platform</DialogTitle>
          <DialogDescription>
            Platform information and features
          </DialogDescription>
        </DialogHeader>
        <div className="flex justify-center items-center w-full h-full min-h-0 flex-1 overflow-hidden">
          <Image
            src="/knowyourplatform.png"
            alt="Know Your Platform"
            width={2000}
            height={1500}
            className="rounded-lg w-full h-full object-contain"
            sizes="75vw"
            priority
          />
        </div>
      </DialogContent>
    </Dialog>
  )
}
