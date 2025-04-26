"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import {
  Sparkles,
  TrendingUp,
  Gift,
  Award,
  Clock,
  CreditCard,
  Coffee,
  Utensils,
  Landmark,
  Heart,
  Share2,
  MessageSquare,
  UserPlus,
  Crown,
  Check,
  Compass,
  Globe,
  Map,
} from "lucide-react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { cn } from "@/lib/utils"

// Types for our essence system
type EssenceAction = {
  id: string
  title: string
  description: string
  points: number
  icon: React.ElementType
  category: "booking" | "engagement" | "referral" | "premium"
  completed: boolean
  date?: string
}

type EssenceReward = {
  id: string
  title: string
  description: string
  pointsCost: number
  icon: React.ElementType
  category: "experience" | "item" | "discount" | "exclusive"
  available: boolean
}

type TierInfo = {
  name: string
  amharicName: string
  minPoints: number
  maxPoints: number
  color: string
  benefits: string[]
}

// Sample data
const sampleActions: EssenceAction[] = [
  {
    id: "resort-booking",
    title: "Resort Stay",
    description: "Book a stay at any Kuriftu Resort",
    points: 100,
    icon: Landmark,
    category: "booking",
    completed: true,
    date: "2023-10-15",
  },
  {
    id: "spa-booking",
    title: "Spa Treatment",
    description: "Book a spa treatment",
    points: 50,
    icon: Heart,
    category: "booking",
    completed: true,
    date: "2023-11-02",
  },
  {
    id: "dining",
    title: "Fine Dining",
    description: "Dine at a Kuriftu restaurant",
    points: 30,
    icon: Utensils,
    category: "booking",
    completed: true,
    date: "2023-12-10",
  },
  {
    id: "share-passport",
    title: "Share Journey",
    description: "Share your Journey Passport on social media",
    points: 5,
    icon: Share2,
    category: "engagement",
    completed: false,
  },
  {
    id: "feedback",
    title: "Provide Feedback",
    description: "Give detailed feedback about your experience",
    points: 5,
    icon: MessageSquare,
    category: "engagement",
    completed: false,
  },
  {
    id: "refer-friend",
    title: "Refer a Friend",
    description: "Refer a friend who makes a booking",
    points: 20,
    icon: UserPlus,
    category: "referral",
    completed: false,
  },
  {
    id: "premium-subscription",
    title: "Premium Subscription",
    description: "Subscribe to Kuriftu Premium",
    points: 50,
    icon: Crown,
    category: "premium",
    completed: false,
  },
]

const sampleRewards: EssenceReward[] = [
  {
    id: "tote-bag",
    title: "Kuriftu Tote Bag",
    description: "Exclusive Kuriftu-branded tote bag",
    pointsCost: 50,
    icon: Gift,
    category: "item",
    available: true,
  },
  {
    id: "bike-rental",
    title: "1-Hour Bike Rental",
    description: "Free bike rental at any Kuriftu resort",
    pointsCost: 100,
    icon: Clock,
    category: "experience",
    available: true,
  },
  {
    id: "spa-discount",
    title: "20% Off Spa Booking",
    description: "Discount on your next spa treatment",
    pointsCost: 200,
    icon: CreditCard,
    category: "discount",
    available: true,
  },
  {
    id: "free-drink",
    title: "Free Local Drink",
    description: "Complimentary traditional Ethiopian drink",
    pointsCost: 300,
    icon: Coffee,
    category: "experience",
    available: true,
  },
  {
    id: "room-upgrade",
    title: "Room Upgrade",
    description: "Free upgrade to the next room category",
    pointsCost: 400,
    icon: TrendingUp,
    category: "exclusive",
    available: false,
  },
  {
    id: "experience-box",
    title: "Kuriftu Experience Box",
    description: "Limited edition box with Ethiopian treasures",
    pointsCost: 500,
    icon: Award,
    category: "exclusive",
    available: false,
  },
]

