"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { User, Users, Briefcase, Palmtree } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

interface JourneyOption {
  id: string
  title: string
  description: string
  icon: React.ReactNode
}

interface JourneySelectorProps {
  onSelect: (journeyId: string) => void
}

export function JourneySelector({ onSelect }: JourneySelectorProps) {
  const [selectedJourney, setSelectedJourney] = useState<string | null>(null)

  const journeyOptions: JourneyOption[] = [
    {
      id: "solo",
      title: "Solo Journey",
      description: "Personal retreat for relaxation and self-discovery",
      icon: <User className="h-6 w-6" />,
    },
    {
      id: "family",
      title: "Family Bond",
      description: "Create lasting memories with your loved ones",
      icon: <Users className="h-6 w-6" />,
    },
    {
      id: "business",
      title: "Business Retreat",
      description: "Team building and corporate experiences",
      icon: <Briefcase className="h-6 w-6" />,
    },
    {
      id: "vacation",
      title: "Vacation Escape",
      description: "Full resort experience with all amenities",
      icon: <Palmtree className="h-6 w-6" />,
    },
  ]

  const handleSelect = (journeyId: string) => {
    setSelectedJourney(journeyId)
  }

  const handleContinue = () => {
    if (selectedJourney) {
      onSelect(selectedJourney)
    }
  }

  return (
    <div className="w-full max-w-2xl mx-auto">
      <h2 className="font-serif text-2xl font-semibold text-brown text-center mb-6">Choose Your Journey</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {journeyOptions.map((journey) => (
          <motion.div
            key={journey.id}
            className={cn(
              "relative p-6 rounded-xl border cursor-pointer transition-all duration-300",
              selectedJourney === journey.id
                ? "border-gold bg-sand shadow-md"
                : "border-border bg-background hover:border-sand-dark",
            )}
            whileHover={{ y: -5 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => handleSelect(journey.id)}
          >
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 h-12 w-12 rounded-full bg-brown text-sand flex items-center justify-center">
                {journey.icon}
              </div>

              <div>
                <h3 className="font-serif text-lg font-medium text-foreground mb-1">{journey.title}</h3>
                <p className="text-sm text-muted-foreground">{journey.description}</p>
              </div>
            </div>

            {selectedJourney === journey.id && (
              <motion.div
                className="absolute top-3 right-3 h-4 w-4 rounded-full bg-gold"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
              />
            )}
          </motion.div>
        ))}
      </div>

      <div className="mt-8 flex justify-center">
        <Button
          size="lg"
          disabled={!selectedJourney}
          onClick={handleContinue}
          className="bg-brown text-sand hover:bg-brown-dark"
        >
          Continue Your Journey
        </Button>
      </div>
    </div>
  )
}
