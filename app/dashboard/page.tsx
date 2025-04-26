"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useRouter } from "next/navigation"
import {
  Award,
  Calendar,
  CreditCard,
  MapPin,
  Menu,
  Bell,
  Search,
  Coffee,
  LogOut,
  User,
  Settings,
  X,
  Users,
  Sparkles,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { DashboardCard } from "@/components/dashboard-card"
import { AISuggestion } from "@/components/ai-suggestion"
import { LeafletMap } from "@/components/leaflet-map"
import { EnhancedQR } from "@/components/enhanced-qr"
import { JourneyTracker } from "@/components/journey-tracker"
import { EssenceCounter } from "@/components/essence-counter"
import { UserCounter } from "@/components/user-counter"
import { userStats, resortLocations, recommendedExperiences, upcomingEvents } from "@/lib/data"
import { ProfessionalPassport } from "@/components/professional-passport"
import { GroupCheckIn } from "@/components/group-check-in"
import { FirstTimeWelcome } from "@/components/first-time-welcome"
import { KuriftuChatbot } from "@/components/kuriftu-chatbot"

export default function Dashboard() {
  const router = useRouter()
  const [points, setPoints] = useState(userStats.totalEssencePoints)
  const [showPassport, setShowPassport] = useState(false)
  const [showQR, setShowQR] = useState(false)
  const [selectedResort, setSelectedResort] = useState("")
  const [newPoints, setNewPoints] = useState(0)
  const [showWelcome, setShowWelcome] = useState(true)
  const [isFirstTime, setIsFirstTime] = useState(false)
  const [showGroupCheckIn, setShowGroupCheckIn] = useState(false)

  useEffect(() => {
    // Hide welcome message after 5 seconds
    const timer = setTimeout(() => {
      setShowWelcome(false)
    }, 5000)

    return () => clearTimeout(timer)
  }, [])

  const handlePassportClick = () => {
    setShowPassport(true)
  }

  const handleBookingClick = () => {
    router.push("/booking")
  }

  const handleTierClick = () => {
    router.push("/tiers")
  }

  const handleExploreClick = () => {
    router.push("/explore")
  }

  const handleProfileClick = () => {
    router.push("/profile")
  }

  const handleAISuggestion = () => {
    router.push("/booking")
  }

  const handleGenerateQR = (resortId: string) => {
    setSelectedResort(resortId)
    setShowPassport(false)
    setShowQR(true)
  }

  const handleQRSuccess = () => {
    // Simulate earning points
    const earnedPoints = 250
    setNewPoints(earnedPoints)
    setPoints((prev) => prev + earnedPoints)
  }

  const handleMapLocationSelect = (locationId: string) => {
    console.log("Selected location:", locationId)
    // You could navigate to a resort detail page or show more info
  }

  const handleSignOut = () => {
    router.push("/auth/sign-in")
  }

  const handleGroupCheckIn = () => {
    setShowGroupCheckIn(true)
  }

  const handleFirstTimeComplete = () => {
    setIsFirstTime(false)
    // You might want to save this in localStorage or a database in a real app
  }

  const handleGroupQRGenerate = (groupType: string, groupSize: number, groupName: string) => {
    setShowGroupCheckIn(false)
    setSelectedResort("bishoftu") // Default resort for demo
    setShowQR(true)
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Ethiopian pattern background */}
      <div className="absolute inset-0 bg-ethiopian-pattern opacity-5 pointer-events-none" />

      <header className="bg-kuriftu-green text-white sticky top-0 z-30 border-b border-white/10 shadow-md">
        <div className="container mx-auto p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon" className="md:hidden text-white hover:bg-white/10">
                    <Menu className="h-5 w-5" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="bg-kuriftu-green text-white border-r border-white/10">
                  <div className="flex flex-col h-full">
                    <div className="py-6 flex items-center gap-3">
                      <div className="h-10 w-10 rounded-full bg-kuriftu-gold flex items-center justify-center text-kuriftu-charcoal">
                        <Coffee className="h-5 w-5" />
                      </div>
                      <div>
                        <h2 className="font-serif text-xl font-bold">Kuriftu</h2>
                        <p className="text-sm text-white/70">Luxury & Membership</p>
                      </div>
                    </div>

                    <nav className="space-y-1 flex-1">
                      {[
                        { name: "Dashboard", icon: <Sparkles className="h-5 w-5" />, href: "/dashboard" },
                        { name: "My Passport", icon: <Award className="h-5 w-5" />, onClick: handlePassportClick },
                        { name: "Book Experience", icon: <Calendar className="h-5 w-5" />, href: "/booking" },
                        { name: "Membership", icon: <CreditCard className="h-5 w-5" />, href: "/tiers" },
                        { name: "Explore Resorts", icon: <MapPin className="h-5 w-5" />, href: "/explore" },
                      ].map((item) => (
                        <Button
                          key={item.name}
                          variant="ghost"
                          className="w-full justify-start text-white hover:bg-white/10"
                          onClick={() => {
                            if (item.onClick) {
                              item.onClick()
                            } else if (item.href) {
                              router.push(item.href)
                            }
                          }}
                        >
                          {item.icon}
                          <span className="ml-3">{item.name}</span>
                        </Button>
                      ))}
                    </nav>

                    <div className="py-4 border-t border-white/10">
                      <div className="flex items-center gap-3">
                        <Avatar>
                          <AvatarFallback className="bg-kuriftu-gold text-kuriftu-charcoal">
                            {userStats.tier.charAt(0).toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-medium">Guest User</div>
                          <div className="text-sm text-white/70">
                            {userStats.tier.charAt(0).toUpperCase() + userStats.tier.slice(1)} Tier
                          </div>
                        </div>
                      </div>

                      <div className="mt-4 space-y-1">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="w-full justify-start text-white hover:bg-white/10"
                          onClick={handleProfileClick}
                        >
                          <User className="h-4 w-4 mr-2" />
                          Profile
                        </Button>
                        <Button variant="ghost" size="sm" className="w-full justify-start text-white hover:bg-white/10">
                          <Settings className="h-4 w-4 mr-2" />
                          Settings
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="w-full justify-start text-white hover:bg-white/10"
                          onClick={handleSignOut}
                        >
                          <LogOut className="h-4 w-4 mr-2" />
                          Sign out
                        </Button>
                      </div>
                    </div>
                  </div>
                </SheetContent>
              </Sheet>

              <div className="flex items-center gap-2">
                <div className="h-8 w-8 rounded-full bg-kuriftu-gold flex items-center justify-center text-kuriftu-charcoal">
                  <Coffee className="h-4 w-4" />
                </div>
                <h1 className="font-serif text-xl font-bold">Kuriftu</h1>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon" className="text-white hover:bg-white/10">
                <Bell className="h-5 w-5" />
              </Button>

              <EssenceCounter initialPoints={points} newPoints={newPoints} />
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto p-4 md:p-6">
        {/* Welcome message */}
        <AnimatePresence>
          {showWelcome && (
            <motion.div
              className="mb-6 bg-kuriftu-gold/10 border border-kuriftu-gold/30 rounded-lg p-4 relative overflow-hidden"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <Button
                variant="ghost"
                size="sm"
                className="absolute top-2 right-2 text-white/70 hover:text-white hover:bg-transparent p-1"
                onClick={() => setShowWelcome(false)}
              >
                <X className="h-4 w-4" />
              </Button>

              <div className="flex items-start gap-4">
                <div className="h-12 w-12 rounded-full bg-kuriftu-gold flex items-center justify-center text-kuriftu-charcoal flex-shrink-0">
                  <Coffee className="h-6 w-6" />
                </div>
                <div>
                  <h2 className="font-serif text-lg font-semibold text-white mb-1">Welcome to Kuriftu Loyalty!</h2>
                  <p className="text-white/70 mb-2">
                    Your journey through Ethiopia's finest luxury resorts begins here. Collect Essence Points™ with
                    every visit and unlock exclusive rewards.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      className="border-kuriftu-gold text-kuriftu-gold hover:bg-kuriftu-gold/10"
                      onClick={handlePassportClick}
                    >
                      View Passport
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className="border-white/20 text-white hover:bg-white/10"
                      onClick={handleExploreClick}
                    >
                      Explore Resorts
                    </Button>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="font-serif text-2xl font-semibold text-white">እንኳን ደህና መጡ</h2>
              <p className="text-white/70">Welcome Back</p>
            </div>
            <div className="relative w-full max-w-sm hidden md:block">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/50" />
              <Input
                placeholder="Search experiences, resorts..."
                className="pl-10 bg-white/5 border-white/10 text-white placeholder:text-white/50 focus-visible:ring-kuriftu-gold"
              />
            </div>
          </div>

          {/* Tier progress */}
          <div className="mb-6 bg-white/5 rounded-lg p-4 border border-white/10">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <Award className="h-5 w-5 text-kuriftu-gold" />
                <span className="text-white font-medium">
                  {userStats.tier.charAt(0).toUpperCase() + userStats.tier.slice(1)} Tier
                </span>
              </div>
              <div className="text-sm text-white/70">
                {userStats.pointsToNextTier} points to {userStats.nextTier}
              </div>
            </div>
            <Progress
              value={(userStats.totalEssencePoints / (userStats.totalEssencePoints + userStats.pointsToNextTier)) * 100}
              className="h-2 bg-white/10"
              indicatorClassName="bg-kuriftu-gold"
            />
            <div className="mt-2 flex justify-between text-xs text-white/50">
              <div>0</div>
              <div>{userStats.totalEssencePoints + userStats.pointsToNextTier}</div>
            </div>
          </div>

          <UserCounter className="mb-6 grid" />

          <Tabs defaultValue="journey" className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-6 bg-white/5">
              <TabsTrigger
                value="journey"
                className="data-[state=active]:bg-kuriftu-gold data-[state=active]:text-kuriftu-charcoal text-white"
              >
                Journey
              </TabsTrigger>
              <TabsTrigger
                value="map"
                className="data-[state=active]:bg-kuriftu-gold data-[state=active]:text-kuriftu-charcoal text-white"
              >
                Map
              </TabsTrigger>
              <TabsTrigger
                value="recommendations"
                className="data-[state=active]:bg-kuriftu-gold data-[state=active]:text-kuriftu-charcoal text-white"
              >
                For You
              </TabsTrigger>
            </TabsList>

            <TabsContent value="journey" className="mt-0">
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                  <DashboardCard
                    title="Journey Passport"
                    icon={<Award className="h-5 w-5" />}
                    onClick={handlePassportClick}
                    className="bg-white/5 border-white/10 text-white hover:bg-white/10"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-white/70 mb-1">Collected Stamps</p>
                        <p className="text-2xl font-semibold text-kuriftu-gold">8 / 24</p>
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        className="border-kuriftu-gold text-kuriftu-gold hover:bg-kuriftu-gold/20"
                      >
                        View Passport
                      </Button>
                    </div>
                  </DashboardCard>

                  <DashboardCard
                    title="Book Experience"
                    icon={<Calendar className="h-5 w-5" />}
                    onClick={handleBookingClick}
                    className="bg-white/5 border-white/10 text-white hover:bg-white/10"
                  >
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <div className="h-3 w-3 rounded-full bg-kuriftu-green" />
                        <p className="text-sm text-white/70">Resort Stay</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="h-3 w-3 rounded-full bg-kuriftu-gold" />
                        <p className="text-sm text-white/70">Spa & Wellness</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="h-3 w-3 rounded-full bg-kuriftu-terracotta" />
                        <p className="text-sm text-white/70">Dining Experience</p>
                      </div>
                    </div>
                  </DashboardCard>

                  <DashboardCard
                    title="Membership Tier"
                    icon={<Sparkles className="h-5 w-5" />}
                    onClick={handleTierClick}
                    className="bg-white/5 border-white/10 text-white hover:bg-white/10"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-white/70 mb-1">Current Tier</p>
                        <p className="text-xl font-semibold text-kuriftu-gold">Silver</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-white/70 mb-1">Next Tier</p>
                        <p className="text-xl font-semibold text-kuriftu-gold">Gold</p>
                      </div>
                    </div>
                    <div className="mt-2 h-2 w-full rounded-full bg-white/10 overflow-hidden">
                      <div className="h-full rounded-full bg-kuriftu-gold" style={{ width: "37%" }} />
                    </div>
                  </DashboardCard>
                </div>

                <JourneyTracker
                  onViewPassport={handlePassportClick}
                  className="bg-white/5 border-white/10 text-white"
                />
              </motion.div>
            </TabsContent>

            <TabsContent value="map" className="mt-0">
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
                <LeafletMap onSelectLocation={handleMapLocationSelect} className="mb-6 border-white/10" />

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {resortLocations.slice(0, 3).map((resort) => (
                    <DashboardCard
                      key={resort.id}
                      title={resort.name}
                      icon={<MapPin className="h-5 w-5" />}
                      onClick={() => handleGenerateQR(resort.id)}
                      className="bg-white/5 border-white/10 text-white hover:bg-white/10"
                    >
                      <div className="space-y-2">
                        <p className="text-sm text-white/70 line-clamp-2">{resort.description}</p>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-1">
                            <div className="h-3 w-3 rounded-full bg-kuriftu-green" />
                            <p className="text-xs text-white/70">{resort.essencePoints} pts per visit</p>
                          </div>
                          <div className="text-xs font-medium text-kuriftu-gold flex items-center">
                            <Award className="h-3 w-3 mr-1" />
                            {resort.rating}
                          </div>
                        </div>
                      </div>
                    </DashboardCard>
                  ))}
                </div>
              </motion.div>
            </TabsContent>

            <TabsContent value="recommendations" className="mt-0">
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
                <div className="space-y-6">
                  <div>
                    <h3 className="font-serif text-lg font-semibold text-white mb-4 flex items-center">
                      <Sparkles className="h-4 w-4 mr-2 text-kuriftu-gold" />
                      Recommended for You
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {recommendedExperiences.map((rec) => (
                        <DashboardCard
                          key={rec.id}
                          title={rec.name}
                          icon={<Sparkles className="h-5 w-5" />}
                          className="bg-white/5 border-white/10 text-white hover:bg-white/10"
                        >
                          <div className="space-y-2">
                            <p className="text-sm text-white/70 line-clamp-2">{rec.description}</p>
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-1">
                                <div className="h-3 w-3 rounded-full bg-kuriftu-green" />
                                <p className="text-xs text-white/70">{rec.essencePoints} pts</p>
                              </div>
                              <div
                                className="text-xs font-medium px-2 py-0.5 rounded-full"
                                style={{
                                  backgroundColor: rec.match > 90 ? "#0E7E6220" : "#D4AF3720",
                                  color: rec.match > 90 ? "#0E7E62" : "#D4AF37",
                                }}
                              >
                                {rec.match}% match
                              </div>
                            </div>
                          </div>
                        </DashboardCard>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="font-serif text-lg font-semibold text-white mb-4 flex items-center">
                      <Calendar className="h-4 w-4 mr-2 text-kuriftu-gold" />
                      Upcoming Events
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {upcomingEvents.map((event) => (
                        <DashboardCard
                          key={event.id}
                          title={event.name}
                          icon={<Calendar className="h-5 w-5" />}
                          className="bg-white/5 border-white/10 text-white hover:bg-white/10"
                        >
                          <div className="space-y-2">
                            <p className="text-sm text-white/70 line-clamp-2">{event.description}</p>
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-1">
                                <div className="h-3 w-3 rounded-full bg-kuriftu-gold" />
                                <p className="text-xs text-white/70">{event.date.toLocaleDateString()}</p>
                              </div>
                              <div className="text-xs font-medium text-kuriftu-green flex items-center">
                                <Sparkles className="h-3 w-3 mr-1" />
                                {event.essencePoints} pts
                              </div>
                            </div>
                          </div>
                        </DashboardCard>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            </TabsContent>
          </Tabs>
        </div>

        {/* Quick actions */}
        <div className="fixed bottom-4 left-0 right-0 z-20 px-4">
          <div className="mx-auto max-w-md bg-kuriftu-green/90 backdrop-blur-md rounded-full border border-white/10 p-2 shadow-lg">
            <div className="flex justify-around">
              {[
                { icon: <Coffee className="h-5 w-5" />, label: "Home", onClick: () => {} },
                { icon: <Award className="h-5 w-5" />, label: "Passport", onClick: handlePassportClick },
                { icon: <Calendar className="h-5 w-5" />, label: "Book", onClick: handleBookingClick },
                { icon: <Users className="h-5 w-5" />, label: "Group", onClick: handleGroupCheckIn },
                { icon: <MapPin className="h-5 w-5" />, label: "Explore", onClick: handleExploreClick },
              ].map((item, index) => (
                <Button
                  key={index}
                  variant="ghost"
                  size="sm"
                  className="flex flex-col items-center gap-1 h-auto py-2 text-white hover:bg-white/10 rounded-full"
                  onClick={item.onClick}
                >
                  {item.icon}
                  <span className="text-xs">{item.label}</span>
                </Button>
              ))}
            </div>
          </div>
        </div>
      </main>

      {/* Digital Passport Modal */}
      {showPassport && (
        <ProfessionalPassport
          onClose={() => setShowPassport(false)}
          onGenerateQR={handleGenerateQR}
          isFirstTime={userStats.totalVisits === 0}
        />
      )}

      {/* QR Code Modal */}
      {showQR && <EnhancedQR resortId={selectedResort} onClose={() => setShowQR(false)} onSuccess={handleQRSuccess} />}

      {isFirstTime && <FirstTimeWelcome onComplete={handleFirstTimeComplete} />}

      {showGroupCheckIn && (
        <GroupCheckIn onClose={() => setShowGroupCheckIn(false)} onGenerateQR={handleGroupQRGenerate} />
      )}

      <AISuggestion
        suggestion="Experience our traditional coffee ceremony at Kuriftu Bishoftu this weekend!"
        actionText="Book Now"
        onAction={handleAISuggestion}
      />

      <KuriftuChatbot />
    </div>
  )
}