const tierInfo: Record<string, TierInfo> = {
  Explorer: {
    name: "Explorer",
    amharicName: "አስሳሽ",
    minPoints: 0,
    maxPoints: 99,
    color: "bg-gray-500",
    benefits: ["Access to Journey Passport", "1 free photo printable souvenir", "Basic booking privileges"],
  },
  Pathfinder: {
    name: "Pathfinder",
    amharicName: "መንገድ ፈላጊ",
    minPoints: 100,
    maxPoints: 249,
    color: "bg-amber-500",
    benefits: ["All Explorer benefits", "Free spa tea service", "Early event booking access", "10% off at gift shops"],
  },
  "Heritage Seeker": {
    name: "Heritage Seeker",
    amharicName: "የቅርስ ፈላጊ",
    minPoints: 250,
    maxPoints: 499,
    color: "bg-emerald-500",
    benefits: [
      "All Pathfinder benefits",
      "Room upgrade voucher (once per year)",
      "15% off merchandise",
      "Priority check-in",
    ],
  },
  "Cultural Nomad": {
    name: "Cultural Nomad",
    amharicName: "የባህል ተዘዋዋሪ",
    minPoints: 500,
    maxPoints: 899,
    color: "bg-blue-500",
    benefits: [
      "All Heritage Seeker benefits",
      "Invitations to private events",
      "Access to premium experiences",
      "Late checkout when available",
    ],
  },
  "Kuriftu Ambassador": {
    name: "Kuriftu Ambassador",
    amharicName: "የኩሪፍቱ አምባሳደር",
    minPoints: 900,
    maxPoints: 1500,
    color: "bg-purple-500",
    benefits: [
      "All Cultural Nomad benefits",
      "Featured in app and website",
      "5-10% discount on all services",
      "Dedicated concierge service",
      "Exclusive seasonal gifts",
    ],
  },
}

