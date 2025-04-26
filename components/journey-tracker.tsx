"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { MapPin, Award, Calendar, Clock, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { userVisits, resortLocations, experienceTypes, userStats } from "@/lib/data"
import { formatDate } from "@/lib/utils"

interface JourneyTrackerProps {
  className?: string
  onViewPassport?: () => void
}

export function JourneyTracker({ className, onViewPassport }: JourneyTrackerProps) {
  const [selectedVisit, setSelectedVisit] = useState<string | null>(null)

  // Sort visits by date (newest first)
  const sortedVisits = [...userVisits].sort((a, b) => b.date.getTime() - a.date.getTime())

  const getResortName = (resortId: string) => {
    return resortLocations.find((r) => r.id === resortId)?.name || "Unknown Resort"
  }

  const getExperienceName = (experienceId: string) => {
    return experienceTypes.find((e) => e.id === experienceId)?.name || "Unknown Experience"
  }

  const getExperienceColor = (experienceId: string) => {
    return experienceTypes.find((e) => e.id === experienceId)?.color || "#5A3E36"
  }

  return (
    <div className={`rounded-xl border border-border bg-card p-6 ${className}`}>
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-serif text-xl font-semibold text-brown">Your Journey Tracker</h2>
        <Button
          variant="outline"
          size="sm"
          className="border-brown text-brown hover:bg-brown hover:text-white"
          onClick={onViewPassport}
        >
          View Passport
        </Button>
      </div>

      {/* Stats overview */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-sand/50 rounded-lg p-3 text-center">
          <div className="text-2xl font-bold text-brown">{userStats.totalVisits}</div>
          <div className="text-xs text-muted-foreground">Total Visits</div>
        </div>
        <div className="bg-sand/50 rounded-lg p-3 text-center">
          <div className="text-2xl font-bold text-brown">{userStats.totalResorts}</div>
          <div className="text-xs text-muted-foreground">Resorts Visited</div>
        </div>
        <div className="bg-sand/50 rounded-lg p-3 text-center">
          <div className="text-2xl font-bold text-brown">{userStats.badges.length}</div>
          <div className="text-xs text-muted-foreground">Badges Earned</div>
        </div>
        <div className="bg-sand/50 rounded-lg p-3 text-center">
          <div className="text-2xl font-bold text-emerald">{userStats.totalEssencePoints}</div>
          <div className="text-xs text-muted-foreground">Essence Points</div>
        </div>
      </div>

      {/* Tier progress */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-1">
            <Award className="h-4 w-4 text-gold" />
            <span className="text-sm font-medium">
              {userStats.tier.charAt(0).toUpperCase() + userStats.tier.slice(1)} Tier
            </span>
          </div>
          <div className="text-sm text-muted-foreground">
            {userStats.pointsToNextTier} points to {userStats.nextTier}
          </div>
        </div>
        <Progress
          value={(userStats.totalEssencePoints / (userStats.totalEssencePoints + userStats.pointsToNextTier)) * 100}
          className="h-2 bg-sand"
        />
      </div>

      {/* Journey timeline */}
      <div className="space-y-4">
        <h3 className="text-sm font-medium text-muted-foreground">Recent Visits</h3>

        <div className="space-y-3">
          {sortedVisits.slice(0, 5).map((visit, index) => (
            <motion.div
              key={visit.id}
              className={`relative pl-6 pb-3 ${
                index < sortedVisits.length - 1 ? "border-l-2" : ""
              } border-sand cursor-pointer`}
              whileHover={{ x: 5 }}
              onClick={() => setSelectedVisit(visit.id === selectedVisit ? null : visit.id)}
            >
              {/* Timeline dot */}
              <div
                className="absolute left-[-8px] top-0 h-4 w-4 rounded-full border-2 border-white"
                style={{ backgroundColor: getExperienceColor(visit.experienceId) }}
              />

              <div className="flex flex-col">
                <div className="flex items-center justify-between">
                  <h4 className="font-medium">{getExperienceName(visit.experienceId)}</h4>
                  <span className="text-xs text-emerald">+{visit.essencePoints} pts</span>
                </div>

                <div className="flex items-center text-xs text-muted-foreground mt-1">
                  <MapPin className="h-3 w-3 mr-1" />
                  <span>{getResortName(visit.resortId)}</span>
                </div>

                <div className="flex items-center text-xs text-muted-foreground mt-1">
                  <Calendar className="h-3 w-3 mr-1" />
                  <span>{formatDate(visit.date)}</span>
                </div>

                {/* Expanded details */}
                {selectedVisit === visit.id && (
                  <motion.div
                    className="mt-3 pt-3 border-t border-border"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="flex items-start gap-2">
                      <Clock className="h-4 w-4 text-muted-foreground mt-0.5" />
                      <div>
                        <p className="text-xs text-muted-foreground">Visit Duration</p>
                        <p className="text-sm">3 hours 45 minutes</p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between mt-3">
                      <div className="text-xs text-muted-foreground">
                        {visit.completed ? "Visit completed" : "Visit in progress"}
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-7 text-brown hover:text-brown-dark hover:bg-transparent p-0"
                      >
                        View Details
                        <ArrowRight className="h-3 w-3 ml-1" />
                      </Button>
                    </div>
                  </motion.div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}
