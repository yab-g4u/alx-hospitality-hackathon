"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { useRouter } from "next/navigation"
import { JourneySelector } from "@/components/journey-selector"

export function Onboarding() {
  const router = useRouter()
  const [step, setStep] = useState(1)

  const handleJourneySelect = (journeyId: string) => {
    // In a real app, you would save this to state/context/backend
    console.log("Selected journey:", journeyId)
    setStep(2)

    // Simulate loading and redirect to dashboard
    setTimeout(() => {
      router.push("/dashboard")
    }, 1500)
  }

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center bg-cover bg-center p-4"
      style={{
        backgroundImage:
          "linear-gradient(rgba(90, 62, 54, 0.7), rgba(90, 62, 54, 0.7)), url('/placeholder.svg?height=1080&width=1920')",
      }}
    >
      <motion.div
        className="w-full max-w-2xl glass-card rounded-2xl p-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="text-center mb-8">
          <h1 className="font-serif text-4xl font-bold text-brown mb-2">Kuriftu Loyalty</h1>
          <p className="text-lg text-muted-foreground">Your Luxury Journey, Stamped</p>
        </div>

        {step === 1 && <JourneySelector onSelect={handleJourneySelect} />}

        {step === 2 && (
          <div className="text-center py-8">
            <div
              className="inline-block h-12 w-12 animate-spin rounded-full border-4 border-solid border-gold border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
              role="status"
            >
              <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
                Loading...
              </span>
            </div>
            <p className="mt-4 text-lg text-brown">Preparing your journey...</p>
          </div>
        )}
      </motion.div>
    </div>
  )
}

export default Onboarding
