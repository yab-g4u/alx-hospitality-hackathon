"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { calculateTierProgress, getTierColor, formatPoints } from "@/lib/utils"
import { Confetti } from "@/components/ui/confetti"

interface TierProgressProps {
  points: number
  previousPoints?: number
}

export function TierProgress({ points, previousPoints }: TierProgressProps) {
  const [showConfetti, setShowConfetti] = useState(false)
  const { tier, progress, nextTier, pointsToNextTier } = calculateTierProgress(points)
  const tierColor = getTierColor(tier)

  useEffect(() => {
    if (previousPoints !== undefined) {
      const prevTier = calculateTierProgress(previousPoints).tier
      if (prevTier !== tier) {
        setShowConfetti(true)

        const timer = setTimeout(() => {
          setShowConfetti(false)
        }, 5000)

        return () => clearTimeout(timer)
      }
    }
  }, [points, previousPoints, tier])

  return (
    <div className="relative">
      <Confetti active={showConfetti} />

      <div className="flex flex-col items-center">
        <div className="relative mb-2">
          <svg width="120" height="120" viewBox="0 0 120 120">
            {/* Background circle */}
            <circle cx="60" cy="60" r="54" fill="none" stroke="#E8D7CB" strokeWidth="12" />

            {/* Progress circle */}
            <motion.circle
              cx="60"
              cy="60"
              r="54"
              fill="none"
              stroke={tierColor}
              strokeWidth="12"
              strokeLinecap="round"
              strokeDasharray={2 * Math.PI * 54}
              strokeDashoffset={2 * Math.PI * 54 * (1 - progress / 100)}
              initial={{ strokeDashoffset: 2 * Math.PI * 54 }}
              animate={{ strokeDashoffset: 2 * Math.PI * 54 * (1 - progress / 100) }}
              transition={{ duration: 1.5, ease: "easeInOut" }}
            />
          </svg>

          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-xs uppercase tracking-wider text-muted-foreground">
              {tier.charAt(0).toUpperCase() + tier.slice(1)}
            </span>
            <span className="text-2xl font-bold text-foreground">{formatPoints(points)}</span>
            <span className="text-xs text-muted-foreground">Essence Points</span>
          </div>
        </div>

        {pointsToNextTier > 0 && (
          <p className="text-sm text-center text-muted-foreground">
            <span className="font-medium text-emerald">{formatPoints(pointsToNextTier)}</span> points until {nextTier}
          </p>
        )}
      </div>
    </div>
  )
}
