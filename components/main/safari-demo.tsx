'use client'

import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Play, Minus, Square, X, Lock, RefreshCw } from 'lucide-react'

export function SafariDemo() {
  const driveFileId = "10MmCJnZ52SPNpn1yazJW5ITZa-69gTcC" // Your Google Drive file ID
  const driveUrl = `https://drive.google.com/file/d/${driveFileId}/view`

  const openVideoInNewTab = () => {
    window.open(driveUrl, '_blank', 'noopener,noreferrer')
  }

  return (
    <div className="flex flex-col items-center space-y-0">
      {/* Browser Header */}
      <div className="bg-gray-100 border border-gray-300 rounded-t-lg w-[1000px] px-4 py-2 flex items-center justify-between shadow-sm">
        {/* Browser Controls */}
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-red-500 rounded-full flex items-center justify-center cursor-pointer hover:bg-red-600 transition-colors">
            <X className="w-2 h-2 text-white" />
          </div>
          <div className="w-3 h-3 bg-yellow-500 rounded-full flex items-center justify-center cursor-pointer hover:bg-yellow-600 transition-colors">
            <Minus className="w-2 h-2 text-white" />
          </div>
          <div className="w-3 h-3 bg-green-500 rounded-full flex items-center justify-center cursor-pointer hover:bg-green-600 transition-colors">
            <Square className="w-1.5 h-1.5 text-white" />
          </div>
        </div>

        {/* Address Bar */}
        <div className="flex-1 max-w-md mx-4">
          <div className="bg-white border border-gray-300 rounded-md px-3 py-1.5 flex items-center space-x-2 shadow-sm">
            <Lock className="w-3 h-3 text-green-600" />
            <span className="text-sm text-gray-600 font-mono flex-1 text-center">mivvo.life</span>
            <RefreshCw className="w-3 h-3 text-gray-400" />
          </div>
        </div>

        {/* Empty space for balance */}
        <div className="w-[60px]"></div>
      </div>

      {/* Browser Content */}
      <div className="flex justify-center items-center relative border-l border-r border-b border-gray-300 rounded-b-lg overflow-hidden shadow-lg">
        <div className="relative">
          <Image
            src="/intro.png"
            alt="Intro Image"
            width={1000}
            height={750}
          />
          <Button
            onClick={openVideoInNewTab}
            size="lg"
            className="absolute inset-0 w-full h-full bg-black/50 hover:bg-black/60 text-white rounded-lg border-0 flex items-center justify-center group transition-all duration-300 cursor-pointer"
          >
            <Play className="w-24 h-24 group-hover:scale-110 transition-transform duration-300" />
          </Button>
        </div>
      </div>
    </div>
  )
}