export function EssenceSystem() {
  const [userPoints, setUserPoints] = useState(175)
  const [currentTier, setCurrentTier] = useState("Pathfinder")
  const [actions, setActions] = useState<EssenceAction[]>([])
  const [rewards, setRewards] = useState<EssenceReward[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [showPointsAnimation, setShowPointsAnimation] = useState(false)
  const [pointsEarned, setPointsEarned] = useState(0)

  // Simulate loading data
  useEffect(() => {
    const timer = setTimeout(() => {
      setActions(sampleActions)
      setRewards(sampleRewards)
      setIsLoading(false)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  // Calculate progress to next tier
  const calculateTierProgress = () => {
    const tier = tierInfo[currentTier]
    return Math.round(((userPoints - tier.minPoints) / (tier.maxPoints - tier.minPoints)) * 100)
  }

  // Get next tier
  const getNextTier = () => {
    const tiers = Object.keys(tierInfo)
    const currentTierIndex = tiers.indexOf(currentTier)

    if (currentTierIndex < tiers.length - 1) {
      return tiers[currentTierIndex + 1]
    }

    return "Maximum Tier"
  }

  // Points needed for next tier
  const pointsForNextTier = () => {
    const nextTier = getNextTier()
    if (nextTier === "Maximum Tier") return 0

    return tierInfo[nextTier].minPoints - userPoints
  }

  // Complete an action
  const completeAction = (actionId: string) => {
    setActions((prev) =>
      prev.map((action) =>
        action.id === actionId
          ? {
              ...action,
              completed: true,
              date: new Date().toISOString().split("T")[0],
            }
          : action,
      ),
    )

    const action = actions.find((a) => a.id === actionId)
    if (action) {
      setPointsEarned(action.points)
      setShowPointsAnimation(true)

      setTimeout(() => {
        setUserPoints((prev) => prev + action.points)

        // Check if user should be upgraded to next tier
        const nextTier = getNextTier()
        if (nextTier !== "Maximum Tier" && userPoints + action.points >= tierInfo[nextTier].minPoints) {
          setCurrentTier(nextTier)
        }
      }, 1000)
    }
  }

  // Redeem a reward
  const redeemReward = (rewardId: string) => {
    const reward = rewards.find((r) => r.id === rewardId)
    if (reward && reward.available && userPoints >= reward.pointsCost) {
      setUserPoints((prev) => prev - reward.pointsCost)

      // In a real app, this would trigger a backend process to fulfill the reward
      alert(`You have redeemed: ${reward.title}`)
    }
  }

  // Handle animation completion
  const handleAnimationComplete = () => {
    setShowPointsAnimation(false)
    setPointsEarned(0)
  }

  if (isLoading) {
    return (
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-amber-600" />
            <span>Essence Points™ System</span>
          </CardTitle>
          <CardDescription>Loading your points and rewards...</CardDescription>
        </CardHeader>
        <CardContent className="flex justify-center py-8">
          <div className="w-12 h-12 rounded-full border-4 border-t-amber-600 border-amber-200 animate-spin"></div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="w-full relative overflow-hidden">
      {/* Points animation overlay */}
      {showPointsAnimation && (
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.5 }}
          onAnimationComplete={handleAnimationComplete}
          className="absolute inset-0 bg-black/60 flex items-center justify-center z-50"
        >
          <motion.div
            initial={{ y: 50 }}
            animate={{ y: -20 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            className="text-center"
          >
            <motion.div
              initial={{ scale: 1 }}
              animate={{ scale: 1.2 }}
              transition={{ duration: 0.5, repeat: 1, repeatType: "reverse" }}
              className="flex items-center justify-center gap-2 text-4xl font-bold text-amber-400 mb-2"
            >
              <Sparkles className="h-8 w-8" />
              <span>+{pointsEarned}</span>
            </motion.div>
            <p className="text-white text-xl">Essence Points Earned!</p>
          </motion.div>
        </motion.div>
      )}

      <CardHeader>
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <CardTitle className="flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-amber-600" />
              <span>Essence Points™ System</span>
            </CardTitle>
            <CardDescription>Earn points and unlock exclusive rewards</CardDescription>
          </div>

          <div className="flex items-center gap-3">
            <div className="text-right">
              <p className="text-sm text-muted-foreground">Current Tier</p>
              <div className="flex items-center gap-2">
                <Badge className={cn("text-white", tierInfo[currentTier].color)}>{currentTier}</Badge>
                <span className="text-xs text-muted-foreground">
                  {pointsForNextTier()} points to {getNextTier()}
                </span>
              </div>
            </div>
            <div className="flex items-center gap-1 bg-amber-100 px-3 py-2 rounded-lg">
              <Sparkles className="h-5 w-5 text-amber-600" />
              <span className="text-xl font-bold text-amber-800">{userPoints}</span>
            </div>
          </div>
        </div>

        <div className="mt-2">
          <Progress value={calculateTierProgress()} className="h-2 bg-amber-100" />
        </div>
      </CardHeader>

      <CardContent>
        <Tabs defaultValue="earn">
          <TabsList className="grid grid-cols-3 mb-6">
            <TabsTrigger value="earn">Earn Points</TabsTrigger>
            <TabsTrigger value="redeem">Redeem</TabsTrigger>
            <TabsTrigger value="tiers">Tier Benefits</TabsTrigger>
          </TabsList>

          <TabsContent value="earn" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {actions.map((action) => (
                <Card
                  key={action.id}
                  className={cn(
                    "overflow-hidden transition-all",
                    action.completed ? "bg-gray-50 border-gray-200" : "bg-white",
                  )}
                >
                  <CardHeader className="p-4 pb-2">
                    <div className="flex justify-between items-start">
                      <div className="flex items-center gap-2">
                        <div
                          className={cn(
                            "w-8 h-8 rounded-full flex items-center justify-center",
                            action.completed ? "bg-gray-400" : "bg-amber-600",
                          )}
                        >
                          <action.icon className={cn("h-4 w-4", action.completed ? "text-white/80" : "text-white")} />
                        </div>
                        <div>
                          <CardTitle className={cn("text-base", action.completed ? "text-gray-500" : "text-gray-900")}>
                            {action.title}
                          </CardTitle>
                          <CardDescription className={action.completed ? "text-gray-400" : ""}>
                            {action.description}
                          </CardDescription>
                        </div>
                      </div>
                      <div
                        className={cn(
                          "flex items-center gap-1 px-2 py-1 rounded",
                          action.completed ? "bg-gray-200 text-gray-500" : "bg-amber-100 text-amber-800",
                        )}
                      >
                        <Sparkles className="h-3 w-3" />
                        <span className="text-sm font-medium">{action.points}</span>
                      </div>
                    </div>
                  </CardHeader>
                  <CardFooter className="p-4 pt-2">
                    {action.completed ? (
                      <div className="w-full flex justify-between items-center">
                        <Badge variant="outline" className="text-gray-500 border-gray-300">
                          Completed {action.date && new Date(action.date).toLocaleDateString()}
                        </Badge>
                        <Button variant="ghost" size="sm" className="text-gray-500" disabled>
                          <Check className="h-4 w-4 mr-1" />
                          Completed
                        </Button>
                      </div>
                    ) : (
                      <Button
                        onClick={() => completeAction(action.id)}
                        className="w-full bg-amber-600 hover:bg-amber-700 text-white"
                      >
                        Complete Action
                      </Button>
                    )}
                  </CardFooter>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="redeem" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {rewards.map((reward) => (
                <Card key={reward.id} className={cn("overflow-hidden", !reward.available && "opacity-60")}>
                  <CardHeader className="p-4 pb-2">
                    <div className="flex justify-between items-start">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-amber-600 flex items-center justify-center">
                          <reward.icon className="h-4 w-4 text-white" />
                        </div>
                        <CardTitle className="text-base">{reward.title}</CardTitle>
                      </div>
                      <div className="flex items-center gap-1 px-2 py-1 rounded bg-amber-100 text-amber-800">
                        <Sparkles className="h-3 w-3" />
                        <span className="text-sm font-medium">{reward.pointsCost}</span>
                      </div>
                    </div>
                    <CardDescription className="mt-2">{reward.description}</CardDescription>
                  </CardHeader>
                  <CardFooter className="p-4 pt-2">
                    <Button
                      onClick={() => redeemReward(reward.id)}
                      className="w-full bg-amber-600 hover:bg-amber-700 text-white"
                      disabled={!reward.available || userPoints < reward.pointsCost}
                    >
                      {!reward.available
                        ? "Coming Soon"
                        : userPoints < reward.pointsCost
                          ? `Need ${reward.pointsCost - userPoints} more points`
                          : "Redeem Reward"}
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="tiers" className="space-y-6">
            <div className="space-y-4">
              {Object.entries(tierInfo).map(([tierName, tier]) => (
                <Card
                  key={tierName}
                  className={cn(
                    "overflow-hidden border-l-4",
                    tier.color,
                    currentTier === tierName ? "bg-amber-50" : "bg-white",
                  )}
                >
                  <CardHeader className="p-4 pb-2">
                    <div className="flex justify-between items-center">
                      <div>
                        <CardTitle className="flex items-center gap-2">
                          {tierName}
                          <span className="text-sm font-normal text-amber-700">{tier.amharicName}</span>
                          {currentTier === tierName && <Badge className="bg-amber-600 text-white">Current</Badge>}
                        </CardTitle>
                        <CardDescription>
                          {tier.minPoints} - {tier.maxPoints} Essence Points
                        </CardDescription>
                      </div>
                      <div className={cn("w-10 h-10 rounded-full flex items-center justify-center", tier.color)}>
                        {tierName === "Explorer" && <Map className="h-5 w-5 text-white" />}
                        {tierName === "Pathfinder" && <Compass className="h-5 w-5 text-white" />}
                        {tierName === "Heritage Seeker" && <Landmark className="h-5 w-5 text-white" />}
                        {tierName === "Cultural Nomad" && <Globe className="h-5 w-5 text-white" />}
                        {tierName === "Kuriftu Ambassador" && <Crown className="h-5 w-5 text-white" />}
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="p-4 pt-2">
                    <div className="space-y-1">
                      {tier.benefits.map((benefit, index) => (
                        <div key={index} className="flex items-start gap-2">
                          <Check className="h-4 w-4 text-green-600 mt-0.5" />
                          <span className="text-sm">{benefit}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
