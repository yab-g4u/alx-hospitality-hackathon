"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  Map,
  Share2,
  Lock,
  X,
  ChevronLeft,
  ChevronRight,
  Utensils,
  Users,
  Calendar,
  Heart,
  Star,
  Landmark,
  Coffee,
  Sparkles,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Stamp } from "@/components/stamp"
import { cn } from "@/lib/utils"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

// Types for our passport system
type StampType = {
  id: string
  title: string
  amharicTitle: string
  location: string
  date: string
  icon: React.ElementType
  description: string
  unlocked: boolean
  image?: string
  culturalNote?: string
}

type BadgeType = {
  id: string
  title: string
  amharicTitle: string
  description: string
  icon: React.ElementType
  unlocked: boolean
  requiredStamps: string[]
}

type UserPassportInfo = {
  name: string
  amharicName?: string
  photo?: string
  hometown?: string
  journeyStartDate: string
  tier: "Explorer" | "Pathfinder" | "Heritage Seeker" | "Cultural Nomad" | "Kuriftu Ambassador"
  essencePoints: number
  completedJourneys: number
  totalVisits: number
}

// Sample data - in a real app, this would come from an API
const sampleStamps: StampType[] = [
  {
    id: "resort-stay",
    title: "Lake Tana Retreat",
    amharicTitle: "የጣና ሐይቅ መዝናኛ",
    location: "Kuriftu Resort & Spa, Bahir Dar",
    date: "2023-10-15",
    icon: Landmark,
    description: "Your first stay at our flagship resort by the sacred waters of Lake Tana.",
    unlocked: true,
    culturalNote: "Lake Tana is the source of the Blue Nile and home to ancient island monasteries.",
  },
  {
    id: "spa-visit",
    title: "Healing Waters",
    amharicTitle: "የፈውስ ውሃዎች",
    location: "Kuriftu Spa, Addis Ababa",
    date: "2023-11-02",
    icon: Heart,
    description: "Rejuvenation through traditional Ethiopian spa treatments.",
    unlocked: true,
    culturalNote: "Our treatments incorporate ancient Ethiopian healing practices passed down through generations.",
  },
  {
    id: "dining",
    title: "Taste of Ethiopia",
    amharicTitle: "የኢትዮጵያ ጣዕም",
    location: "Kuriftu Restaurant, Bishoftu",
    date: "2023-12-10",
    icon: Utensils,
    description: "A culinary journey through Ethiopia's diverse flavors.",
    unlocked: true,
    culturalNote: "Ethiopian cuisine is known for its unique spices and communal dining traditions.",
  },
  {
    id: "coffee-ceremony",
    title: "Coffee Origins",
    amharicTitle: "የቡና ምንጮች",
    location: "Kuriftu Cultural Center",
    date: "2024-01-05",
    icon: Coffee,
    description: "Participated in a traditional Ethiopian coffee ceremony.",
    unlocked: false,
    culturalNote: "Coffee was discovered in Ethiopia, and the ceremony is a vital part of Ethiopian hospitality.",
  },
  {
    id: "group-event",
    title: "Timket Festival",
    amharicTitle: "ጥምቀት በዓል",
    location: "Kuriftu Resort, Gondar",
    date: "2024-01-19",
    icon: Users,
    description: "Celebrated the Ethiopian Epiphany with traditional festivities.",
    unlocked: false,
    culturalNote:
      "Timket celebrates the baptism of Jesus in the Jordan River and is one of Ethiopia's most colorful festivals.",
  },
  {
    id: "cultural-tour",
    title: "Heritage Journey",
    amharicTitle: "የቅርስ ጉዞ",
    location: "Lalibela",
    date: "2024-02-20",
    icon: Map,
    description: "Explored the ancient rock-hewn churches of Lalibela.",
    unlocked: false,
    culturalNote:
      "Lalibela's churches were carved from single pieces of rock in the 12th century and are a UNESCO World Heritage site.",
  },
]

