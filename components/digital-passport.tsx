"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Check, ChevronLeft, ChevronRight, MapPin, Award, QrCode } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { userVisits, resortLocations, experienceTypes, userStats } from "@/lib/data"
import { formatDate } from "@/lib/utils"

interface DigitalPassportProps {
  onClose?: () => void
  onGenerateQR?: (visitId: string) => void
}

export function DigitalPassport({ onClose, onGenerateQR }: DigitalPassportProps) {
  const [currentPage, setCurrentPage] = useState(0)
  const [showStamp, setShowStamp] = useState(false)
  const [stampedVisitId, setStampedVisitId] = useState<string | null>(null)

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
    setCurrentPage((prev) => Math.max(0, prev - 1))
  }

  const handleNextPage = () => {
    setCurrentPage((prev) => Math.min(resortPages.length - 1, prev + 1))
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

  useEffect(() => {
    // Reset stamp animation when changing pages
    setShowStamp(false)
    setStampedVisitId(null)
  }, [currentPage])

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <motion.div
        className="relative w-full max-w-md bg-sand rounded-xl shadow-2xl overflow-hidden"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        transition={{ duration: 0.3 }}
      >
        {/* Passport header */}
        <div className="bg-brown text-white p-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Award className="h-5 w-5" />
            <h2 className="font-serif text-lg font-semibold">Kuriftu Digital Passport</h2>
          </div>
          <Button variant="ghost" size="icon" className="text-white hover:bg-brown-light" onClick={onClose}>
            <ChevronLeft className="h-5 w-5" />
            <span className="sr-only">Close</span>
          </Button>
        </div>

        {/* Passport content */}
        <div className="p-4">
          {/* User info */}
          <div className="flex items-center gap-4 mb-6">
            <div className="h-16 w-16 rounded-full bg-brown text-white flex items-center justify-center text-xl font-bold">
              {userStats.tier.charAt(0).toUpperCase()}
            </div>
            <div>
              <h3 className="font-serif text-lg font-semibold text-brown">Guest Passport</h3>
              <p className="text-sm text-muted-foreground">Member since {formatDate(userStats.memberSince)}</p>
              <div className="flex items-center gap-1 mt-1">
                <Badge variant="outline" className="bg-gold/20 text-brown border-gold">
                  {userStats.tier.charAt(0).toUpperCase() + userStats.tier.slice(1)} Tier
                </Badge>
                <Badge variant="outline" className="bg-emerald/10 text-emerald border-emerald">
                  {userStats.totalVisits} Visits
                </Badge>
              </div>
            </div>
          </div>

          {/* Resort page */}
          <div className="relative min-h-[300px] bg-white rounded-lg p-4 border border-gold/30 shadow-md">
            {resortPages.length > 0 ? (
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-serif text-lg font-semibold text-brown">{resortPages[currentPage].resortName}</h3>
                  <div className="flex items-center gap-1 text-sm text-muted-foreground">
                    <MapPin className="h-4 w-4" />
                    <span>
                      {resortPages[currentPage].visits.length}{" "}
                      {resortPages[currentPage].visits.length === 1 ? "Visit" : "Visits"}
                    </span>
                  </div>
                </div>

                {/* Stamps grid */}
                <div className="grid grid-cols-2 gap-4 mb-4">
                  {resortPages[currentPage].visits.map((visit) => {
                    const experience = getExperienceDetails(visit.experienceId)
                    return (
                      <div key={visit.id} className="relative" onClick={() => handleStampClick(visit.id)}>
                        <div
                          className="aspect-square rounded-lg border border-gold/30 flex flex-col items-center justify-center p-4 cursor-pointer hover:bg-sand-light transition-colors"
                          style={{
                            backgroundColor: visit.completed ? `${experience.color}10` : "transparent",
                            borderColor: visit.completed ? experience.color : "rgba(212, 175, 55, 0.3)",
                          }}
                        >
                          <div
                            className="h-12 w-12 rounded-full flex items-center justify-center mb-2"
                            style={{ backgroundColor: experience.color }}
                          >
                            {/* This would be a dynamic icon in a real app */}
                            <Award className="h-6 w-6 text-white" />
                          </div>
                          <h4 className="text-sm font-medium text-center">{experience.name}</h4>
                          <p className="text-xs text-muted-foreground text-center mt-1">{formatDate(visit.date)}</p>
                          {visit.completed && (
                            <div className="absolute top-2 right-2 h-5 w-5 rounded-full bg-emerald text-white flex items-center justify-center">
                              <Check className="h-3 w-3" />
                            </div>
                          )}
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
                                <div className="absolute inset-0 bg-gold/20 rounded-full blur-xl"></div>
                                <div className="relative h-24 w-24 rounded-full border-4 border-gold flex items-center justify-center bg-white/80 backdrop-blur-sm">
                                  <div className="text-center">
                                    <div className="text-2xl text-gold">
                                      <Award />
                                    </div>
                                    <p className="text-xs font-bold text-brown mt-1">VERIFIED</p>
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

                {/* QR code button */}
                <div className="flex justify-center mt-4">
                  <Button
                    variant="outline"
                    className="border-brown text-brown hover:bg-brown hover:text-white"
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
                <h3 className="font-serif text-lg font-semibold text-brown mb-2">No Visits Yet</h3>
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
                disabled={currentPage === 0}
                onClick={handlePrevPage}
                className="border-brown text-brown hover:bg-brown hover:text-white disabled:opacity-50"
              >
                <ChevronLeft className="h-4 w-4 mr-1" />
                Previous
              </Button>

              <div className="text-sm text-muted-foreground">
                Page {currentPage + 1} of {resortPages.length}
              </div>

              <Button
                variant="outline"
                size="sm"
                disabled={currentPage === resortPages.length - 1}
                onClick={handleNextPage}
                className="border-brown text-brown hover:bg-brown hover:text-white disabled:opacity-50"
              >
                Next
                <ChevronRight className="h-4 w-4 ml-1" />
              </Button>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  )
}
