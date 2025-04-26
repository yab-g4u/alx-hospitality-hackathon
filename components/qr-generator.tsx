"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { QrCode } from "lucide-react"
import { cn } from "@/lib/utils"

interface QRGeneratorProps {
  value: string
  size?: number
  logo?: string
  isActive?: boolean
}

export function QRGenerator({ value, size = 200, logo, isActive = true }: QRGeneratorProps) {
  const [isGlowing, setIsGlowing] = useState(false)

  useEffect(() => {
    if (isActive) {
      setIsGlowing(true)

      const timer = setTimeout(() => {
        setIsGlowing(false)
      }, 2000)

      return () => clearTimeout(timer)
    }
  }, [isActive])

  return (
    <div className="flex flex-col items-center">
      <motion.div
        className={cn("qr-container", isGlowing && "qr-active")}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        {/* This is a placeholder for the QR code - in a real app, you'd use a QR code library */}
        <div className="relative h-[200px] w-[200px] bg-white flex items-center justify-center">
          <QrCode className="h-32 w-32 text-brown" />

          {logo && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="h-12 w-12 rounded-full bg-white p-1 shadow-md">
                <img src={logo || "/placeholder.svg"} alt="Logo" className="h-full w-full object-contain" />
              </div>
            </div>
          )}
        </div>
      </motion.div>

      <div className="mt-4 text-center">
        <p className="text-sm text-muted-foreground">
          {isActive ? <span className="text-emerald font-medium">QR Code is active</span> : "QR Code is inactive"}
        </p>
        <p className="text-xs text-muted-foreground mt-1">Scan at reception to check in</p>
      </div>
    </div>
  )
}
