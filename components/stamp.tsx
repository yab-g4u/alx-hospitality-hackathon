"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { cn, formatDate } from "@/lib/utils"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

interface StampProps {
  id: string
  title: string
  date: Date
  location: string
  icon: React.ReactNode
  collected: boolean
  points: number
  onClick?: () => void
}

export function Stamp({ id, title, date, location, icon, collected, points, onClick }: StampProps) {
  const [isAnimating, setIsAnimating] = useState(false)

  const handleClick = () => {
    if (collected && !isAnimating) {
      setIsAnimating(true)
      setTimeout(() => setIsAnimating(false), 500)
      if (onClick) onClick()
    }
  }

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <motion.div
            className={cn(
              "stamp group",
              collected ? "bg-gold text-brown cursor-pointer" : "bg-sand text-muted-foreground cursor-not-allowed",
              isAnimating && "animate-stamp-bounce",
            )}
            onClick={handleClick}
            whileHover={collected ? { scale: 1.05 } : {}}
            whileTap={collected ? { scale: 0.95 } : {}}
          >
            <div className="relative flex flex-col items-center justify-center">
              <div className="text-2xl mb-1">{icon}</div>
              <div className="text-xs font-medium uppercase tracking-wider">{title}</div>
              {collected && (
                <motion.div
                  className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-emerald text-white text-xs"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                >
                  ✓
                </motion.div>
              )}
            </div>
          </motion.div>
        </TooltipTrigger>
        <TooltipContent side="top" className="bg-brown text-white p-4 max-w-xs">
          <div className="flex flex-col gap-2">
            <h4 className="font-serif text-lg font-semibold">{title}</h4>
            <div className="flex items-center justify-between text-xs">
              <span>{formatDate(date)}</span>
              <span>{location}</span>
            </div>
            {collected && <div className="mt-1 text-gold font-medium">+{points} Essence Points</div>}
            {!collected && <div className="mt-1 text-sand-light italic">Visit to collect this stamp</div>}
          </div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}
