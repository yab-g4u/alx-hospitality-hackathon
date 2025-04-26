"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { Coffee, ChevronRight, Sparkles, Award, MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function Welcome() {
  const router = useRouter()
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simulate loading assets
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 2000)

    return () => clearTimeout(timer)
  }, [])

  const slides = [
    {
      title: "Welcome to Kuriftu Loyalty",
      description: "Your luxury journey through Ethiopia's finest resorts, stamped and rewarded.",
      icon: <Coffee className="h-12 w-12" />,
      color: "bg-kuriftu-gold text-kuriftu-brown",
    },
    {
      title: "Earn Essence Points™",
      description: "Collect points with every stay, spa visit, dining experience, and cultural tour.",
      icon: <Sparkles className="h-12 w-12" />,
      color: "bg-kuriftu-green text-white",
    },
    {
      title: "Digital Journey Passport",
      description: "Collect digital stamps and badges that showcase your Kuriftu experiences.",
      icon: <Award className="h-12 w-12" />,
      color: "bg-kuriftu-terracotta text-white",
    },
    {
      title: "Explore Ethiopia's Finest",
      description: "From Lake Tana to Entoto Mountain, discover the beauty of Ethiopia with Kuriftu.",
      icon: <MapPin className="h-12 w-12" />,
      color: "bg-kuriftu-brown text-white",
    },
  ]

  const handleNext = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(currentSlide + 1)
    } else {
      router.push("/auth/sign-in")
    }
  }

  const handleSkip = () => {
    router.push("/auth/sign-in")
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-kuriftu-brown flex flex-col items-center justify-center">
        <div className="relative">
          <div className="h-24 w-24 rounded-full bg-white flex items-center justify-center">
            <Coffee className="h-12 w-12 text-kuriftu-gold" />
          </div>
          <div className="absolute -bottom-2 -right-2 h-8 w-8 rounded-full bg-kuriftu-gold animate-pulse" />
        </div>
        <h1 className="mt-6 font-serif text-3xl font-bold text-white">Kuriftu</h1>
        <p className="mt-2 text-white/70">Luxury & Membership</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-kuriftu-brown flex flex-col">
      <div className="absolute inset-0 bg-ethiopian-pattern opacity-10 pointer-events-none" />

      <div className="flex-1 flex flex-col">
        <div className="flex-1 flex items-center justify-center p-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.5 }}
              className="w-full max-w-md"
            >
              <div
                className={`mx-auto h-24 w-24 rounded-full ${slides[currentSlide].color} flex items-center justify-center mb-6`}
              >
                {slides[currentSlide].icon}
              </div>

              <h1 className="font-serif text-3xl font-bold text-white text-center mb-4">
                {slides[currentSlide].title}
              </h1>
              <p className="text-white/70 text-center mb-8">{slides[currentSlide].description}</p>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="p-6">
          <div className="flex justify-center mb-8">
            {slides.map((_, index) => (
              <div
                key={index}
                className={`h-2 w-2 rounded-full mx-1 ${index === currentSlide ? "bg-kuriftu-gold" : "bg-white/30"}`}
              />
            ))}
          </div>

          <div className="flex flex-col gap-3">
            <Button onClick={handleNext} className="w-full bg-kuriftu-gold hover:bg-kuriftu-gold/90 text-kuriftu-brown">
              {currentSlide < slides.length - 1 ? "Next" : "Get Started"}
              <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
            {currentSlide < slides.length - 1 && (
              <Button variant="ghost" onClick={handleSkip} className="text-white/70 hover:text-white">
                Skip
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
