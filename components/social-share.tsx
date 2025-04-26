"use client"

import type React from "react"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Share2, X, Camera, Download, Copy, Check, Sparkles, Coffee, Landmark, Heart, Utensils } from "lucide-react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Stamp } from "@/components/stamp"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"

// Types for our social sharing system
type ShareableItem = {
  id: string
  type: "stamp" | "badge" | "passport" | "tier"
  title: string
  description: string
  icon: React.ElementType
  image?: string
  previewComponent: React.ReactNode
}

// Sample data
const shareableItems: ShareableItem[] = [
  {
    id: "lake-tana-stamp",
    type: "stamp",
    title: "Lake Tana Retreat Stamp",
    description: "Share your visit to Kuriftu Resort & Spa, Bahir Dar",
    icon: Landmark,
    previewComponent: (
      <div className="relative">
        <Stamp icon={Landmark} text="Lake Tana Retreat" subtext="Oct 15, 2023" color="amber" size="lg" />
        <div className="absolute -bottom-1 -right-1 bg-white rounded-full p-1 shadow-sm">
          <div className="w-5 h-5 rounded-full bg-amber-600 flex items-center justify-center">
            <Sparkles className="h-3 w-3 text-white" />
          </div>
        </div>
      </div>
    ),
  },
  {
    id: "spa-stamp",
    type: "stamp",
    title: "Healing Waters Stamp",
    description: "Share your spa experience at Kuriftu",
    icon: Heart,
    previewComponent: (
      <div className="relative">
        <Stamp icon={Heart} text="Healing Waters" subtext="Nov 2, 2023" color="amber" size="lg" />
        <div className="absolute -bottom-1 -right-1 bg-white rounded-full p-1 shadow-sm">
          <div className="w-5 h-5 rounded-full bg-amber-600 flex items-center justify-center">
            <Sparkles className="h-3 w-3 text-white" />
          </div>
        </div>
      </div>
    ),
  },
  {
    id: "dining-stamp",
    type: "stamp",
    title: "Taste of Ethiopia Stamp",
    description: "Share your dining experience at Kuriftu",
    icon: Utensils,
    previewComponent: (
      <div className="relative">
        <Stamp icon={Utensils} text="Taste of Ethiopia" subtext="Dec 10, 2023" color="amber" size="lg" />
        <div className="absolute -bottom-1 -right-1 bg-white rounded-full p-1 shadow-sm">
          <div className="w-5 h-5 rounded-full bg-amber-600 flex items-center justify-center">
            <Sparkles className="h-3 w-3 text-white" />
          </div>
        </div>
      </div>
    ),
  },
  {
    id: "coffee-stamp",
    type: "stamp",
    title: "Coffee Origins Stamp",
    description: "Share your coffee ceremony experience",
    icon: Coffee,
    previewComponent: (
      <div className="relative">
        <Stamp icon={Coffee} text="Coffee Origins" subtext="Coming Soon" color="gray" size="lg" />
        <div className="absolute top-0 right-0 left-0 bottom-0 flex items-center justify-center bg-black/20 rounded-lg">
          <Badge className="bg-amber-600">Unlock this experience</Badge>
        </div>
      </div>
    ),
  },
  {
    id: "pathfinder-tier",
    type: "tier",
    title: "Pathfinder Tier",
    description: "Share your Kuriftu loyalty tier status",
    icon: Sparkles,
    previewComponent: (
      <div className="bg-gradient-to-r from-amber-700 to-amber-500 p-4 rounded-lg text-white text-center">
        <h3 className="text-xl font-bold mb-1">Pathfinder Tier</h3>
        <p className="text-amber-100 mb-3">መንገድ ፈላጊ</p>
        <div className="flex justify-center mb-3">
          <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center">
            <Sparkles className="h-8 w-8 text-white" />
          </div>
        </div>
        <p className="text-sm">175 Essence Points</p>
        <div className="mt-2 text-xs bg-white/20 py-1 px-2 rounded inline-block">Shared via Kuriftu App</div>
      </div>
    ),
  },
  {
    id: "journey-summary",
    type: "passport",
    title: "Journey Summary",
    description: "Share your overall Kuriftu journey progress",
    icon: Landmark,
    previewComponent: (
      <div className="bg-[url('/patterns/ethiopian-pattern.svg')] bg-repeat bg-amber-100 p-4 rounded-lg border-2 border-amber-600">
        <div className="bg-white/90 p-4 rounded-lg">
          <h3 className="text-lg font-bold text-amber-800 mb-1">My Kuriftu Journey</h3>
          <div className="flex justify-between items-center mb-3">
            <Badge className="bg-amber-600">Pathfinder Tier</Badge>
            <div className="flex items-center gap-1 text-amber-800">
              <Sparkles className="h-4 w-4" />
              <span className="font-bold">175</span>
            </div>
          </div>
          <div className="flex gap-2 mb-3">
            <div className="w-8 h-8 rounded-full bg-amber-600 flex items-center justify-center">
              <Landmark className="h-5 w-5 text-white" />
            </div>
            <div className="w-8 h-8 rounded-full bg-amber-600 flex items-center justify-center">
              <Heart className="h-5 w-5 text-white" />
            </div>
            <div className="w-8 h-8 rounded-full bg-amber-600 flex items-center justify-center">
              <Utensils className="h-5 w-5 text-white" />
            </div>
            <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center">
              <Coffee className="h-5 w-5 text-white" />
            </div>
          </div>
          <p className="text-sm text-amber-800">3 experiences completed • 5 total visits</p>
          <div className="mt-2 text-xs text-amber-600 text-center">Shared via Kuriftu App</div>
        </div>
      </div>
    ),
  },
]