const sampleBadges: BadgeType[] = [
  {
    id: "first-visit",
    title: "First Steps",
    amharicTitle: "የመጀመሪያ እርምጃዎች",
    description: "Completed your first Kuriftu experience",
    icon: Sparkles,
    unlocked: true,
    requiredStamps: ["resort-stay"],
  },
  {
    id: "wellness-seeker",
    title: "Wellness Seeker",
    amharicTitle: "የጤንነት ፈላጊ",
    description: "Experienced both our resort stay and spa treatments",
    icon: Heart,
    unlocked: true,
    requiredStamps: ["resort-stay", "spa-visit"],
  },
  {
    id: "culinary-explorer",
    title: "Culinary Explorer",
    amharicTitle: "የምግብ አስሳሽ",
    description: "Savored the flavors of Ethiopia at our restaurants",
    icon: Star,
    unlocked: true,
    requiredStamps: ["dining"],
  },
  {
    id: "cultural-enthusiast",
    title: "Cultural Enthusiast",
    amharicTitle: "የባህል ወዳጅ",
    description: "Participated in Ethiopian cultural experiences",
    icon: Calendar,
    unlocked: false,
    requiredStamps: ["coffee-ceremony", "cultural-tour"],
  },
]

const userInfo: UserPassportInfo = {
  name: "Abebe Bikila",
  amharicName: "አበበ ቢቂላ",
  journeyStartDate: "2023-10-15",
  tier: "Pathfinder",
  essencePoints: 175,
  completedJourneys: 3,
  totalVisits: 5,
}

// Tier thresholds for progress calculation
const tierThresholds = {
  Explorer: { min: 0, max: 99 },
  Pathfinder: { min: 100, max: 249 },
  "Heritage Seeker": { min: 250, max: 499 },
  "Cultural Nomad": { min: 500, max: 899 },
  "Kuriftu Ambassador": { min: 900, max: 1500 },
}

// First-time passport setup component
function FirstTimePassportSetup({
  onComplete,
  onClose,
}: {
  onComplete: (data: Partial<UserPassportInfo>) => void
  onClose: () => void
}) {
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    name: "",
    amharicName: "",
    hometown: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const nextStep = () => {
    if (step < 3) {
      setStep((prev) => prev + 1)
    } else {
      onComplete({
        name: formData.name,
        amharicName: formData.amharicName,
        hometown: formData.hometown,
        journeyStartDate: new Date().toISOString().split("T")[0],
        tier: "Explorer",
        essencePoints: 10,
        completedJourneys: 0,
        totalVisits: 1,
      })
    }
  }

  const prevStep = () => {
    if (step > 1) {
      setStep((prev) => prev - 1)
    }
  }

  return (
    <Card className="relative overflow-hidden bg-amber-50 border-amber-200 shadow-lg max-w-3xl mx-auto">
      <Button
        variant="ghost"
        size="icon"
        className="absolute top-2 right-2 z-10 text-amber-800 hover:bg-amber-200/50"
        onClick={onClose}
      >
        <X className="h-5 w-5" />
      </Button>

      <div className="flex justify-between items-center p-4 bg-gradient-to-r from-amber-700 to-amber-600 text-white">
        <h2 className="text-xl font-bold">Welcome to Your Kuriftu Journey Passport™</h2>
      </div>

      <div className="p-6 min-h-[500px] flex flex-col">
        <div className="flex justify-between mb-6">
          {[1, 2, 3].map((i) => (
            <div key={i} className={cn("w-1/3 h-2 rounded-full", i <= step ? "bg-amber-600" : "bg-amber-200")} />
          ))}
        </div>

        <div className="flex-1">
          {step === 1 && (
            <div className="space-y-6">
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-amber-800 mb-2">Let's Create Your Passport</h3>
                <p className="text-amber-700">Tell us a bit about yourself to begin your cultural journey</p>
              </div>

              <div className="space-y-4">
                <div>
                  <Label htmlFor="name">Your Name</Label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter your name"
                    className="border-amber-300 focus:ring-amber-500"
                  />
                </div>

                <div>
                  <Label htmlFor="amharicName">
                    Your Name in Amharic (Optional)
                    <span className="text-xs text-amber-600 ml-2">የእርስዎ ስም በአማርኛ</span>
                  </Label>
                  <Input
                    id="amharicName"
                    name="amharicName"
                    value={formData.amharicName}
                    onChange={handleChange}
                    placeholder="Enter your name in Amharic (optional)"
                    className="border-amber-300 focus:ring-amber-500"
                  />
                </div>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-6">
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-amber-800 mb-2">Your Journey Details</h3>
                <p className="text-amber-700">Help us personalize your Kuriftu experience</p>
              </div>

              <div className="space-y-4">
                <div>
                  <Label htmlFor="hometown">Your Hometown</Label>
                  <Input
                    id="hometown"
                    name="hometown"
                    value={formData.hometown}
                    onChange={handleChange}
                    placeholder="Where are you from?"
                    className="border-amber-300 focus:ring-amber-500"
                  />
                </div>

                <div className="bg-amber-100 p-4 rounded-lg border border-amber-200">
                  <p className="text-sm text-amber-800 font-semibold mb-1">Your Journey Begins Today</p>
                  <p className="text-sm">
                    Your Kuriftu passport will be stamped with today's date as the start of your cultural journey with
                    us.
                  </p>
                </div>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-6">
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-amber-800 mb-2">Ready to Begin</h3>
                <p className="text-amber-700">Your Kuriftu Journey Passport is ready to be stamped</p>
              </div>

              <div className="bg-amber-100 p-6 rounded-lg border border-amber-200 text-center">
                <div className="w-24 h-24 mx-auto mb-4 bg-amber-600 rounded-full flex items-center justify-center">
                  <Sparkles className="w-12 h-12 text-white" />
                </div>
                <p className="text-lg font-semibold text-amber-800 mb-2">Welcome, {formData.name}!</p>
                <p className="text-amber-700 mb-4">You've earned 10 Essence Points for creating your passport.</p>
                <Badge className="bg-amber-600 hover:bg-amber-700 text-white">Explorer Tier</Badge>
              </div>
            </div>
          )}
        </div>

        <div className="flex justify-between mt-6 pt-4 border-t border-amber-200">
          {step > 1 ? (
            <Button variant="outline" onClick={prevStep} className="border-amber-300 text-amber-700 hover:bg-amber-50">
              <ChevronLeft className="h-4 w-4 mr-1" />
              Back
            </Button>
          ) : (
            <div></div>
          )}

          <Button onClick={nextStep} className="bg-amber-600 hover:bg-amber-700 text-white">
            {step === 3 ? "Complete Setup" : "Continue"}
            {step < 3 && <ChevronRight className="h-4 w-4 ml-1" />}
          </Button>
        </div>
      </div>
    </Card>
  )
}

