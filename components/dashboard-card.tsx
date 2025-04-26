"use client"

import type React from "react"

import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

interface DashboardCardProps {
  title: string
  icon?: React.ReactNode
  className?: string
  children: React.ReactNode
  onClick?: () => void
}

export function DashboardCard({ title, icon, className, children, onClick }: DashboardCardProps) {
  return (
    <motion.div
      className={cn(
        "relative overflow-hidden rounded-xl border border-border bg-card p-6 shadow-sm transition-all duration-300",
        onClick && "cursor-pointer hover:border-gold hover:shadow-md",
        className,
      )}
      whileHover={onClick ? { y: -5 } : {}}
      whileTap={onClick ? { scale: 0.98 } : {}}
      onClick={onClick}
    >
      <div className="flex items-center gap-2 mb-4">
        {icon && (
          <div className="flex-shrink-0 h-8 w-8 rounded-full bg-sand text-brown flex items-center justify-center">
            {icon}
          </div>
        )}
        <h3 className="font-serif text-lg font-medium text-card-foreground">{title}</h3>
      </div>

      <div>{children}</div>
    </motion.div>
  )
}
