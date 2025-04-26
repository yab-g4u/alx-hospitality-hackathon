"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
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
  Camera,
  Download,
  Printer,
  ChevronDown,
  Lock,
  Facebook,
  Twitter,
  Instagram,
} from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { userVisits, resortLocations, experienceTypes, userStats } from "@/lib/data"
import { formatDate } from "@/lib/utils"
import { JourneyMap } from "@/components/journey-map"
import html2canvas from "html2canvas"
import { Sparkles } from "lucide-react"

interface JourneyPassportProps {
  onClose?: () => void
  onGenerateQR?: (visitId: string) => void
  isFirstTime?: boolean
}

export function JourneyPassport({ onClose, onGenerateQR, isFirstTime = false }: JourneyPassportProps) {
  const [currentPage, setCurrentPage] = useState(0)
  const [showStamp, setShowStamp] = useState(false)
  const [stampedVisitId, setStampedVisitId] = useState<string | null>(null)
  const [isFlipping, setIsFlipping] = useState(false)
  const [showMap, setShowMap] = useState(false)
  const [showTools, setShowTools] = useState(false)
  const [showShare, setShowShare] = useState(false)
  const [showSaveSuccess, setShowSaveSuccess] = useState(false)
  const [isPersonalInfoComplete, setIsPersonalInfoComplete] = useState(false)
  const [showAnimation, setShowAnimation] = useState(false)
  const stampPageRef = useRef(null)

  const [personalInfo, setPersonalInfo] = useState({
    name: "",
    birthdate: "",
    email: "",
    phone: "",
    nationality: "",
    travelPreferences: "",
  })

  const resortPages = resortLocations.map((resort) => ({
    resortId: resort.id,
    resortName: resort.name,
    visits: userVisits.filter((visit) => visit.locationId === resort.id),
  }))

  const mapLocations = resortLocations.map((location) => ({
    id: location.id,
    name: location.name,
    latitude: location.latitude,
    longitude: location.longitude,
  }))

  const tiers = [
    { name: "Explorer", points: 0 },
    { name: "Adventurer", points: 500 },
    { name: "Voyager", points: 1500 },
    { name: "Globetrotter", points: 3000 },
    { name: "Legend", points: 5000 },
  ]

  const badges = [
    {
      name: "Cultural Explorer",
      description: "Visit 3 cultural sites",
      icon: <Landmark className="h-4 w-4" />,
      progress: 2,
      total: 3,
      earned: false,
      amharicName: "የባህል አሳሽ",
    },
    {
      name: "Gourmet Traveler",
      description: "Dine at 5 different restaurants",
      icon: <Utensils className="h-4 w-4" />,
      progress: 5,
      total: 5,
      earned: true,
      amharicName: "ጎርሜት ተጓዥ",
    },
    {
      name: "Wellness Seeker",
      description: "Enjoy 2 spa treatments",
      icon: <Spa className="h-4 w-4" />,
      progress: 2,
      total: 2,
      earned: true,
      amharicName: "የጤንነት ፈላጊ",
    },
    {
      name: "Nature Lover",
      description: "Hike 3 different trails",
      icon: <Mountain className="h-4 w-4" />,
      progress: 1,
      total: 3,
      earned: false,
      amharicName: "የተፈጥሮ አፍቃሪ",
    },
  ]

  const rewards = [
    {
      name: "Free Dessert",
      description: "Enjoy a complimentary dessert at any Kuriftu restaurant",
      points: 100,
      available: true,
      redeemed: false,
    },
    {
      name: "Spa Discount",
      description: "Get 20% off your next spa treatment",
      points: 250,
      available: true,
      redeemed: false,
    },
    {
      name: "Room Upgrade",
      description: "Upgrade to a suite for your next stay",
      points: 500,
      available: userStats.totalEssencePoints >= 500,
      redeemed: false,
    },
  ]

  const currentTier = tiers.find((tier) => userStats.totalEssencePoints >= tier.points) || tiers[0]
  const nextTier = tiers[tiers.indexOf(currentTier) + 1]

  const getPointsToNextTier = () => {
    return nextTier ? nextTier.points - userStats.totalEssencePoints : 0
  }

  const [activeTab, setActiveTab] = useState(isFirstTime ? "personalInfo" : "passport")

  const handleNextPage = () => {
    setIsFlipping(true)
    setTimeout(() => {
      setCurrentPage((prevPage) => Math.min(prevPage + 1, resortPages.length - 1))
      setIsFlipping(false)
    }, 300)
  }

  const handlePrevPage = () => {
    setIsFlipping(true)
    setTimeout(() => {
      setCurrentPage((prevPage) => Math.max(prevPage - 1, 0))
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
        color: "#2D2D2D",
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

  // Get Amharic name for experience
  const getAmharicName = (experienceId: string) => {
    switch (experienceId) {
      case "stay":
        return "መኖሪያ"
      case "spa":
        return "ስፓ"
      case "dining":
        return "ምግብ"
      case "adventure":
        return "ጀብዱ"
      case "cultural":
        return "ባህላዊ"
      default:
        return "ልምድ"
    }
  }

  // Get local hero for experience type
  const getLocalHero = (experienceId: string) => {
    switch (experienceId) {
      case "stay":
        return "Inspired by Emperor Menelik II's royal quarters"
      case "spa":
        return "Techniques from Queen Taytu's royal treatments"
      case "dining":
        return "Recipes from Chef Yohanis Gebreyesus"
      case "adventure":
        return "Trails discovered by explorer Ewunetu Bilata"
      case "cultural":
        return "Cultural wisdom from Laureate Tsegaye Gebre-Medhin"
      default:
        return ""
    }
  }

  // Get cultural quote for experience
  const getCulturalQuote = (experienceId: string) => {
    switch (experienceId) {
      case "stay":
        return {
          amharic: "ቤትህ ቢርቅ ጎረቤትህ አይርቅ",
          english: "Even if your home is far, your neighbor isn't",
        }
      case "spa":
        return {
          amharic: "ጤናማ አእምሮ በጤናማ አካል ውስጥ",
          english: "A healthy mind in a healthy body",
        }
      case "dining":
        return {
          amharic: "በጋራ መብላት ጣፋጭ ነው",
          english: "Eating together is sweet",
        }
      case "adventure":
        return {
          amharic: "ጉዞ ሺ ቃል ይናገራል",
          english: "A journey speaks a thousand words",
        }
      case "cultural":
        return {
          amharic: "ባህል የህዝብ መታወቂያ ነው",
          english: "Culture is the identity of people",
        }
      default:
        return {
          amharic: "ጉዞ ሕይወትን ያበለጽጋል",
          english: "Travel enriches life",
        }
    }
  }

  useEffect(() => {
    // Reset stamp animation when changing pages
    setShowStamp(false)
    setStampedVisitId(null)
  }, [currentPage])

  useEffect(() => {
    // Check if personal info is complete
    const { name, birthdate, email, nationality } = personalInfo
    setIsPersonalInfoComplete(!!name && !!birthdate && !!email && !!nationality)
  }, [personalInfo])

  const toggleMap = () => {
    setShowMap(!showMap)
  }

  const toggleTools = () => {
    setShowTools(!showTools)
  }

  const toggleShare = () => {
    setShowShare(!showShare)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setPersonalInfo((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmitPersonalInfo = () => {
    if (isPersonalInfoComplete) {
      setShowAnimation(true)
      setTimeout(() => {
        setActiveTab("passport")
        setShowAnimation(false)
      }, 3000)
    }
  }

  const captureAndShare = async (platform: string) => {
    if (!stampPageRef.current) return

    try {
      const canvas = await html2canvas(stampPageRef.current)
      const image = canvas.toDataURL("image/png")

      // In a real app, you would implement actual sharing functionality
      // For now, we'll just simulate it
      console.log(`Sharing to ${platform} with image: ${image.substring(0, 50)}...`)

      // Show success message
      alert(`Your passport stamp has been shared to ${platform}!`)
      setShowShare(false)
    } catch (error) {
      console.error("Error capturing image:", error)
      alert("Failed to share. Please try again.")
    }
  }

  const handleSaveQR = () => {
    setShowSaveSuccess(true)
    setTimeout(() => {
      setShowSaveSuccess(false)
    }, 3000)
  }

  const handleRedeemReward = (index: number) => {
    // In a real app, this would trigger a payment or redemption flow
    alert(`Reward redemption initiated for: ${rewards[index].name}`)
  }

  const handleMapLocationSelect = (locationId: string) => {
    // Find the resort page index
    const pageIndex = resortPages.findIndex((page) => page.resortId === locationId)
    if (pageIndex !== -1) {
      setCurrentPage(pageIndex)
    }

    // Close the map view
    setShowMap(false)
  }

  return (
    
      
        
          {/* Passport cover */}
  ;<Award className="h-5 w-5" />
  \
                
                  
                    Kuriftu Journey Passport

  Passport

  Badges

  Rewards
  currentTier.name.charAt(0)
  ;<Award className="h-3 w-3 text-kuriftu-charcoal" />
  currentTier.name

  Member
  since
  formatDate(userStats.memberSince)
  userStats.totalEssencePoints
  Kuripoints
  userStats.totalVisits
  Visits
  nextTier && (
                
                  
                    
                      Next
  nextTier.name
  getPointsToNextTier()
  points
  needed

  )
  showMap ? "Hide Journey Map" : "View Journey Map"
  ;<MapPin className="ml-2 h-4 w-4" />

  Passport
  Tools < ChevronDown
  className="ml-2 h-4 w-4" />
                
              

              {/* Passport tools dropdown */}
  showTools && (
                  
                    
                      
                        
                          
                            <Camera className="h-4 w-4 mb-1" />
                            
                          
                        
                        
                          
                            <Download
  className="h-4 w-4 mb-1" />
                            
                          
                        
                        
                          
                            <Printer className="h-4 w-4 mb-1" />
                            
                          
                        
                        
                          
                            <Share2
  className="h-4 w-4 mb-1" />
                            
                          
                        
                        
                          
                            <QrCode className="h-4 w-4 mb-1" />
                            
                          
                        
                        
                          
                            <Award
  className="h-4 w-4 mb-1" />

  )
  showShare && (
                  
                    
                      Share
  your
  journey < Facebook
  className="h-4 w-4 mb-1" />
                            
                          
                        
                        
                          
                            <Twitter className="h-4 w-4 mb-1" />
                            
                          
                        
                        
                          
                            <Instagram
  className="h-4 w-4 mb-1" />

  )
  showMap && (
    <JourneyMap locations={mapLocations} onLocationSelect={handleMapLocationSelect} className="w-full h-full" />
  )
  isFirstTime && !isPersonalInfoComplete ? (
                
                  
                    
                  
                  
                    Create Your
  Journey
  Passport

  Fill in your
  details
  to
  begin
  your
  Ethiopian
  journey

  Full
  Name

  Date
  of
  Birth

  Email

  Phone(Optional)

  Nationality

  Travel
  Preferences(Optional)

  Create
  My
  Passport

  Your
  information
  is
  secure
  and
  will
  only
  be
  used
  to
  enhance
  your
  Kuriftu
  experience

  ) : isFirstTime && showAnimation ? (
                
                  
                    
                  
                  
                    
                      
                        
                      
                      
                        
                          
                            
                              <Award />
                            
                            PASSPORT CREATED
                            KURIFTU JOURNEY
                            የኩሪፍቱ ጉዞ
                          
                        
                      
                    
                  
                  
                    Welcome to Your Ethiopian Journey!
                  
                  
                    Your passport is ready. Get your first stamp by visiting any Kuriftu resort.
                  
                
              ) : isFirstTime ? (
                
                  
                    
                  
                  <Award className="h-16 w-16 text-kuriftu-gold mb-4" />
                  
                    Begin Your Ethiopian Journey
                  
                  
                    Your passport is ready to collect stamps from Kuriftu's luxury experiences
                  
                  የኢትዮጵያ ጉዞዎን ይጀምሩ
                  
                    
                      <QrCode className="h-4 w-4 mr-2" />
                      Get Your First Stamp
                    
                  
                
              ) : (
  resortPages.length > 0 ? (
                    
                      
                        
                          {resortPages[currentPage].resortName}
                        
                        
                          
                            
                            
                              {resortPages[currentPage].visits.length}
  resortPages[currentPage].visits.length === 1 ? "Visit" : "Visits"
  resortPages[currentPage].visits.map((visit) => {
    const experience = getExperienceDetails(visit.experienceId)
    const quote = getCulturalQuote(visit.experienceId)
    return (
                            
                              
                                
                                  {/* Ethiopian pattern background */}
    getIconComponent(experience.icon)
    experience.name
    formatDate(visit.date)
    getAmharicName(visit.experienceId)
    quote.amharic
    getLocalHero(visit.experienceId)
    visit.completed && <Check className="h-3 w-3" />
    showStamp && stampedVisitId === visit.id && (
                                    
                                      
                                        
                                          
                                            
                                              <Award />

    VERIFIED
    KURIFTU
    ኩሪፍቱ

    )

    )
  })

  Experience
  the
  beauty
  of
  Ethiopia

  የኢትዮጵያን
  ውበት
  ይመልከቱ
  ;<QrCode className="h-4 w-4 mr-2" />
  Generate
  Check-in QR

  ) : (
                    
                      
                        <MapPin className="h-12 w-12 text-muted-foreground mb-4" />
                        
                          No Visits Yet
                        
                        
                          Start your Kuriftu journey to collect stamps in your passport
                        
                      
                    
                  )

  )
  resortPages.length > 0 && !isFirstTime && (
                
                  
                    
                      <ChevronLeft className="h-4 w-4 mr-1" />
  Previous

  Page
  currentPage + 1
  of
  resortPages.length

  Next < ChevronRight
  className="h-4 w-4 ml-1" />

  )
  ;<Share2 className="h-4 w-4 mr-2" />
  Share
  Your
  Journey
  showSaveSuccess && (
                  
                    
                      
                        <Check className="h-4 w-4" />

  QR
  Code
  saved
  successfully!

  )

  Your
  Journey
  Badges

  Collect
  badges
  by
  experiencing
  different
  aspects
  of
  Kuriftu
  and
  Ethiopian
  culture
  badges.map((badge) => (
                  
                    
                      
                        
                          
                            {badge.icon}
                          
                          
                            
                              {badge.name}
                            
                            
                              {badge.description}
                            
                          
                        
                      

                      
                        
                          
                            Progress: {badge.progress}/{badge.total}
                          
                          {badge.earned && (
                            
                              <Check className="h-3 w-3 mr-1" />
                              Earned
                            
                          )
  badge.earned ? (
                        
                          {badge.amharicName}
                        
                      ) : (
                        
                          
                            
                              <Lock className="h-5 w-5 text-white/70 mb-1" />
  Keep
  exploring
  to
  unlock

  )

  ))
}

Mystery
Badges

Hidden
badges
are
unlocked
through
special
experiences
and
achievements

{
  [1, 2, 3].map((i) => (
                    
                      
                        
                          
                            <Lock className="h-6 w-6 text-white/30 mx-auto mb-2" />
                            Mystery Badge
                          
                        
                      
                    
                  )
  )
}

Kuripoints
Rewards

Redeem
your
Kuripoints
for exclusive experiences and benefits
              
              

              
                
                  
                    
                      <Sparkles
className="h-5 w-5" />
                    
                    
                      Your
Kuripoints

{
  userStats.totalEssencePoints
}

{
  rewards.map((reward, index) => (
                  
                    
                      
                        
                          {reward.name}
                        
                        
                          {reward.points} Points
                        
                      
                      
                        {reward.description}
                      
                      

                      {reward.available ? (
                        
                          
                            {reward.redeemed ? "Redeemed" : "Redeem Reward"}
                          
                        
                      )
  : (
                        
                          
                            Need
  reward.points - userStats.totalEssencePoints
  more
  points < Lock
  className="h-4 w-4 text-white/50" />

  )
}

))}
              

              
                
                  How to Earn More Points
                
                
                  
                    
                      
                        <Check className="h-3 w-3" />
                      
                      Book a room (1 point per 100 birr spent)
                    
                    
                      
                        <Check className="h-3 w-3" />
                      
                      Share your Journey Passport (+5 points)
                    
                    
                      
                        <Check className="h-3 w-3" />
                      
                      Attend special cultural events (+10 points)
                    
                    
                      
                        <Check className="h-3 w-3" />
                      
                      Refer a friend who books (+20 points)
                    
                  
                
              
            
          
        
      
    
  
)
}
