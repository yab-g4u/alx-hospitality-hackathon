"use client"

import { useEffect, useState } from "react"

interface ConfettiProps {
  active: boolean
  count?: number
  colors?: string[]
}

export function Confetti({ active, count = 50, colors = ["#D4AF37", "#F4E3D7", "#5A3E36", "#0E7E62"] }: ConfettiProps) {
  const [confetti, setConfetti] = useState<Array<{ id: number; color: string; left: string; delay: string }>>([])

  useEffect(() => {
    if (active) {
      const newConfetti = Array.from({ length: count }).map((_, i) => ({
        id: i,
        color: colors[Math.floor(Math.random() * colors.length)],
        left: `${Math.random() * 100}%`,
        delay: `${Math.random() * 3}s`,
      }))
      setConfetti(newConfetti)

      const timer = setTimeout(() => {
        setConfetti([])
      }, 5000)

      return () => clearTimeout(timer)
    }
  }, [active, count, colors])

  if (!active) return null

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      {confetti.map((item) => (
        <div
          key={item.id}
          className="confetti absolute top-0"
          style={{
            left: item.left,
            backgroundColor: item.color,
            animationDelay: item.delay,
          }}
        />
      ))}
    </div>
  )
}
