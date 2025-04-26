"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { QrCode, Check, X, Share2, Download, Coffee } from "lucide-react"
import { Button } from "@/components/ui/button"
import { resortLocations, experienceTypes } from "@/lib/data"

interface EnhancedQRProps {
  resortId: string
  experienceId?: string
  onClose?: () => void
  onSuccess?: () => void
}

export function EnhancedQR({ resortId, experienceId, onClose, onSuccess }: EnhancedQRProps) {
  const [isActive, setIsActive] = useState(false)
  const [isScanned, setIsScanned] = useState(false)
  const [countdown, setCountdown] = useState(300) // 5 minutes in seconds
  const [showConfetti, setShowConfetti] = useState(false)

  const resort = resortLocations.find((r) => r.id === resortId) || {
    name: "Unknown Resort",
    address: "Unknown Location",
  }

  const experience = experienceId ? experienceTypes.find((e) => e.id === experienceId) : null

  useEffect(() => {
    // Activate QR code after a short delay
    const activateTimer = setTimeout(() => {
      setIsActive(true)
    }, 1500)

    // Set up countdown timer
    let countdownInterval: NodeJS.Timeout
    if (isActive && !isScanned) {
      countdownInterval = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            clearInterval(countdownInterval)
            return 0
          }
          return prev - 1
        })
      }, 1000)
    }

    return () => {
      clearTimeout(activateTimer)
      if (countdownInterval) clearInterval(countdownInterval)
    }
  }, [isActive, isScanned])

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, "0")}`
  }

  const handleSimulateScan = () => {
    setIsScanned(true)
    setShowConfetti(true)

    // Notify parent component of successful scan
    setTimeout(() => {
      if (onSuccess) onSuccess()
    }, 2000)
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <motion.div
        className="relative w-full max-w-sm bg-kuriftu-brown rounded-xl shadow-2xl overflow-hidden"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        transition={{ duration: 0.3 }}
      >
        {/* Ethiopian pattern overlay */}
        <div className="absolute inset-0 bg-ethiopian-pattern opacity-10 pointer-events-none" />

        {/* Close button */}
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-2 right-2 z-10 text-white/70 hover:text-white"
          onClick={onClose}
        >
          <X className="h-4 w-4" />
          <span className="sr-only">Close</span>
        </Button>

        {/* QR header */}
        <div className="bg-kuriftu-gold text-kuriftu-brown p-4">
          <div className="flex items-center gap-2">
            <Coffee className="h-5 w-5" />
            <h2 className="font-serif text-lg font-semibold">Kuriftu Check-in QR</h2>
          </div>
        </div>

        {/* QR content */}
        <div className="p-6">
          <div className="text-center mb-6">
            <h3 className="font-serif text-xl font-semibold text-white mb-1">{resort.name}</h3>
            <p className="text-sm text-white/70">{resort.address}</p>
            {experience && (
              <div
                className="inline-block mt-2 px-3 py-1 rounded-full text-sm"
                style={{
                  backgroundColor: `${experience.color}20`,
                  color: experience.color,
                }}
              >
                {experience.name}
              </div>
            )}
          </div>

          {/* QR code */}
          <div className="relative mx-auto w-64 h-64 mb-6">
            <div className="absolute inset-0 flex items-center justify-center">
              <div
                className={`p-4 border-4 ${isActive ? "border-kuriftu-gold" : "border-white/30"} rounded-lg bg-white`}
              >
                {/* Ethiopian pattern in QR background */}
                <div className="absolute inset-0 bg-ethiopian-pattern opacity-5" />

                {/* This would be a real QR code in a production app */}
                <div className="relative w-48 h-48 bg-white flex items-center justify-center">
                  <QrCode className="h-32 w-32 text-kuriftu-brown" />

                  {/* Kuriftu logo overlay */}
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <div className="h-12 w-12 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center">
                      <Coffee className="h-6 w-6 text-kuriftu-gold" />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Scanning animation */}
            {isActive && !isScanned && (
              <div className="absolute inset-0 pointer-events-none overflow-hidden">
                <div className="absolute inset-x-0 h-2 bg-kuriftu-green/50 top-0 animate-qr-scan" />
              </div>
            )}

            {/* Success overlay */}
            {isScanned && (
              <motion.div
                className="absolute inset-0 flex items-center justify-center bg-white/80 backdrop-blur-sm"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                <div className="text-center">
                  <div className="h-16 w-16 rounded-full bg-kuriftu-green text-white flex items-center justify-center mx-auto mb-4">
                    <Check className="h-8 w-8" />
                  </div>
                  <h4 className="font-serif text-lg font-semibold text-kuriftu-brown mb-1">Check-in Successful!</h4>
                  <p className="text-sm text-kuriftu-green">+{experience?.essencePoints || 100} Essence Points</p>
                </div>
              </motion.div>
            )}
          </div>

          {/* Confetti animation */}
          {showConfetti && (
            <div className="absolute inset-0 pointer-events-none">
              {[...Array(30)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute"
                  initial={{
                    top: "50%",
                    left: "50%",
                    width: Math.random() * 8 + 4,
                    height: Math.random() * 8 + 4,
                    backgroundColor: [
                      "#D4AF37", // gold
                      "#5A3E36", // brown
                      "#0E7E62", // green
                      "#CD5C5C", // terracotta
                      "#FFFFFF", // white
                    ][Math.floor(Math.random() * 5)],
                    borderRadius: "50%",
                  }}
                  animate={{
                    top: `${Math.random() * 100}%`,
                    left: `${Math.random() * 100}%`,
                    opacity: 0,
                  }}
                  transition={{
                    duration: Math.random() * 2 + 1,
                    ease: "easeOut",
                  }}
                />
              ))}
            </div>
          )}

          {/* Status and actions */}
          <div className="space-y-4">
            {!isScanned ? (
              <>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div
                      className={`h-3 w-3 rounded-full ${isActive ? "bg-kuriftu-green animate-pulse" : "bg-white/30"}`}
                    />
                    <span className="text-sm font-medium text-white/70">
                      {isActive ? "QR Code Active" : "Activating..."}
                    </span>
                  </div>
                  {isActive && <div className="text-sm text-white/70">Expires in {formatTime(countdown)}</div>}
                </div>

                {/* Amharic text for cultural authenticity */}
                <p className="text-sm text-center">
                  <span className="text-white/70">Present this QR code to the reception staff</span>
                  <br />
                  <span className="font-amharic text-white/90 text-xs">ይህንን ኪውአር ኮድ ለአቀባበል ሰራተኞች ያሳዩ</span>
                </p>

                <div className="flex justify-center gap-2">
                  <Button variant="outline" size="sm" className="border-white/20 text-white hover:bg-white/10">
                    <Share2 className="h-4 w-4 mr-1" />
                    Share
                  </Button>
                  <Button variant="outline" size="sm" className="border-white/20 text-white hover:bg-white/10">
                    <Download className="h-4 w-4 mr-1" />
                    Save
                  </Button>
                </div>

                {/* For demo purposes only - simulate scan */}
                <div className="mt-4 pt-4 border-t border-white/20">
                  <Button
                    className="w-full bg-kuriftu-gold text-kuriftu-brown hover:bg-kuriftu-gold/90"
                    onClick={handleSimulateScan}
                    disabled={!isActive}
                  >
                    Simulate QR Scan
                  </Button>
                </div>
              </>
            ) : (
              <Button className="w-full bg-kuriftu-green text-white hover:bg-kuriftu-green/90" onClick={onClose}>
                Return to Dashboard
              </Button>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  )
}
