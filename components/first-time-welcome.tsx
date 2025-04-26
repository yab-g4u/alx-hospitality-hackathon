"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Coffee, Award, Sparkles, ChevronRight, Users, User, Briefcase, Landmark } from "lucide-react"
import { Button } from "@/components/ui/button"

interface FirstTimeWelcomeProps {
  onComplete: () => void
}

export function FirstTimeWelcome({ onComplete }: FirstTimeWelcomeProps) {
  const [step, setStep] = useState(0)
  const [journeyType, setJourneyType] = useState<string | null>(null)

  const steps = [
    {
      title: "Welcome to Kuriftu Loyalty",
      amharicTitle: "ወደ ኩሪፍቱ ታማኝነት እንኳን በደህና መጡ",
      description: "Your luxury journey through Ethiopia's finest resorts begins here.",
      icon: <Coffee className="h-12 w-12" />,
      color: "bg-kuriftu-gold text-kuriftu-brown",
    },
    {
      title: "Earn Essence Points™",
      amharicTitle: "የመንፈስ ነጥቦችን ያግኙ",
      description: "Collect points with every stay, spa visit, dining experience, and cultural tour.",
      icon: <Sparkles className="h-12 w-12" />,
      color: "bg-kuriftu-green text-white",
    },
    {
      title: "Digital Journey Passport",
      amharicTitle: "ዲጂታል ጉዞ ፓስፖርት",
      description: "Collect digital stamps and badges that showcase your Kuriftu experiences.",
      icon: <Award className="h-12 w-12" />,
      color: "bg-kuriftu-terracotta text-white",
    },
    {
      title: "Choose Your Journey Type",
      amharicTitle: "የጉዞዎን አይነት ይምረጡ",
      description: "Tell us how you'll be experiencing Kuriftu today.",
      icon: <Users className="h-12 w-12" />,
      color: "bg-kuriftu-brown text-white",
      isJourneySelector: true,
    },
  ]

  const journeyTypes = [
    {
      id: "solo",
      title: "Solo Journey",
      amharicTitle: "ብቸኛ ጉዞ",
      description: "Personal retreat for relaxation and self-discovery",
      icon: <User className="h-6 w-6" />,
    },
    {
      id: "family",
      title: "Family Bond",
      amharicTitle: "የቤተሰብ ትስስር",
      description: "Create lasting memories with your loved ones",
      icon: <Users className="h-6 w-6" />,
    },
    {
      id: "business",
      title: "Business Retreat",
      amharicTitle: "የንግድ ዕረፍት",
      description: "Team building and corporate experiences",
      icon: <Briefcase className="h-6 w-6" />,
    },
    {
      id: "cultural",
      title: "Cultural Explorer",
      amharicTitle: "የባህል አስሳሽ",
      description: "Immerse yourself in Ethiopian heritage",
      icon: <Landmark className="h-6 w-6" />,
    },
  ]

  const handleNext = () => {
    if (step < steps.length - 1) {
      setStep(step + 1)
    } else {
      onComplete()
    }
  }

  const handleSelectJourney = (id: string) => {
    setJourneyType(id)
  }

  const handleComplete = () => {
    if (journeyType) {
      onComplete()
    }
  }

  return (
    <div className="fixed inset-0 z-50 bg-kuriftu-brown flex flex-col">
      <div className="absolute inset-0 bg-ethiopian-pattern opacity-10 pointer-events-none" />

      <div className="flex-1 flex flex-col">
        <div className="flex-1 flex items-center justify-center p-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.5 }}
              className="w-full max-w-md"
            >
              {!steps[step].isJourneySelector ? (
                <>
                  <div
                    className={`mx-auto h-24 w-24 rounded-full ${steps[step].color} flex items-center justify-center mb-6`}
                  >
                    {steps[step].icon}
                  </div>

                  <h1 className="font-serif text-3xl font-bold text-white text-center mb-2">{steps[step].title}</h1>
                  <p className="font-amharic text-lg text-kuriftu-gold text-center mb-4">{steps[step].amharicTitle}</p>
                  <p className="text-white/70 text-center mb-8">{steps[step].description}</p>
                </>
              ) : (
                <>
                  <div
                    className={`mx-auto h-24 w-24 rounded-full ${steps[step].color} flex items-center justify-center mb-6`}
                  >
                    {steps[step].icon}
                  </div>

                  <h1 className="font-serif text-3xl font-bold text-white text-center mb-2">{steps[step].title}</h1>
                  <p className="font-amharic text-lg text-kuriftu-gold text-center mb-4">{steps[step].amharicTitle}</p>
                  <p className="text-white/70 text-center mb-8">{steps[step].description}</p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {journeyTypes.map((journey) => (
                      <motion.div
                        key={journey.id}
                        className={`relative p-6 rounded-xl border cursor-pointer transition-all duration-300 ${
                          journeyType === journey.id
                            ? "border-kuriftu-gold bg-white/10 shadow-md"
                            : "border-white/10 bg-white/5 hover:border-white/30"
                        }`}
                        whileHover={{ y: -5 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => handleSelectJourney(journey.id)}
                      >
                        <div className="flex items-start gap-4">
                          <div className="flex-shrink-0 h-12 w-12 rounded-full bg-kuriftu-brown text-white flex items-center justify-center">
                            {journey.icon}
                          </div>

                          <div>
                            <h3 className="font-serif text-lg font-medium text-white mb-1">{journey.title}</h3>
                            <p className="text-xs font-amharic text-kuriftu-gold mb-1">{journey.amharicTitle}</p>
                            <p className="text-sm text-white/70">{journey.description}</p>
                          </div>
                        </div>

                        {journeyType === journey.id && (
                          <motion.div
                            className="absolute top-3 right-3 h-4 w-4 rounded-full bg-kuriftu-gold"
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ type: "spring", stiffness: 500, damping: 30 }}
                          />
                        )}
                      </motion.div>
                    ))}
                  </div>
                </>
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="p-6">
          <div className="flex justify-center mb-8">
            {steps.map((_, index) => (
              <div
                key={index}
                className={`h-2 w-2 rounded-full mx-1 ${index === step ? "bg-kuriftu-gold" : "bg-white/30"}`}
              />
            ))}
          </div>

          <div className="flex flex-col gap-3">
            {!steps[step].isJourneySelector ? (
              <Button
                onClick={handleNext}
                className="w-full bg-kuriftu-gold hover:bg-kuriftu-gold/90 text-kuriftu-brown"
              >
                {step < steps.length - 1 ? "Next" : "Get Started"}
                <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            ) : (
              <Button
                onClick={handleComplete}
                disabled={!journeyType}
                className="w-full bg-kuriftu-gold hover:bg-kuriftu-gold/90 text-kuriftu-brown disabled:opacity-50"
              >
                Begin Your Journey
                <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