export function EnhancedJourneyPassport() {
  const [currentPage, setCurrentPage] = useState(0)
  const [isOpen, setIsOpen] = useState(true)
  const [showShareModal, setShowShareModal] = useState(false)
  const [isFirstTime, setIsFirstTime] = useState(false)
  const [userPassportInfo, setUserPassportInfo] = useState<UserPassportInfo | null>(null)
  const [stamps, setStamps] = useState<StampType[]>([])
  const [badges, setBadges] = useState<BadgeType[]>([])
  const [showStampAnimation, setShowStampAnimation] = useState(false)
  const [newStamp, setNewStamp] = useState<StampType | null>(null)
  const [isSecurityEnabled, setIsSecurityEnabled] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  const passportRef = useRef<HTMLDivElement>(null)

  // Simulate loading data
  useEffect(() => {
    const timer = setTimeout(() => {
      setUserPassportInfo(userInfo)
      setStamps(sampleStamps)
      setBadges(sampleBadges)
      setIsLoading(false)

      // Check if it's the user's first time
      const isFirstTimeUser = localStorage.getItem("kuriftu_first_visit") === null
      setIsFirstTime(isFirstTimeUser)

      if (isFirstTimeUser) {
        // Show the stamp animation for first-time users
        setTimeout(() => {
          setNewStamp(sampleStamps[0])
          setShowStampAnimation(true)
          localStorage.setItem("kuriftu_first_visit", "completed")
        }, 1000)
      }
    }, 1500)

    return () => clearTimeout(timer)
  }, [])

  // Calculate progress to next tier
  const calculateTierProgress = () => {
    if (!userPassportInfo) return 0

    const currentTier = userPassportInfo.tier
    const currentPoints = userPassportInfo.essencePoints
    const { min, max } = tierThresholds[currentTier]

    return Math.round(((currentPoints - min) / (max - min)) * 100)
  }

  // Get next tier
  const getNextTier = () => {
    if (!userPassportInfo) return ""

    const tiers = Object.keys(tierThresholds)
    const currentTierIndex = tiers.indexOf(userPassportInfo.tier)

    if (currentTierIndex < tiers.length - 1) {
      return tiers[currentTierIndex + 1]
    }

    return "Maximum Tier"
  }

  // Points needed for next tier
  const pointsForNextTier = () => {
    if (!userPassportInfo) return 0

    const nextTier = getNextTier()
    if (nextTier === "Maximum Tier") return 0

    return tierThresholds[nextTier as keyof typeof tierThresholds].min - userPassportInfo.essencePoints
  }

  // Handle page turning
  const turnPage = (direction: "next" | "prev") => {
    const totalPages = stamps.length + 2 // Cover + user info + stamps

    if (direction === "next" && currentPage < totalPages - 1) {
      setCurrentPage((prev) => prev + 1)
    } else if (direction === "prev" && currentPage > 0) {
      setCurrentPage((prev) => prev - 1)
    }
  }

  // Handle sharing
  const handleShare = () => {
    setShowShareModal(true)
  }

  // Close the passport
  const handleClose = () => {
    setIsOpen(false)
  }

  // Complete first-time setup
  const completeFirstTimeSetup = (data: Partial<UserPassportInfo>) => {
    setUserPassportInfo((prev) => (prev ? { ...prev, ...data } : null))
    setIsFirstTime(false)
    setShowStampAnimation(true)
    setNewStamp(stamps[0])
  }

  // Toggle security
  const toggleSecurity = () => {
    setIsSecurityEnabled((prev) => !prev)
  }

  // Handle stamp animation completion
  const handleStampAnimationComplete = () => {
    setShowStampAnimation(false)
    setNewStamp(null)
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="flex flex-col items-center gap-4">
          <div className="relative w-32 h-32">
            <div className="absolute inset-0 border-8 border-amber-600 rounded-lg animate-pulse"></div>
            <div className="absolute inset-2 bg-amber-100 rounded-md"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <Sparkles className="w-16 h-16 text-amber-600 animate-bounce" />
            </div>
          </div>
          <p className="text-lg font-semibold text-amber-800">Loading your Journey Passport...</p>
        </div>
      </div>
    )
  }

  if (!isOpen) {
    return (
      <Button onClick={() => setIsOpen(true)} className="bg-amber-600 hover:bg-amber-700 text-white">
        Open Journey Passport
      </Button>
    )
  }

  if (isFirstTime) {
    return <FirstTimePassportSetup onComplete={completeFirstTimeSetup} onClose={handleClose} />
  }

  return (
    <div className="relative">
      <Card className="relative overflow-hidden bg-amber-50 border-amber-200 shadow-lg max-w-3xl mx-auto">
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-2 right-2 z-10 text-amber-800 hover:bg-amber-200/50"
          onClick={handleClose}
        >
          <X className="h-5 w-5" />
        </Button>

        <div className="flex justify-between items-center p-4 bg-gradient-to-r from-amber-700 to-amber-600 text-white">
          <h2 className="text-xl font-bold">Kuriftu Journey Passport™</h2>
          <div className="flex gap-2">
            <Button variant="ghost" size="icon" className="text-white hover:bg-amber-500/50" onClick={handleShare}>
              <Share2 className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" className="text-white hover:bg-amber-500/50" onClick={toggleSecurity}>
              <Lock className="h-5 w-5" />
            </Button>
          </div>
        </div>

        <div ref={passportRef} className="relative flex flex-col min-h-[600px] p-6">
          {/* Passport pages */}
          <div className="relative flex-1 overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentPage}
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.3 }}
                className="absolute inset-0"
              >
                {/* Cover page */}
                {currentPage === 0 && (
                  <div className="flex flex-col items-center justify-center h-full bg-[url('/patterns/ethiopian-pattern.svg')] bg-repeat bg-amber-100 p-8 rounded-lg border-4 border-amber-600">
                    <div className="bg-white/90 p-8 rounded-lg shadow-lg text-center">
                      <h1 className="text-3xl font-bold text-amber-800 mb-2">የኩሪፍቱ ጉዞ ፓስፖርት</h1>
                      <h2 className="text-2xl font-semibold text-amber-700 mb-6">Kuriftu Journey Passport</h2>
                      <div className="w-32 h-32 mx-auto mb-6 bg-amber-600 rounded-full flex items-center justify-center">
                        <Landmark className="w-16 h-16 text-white" />
                      </div>
                      <p className="text-amber-800 mb-4">Your personal journey through Ethiopian culture and luxury</p>
                      <Badge className="bg-amber-600 hover:bg-amber-700 text-white">
                        {userPassportInfo?.tier} Tier
                      </Badge>
                    </div>
                  </div>
                )}

                {/* User info page */}
                {currentPage === 1 && userPassportInfo && (
                  <div className="flex flex-col h-full p-6 bg-amber-50">
                    <h2 className="text-2xl font-bold text-amber-800 mb-4">Personal Information</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <div>
                          <p className="text-sm text-amber-600">Name / ስም</p>
                          <p className="text-lg font-semibold">{userPassportInfo.name}</p>
                          <p className="text-md">{userPassportInfo.amharicName}</p>
                        </div>

                        <div>
                          <p className="text-sm text-amber-600">Journey Started / ጉዞ የተጀመረበት</p>
                          <p className="font-semibold">
                            {new Date(userPassportInfo.journeyStartDate).toLocaleDateString("en-US", {
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                            })}
                          </p>
                        </div>

                        <div>
                          <p className="text-sm text-amber-600">Current Tier / የአሁኑ ደረጃ</p>
                          <div className="flex items-center gap-2">
                            <Badge className="bg-amber-600 hover:bg-amber-700 text-white">
                              {userPassportInfo.tier}
                            </Badge>
                            <span className="text-sm text-amber-700">
                              {pointsForNextTier()} points to {getNextTier()}
                            </span>
                          </div>
                          <div className="mt-2">
                            <Progress value={calculateTierProgress()} className="h-2 bg-amber-200" />
                          </div>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <div>
                          <p className="text-sm text-amber-600">Essence Points / የመንፈስ ነጥቦች</p>
                          <div className="flex items-center gap-2">
                            <Sparkles className="h-5 w-5 text-amber-600" />
                            <p className="text-2xl font-bold text-amber-800">{userPassportInfo.essencePoints}</p>
                          </div>
                        </div>

                        <div>
                          <p className="text-sm text-amber-600">Journeys Completed / የተጠናቀቁ ጉዞዎች</p>
                          <p className="text-xl font-semibold">{userPassportInfo.completedJourneys}</p>
                        </div>

                        <div>
                          <p className="text-sm text-amber-600">Total Visits / ጠቅላላ ጉብኝቶች</p>
                          <p className="text-xl font-semibold">{userPassportInfo.totalVisits}</p>
                        </div>

                        <div>
                          <p className="text-sm text-amber-600">Badges Earned / ያገኙት ባጆች</p>
                          <div className="flex flex-wrap gap-2 mt-1">
                            {badges
                              .filter((badge) => badge.unlocked)
                              .map((badge) => (
                                <div key={badge.id} className="relative group">
                                  <div className="w-8 h-8 rounded-full bg-amber-600 flex items-center justify-center">
                                    <badge.icon className="h-5 w-5 text-white" />
                                  </div>
                                  <div className="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 hidden group-hover:block bg-white p-2 rounded shadow-lg text-xs w-32 text-center z-10">
                                    <p className="font-semibold">{badge.title}</p>
                                    <p className="text-amber-600">{badge.amharicTitle}</p>
                                  </div>
                                </div>
                              ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Stamp pages */}
                {currentPage > 1 && stamps[currentPage - 2] && (
                  <div className="flex flex-col h-full p-6 bg-amber-50">
                    <div className="flex-1 flex flex-col">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h2 className="text-2xl font-bold text-amber-800">{stamps[currentPage - 2].title}</h2>
                          <p className="text-lg text-amber-700">{stamps[currentPage - 2].amharicTitle}</p>
                        </div>
                        <Badge
                          className={cn(
                            "text-white",
                            stamps[currentPage - 2].unlocked
                              ? "bg-green-600 hover:bg-green-700"
                              : "bg-gray-400 hover:bg-gray-500",
                          )}
                        >
                          {stamps[currentPage - 2].unlocked ? "Unlocked" : "Locked"}
                        </Badge>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 flex-1">
                        <div className="space-y-4">
                          <div>
                            <p className="text-sm text-amber-600">Location / ቦታ</p>
                            <p className="font-semibold">{stamps[currentPage - 2].location}</p>
                          </div>

                          <div>
                            <p className="text-sm text-amber-600">Date / ቀን</p>
                            <p className="font-semibold">
                              {stamps[currentPage - 2].unlocked
                                ? new Date(stamps[currentPage - 2].date).toLocaleDateString("en-US", {
                                    year: "numeric",
                                    month: "long",
                                    day: "numeric",
                                  })
                                : "Not yet visited"}
                            </p>
                          </div>

                          <div>
                            <p className="text-sm text-amber-600">Description / መግለጫ</p>
                            <p>{stamps[currentPage - 2].description}</p>
                          </div>

                          {stamps[currentPage - 2].culturalNote && (
                            <div className="bg-amber-100 p-3 rounded-lg border border-amber-200">
                              <p className="text-sm text-amber-800 font-semibold mb-1">Cultural Note / የባህል ማስታወሻ</p>
                              <p className="text-sm">{stamps[currentPage - 2].culturalNote}</p>
                            </div>
                          )}
                        </div>

                        <div className="flex items-center justify-center">
                          {stamps[currentPage - 2].unlocked ? (
                            <div className="relative">
                              <Stamp
                                icon={stamps[currentPage - 2].icon}
                                text={stamps[currentPage - 2].title}
                                subtext={new Date(stamps[currentPage - 2].date).toLocaleDateString("en-US", {
                                  year: "numeric",
                                  month: "short",
                                  day: "numeric",
                                })}
                                color="amber"
                                size="lg"
                              />
                              <Button
                                variant="outline"
                                size="sm"
                                className="absolute bottom-0 right-0 text-xs bg-white border-amber-300 text-amber-700 hover:bg-amber-50"
                                onClick={handleShare}
                              >
                                <Share2 className="h-3 w-3 mr-1" />
                                Share
                              </Button>
                            </div>
                          ) : (
                            <div className="text-center p-6 border-2 border-dashed border-gray-300 rounded-lg">
                              <Lock className="h-12 w-12 mx-auto text-gray-400 mb-2" />
                              <p className="text-gray-500">
                                Visit {stamps[currentPage - 2].location} to unlock this stamp
                              </p>
                              <Button variant="outline" size="sm" className="mt-4 text-xs">
                                Book Now
                              </Button>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation controls */}
          <div className="flex justify-between items-center mt-4 pt-4 border-t border-amber-200">
            <Button
              variant="outline"
              size="sm"
              onClick={() => turnPage("prev")}
              disabled={currentPage === 0}
              className="border-amber-300 text-amber-700 hover:bg-amber-50"
            >
              <ChevronLeft className="h-4 w-4 mr-1" />
              Previous
            </Button>

            <div className="text-sm text-amber-600">
              Page {currentPage + 1} of {stamps.length + 2}
            </div>

            <Button
              variant="outline"
              size="sm"
              onClick={() => turnPage("next")}
              disabled={currentPage === stamps.length + 1}
              className="border-amber-300 text-amber-700 hover:bg-amber-50"
            >
              Next
              <ChevronRight className="h-4 w-4 ml-1" />
            </Button>
          </div>
        </div>
      </Card>

      {/* Stamp animation overlay */}
      <AnimatePresence>
        {showStampAnimation && newStamp && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/70 flex items-center justify-center z-50"
            onClick={handleStampAnimationComplete}
          >
            <motion.div
              initial={{ scale: 0.5, rotate: -20 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{
                type: "spring",
                stiffness: 300,
                damping: 15,
                delay: 0.2,
              }}
              className="relative"
              onClick={(e) => e.stopPropagation()}
            >
              <Stamp
                icon={newStamp.icon}
                text={newStamp.title}
                subtext={new Date(newStamp.date).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                })}
                color="amber"
                size="xl"
              />
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1 }}
                className="absolute -bottom-16 left-1/2 transform -translate-x-1/2 text-center"
              >
                <p className="text-white text-lg font-semibold mb-2">Stamp Collected!</p>
                <Button onClick={handleStampAnimationComplete} className="bg-amber-600 hover:bg-amber-700 text-white">
                  Continue Your Journey
                </Button>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Share modal */}
      <AnimatePresence>
        {showShareModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/70 flex items-center justify-center z-50"
            onClick={() => setShowShareModal(false)}
          >
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 50, opacity: 0 }}
              className="bg-white rounded-lg p-6 max-w-md w-full mx-4"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold text-amber-800">Share Your Journey</h3>
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-gray-500 hover:bg-gray-100"
                  onClick={() => setShowShareModal(false)}
                >
                  <X className="h-5 w-5" />
                </Button>
              </div>

              <div className="space-y-4">
                <div className="bg-amber-50 p-4 rounded-lg border border-amber-200">
                  <p className="text-sm text-amber-700 mb-2">Preview</p>
                  <div className="flex items-center gap-4">
                    <div className="relative">
                      <Stamp
                        icon={
                          currentPage > 1 && stamps[currentPage - 2]?.unlocked ? stamps[currentPage - 2].icon : Landmark
                        }
                        text={
                          currentPage > 1 && stamps[currentPage - 2]?.unlocked
                            ? stamps[currentPage - 2].title
                            : "Kuriftu Journey"
                        }
                        subtext="Shared via Kuriftu App"
                        color="amber"
                        size="md"
                      />
                      <div className="absolute -bottom-1 -right-1 bg-white rounded-full p-1 shadow-sm">
                        <div className="w-5 h-5 rounded-full bg-amber-600 flex items-center justify-center">
                          <Sparkles className="h-3 w-3 text-white" />
                        </div>
                      </div>
                    </div>
                    <div>
                      <p className="font-semibold">I'm on a cultural journey with Kuriftu!</p>
                      <p className="text-sm text-gray-600">
                        {userPassportInfo?.tier} tier with {userPassportInfo?.essencePoints} Essence Points
                      </p>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <p className="text-sm font-medium text-gray-700">Share to</p>
                  <div className="flex gap-2">
                    <Button variant="outline" className="flex-1 gap-2">
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="#1877F2">
                        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                      </svg>
                      Facebook
                    </Button>
                    <Button variant="outline" className="flex-1 gap-2">
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="#1DA1F2">
                        <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723 10.054 10.054 0 01-3.127 1.184 4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                      </svg>
                      Twitter
                    </Button>
                    <Button variant="outline" className="flex-1 gap-2">
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="#E4405F">
                        <path d="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.899 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.379-.899-.421-.419-.69-.824-.9-1.38-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03zm0 3.678c-3.405 0-6.162 2.76-6.162 6.162 0 3.405 2.76 6.162 6.162 6.162 3.405 0 6.162-2.76 6.162-6.162 0-3.405-2.76-6.162-6.162-6.162zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm7.846-10.405c0 .795-.646 1.44-1.44 1.44-.795 0-1.44-.646-1.44-1.44 0-.794.646-1.439 1.44-1.439.793-.001 1.44.645 1.44 1.439z" />
                      </svg>
                      Instagram
                    </Button>
                  </div>
                </div>

                <div>
                  <Label htmlFor="share-message">Add a message (optional)</Label>
                  <Textarea
                    id="share-message"
                    placeholder="Share your thoughts about your Kuriftu experience..."
                    className="mt-1 border-amber-300 focus:ring-amber-500"
                  />
                </div>

                <Button className="w-full bg-amber-600 hover:bg-amber-700 text-white">Share Now</Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Security overlay */}
      <AnimatePresence>
        {isSecurityEnabled && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-40"
            onClick={() => setIsSecurityEnabled(false)}
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              className="bg-white p-6 rounded-lg max-w-sm text-center"
              onClick={(e) => e.stopPropagation()}
            >
              <Lock className="h-12 w-12 mx-auto text-amber-600 mb-4" />
              <h3 className="text-xl font-bold text-amber-800 mb-2">Passport Protected</h3>
              <p className="text-gray-600 mb-4">Your Journey Passport is now in secure mode. Tap anywhere to unlock.</p>
              <Button
                onClick={() => setIsSecurityEnabled(false)}
                className="bg-amber-600 hover:bg-amber-700 text-white"
              >
                Unlock Passport
              </Button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
