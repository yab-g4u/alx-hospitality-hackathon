"use client"

import { motion } from "framer-motion"
import { CheckCircle } from "lucide-react"
import { cn, getTierColor } from "@/lib/utils"

interface TierCardProps {
  tier: "bronze" | "silver" | "gold" | "platinum"
  title: string
  points: number
  benefits: string[]
  isActive: boolean
  onClick?: () => void
}

export function TierCard({ tier, title, points, benefits, isActive, onClick }: TierCardProps) {
  const tierColor = getTierColor(tier)

  return (
    <motion.div
      className={cn("tier-card", isActive ? "border-2" : "opacity-80")}
      style={{
        borderColor: isActive ? tierColor : "transparent",
      }}
      whileHover={{ y: -5 }}
      onClick={onClick}
    >
      <div className="absolute inset-x-0 top-0 h-2" style={{ backgroundColor: tierColor }} />

      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-serif text-xl font-semibold" style={{ color: tierColor }}>
            {title}
          </h3>
          {isActive && <CheckCircle className="h-5 w-5 text-emerald" />}
        </div>

        <p className="text-sm text-muted-foreground mb-4">{points.toLocaleString()} Essence Points</p>

        <div className="space-y-2">
          {benefits.map((benefit, index) => (
            <div key={index} className="flex items-start gap-2">
              <div className="flex-shrink-0 h-4 w-4 rounded-full mt-0.5" style={{ backgroundColor: tierColor }} />
              <p className="text-sm">{benefit}</p>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  )
}
