"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  Check,
  ChevronLeft,
  ChevronRight,
  MapPin,
  Award,
  QrCode,
  Share2,
  Coffee,
  Utensils,
  SpadeIcon as Spa,
  Mountain,
  Landmark,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { userVisits, resortLocations, experienceTypes, userStats } from "@/lib/data"
import { formatDate } from "@/lib/utils"

interface EnhancedPassportProps {
  onClose?: () => void
  onGenerateQR?: (visitId: string) => void
}

export function EnhancedPassport({ onClose, onGenerateQR }: EnhancedPassportProps) {
  const [currentPage, setCurrentPage] = useState(0)
  const [showStamp, setShowStamp] = useState(false)
  const [stampedVisitId, setStampedVisitId] = useState<string | null>(null)
  const [isFlipping, setIsFlipping] = useState(false)
  const [showMap, setShowMap] = useState(false)
  const passportRef = useRef<HTMLDivElement>(null)

  // Group visits by resort
  const visitsByResort = userVisits.reduce(
    (acc, visit) => {
      const resortId = visit.resortId
      if (!acc[resortId]) {
        acc[resortId] = []
      }
      acc[resortId].push(visit)
      return acc
    },
    {} as Record<string, typeof userVisits>,
  )

  const resortPages = Object.keys(visitsByResort).map((resortId) => {
    const resort = resortLocations.find((r) => r.id === resortId)
    return {
      resortId,
      resortName: resort?.name || "Unknown Resort",
      visits: visitsByResort[resortId],
    }
  })

  const handlePrevPage = () => {
    if (isFlipping) return
    setIsFlipping(true)
    setTimeout(() => {
      setCurrentPage((prev) => Math.max(0, prev - 1))
      setIsFlipping(false)
    }, 300)
  }

  const handleNextPage = () => {
    if (isFlipping) return
    setIsFlipping(true)
    setTimeout(() => {
      setCurrentPage((prev) => Math.min(resortPages.length - 1, prev + 1))
      setIsFlipping(false)
    }, 300)
  }

  const handleStampClick = (visitId: string) => {
    setStampedVisitId(visitId)
    setShowStamp(true)

    // Hide stamp after animation
    setTimeout(() => {
      setShowStamp(false)
    }, 2000)
  }

  const getExperienceDetails = (experienceId: string) => {
    return (
      experienceTypes.find((exp) => exp.id === experienceId) || {
        name: "Unknown Experience",
        icon: "Award",
        color: "#5A3E36",
      }
    )
  }

  const getIconComponent = (iconName: string) => {
    switch (iconName) {
      case "Coffee":
        return <Coffee />
      case "Utensils":
        return <Utensils />
      case "Spa":
        return <Spa />
      case "Mountain":
        return <Mountain />
      case "Landmark":
        return <Landmark />
      default:
        return <Award />
    }
  }

  useEffect(() => {
    // Reset stamp animation when changing pages
    setShowStamp(false)
    setStampedVisitId(null)
  }, [currentPage])

  const toggleMap = () => {
    setShowMap(!showMap)
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <motion.div
        className="relative w-full max-w-md"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        transition={{ duration: 0.3 }}
      >
        {/* Passport cover */}
        <div
          ref={passportRef}
          className={`relative bg-kuriftu-brown rounded-xl shadow-2xl overflow-hidden transition-all duration-300 ${
            isFlipping ? "scale-95" : ""
          }`}
        >
          {/* Ethiopian pattern overlay */}
          <div className="absolute inset-0 bg-ethiopian-pattern opacity-20 pointer-events-none" />

          {/* Passport header */}
          <div className="relative bg-kuriftu-gold text-kuriftu-brown p-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="h-10 w-10 rounded-full bg-white flex items-center justify-center">
                <Award className="h-5 w-5" />
              </div>
              <div>
                <h2 className="font-serif text-lg font-semibold">Kuriftu Journey Passport</h2>
                <p className="text-xs opacity-80">Your Ethiopian Luxury Experience</p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="text-kuriftu-brown hover:bg-kuriftu-gold/20"
              onClick={onClose}
            >
              <ChevronLeft className="h-5 w-5" />
              <span className="sr-only">Close</span>
            </Button>
          </div>

          {/* Passport content */}
          <div className="p-4">
            {/* User info */}
            <div className="flex items-center gap-4 mb-6">
              <div className="h-16 w-16 rounded-full bg-kuriftu-gold text-kuriftu-brown flex items-center justify-center text-xl font-bold">
                {userStats.tier.charAt(0).toUpperCase()}
              </div>
              <div>
                <h3 className="font-serif text-lg font-semibold text-white">Guest Passport</h3>
                <p className="text-sm text-white/70">Member since {formatDate(userStats.memberSince)}</p>
                <div className="flex items-center gap-1 mt-1">
                  <Badge variant="outline" className="bg-kuriftu-gold/20 text-kuriftu-gold border-kuriftu-gold">
                    {userStats.tier.charAt(0).toUpperCase() + userStats.tier.slice(1)} Tier
                  </Badge>
                  <Badge variant="outline" className="bg-kuriftu-green/10 text-kuriftu-green border-kuriftu-green">
                    {userStats.totalVisits} Visits
                  </Badge>
                </div>
              </div>
            </div>

            {/* Map toggle button */}
            <div className="mb-4">
              <Button
                variant="outline"
                size="sm"
                className="w-full border-white/20 text-white hover:bg-white/10"
                onClick={toggleMap}
              >
                {showMap ? "Hide Journey Map" : "View Journey Map"}
                <MapPin className="ml-2 h-4 w-4" />
              </Button>
            </div>

            {/* Journey Map */}
            <AnimatePresence>
              {showMap && (
                <motion.div
                  className="mb-4 relative rounded-lg overflow-hidden"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 200, opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="absolute inset-0 bg-kuriftu-sand/10">
                    {/* This would be a real map in a production app */}
                    <div className="relative h-full w-full bg-[url('/placeholder.svg?height=400&width=600')] bg-cover bg-center">
                      {/* Map overlay with Ethiopian outline */}
                      <div className="absolute inset-0 flex items-center justify-center">
                        <svg
                          width="200"
                          height="200"
                          viewBox="0 0 800 800"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                          className="opacity-40"
                        >
                          <path
                            d="M400 100C500 150 600 200 650 300C700 400 700 500 650 600C600 700 500 750 400 750C300 750 200 700 150 600C100 500 100 400 150 300C200 200 300 150 400 100Z"
                            stroke="#D4AF37"
                            strokeWidth="8"
                            className="animate-path-draw"
                            strokeDasharray="1000"
                            strokeDashoffset="1000"
                            strokeLinecap="round"
                          />
                        </svg>
                      </div>

                      {/* Resort markers */}
                      {resortLocations.map((location, index) => {
                        const hasVisited = userVisits.some((visit) => visit.resortId === location.id)
                        // Calculate position (this would be more accurate in a real app)
                        const left = 100 + ((index * 120) % 300)
                        const top = 50 + ((index * 70) % 100)
                        return (
                          <div
                            key={location.id}
                            className={`absolute w-6 h-6 transform -translate-x-1/2 -translate-y-1/2 ${
                              hasVisited ? "text-kuriftu-gold" : "text-white/50"
                            }`}
                            style={{ left, top }}
                          >
                            <div className="relative">
                              <MapPin className="h-6 w-6" />
                              {hasVisited && (
                                <div className="absolute -bottom-1 -right-1 h-3 w-3 rounded-full bg-kuriftu-green" />
                              )}
                            </div>
                          </div>
                        )
                      })}

                      {/* Journey path */}
                      <svg
                        className="absolute inset-0 w-full h-full"
                        viewBox="0 0 400 200"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M100 50 L150 80 L220 70 L280 120 L320 90"
                          stroke="#D4AF37"
                          strokeWidth="2"
                          strokeDasharray="5,5"
                          className="animate-path-draw"
                        />
                      </svg>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Resort page */}
            <div className="relative min-h-[300px] bg-white rounded-lg p-4 border border-kuriftu-gold/30 shadow-md">
              {resortPages.length > 0 ? (
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-serif text-lg font-semibold text-kuriftu-brown">
                      {resortPages[currentPage].resortName}
                    </h3>
                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                      <MapPin className="h-4 w-4" />
                      <span>
                        {resortPages[currentPage].visits.length}{" "}
                        {resortPages[currentPage].visits.length === 1 ? "Visit" : "Visits"}
                      </span>
                    </div>
                  </div>

                  {/* Ethiopian pattern divider */}
                  <div className="h-2 w-full bg-ethiopian-pattern bg-repeat-x opacity-20 mb-4" />

                  {/* Stamps grid */}
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    {resortPages[currentPage].visits.map((visit) => {
                      const experience = getExperienceDetails(visit.experienceId)
                      return (
                        <div key={visit.id} className="relative" onClick={() => handleStampClick(visit.id)}>
                          <div
                            className="aspect-square rounded-lg border flex flex-col items-center justify-center p-4 cursor-pointer hover:bg-kuriftu-sand/10 transition-colors relative overflow-hidden"
                            style={{
                              backgroundColor: visit.completed ? `${experience.color}10` : "transparent",
                              borderColor: visit.completed ? experience.color : "rgba(212, 175, 55, 0.3)",
                            }}
                          >
                            {/* Ethiopian pattern background */}
                            <div className="absolute inset-0 bg-ethiopian-pattern opacity-5" />

                            <div className="relative z-10 flex flex-col items-center">
                              <div
                                className="h-12 w-12 rounded-full flex items-center justify-center mb-2 text-white"
                                style={{ backgroundColor: experience.color }}
                              >
                                {getIconComponent(experience.icon)}
                              </div>
                              <h4 className="text-sm font-medium text-center">{experience.name}</h4>
                              <p className="text-xs text-muted-foreground text-center mt-1">{formatDate(visit.date)}</p>
                              {visit.completed && (
                                <div className="absolute top-2 right-2 h-5 w-5 rounded-full bg-kuriftu-green text-white flex items-center justify-center">
                                  <Check className="h-3 w-3" />
                                </div>
                              )}
                            </div>
                          </div>

                          {/* Stamp overlay animation */}
                          <AnimatePresence>
                            {showStamp && stampedVisitId === visit.id && (
                              <motion.div
                                className="absolute inset-0 flex items-center justify-center pointer-events-none"
                                initial={{ opacity: 0, scale: 0, rotate: -45 }}
                                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                                exit={{ opacity: 0, scale: 0.5, rotate: 45 }}
                                transition={{ duration: 0.5, type: "spring" }}
                              >
                                <div className="relative">
                                  <div className="absolute inset-0 bg-kuriftu-gold/20 rounded-full blur-xl"></div>
                                  <div className="relative h-24 w-24 rounded-full border-4 border-kuriftu-gold flex items-center justify-center bg-white/80 backdrop-blur-sm">
                                    <div className="text-center">
                                      <div className="text-2xl text-kuriftu-gold">
                                        <Award />
                                      </div>
                                      <p className="text-xs font-bold text-kuriftu-brown mt-1">VERIFIED</p>
                                      <p className="text-[10px] text-kuriftu-brown/70">KURIFTU</p>
                                    </div>
                                  </div>
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      )
                    })}
                  </div>

                  {/* Amharic text for cultural authenticity */}
                  <div className="text-center mb-4">
                    <p className="text-xs text-muted-foreground">Experience the beauty of Ethiopia</p>
                    <p className="font-amharic text-sm text-kuriftu-brown mt-1">የኢትዮጵያን ውበት ይመልከቱ</p>
                  </div>

                  {/* QR code button */}
                  <div className="flex justify-center mt-4">
                    <Button
                      variant="outline"
                      className="border-kuriftu-brown text-kuriftu-brown hover:bg-kuriftu-brown hover:text-white"
                      onClick={() => onGenerateQR && onGenerateQR(resortPages[currentPage].resortId)}
                    >
                      <QrCode className="h-4 w-4 mr-2" />
                      Generate Check-in QR
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center h-[300px]">
                  <MapPin className="h-12 w-12 text-muted-foreground mb-4" />
                  <h3 className="font-serif text-lg font-semibold text-kuriftu-brown mb-2">No Visits Yet</h3>
                  <p className="text-sm text-muted-foreground text-center">
                    Start your Kuriftu journey to collect stamps in your passport
                  </p>
                </div>
              )}
            </div>

            {/* Pagination */}
            {resortPages.length > 0 && (
              <div className="flex items-center justify-between mt-4">
                <Button
                  variant="outline"
                  size="sm"
                  disabled={currentPage === 0 || isFlipping}
                  onClick={handlePrevPage}
                  className="border-white/20 text-white hover:bg-white/10 disabled:opacity-50"
                >
                  <ChevronLeft className="h-4 w-4 mr-1" />
                  Previous
                </Button>

                <div className="text-sm text-white/70">
                  Page {currentPage + 1} of {resortPages.length}
                </div>

                <Button
                  variant="outline"
                  size="sm"
                  disabled={currentPage === resortPages.length - 1 || isFlipping}
                  onClick={handleNextPage}
                  className="border-white/20 text-white hover:bg-white/10 disabled:opacity-50"
                >
                  Next
                  <ChevronRight className="h-4 w-4 ml-1" />
                </Button>
              </div>
            )}

            {/* Share button */}
            <div className="mt-4">
              <Button variant="outline" size="sm" className="w-full border-white/20 text-white hover:bg-white/10">
                <Share2 className="h-4 w-4 mr-2" />
                Share Your Journey
              </Button>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
