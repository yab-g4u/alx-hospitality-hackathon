"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Users, Award, MapPin, Utensils } from "lucide-react"
import { userStats } from "@/lib/data"

interface UserCounterProps {
  className?: string
}

export function UserCounter({ className }: UserCounterProps) {
  const [counters, setCounters] = useState({
    visits: 0,
    resorts: 0,
    badges: 0,
    points: 0,
  })

  useEffect(() => {
    // Animate counters from 0 to their target values
    const duration = 2000 // 2 seconds
    const steps = 20
    const interval = duration / steps

    let step = 0
    const timer = setInterval(() => {
      step++
      const progress = step / steps

      setCounters({
        visits: Math.round(userStats.totalVisits * progress),
        resorts: Math.round(userStats.totalResorts * progress),
        badges: Math.round(userStats.badges.length * progress),
        points: Math.round(userStats.totalEssencePoints * progress),
      })

      if (step >= steps) {
        clearInterval(timer)
        setCounters({
          visits: userStats.totalVisits,
          resorts: userStats.totalResorts,
          badges: userStats.badges.length,
          points: userStats.totalEssencePoints,
        })
      }
    }, interval)

    return () => clearInterval(timer)
  }, [])

  return (
    <div className={`gri grid-cols-2 md:grid-cols-4 gap-4 ${className}`}>
      <CounterCard icon={<Users className="h-5 w-5" />} label="Total Visits" value={counters.visits} color="#5A3E36" />

      <CounterCard
        icon={<MapPin className="h-5 w-5" />}
        label="Resorts Visited"
        value={counters.resorts}
        color="#D4AF37"
      />

      <CounterCard icon={<Award className="h-5 w-5" />} label="Badges Earned" value={counters.badges} color="#0E7E62" />

      <CounterCard
        icon={<Utensils className="h-5 w-5" />}
        label="Essence Points"
        value={counters.points}
        color="#9C27B0"
        isLargeNumber
      />
    </div>
  )
}

interface CounterCardProps {
  icon: React.ReactNode
  label: string
  value: number
  color: string
  isLargeNumber?: boolean
}

function CounterCard({ icon, label, value, color, isLargeNumber }: CounterCardProps) {
  return (
    <motion.div
      className="bg-white rounded-xl border border-border p-4 shadow-sm"
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex items-center gap-3">
        <div
          className="h-10 w-10 rounded-full flex items-center justify-center"
          style={{ backgroundColor: `${color}20`, color: color }}
        >
          {icon}
        </div>

        <div>
          <div className="text-xs text-muted-foreground">{label}</div>
          <div className="relative h-8 overflow-hidden">
            <div className={`font-bold ${isLargeNumber ? "text-lg" : "text-2xl"}`} style={{ color }}>
              {isLargeNumber ? value.toLocaleString() : value}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