// Social platforms
const socialPlatforms = [
  {
    name: "Facebook",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="#1877F2">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
      </svg>
    ),
  },
  {
    name: "Twitter",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="#1DA1F2">
        <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723 10.054 10.054 0 01-3.127 1.184 4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
      </svg>
    ),
  },
  {
    name: "Instagram",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="#E4405F">
        <path d="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.899 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.379-.899-.421-.419-.69-.824-.9-1.38-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03zm0 3.678c-3.405 0-6.162 2.76-6.162 6.162 0 3.405 2.76 6.162 6.162 6.162 3.405 0 6.162-2.76 6.162-6.162 0-3.405-2.76-6.162-6.162-6.162zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm7.846-10.405c0 .795-.646 1.44-1.44 1.44-.795 0-1.44-.646-1.44-1.44 0-.794.646-1.439 1.44-1.439.793-.001 1.44.645 1.44 1.439z" />
      </svg>
    ),
  },
]

export function SocialShare() {
  const [selectedItem, setSelectedItem] = useState<ShareableItem | null>(null)
  const [showShareModal, setShowShareModal] = useState(false)
  const [message, setMessage] = useState("")
  const [copied, setCopied] = useState(false)
  const [shareComplete, setShareComplete] = useState(false)

  // Handle item selection
  const selectItem = (item: ShareableItem) => {
    setSelectedItem(item)
    setShowShareModal(true)
    setMessage(`Check out my ${item.title} from my Kuriftu journey! #KuriftuExperience #EthiopianLuxury`)
  }

  // Handle share
  const handleShare = (platform: string) => {
    // In a real app, this would integrate with the platform's sharing API
    console.log(`Sharing to ${platform}:`, {
      item: selectedItem,
      message,
    })

    // Simulate sharing
    setTimeout(() => {
      setShareComplete(true)

      // Reset after a delay
      setTimeout(() => {
        setShowShareModal(false)
        setShareComplete(false)
        setCopied(false)
      }, 2000)
    }, 1000)
  }

  // Copy to clipboard
  const copyToClipboard = () => {
    if (selectedItem) {
      navigator.clipboard.writeText(message)
      setCopied(true)

      // Reset copied state after a delay
      setTimeout(() => {
        setCopied(false)
      }, 2000)
    }
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Share2 className="h-5 w-5 text-amber-600" />
          <span>Share Your Journey</span>
        </CardTitle>
        <CardDescription>Share your stamps, badges, and achievements on social media</CardDescription>
      </CardHeader>

      <CardContent>
        <Tabs defaultValue="stamps">
          <TabsList className="grid grid-cols-3 mb-6">
            <TabsTrigger value="stamps">Stamps</TabsTrigger>
            <TabsTrigger value="achievements">Achievements</TabsTrigger>
            <TabsTrigger value="journey">Journey</TabsTrigger>
          </TabsList>

          <TabsContent value="stamps" className="space-y-4">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {shareableItems
                .filter((item) => item.type === "stamp")
                .map((item) => (
                  <div
                    key={item.id}
                    className="cursor-pointer hover:scale-105 transition-transform"
                    onClick={() => selectItem(item)}
                  >
                    {item.previewComponent}
                  </div>
                ))}
            </div>
          </TabsContent>

          <TabsContent value="achievements" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {shareableItems
                .filter((item) => item.type === "tier" || item.type === "badge")
                .map((item) => (
                  <div
                    key={item.id}
                    className="cursor-pointer hover:scale-105 transition-transform"
                    onClick={() => selectItem(item)}
                  >
                    {item.previewComponent}
                  </div>
                ))}
            </div>
          </TabsContent>

          <TabsContent value="journey" className="space-y-4">
            <div className="grid grid-cols-1 gap-4">
              {shareableItems
                .filter((item) => item.type === "passport")
                .map((item) => (
                  <div
                    key={item.id}
                    className="cursor-pointer hover:scale-105 transition-transform"
                    onClick={() => selectItem(item)}
                  >
                    {item.previewComponent}
                  </div>
                ))}
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>

      <CardFooter className="flex justify-between">
        <p className="text-sm text-muted-foreground">Earn 5 Essence Points for your first share</p>
        <Button
          variant="outline"
          className="border-amber-300 text-amber-700 hover:bg-amber-50"
          onClick={() => setShowShareModal(true)}
        >
          <Camera className="h-4 w-4 mr-2" />
          Take Screenshot
        </Button>
      </CardFooter>

      {/* Share modal */}
      <AnimatePresence>
        {showShareModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/70 flex items-center justify-center z-50"
            onClick={() => !shareComplete && setShowShareModal(false)}
          >
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 50, opacity: 0 }}
              className="bg-white rounded-lg p-6 max-w-md w-full mx-4"
              onClick={(e) => e.stopPropagation()}
            >
              {shareComplete ? (
                <div className="text-center py-8">
                  <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
                    <Check className="h-8 w-8 text-green-600" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Shared Successfully!</h3>
                  <p className="text-gray-600">You've earned 5 Essence Points for sharing your journey.</p>
                </div>
              ) : (
                <>
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-xl font-bold text-gray-900">
                      {selectedItem ? `Share ${selectedItem.title}` : "Share Your Journey"}
                    </h3>
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
                    {selectedItem && (
                      <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                        <p className="text-sm text-gray-600 mb-2">Preview</p>
                        <div className="flex justify-center">{selectedItem.previewComponent}</div>
                      </div>
                    )}

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Add a message</label>
                      <Textarea
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="Share your thoughts about your Kuriftu experience..."
                        className="border-amber-300 focus:ring-amber-500"
                      />
                    </div>

                    <div className="space-y-2">
                      <p className="text-sm font-medium text-gray-700">Share to</p>
                      <div className="flex gap-2">
                        {socialPlatforms.map((platform) => (
                          <Button
                            key={platform.name}
                            variant="outline"
                            className="flex-1 gap-2"
                            onClick={() => handleShare(platform.name)}
                          >
                            {platform.icon}
                            {platform.name}
                          </Button>
                        ))}
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <Button variant="outline" className="flex-1 gap-2" onClick={copyToClipboard}>
                        {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                        {copied ? "Copied" : "Copy Text"}
                      </Button>
                      <Button variant="outline" className="flex-1 gap-2">
                        <Download className="h-4 w-4" />
                        Save Image
                      </Button>
                    </div>
                  </div>
                </>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </Card>
  )
}
