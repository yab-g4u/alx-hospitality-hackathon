"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import {
  User,
  ChevronLeft,
  Calendar,
  Award,
  MapPin,
  Edit,
  Camera,
  LogOut,
  Save,
  X,
  Check,
  SpadeIcon as Spa,
  Coffee,
  SpadeIcon as Spa,
  Utensils,
  Mountain,
  Landmark,
  Lock,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { userStats, membershipTiers, userVisits, resortLocations, experienceTypes } from "@/lib/data"
import { formatDate } from "@/lib/utils"

export default function ProfilePage() {
  const router = useRouter()
  const [isEditing, setIsEditing] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [activeTab, setActiveTab] = useState("profile")

  // User profile data
  const [profile, setProfile] = useState({
    fullName: "Abebe Kebede",
    email: "abebe.kebede@example.com",
    phone: "+251 91 234 5678",
    birthdate: "1990-05-15",
    nationality: "Ethiopian",
    journeyType: "cultural",
    preferences: "I enjoy cultural experiences, local cuisine, and photography opportunities.",
    notificationPreferences: {
      email: true,
      sms: false,
      app: true,
    },
  })

  // Get current tier and next tier
  const currentTier =
    membershipTiers.find((tier) => tier.pointsRequired <= userStats.totalEssencePoints) || membershipTiers[0]
  const nextTierIndex = membershipTiers.findIndex((tier) => tier.id === currentTier.id) + 1
  const nextTier = nextTierIndex < membershipTiers.length ? membershipTiers[nextTierIndex] : null

  // Calculate progress to next tier
  const getProgressToNextTier = () => {
    if (!nextTier) return 100
    const currentPoints = userStats.totalEssencePoints - currentTier.pointsRequired
    const pointsNeeded = nextTier.pointsRequired - currentTier.pointsRequired
    return Math.min(100, Math.round((currentPoints / pointsNeeded) * 100))
  }

  // Points needed for next tier
  const getPointsToNextTier = () => {
    if (!nextTier) return 0
    return nextTier.pointsRequired - userStats.totalEssencePoints
  }

  const handleBack = () => {
    router.push("/dashboard")
  }

  const handleEdit = () => {
    setIsEditing(true)
  }

  const handleCancel = () => {
    setIsEditing(false)
  }

  const handleSave = () => {
    setIsSaving(true)
    // Simulate API call
    setTimeout(() => {
      setIsSaving(false)
      setIsEditing(false)
    }, 1000)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setProfile((prev) => ({ ...prev, [name]: value }))
  }

  const handleJourneyTypeChange = (value: string) => {
    setProfile((prev) => ({ ...prev, journeyType: value }))
  }

  const handleNotificationChange = (type: keyof typeof profile.notificationPreferences) => {
    setProfile((prev) => ({
      ...prev,
      notificationPreferences: {
        ...prev.notificationPreferences,
        [type]: !prev.notificationPreferences[type],
      },
    }))
  }

  // Group visits by month
  const visitsByMonth: Record<string, typeof userVisits> = {}
  userVisits.forEach((visit) => {
    const date = new Date(visit.date)
    const monthYear = `${date.toLocaleString("default", { month: "long" })} ${date.getFullYear()}`
    if (!visitsByMonth[monthYear]) {
      visitsByMonth[monthYear] = []
    }
    visitsByMonth[monthYear].push(visit)
  })

  // Get location name
  const getLocationName = (locationId: string) => {
    return resortLocations.find((location) => location.id === locationId)?.name || "Unknown Location"
  }

  // Get experience name and color
  const getExperienceDetails = (experienceId: string) => {
    return experienceTypes.find((exp) => exp.id === experienceId) || { name: "Unknown", color: "#2D2D2D" }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-kuriftu-sand/30 to-white">
      <header className="bg-kuriftu-green text-white p-4 sticky top-0 z-30 shadow-md">
        <div className="container mx-auto">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Button
                variant="ghost"
                size="icon"
                className="mr-2 text-white hover:bg-kuriftu-green-light"
                onClick={handleBack}
              >
                <ChevronLeft className="h-5 w-5" />
                <span className="sr-only">Back</span>
              </Button>
              <h1 className="font-serif text-xl font-bold">My Profile</h1>
            </div>
            {activeTab === "profile" && !isEditing && (
              <Button
                variant="ghost"
                size="sm"
                className="text-white hover:bg-kuriftu-green-light"
                onClick={handleEdit}
              >
                <Edit className="h-4 w-4 mr-2" />
                Edit Profile
              </Button>
            )}
            {activeTab === "profile" && isEditing && (
              <div className="flex gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-white hover:bg-kuriftu-green-light"
                  onClick={handleCancel}
                >
                  <X className="h-4 w-4 mr-2" />
                  Cancel
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="bg-white text-kuriftu-green hover:bg-white/90"
                  onClick={handleSave}
                  disabled={isSaving}
                >
                  {isSaving ? (
                    <>
                      <span className="mr-2">Saving...</span>
                      <span className="animate-spin">⟳</span>
                    </>
                  ) : (
                    <>
                      <Save className="h-4 w-4 mr-2" />
                      Save
                    </>
                  )}
                </Button>
              </div>
            )}
          </div>
        </div>
      </header>

      <main className="container mx-auto p-4 md:p-6">
        <div className="mb-6">
          <div className="flex flex-col md:flex-row gap-6">
            {/* Profile sidebar */}
            <div className="w-full md:w-1/3">
              <Card className="border-kuriftu-sand/30 overflow-hidden">
                <div className="relative h-32 bg-kuriftu-green">
                  <div className="absolute inset-0 bg-kuriftu-pattern opacity-10" />
                  <Button variant="ghost" size="icon" className="absolute top-2 right-2 text-white hover:bg-white/20">
                    <Camera className="h-4 w-4" />
                    <span className="sr-only">Change cover</span>
                  </Button>
                </div>
                <CardContent className="pt-0">
                  <div className="flex flex-col items-center -mt-12">
                    <div className="relative">
                      <Avatar className="h-24 w-24 border-4 border-white">
                        <AvatarImage src="/placeholder.svg?height=96&width=96" alt={profile.fullName} />
                        <AvatarFallback className="bg-kuriftu-green text-white text-xl">
                          {profile.fullName
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="absolute bottom-0 right-0 h-8 w-8 rounded-full bg-white text-kuriftu-charcoal shadow-sm hover:bg-kuriftu-sand/20"
                      >
                        <Camera className="h-4 w-4" />
                        <span className="sr-only">Change photo</span>
                      </Button>
                    </div>
                    <h2 className="font-serif text-xl font-semibold mt-4 text-kuriftu-charcoal">{profile.fullName}</h2>
                    <div className="flex items-center mt-1 text-kuriftu-gray">
                      <User className="h-4 w-4 mr-1" />
                      <span className="text-sm">{profile.email}</span>
                    </div>
                    <div className="flex items-center mt-1 text-kuriftu-gray">
                      <Calendar className="h-4 w-4 mr-1" />
                      <span className="text-sm">Member since {formatDate(userStats.memberSince)}</span>
                    </div>

                    <div className="w-full mt-6">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center">
                          <Award className="h-5 w-5 text-kuriftu-gold mr-2" />
                          <span className="font-medium text-kuriftu-charcoal">{currentTier.name}</span>
                        </div>
                        <Badge className="bg-kuriftu-gold text-kuriftu-charcoal">
                          {userStats.totalEssencePoints} Points
                        </Badge>
                      </div>
                      <Progress
                        value={getProgressToNextTier()}
                        className="h-2 bg-kuriftu-sand/30"
                        indicatorClassName="bg-kuriftu-green"
                      />
                      {nextTier ? (
                        <div className="flex justify-between mt-1 text-xs text-kuriftu-gray">
                          <span>{currentTier.name}</span>
                          <span>
                            {getPointsToNextTier()} points to {nextTier.name}
                          </span>
                        </div>
                      ) : (
                        <div className="text-center mt-1 text-xs text-kuriftu-gray">
                          <span>You've reached the highest tier!</span>
                        </div>
                      )}
                    </div>

                    <div className="w-full mt-6 space-y-2">
                      <Button
                        variant="outline"
                        className="w-full border-kuriftu-sand text-kuriftu-charcoal hover:bg-kuriftu-sand/20 justify-start"
                        onClick={() => setActiveTab("profile")}
                      >
                        <User className="h-4 w-4 mr-2" />
                        Profile Information
                      </Button>
                      <Button
                        variant="outline"
                        className="w-full border-kuriftu-sand text-kuriftu-charcoal hover:bg-kuriftu-sand/20 justify-start"
                        onClick={() => setActiveTab("activity")}
                      >
                        <Calendar className="h-4 w-4 mr-2" />
                        Activity History
                      </Button>
                      <Button
                        variant="outline"
                        className="w-full border-kuriftu-sand text-kuriftu-charcoal hover:bg-kuriftu-sand/20 justify-start"
                        onClick={() => setActiveTab("membership")}
                      >
                        <Award className="h-4 w-4 mr-2" />
                        Membership & Rewards
                      </Button>
                      <Button
                        variant="outline"
                        className="w-full border-kuriftu-sand text-kuriftu-charcoal hover:bg-kuriftu-sand/20 justify-start"
                      >
                        <LogOut className="h-4 w-4 mr-2" />
                        Sign Out
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Main content */}
            <div className="w-full md:w-2/3">
              {activeTab === "profile" && (
                <Card className="border-kuriftu-sand/30">
                  <CardHeader>
                    <CardTitle className="text-kuriftu-charcoal">Profile Information</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="fullName" className="text-kuriftu-charcoal">
                            Full Name
                          </Label>
                          {isEditing ? (
                            <Input
                              id="fullName"
                              name="fullName"
                              value={profile.fullName}
                              onChange={handleInputChange}
                              className="border-kuriftu-sand focus-visible:ring-kuriftu-green"
                            />
                          ) : (
                            <div className="text-kuriftu-charcoal p-2 border border-transparent rounded-md">
                              {profile.fullName}
                            </div>
                          )}
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="email" className="text-kuriftu-charcoal">
                            Email
                          </Label>
                          {isEditing ? (
                            <Input
                              id="email"
                              name="email"
                              type="email"
                              value={profile.email}
                              onChange={handleInputChange}
                              className="border-kuriftu-sand focus-visible:ring-kuriftu-green"
                            />
                          ) : (
                            <div className="text-kuriftu-charcoal p-2 border border-transparent rounded-md">
                              {profile.email}
                            </div>
                          )}
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="phone" className="text-kuriftu-charcoal">
                            Phone
                          </Label>
                          {isEditing ? (
                            <Input
                              id="phone"
                              name="phone"
                              value={profile.phone}
                              onChange={handleInputChange}
                              className="border-kuriftu-sand focus-visible:ring-kuriftu-green"
                            />
                          ) : (
                            <div className="text-kuriftu-charcoal p-2 border border-transparent rounded-md">
                              {profile.phone}
                            </div>
                          )}
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="birthdate" className="text-kuriftu-charcoal">
                            Date of Birth
                          </Label>
                          {isEditing ? (
                            <Input
                              id="birthdate"
                              name="birthdate"
                              type="date"
                              value={profile.birthdate}
                              onChange={handleInputChange}
                              className="border-kuriftu-sand focus-visible:ring-kuriftu-green"
                            />
                          ) : (
                            <div className="text-kuriftu-charcoal p-2 border border-transparent rounded-md">
                              {new Date(profile.birthdate).toLocaleDateString()}
                            </div>
                          )}
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="nationality" className="text-kuriftu-charcoal">
                            Nationality
                          </Label>
                          {isEditing ? (
                            <Input
                              id="nationality"
                              name="nationality"
                              value={profile.nationality}
                              onChange={handleInputChange}
                              className="border-kuriftu-sand focus-visible:ring-kuriftu-green"
                            />
                          ) : (
                            <div className="text-kuriftu-charcoal p-2 border border-transparent rounded-md">
                              {profile.nationality}
                            </div>
                          )}
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="journeyType" className="text-kuriftu-charcoal">
                            Journey Type
                          </Label>
                          {isEditing ? (
                            <Select value={profile.journeyType} onValueChange={handleJourneyTypeChange}>
                              <SelectTrigger className="border-kuriftu-sand focus-visible:ring-kuriftu-green">
                                <SelectValue placeholder="Select journey type" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="solo">Solo Journey</SelectItem>
                                <SelectItem value="family">Family Bond</SelectItem>
                                <SelectItem value="business">Business Retreat</SelectItem>
                                <SelectItem value="cultural">Cultural Explorer</SelectItem>
                              </SelectContent>
                            </Select>
                          ) : (
                            <div className="text-kuriftu-charcoal p-2 border border-transparent rounded-md">
                              {profile.journeyType === "solo"
                                ? "Solo Journey"
                                : profile.journeyType === "family"
                                  ? "Family Bond"
                                  : profile.journeyType === "business"
                                    ? "Business Retreat"
                                    : "Cultural Explorer"}
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="preferences" className="text-kuriftu-charcoal">
                          Travel Preferences
                        </Label>
                        {isEditing ? (
                          <Textarea
                            id="preferences"
                            name="preferences"
                            value={profile.preferences}
                            onChange={handleInputChange}
                            className="border-kuriftu-sand focus-visible:ring-kuriftu-green min-h-[100px]"
                          />
                        ) : (
                          <div className="text-kuriftu-charcoal p-2 border border-transparent rounded-md">
                            {profile.preferences}
                          </div>
                        )}
                      </div>

                      <div className="space-y-2">
                        <Label className="text-kuriftu-charcoal">Notification Preferences</Label>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-2">
                          <div className="flex items-center justify-between p-3 border border-kuriftu-sand rounded-md">
                            <div>
                              <h4 className="font-medium text-kuriftu-charcoal">Email Notifications</h4>
                              <p className="text-xs text-kuriftu-gray">Receive updates via email</p>
                            </div>
                            {isEditing ? (
                              <div
                                className={`h-6 w-12 rounded-full p-1 transition-colors ${
                                  profile.notificationPreferences.email ? "bg-kuriftu-green" : "bg-kuriftu-gray/30"
                                }`}
                                onClick={() => handleNotificationChange("email")}
                              >
                                <div
                                  className={`h-4 w-4 rounded-full bg-white transition-transform ${
                                    profile.notificationPreferences.email ? "translate-x-6" : ""
                                  }`}
                                />
                              </div>
                            ) : (
                              <Badge
                                variant="outline"
                                className={
                                  profile.notificationPreferences.email
                                    ? "bg-kuriftu-green/10 text-kuriftu-green border-kuriftu-green"
                                    : "bg-kuriftu-gray/10 text-kuriftu-gray border-kuriftu-gray"
                                }
                              >
                                {profile.notificationPreferences.email ? "Enabled" : "Disabled"}
                              </Badge>
                            )}
                          </div>
                          <div className="flex items-center justify-between p-3 border border-kuriftu-sand rounded-md">
                            <div>
                              <h4 className="font-medium text-kuriftu-charcoal">SMS Notifications</h4>
                              <p className="text-xs text-kuriftu-gray">Receive updates via SMS</p>
                            </div>
                            {isEditing ? (
                              <div
                                className={`h-6 w-12 rounded-full p-1 transition-colors ${
                                  profile.notificationPreferences.sms ? "bg-kuriftu-green" : "bg-kuriftu-gray/30"
                                }`}
                                onClick={() => handleNotificationChange("sms")}
                              >
                                <div
                                  className={`h-4 w-4 rounded-full bg-white transition-transform ${
                                    profile.notificationPreferences.sms ? "translate-x-6" : ""
                                  }`}
                                />
                              </div>
                            ) : (
                              <Badge
                                variant="outline"
                                className={
                                  profile.notificationPreferences.sms
                                    ? "bg-kuriftu-green/10 text-kuriftu-green border-kuriftu-green"
                                    : "bg-kuriftu-gray/10 text-kuriftu-gray border-kuriftu-gray"
                                }
                              >
                                {profile.notificationPreferences.sms ? "Enabled" : "Disabled"}
                              </Badge>
                            )}
                          </div>
                          <div className="flex items-center justify-between p-3 border border-kuriftu-sand rounded-md">
                            <div>
                              <h4 className="font-medium text-kuriftu-charcoal">App Notifications</h4>
                              <p className="text-xs text-kuriftu-gray">Receive in-app notifications</p>
                            </div>
                            {isEditing ? (
                              <div
                                className={`h-6 w-12 rounded-full p-1 transition-colors ${
                                  profile.notificationPreferences.app ? "bg-kuriftu-green" : "bg-kuriftu-gray/30"
                                }`}
                                onClick={() => handleNotificationChange("app")}
                              >
                                <div
                                  className={`h-4 w-4 rounded-full bg-white transition-transform ${
                                    profile.notificationPreferences.app ? "translate-x-6" : ""
                                  }`}
                                />
                              </div>
                            ) : (
                              <Badge
                                variant="outline"
                                className={
                                  profile.notificationPreferences.app
                                    ? "bg-kuriftu-green/10 text-kuriftu-green border-kuriftu-green"
                                    : "bg-kuriftu-gray/10 text-kuriftu-gray border-kuriftu-gray"
                                }
                              >
                                {profile.notificationPreferences.app ? "Enabled" : "Disabled"}
                              </Badge>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}

              {activeTab === "activity" && (
                <Card className="border-kuriftu-sand/30">
                  <CardHeader>
                    <CardTitle className="text-kuriftu-charcoal">Activity History</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      {Object.entries(visitsByMonth).map(([month, visits]) => (
                        <div key={month} className="space-y-3">
                          <h3 className="font-serif font-medium text-kuriftu-charcoal border-b border-kuriftu-sand/30 pb-2">
                            {month}
                          </h3>
                          <div className="space-y-3">
                            {visits.map((visit) => {
                              const experience = getExperienceDetails(visit.experienceId)
                              return (
                                <div
                                  key={visit.id}
                                  className="flex items-start p-3 border border-kuriftu-sand/30 rounded-lg hover:bg-kuriftu-sand/5 transition-colors"
                                >
                                  <div
                                    className="h-10 w-10 rounded-full flex items-center justify-center flex-shrink-0 mr-3"
                                    style={{ backgroundColor: `${experience.color}20`, color: experience.color }}
                                  >
                                    {experience.icon === "Coffee" ? (
                                      <Coffee className="h-5 w-5" />
                                    ) : experience.icon === "Spa" ? (
                                      <Spa className="h-5 w-5" />
                                    ) : experience.icon === "Utensils" ? (
                                      <Utensils className="h-5 w-5" />
                                    ) : experience.icon === "Mountain" ? (
                                      <Mountain className="h-5 w-5" />
                                    ) : experience.icon === "Landmark" ? (
                                      <Landmark className="h-5 w-5" />
                                    ) : (
                                      <Award className="h-5 w-5" />
                                    )}
                                  </div>
                                  <div className="flex-1">
                                    <div className="flex items-start justify-between">
                                      <div>
                                        <h4 className="font-medium text-kuriftu-charcoal">{experience.name}</h4>
                                        <div className="flex items-center text-sm text-kuriftu-gray mt-1">
                                          <MapPin className="h-3 w-3 mr-1" />
                                          <span>{getLocationName(visit.locationId)}</span>
                                        </div>
                                      </div>
                                      <div className="flex flex-col items-end">
                                        <div className="text-sm text-kuriftu-gray">{formatDate(visit.date)}</div>
                                        <div className="flex items-center text-kuriftu-green text-sm mt-1">
                                          <Sparkles className="h-3 w-3 mr-1" />
                                          <span>+{visit.points} points</span>
                                        </div>
                                      </div>
                                    </div>
                                    {visit.completed && (
                                      <Badge className="mt-2 bg-kuriftu-green/10 text-kuriftu-green border-kuriftu-green">
                                        <Check className="h-3 w-3 mr-1" />
                                        Completed
                                      </Badge>
                                    )}
                                  </div>
                                </div>
                              )
                            })}
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}

              {activeTab === "membership" && (
                <Card className="border-kuriftu-sand/30">
                  <CardHeader>
                    <CardTitle className="text-kuriftu-charcoal">Membership & Rewards</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      <div>
                        <h3 className="font-serif font-medium text-lg text-kuriftu-charcoal mb-3">Current Tier</h3>
                        <div className="bg-gradient-to-r from-kuriftu-green to-kuriftu-green-light rounded-lg p-4 text-white">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center">
                              <Award className="h-8 w-8 mr-3" />
                              <div>
                                <h4 className="font-serif font-semibold text-xl">{currentTier.name}</h4>
                                <p className="text-white/80 text-sm font-amharic">{currentTier.amharicName}</p>
                              </div>
                            </div>
                            <Badge className="bg-white text-kuriftu-green">{userStats.totalEssencePoints} Points</Badge>
                          </div>
                          <div className="mt-4">
                            <h5 className="font-medium mb-2">Benefits:</h5>
                            <ul className="space-y-1">
                              {currentTier.benefits.map((benefit, index) => (
                                <li key={index} className="flex items-center text-sm">
                                  <Check className="h-4 w-4 mr-2 flex-shrink-0" />
                                  <span>{benefit}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </div>

                      {nextTier && (
                        <div>
                          <h3 className="font-serif font-medium text-lg text-kuriftu-charcoal mb-3">Next Tier</h3>
                          <div className="border border-kuriftu-sand/30 rounded-lg p-4">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center">
                                <div className="h-8 w-8 rounded-full bg-kuriftu-sand/30 flex items-center justify-center mr-3">
                                  <Award className="h-5 w-5 text-kuriftu-charcoal/70" />
                                </div>
                                <div>
                                  <h4 className="font-serif font-medium text-lg text-kuriftu-charcoal">
                                    {nextTier.name}
                                  </h4>
                                  <p className="text-kuriftu-gray text-sm font-amharic">{nextTier.amharicName}</p>
                                </div>
                              </div>
                              <Badge variant="outline" className="border-kuriftu-sand text-kuriftu-charcoal">
                                {nextTier.pointsRequired} Points Required
                              </Badge>
                            </div>
                            <div className="mt-4">
                              <div className="flex justify-between text-sm text-kuriftu-charcoal mb-2">
                                <span>Your progress</span>
                                <span>
                                  {userStats.totalEssencePoints} / {nextTier.pointsRequired} points
                                </span>
                              </div>
                              <Progress
                                value={getProgressToNextTier()}
                                className="h-2 bg-kuriftu-sand/30"
                                indicatorClassName="bg-kuriftu-green"
                              />
                              <p className="text-sm text-kuriftu-gray mt-2">
                                You need {getPointsToNextTier()} more points to reach {nextTier.name}
                              </p>
                            </div>
                            <div className="mt-4">
                              <h5 className="font-medium mb-2 text-kuriftu-charcoal">Additional Benefits:</h5>
                              <ul className="space-y-1">
                                {nextTier.benefits
                                  .filter((benefit) => !currentTier.benefits.includes(benefit))
                                  .map((benefit, index) => (
                                    <li key={index} className="flex items-center text-sm text-kuriftu-charcoal">
                                      <Lock className="h-4 w-4 mr-2 flex-shrink-0 text-kuriftu-gray" />
                                      <span>{benefit}</span>
                                    </li>
                                  ))}
                              </ul>
                            </div>
                          </div>
                        </div>
                      )}

                      <div>
                        <h3 className="font-serif font-medium text-lg text-kuriftu-charcoal mb-3">Available Rewards</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="border border-kuriftu-gold/30 rounded-lg p-4 bg-gradient-to-br from-kuriftu-gold/5 to-transparent">
                            <div className="flex items-center justify-between mb-3">
                              <h4 className="font-medium text-kuriftu-charcoal">Free Dessert</h4>
                              <Badge className="bg-kuriftu-gold text-kuriftu-charcoal">100 Points</Badge>
                            </div>
                            <p className="text-sm text-kuriftu-charcoal/70 mb-4">
                              Enjoy a complimentary dessert at any Kuriftu restaurant
                            </p>
                            <Button className="w-full bg-kuriftu-gold text-kuriftu-charcoal hover:bg-kuriftu-gold/90">
                              Redeem Reward
                            </Button>
                          </div>
                          <div className="border border-kuriftu-gold/30 rounded-lg p-4 bg-gradient-to-br from-kuriftu-gold/5 to-transparent">
                            <div className="flex items-center justify-between mb-3">
                              <h4 className="font-medium text-kuriftu-charcoal">Spa Discount</h4>
                              <Badge className="bg-kuriftu-gold text-kuriftu-charcoal">250 Points</Badge>
                            </div>
                            <p className="text-sm text-kuriftu-charcoal/70 mb-4">Get 20% off your next spa treatment</p>
                            <Button className="w-full bg-kuriftu-gold text-kuriftu-charcoal hover:bg-kuriftu-gold/90">
                              Redeem Reward
                            </Button>
                          </div>
                          <div className="border border-kuriftu-sand/30 rounded-lg p-4 bg-kuriftu-sand/5">
                            <div className="flex items-center justify-between mb-3">
                              <h4 className="font-medium text-kuriftu-charcoal">Room Upgrade</h4>
                              <Badge variant="outline" className="border-kuriftu-sand text-kuriftu-charcoal">
                                500 Points
                              </Badge>
                            </div>
                            <p className="text-sm text-kuriftu-charcoal/70 mb-4">
                              Upgrade to a suite for your next stay
                            </p>
                            <Button
                              variant="outline"
                              className="w-full border-kuriftu-sand text-kuriftu-charcoal hover:bg-kuriftu-sand/20"
                              disabled
                            >
                              <Lock className="h-4 w-4 mr-2" />
                              Need {500 - userStats.totalEssencePoints} more points
                            </Button>
                          </div>
                          <div className="border border-kuriftu-sand/30 rounded-lg p-4 bg-kuriftu-sand/5">
                            <div className="flex items-center justify-between mb-3">
                              <h4 className="font-medium text-kuriftu-charcoal">Free Night Stay</h4>
                              <Badge variant="outline" className="border-kuriftu-sand text-kuriftu-charcoal">
                                1000 Points
                              </Badge>
                            </div>
                            <p className="text-sm text-kuriftu-charcoal/70 mb-4">
                              Enjoy a complimentary night at any Kuriftu resort
                            </p>
                            <Button
                              variant="outline"
                              className="w-full border-kuriftu-sand text-kuriftu-charcoal hover:bg-kuriftu-sand/20"
                              disabled
                            >
                              <Lock className="h-4 w-4 mr-2" />
                              Need {1000 - userStats.totalEssencePoints} more points
                            </Button>
                          </div>
                        </div>
                      </div>

                      <div>
                        <h3 className="font-serif font-medium text-lg text-kuriftu-charcoal mb-3">Redeemed Rewards</h3>
                        <div className="border border-kuriftu-sand/30 rounded-lg p-4">
                          <div className="text-center py-8">
                            <div className="mx-auto h-12 w-12 rounded-full bg-kuriftu-sand/20 flex items-center justify-center mb-3">
                              <Award className="h-6 w-6 text-kuriftu-gray" />
                            </div>
                            <h4 className="font-medium text-kuriftu-charcoal mb-1">No Redeemed Rewards Yet</h4>
                            <p className="text-sm text-kuriftu-gray">Your redeemed rewards will appear here</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
