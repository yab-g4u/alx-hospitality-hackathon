"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Sparkles } from "lucide-react"
import { userStats } from "@/lib/data"

interface EssenceCounterProps {
  initialPoints?: number
  newPoints?: number
  className?: string
}

export function EssenceCounter({ initialPoints, newPoints = 0, className }: EssenceCounterProps) {
  const [points, setPoints] = useState(initialPoints || userStats.totalEssencePoints)
  const [isAnimating, setIsAnimating] = useState(false)
  const [showIncrement, setShowIncrement] = useState(false)

  useEffect(() => {
    if (newPoints > 0) {
      setShowIncrement(true)
      setIsAnimating(true)

      // Start incrementing after a short delay
      const timer = setTimeout(() => {
        setPoints((prev) => prev + newPoints)

        // Hide the increment animation after it completes
        setTimeout(() => {
          setShowIncrement(false)
          setIsAnimating(false)
        }, 2000)
      }, 500)

      return () => clearTimeout(timer)
    }
  }, [newPoints])

  // Format number with commas
  const formatNumber = (num: number) => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
  }

  return (
    <div className={`relative ${className}`}>
      <div className="flex items-center gap-2">
        <div className="h-8 w-8 rounded-full bg-gold/20 text-gold flex items-center justify-center">
          <Sparkles className="h-4 w-4" />
        </div>

        <div>
          <div className="text-xs text-muted-foreground">Essence Points</div>
          <div className="relative h-6 overflow-hidden">
            <div className="text-lg font-bold text-brown">{formatNumber(points)}</div>

            {/* Points increment animation */}
            <AnimatePresence>
              {showIncrement && (
                <motion.div
                  className="absolute right-0 top-0 text-sm font-medium text-emerald"
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -20, opacity: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  +{newPoints}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Sparkle animation when points increase */}
      <AnimatePresence>
        {isAnimating && (
          <motion.div
            className="absolute inset-0 pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            {[...Array(10)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute h-1 w-1 rounded-full bg-gold"
                initial={{
                  x: "50%",
                  y: "50%",
                  scale: 0,
                  opacity: 1,
                }}
                animate={{
                  x: `${Math.random() * 100}%`,
                  y: `${Math.random() * 100}%`,
                  scale: Math.random() * 2 + 1,
                  opacity: 0,
                }}
                transition={{
                  duration: Math.random() * 1 + 1,
                  delay: Math.random() * 0.5,
                }}
              />
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
