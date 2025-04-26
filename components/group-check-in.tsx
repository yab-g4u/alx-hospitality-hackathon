"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { User, Users, Briefcase, Music, Award, UserPlus, Check, QrCode } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

interface GroupCheckInProps {
  onClose?: () => void
  onGenerateQR?: (groupType: string, groupSize: number, groupName: string) => void
}

export function GroupCheckIn({ onClose, onGenerateQR }: GroupCheckInProps) {
  const [step, setStep] = useState(1)
  const [groupType, setGroupType] = useState<string | null>(null)
  const [groupSize, setGroupSize] = useState<number>(1)
  const [groupName, setGroupName] = useState("")

  const groupTypes = [
    {
      id: "individual",
      name: "Individual",
      amharicName: "ግለሰብ",
      description: "Solo travelers",
      icon: <User className="h-6 w-6" />,
      benefit: "Solo spa discounts",
      reward: "Independent Soul badge",
      color: "#5A3E36",
    },
    {
      id: "family",
      name: "Couple/Family",
      amharicName: "ቤተሰብ",
      description: "Couples or families",
      icon: <Users className="h-6 w-6" />,
      benefit: "Group Essence pool, family challenges",
      reward: "Family Explorers stamp",
      color: "#0E7E62",
    },
    {
      id: "business",
      name: "Business Group",
      amharicName: "የንግድ ቡድን",
      description: "Company retreat, meetings",
      icon: <Briefcase className="h-6 w-6" />,
      benefit: "Priority lounge, meeting room vouchers",
      reward: "Corporate Voyager badge",
      color: "#D4AF37",
    },
    {
      id: "festival",
      name: "Festival Attendee",
      amharicName: "የፌስቲቫል ተሳታፊ",
      description: "Cultural or music fest",
      icon: <Music className="h-6 w-6" />,
      benefit: "Free entry tokens, photo-booth QR logs",
      reward: "Cultural Flame stamp",
      color: "#CD5C5C",
    },
    {
      id: "competition",
      name: "Competition Participant",
      amharicName: "የውድድር ተሳታፊ",
      description: "Sports, eGaming, hackathons",
      icon: <Award className="h-6 w-6" />,
      benefit: "Earn double Essence for challenges",
      reward: "Challenge Champion stamp",
      color: "#9C27B0",
    },
    {
      id: "custom",
      name: "Custom Meetup",
      amharicName: "ልዩ ስብሰባ",
      description: "Friends or club hangouts",
      icon: <UserPlus className="h-6 w-6" />,
      benefit: "Flexible group deals, shared milestones",
      reward: "Tribe Together stamp",
      color: "#1E88E5",
    },
  ]

  const handleContinue = () => {
    if (step === 1 && groupType) {
      setStep(2)
    } else if (step === 2) {
      setStep(3)
    }
  }

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1)
    } else {
      onClose?.()
    }
  }

  const handleGenerateQR = () => {
    if (groupType && onGenerateQR) {
      onGenerateQR(groupType, groupSize, groupName)
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <motion.div
        className="relative w-full max-w-md bg-kuriftu-brown rounded-xl shadow-2xl overflow-hidden"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        transition={{ duration: 0.3 }}
      >
        {/* Ethiopian pattern overlay */}
        <div className="absolute inset-0 bg-ethiopian-pattern opacity-10 pointer-events-none" />

        {/* Header */}
        <div className="bg-kuriftu-gold text-kuriftu-brown p-4">
          <div className="flex items-center justify-between">
            <h2 className="font-serif text-lg font-semibold">Group Check-in</h2>
            <div className="text-sm font-amharic">የቡድን ምዝገባ</div>
          </div>
        </div>

        <div className="p-6">
          {/* Progress steps */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center">
              <div
                className={`flex h-8 w-8 items-center justify-center rounded-full ${
                  step >= 1 ? "bg-kuriftu-gold text-kuriftu-brown" : "bg-white/20 text-white/50"
                }`}
              >
                {step > 1 ? <Check className="h-4 w-4" /> : 1}
              </div>
              <div className={`h-1 w-8 ${step >= 2 ? "bg-kuriftu-gold" : "bg-white/20"}`} />
              <div
                className={`flex h-8 w-8 items-center justify-center rounded-full ${
                  step >= 2 ? "bg-kuriftu-gold text-kuriftu-brown" : "bg-white/20 text-white/50"
                }`}
              >
                {step > 2 ? <Check className="h-4 w-4" /> : 2}
              </div>
              <div className={`h-1 w-8 ${step >= 3 ? "bg-kuriftu-gold" : "bg-white/20"}`} />
              <div
                className={`flex h-8 w-8 items-center justify-center rounded-full ${
                  step >= 3 ? "bg-kuriftu-gold text-kuriftu-brown" : "bg-white/20 text-white/50"
                }`}
              >
                3
              </div>
            </div>
          </div>

          {/* Step 1: Choose Group Type */}
          {step === 1 && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <h3 className="font-serif text-xl font-semibold text-white mb-2">Choose Your Journey Type</h3>
              <p className="text-white/70 mb-4">Select how you're visiting Kuriftu today</p>

              <RadioGroup value={groupType || ""} onValueChange={setGroupType} className="space-y-3">
                {groupTypes.map((type) => (
                  <Card
                    key={type.id}
                    className={`border ${
                      groupType === type.id ? "border-kuriftu-gold bg-white/10" : "border-white/10 bg-white/5"
                    } hover:bg-white/10 transition-colors cursor-pointer`}
                    onClick={() => setGroupType(type.id)}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-start gap-3">
                        <RadioGroupItem value={type.id} id={type.id} className="mt-1" />
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <Label htmlFor={type.id} className="font-medium text-white cursor-pointer">
                              {type.name}
                            </Label>
                            <div
                              className="h-8 w-8 rounded-full flex items-center justify-center"
                              style={{ backgroundColor: `${type.color}20`, color: type.color }}
                            >
                              {type.icon}
                            </div>
                          </div>
                          <p className="text-xs text-white/70 mt-1">{type.description}</p>
                          <p className="text-xs font-amharic text-kuriftu-gold mt-1">{type.amharicName}</p>

                          {groupType === type.id && (
                            <motion.div
                              className="mt-3 pt-3 border-t border-white/10"
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: "auto" }}
                              transition={{ duration: 0.3 }}
                            >
                              <div className="grid grid-cols-2 gap-2 text-xs">
                                <div>
                                  <p className="text-white/50">Unique Benefit</p>
                                  <p className="text-white">{type.benefit}</p>
                                </div>
                                <div>
                                  <p className="text-white/50">Passport Reward</p>
                                  <p className="text-white">{type.reward}</p>
                                </div>
                              </div>
                            </motion.div>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </RadioGroup>
            </motion.div>
          )}

          {/* Step 2: Group Details */}
          {step === 2 && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <h3 className="font-serif text-xl font-semibold text-white mb-2">Group Details</h3>
              <p className="text-white/70 mb-4">Tell us about your group</p>

              <div className="space-y-4">
                <div>
                  <Label htmlFor="groupName" className="text-white">
                    Group Name
                  </Label>
                  <Input
                    id="groupName"
                    value={groupName}
                    onChange={(e) => setGroupName(e.target.value)}
                    placeholder="Enter a name for your group"
                    className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
                  />
                </div>

                <div>
                  <Label htmlFor="groupSize" className="text-white">
                    Number of People
                  </Label>
                  <div className="grid grid-cols-5 gap-2 mt-1">
                    {[1, 2, 3, 4, "5+"].map((num) => (
                      <Button
                        key={num}
                        type="button"
                        variant={groupSize === (typeof num === "string" ? 5 : num) ? "default" : "outline"}
                        className={
                          groupSize === (typeof num === "string" ? 5 : num)
                            ? "bg-kuriftu-gold text-kuriftu-brown hover:bg-kuriftu-gold/90"
                            : "border-white/20 text-white hover:bg-white/10"
                        }
                        onClick={() => setGroupSize(typeof num === "string" ? 5 : num)}
                      >
                        {num}
                      </Button>
                    ))}
                  </div>
                </div>

                {/* Show additional fields based on group type */}
                {groupType === "family" && (
                  <div>
                    <Label className="text-white">Family Members</Label>
                    <div className="space-y-2 mt-1">
                      <div className="flex items-center gap-2">
                        <Input
                          placeholder="Adult 1"
                          className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
                        />
                        <Button variant="ghost" size="icon" className="text-white">
                          <UserPlus className="h-4 w-4" />
                        </Button>
                      </div>
                      <div className="flex items-center gap-2">
                        <Input
                          placeholder="Adult 2"
                          className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
                        />
                        <Button variant="ghost" size="icon" className="text-white">
                          <UserPlus className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                )}

                {groupType === "business" && (
                  <div>
                    <Label className="text-white">Company Name</Label>
                    <Input
                      placeholder="Enter company name"
                      className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
                    />
                  </div>
                )}
              </div>
            </motion.div>
          )}

          {/* Step 3: Confirmation */}
          {step === 3 && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
              <div className="text-center mb-6">
                <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-kuriftu-gold/20 text-kuriftu-gold mb-4">
                  <Check className="h-8 w-8" />
                </div>
                <h3 className="font-serif text-xl font-semibold text-white mb-2">Ready for Check-in</h3>
                <p className="text-white/70">Your group check-in details are ready</p>
              </div>

              <Card className="bg-white/10 border-white/20 mb-6">
                <CardContent className="p-4">
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <div className="text-sm text-white/70">Journey Type</div>
                      <div className="text-sm font-medium text-white">
                        {groupTypes.find((t) => t.id === groupType)?.name}
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <div className="text-sm text-white/70">Group Name</div>
                      <div className="text-sm font-medium text-white">{groupName || "Not specified"}</div>
                    </div>
                    <div className="flex justify-between items-center">
                      <div className="text-sm text-white/70">Group Size</div>
                      <div className="text-sm font-medium text-white">{groupSize} people</div>
                    </div>
                    <div className="flex justify-between items-center pt-3 border-t border-white/10">
                      <div className="text-sm font-medium text-white">Special Benefit</div>
                      <div className="text-sm text-kuriftu-gold">
                        {groupTypes.find((t) => t.id === groupType)?.benefit}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <div className="text-center">
                <Button
                  onClick={handleGenerateQR}
                  className="bg-kuriftu-gold text-kuriftu-brown hover:bg-kuriftu-gold/90"
                >
                  <QrCode className="h-4 w-4 mr-2" />
                  Generate Group QR Code
                </Button>
                <p className="mt-2 text-xs text-white/50">This QR code will be used for your entire group</p>
              </div>
            </motion.div>
          )}

          {/* Navigation buttons */}
          <div className="mt-6 flex justify-between">
            <Button variant="outline" onClick={handleBack} className="border-white/20 text-white hover:bg-white/10">
              {step === 1 ? "Cancel" : "Back"}
            </Button>

            {step < 3 && (
              <Button
                onClick={handleContinue}
                disabled={step === 1 && !groupType}
                className="bg-kuriftu-gold text-kuriftu-brown hover:bg-kuriftu-gold/90 disabled:opacity-50"
              >
                Continue
              </Button>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  )
}
