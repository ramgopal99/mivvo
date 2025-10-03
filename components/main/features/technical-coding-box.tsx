"use client"

import { useState, useEffect } from "react"
import { landingConfig } from "@/config/landing-config"

const codeLines = [
  "def two_sum(nums, target):",
  "    num_map = {}",
  "    for i, num in enumerate(nums):",
  "        complement = target - num",
  "        if complement in num_map:",
  "            return [num_map[complement], i]",
  "        num_map[num] = i",
  "    return []"
]

export function TechnicalCodingBox() {
  const featureData = landingConfig.features.mainFeatures.technicalCoding
  
  const [displayedCode, setDisplayedCode] = useState<string[]>([])
  const [currentLine, setCurrentLine] = useState(0)
  const [currentChar, setCurrentChar] = useState(0)

  useEffect(() => {
    if (currentLine >= codeLines.length) {
      const timer = setTimeout(() => {
        setDisplayedCode([])
        setCurrentLine(0)
        setCurrentChar(0)
      }, 2000)
      return () => clearTimeout(timer)
    }

    const timer = setTimeout(() => {
      if (currentChar < codeLines[currentLine].length) {
        setDisplayedCode(prev => {
          const newCode = [...prev]
          if (!newCode[currentLine]) newCode[currentLine] = ""
          newCode[currentLine] = codeLines[currentLine].slice(0, currentChar + 1)
          return newCode
        })
        setCurrentChar(prev => prev + 1)
      } else {
        setCurrentLine(prev => prev + 1)
        setCurrentChar(0)
      }
    }, 50)

    return () => clearTimeout(timer)
  }, [currentLine, currentChar])

  const renderLineWithVisibleSpaces = (line: string) => {
    return line.split('').map((char, charIndex) => {
      if (char === ' ') {
        return <span key={charIndex} className="text-gray-600">·</span>
      }
      return <span key={charIndex}>{char}</span>
    })
  }

  return (
    <div className="col-span-3 lg:col-span-1 group relative flex flex-col justify-between overflow-hidden rounded-lg bg-white shadow-lg border border-gray-200 hover:shadow-xl transition-all duration-300">
      <div className="absolute inset-0 bg-gradient-to-br from-gray-50 to-white" />
      <div className="relative p-6 flex flex-col h-full">
        <h3 className="text-xl font-semibold text-gray-900 mb-2">
          {featureData.title}
        </h3>
        <p className="text-gray-600 mb-4 text-sm">
          {featureData.description}
        </p>

        <div className="flex-1 bg-gray-900 border border-gray-700 rounded-lg p-3 font-mono text-xs min-h-[100px] flex flex-col justify-start">
          {displayedCode.map((line, i) => (
            <div key={i} className="text-green-400 leading-tight">
              {renderLineWithVisibleSpaces(line)}
              {i === currentLine && currentChar < codeLines[currentLine].length && (
                <span className="inline-block w-1 h-3 bg-green-400 animate-pulse ml-1" />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}