"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { Share2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Stamp } from "@/components/stamp"

interface PassportPageProps {
  pageNumber: number
  title: string
  stamps: Array<{
    id: string
    title: string
    date: Date
    location: string
    icon: React.ReactNode
    collected: boolean
    points: number
  }>
  onShare?: () => void
}

export function PassportPage({ pageNumber, title, stamps, onShare }: PassportPageProps) {
  const [isFlipped, setIsFlipped] = useState(false)

  const handleFlip = () => {
    setIsFlipped(!isFlipped)
  }

  return (
    <div className="relative w-full max-w-md mx-auto perspective">
      <motion.div
        className="relative w-full preserve-3d transition-all duration-500"
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.6, ease: "easeInOut" }}
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* Front of passport page */}
        <div className="passport-page absolute inset-0 backface-hidden" style={{ backfaceVisibility: "hidden" }}>
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-serif text-xl font-semibold text-brown">{title}</h3>
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon" className="h-8 w-8 text-brown" onClick={onShare}>
                <Share2 className="h-4 w-4" />
                <span className="sr-only">Share</span>
              </Button>
              <div className="flex items-center justify-center h-8 w-8 rounded-full bg-brown text-sand text-sm font-medium">
                {pageNumber}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4">
            {stamps.slice(0, 6).map((stamp) => (
              <Stamp key={stamp.id} {...stamp} />
            ))}
          </div>

          <div className="mt-4 flex justify-center">
            <Button
              variant="outline"
              size="sm"
              className="text-brown border-brown hover:bg-brown hover:text-sand"
              onClick={handleFlip}
            >
              View Details
            </Button>
          </div>
        </div>

        {/* Back of passport page */}
        <div
          className="passport-page absolute inset-0 backface-hidden"
          style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
        >
          <div className="flex flex-col h-full">
            <h3 className="font-serif text-xl font-semibold text-brown mb-4">{title} Details</h3>

            <div className="flex-1 space-y-3">
              {stamps.slice(0, 6).map((stamp) => (
                <div key={stamp.id} className="flex items-center gap-3 p-2 rounded-lg bg-white/50">
                  <div className="flex-shrink-0 h-10 w-10 flex items-center justify-center rounded-full bg-sand text-brown">
                    {stamp.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-medium text-brown truncate">{stamp.title}</h4>
                    <p className="text-xs text-muted-foreground">{stamp.location}</p>
                  </div>
                  {stamp.collected && <div className="text-xs font-medium text-emerald">+{stamp.points}</div>}
                </div>
              ))}
            </div>

            <div className="mt-4 flex justify-center">
              <Button
                variant="outline"
                size="sm"
                className="text-brown border-brown hover:bg-brown hover:text-sand"
                onClick={handleFlip}
              >
                View Stamps
              </Button>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
