"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { useRouter } from "next/navigation"
import { ChevronLeft, Calendar, Users, Check, MapPin, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { EnhancedQR } from "@/components/enhanced-qr"
import { resortLocations, experienceTypes } from "@/lib/data"

export default function Booking() {
  const router = useRouter()
  const [step, setStep] = useState(1)
  const [experience, setExperience] = useState<string | null>(null)
  const [resort, setResort] = useState<string | null>(null)
  const [guests, setGuests] = useState<string | null>(null)
  const [date, setDate] = useState<string | null>(null)
  const [showQR, setShowQR] = useState(false)

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1)
    } else {
      router.push("/dashboard")
    }
  }

  const handleContinue = () => {
    if (step < 4) {
      setStep(step + 1)
    }
  }

  const handleGenerateQR = () => {
    setShowQR(true)
  }

  const handleQRSuccess = () => {
    router.push("/dashboard")
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="bg-brown text-white p-4 sticky top-0 z-30">
        <div className="container mx-auto">
          <div className="flex items-center">
            <Button variant="ghost" size="icon" className="mr-2 text-white hover:bg-brown-light" onClick={handleBack}>
              <ChevronLeft className="h-5 w-5" />
              <span className="sr-only">Back</span>
            </Button>
            <h1 className="font-serif text-xl font-bold">Book Experience</h1>
          </div>
        </div>
      </header>

      <main className="container mx-auto p-4 md:p-6">
        <div className="w-full max-w-md mx-auto">
          {/* Progress indicator */}
          <div className="mb-8">
            <div className="flex items-center justify-between">
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className={`flex h-8 w-8 items-center justify-center rounded-full ${
                    i < step
                      ? "bg-emerald text-white"
                      : i === step
                        ? "bg-brown text-white"
                        : "bg-muted text-muted-foreground"
                  }`}
                >
                  {i < step ? <Check className="h-4 w-4" /> : i}
                </div>
              ))}
            </div>
            <div className="mt-2 grid grid-cols-4 text-xs">
              <div className="text-center">Experience</div>
              <div className="text-center">Resort</div>
              <div className="text-center">Details</div>
              <div className="text-center">Confirm</div>
            </div>
          </div>

          {/* Step 1: Choose Experience */}
          {step === 1 && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <h2 className="font-serif text-xl font-semibold text-brown mb-4">Choose Experience</h2>

              <RadioGroup value={experience || ""} onValueChange={setExperience}>
                <div className="space-y-3">
                  {experienceTypes.map((item) => (
                    <Card
                      key={item.id}
                      className={`border ${experience === item.id ? "border-gold" : "border-border"}`}
                    >
                      <CardContent className="p-4">
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value={item.id} id={item.id} />
                          <Label htmlFor={item.id} className="flex-1 cursor-pointer">
                            <div className="flex items-center justify-between">
                              <span>{item.name}</span>
                              <span className="text-xs text-emerald">+{item.essencePoints} pts</span>
                            </div>
                            <p className="text-xs text-muted-foreground mt-1">{item.description}</p>
                          </Label>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </RadioGroup>

              <div className="mt-6 flex justify-end">
                <Button
                  disabled={!experience}
                  onClick={handleContinue}
                  className="bg-brown text-white hover:bg-brown-dark"
                >
                  Continue
                </Button>
              </div>
            </motion.div>
          )}

          {/* Step 2: Choose Resort */}
          {step === 2 && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <h2 className="font-serif text-xl font-semibold text-brown mb-4">Choose Resort</h2>

              <div className="flex items-center mb-4">
                <MapPin className="h-5 w-5 text-muted-foreground mr-2" />
                <span className="text-sm text-muted-foreground">Where would you like to visit?</span>
              </div>

              <RadioGroup value={resort || ""} onValueChange={setResort}>
                <div className="space-y-3">
                  {resortLocations.map((item) => (
                    <Card key={item.id} className={`border ${resort === item.id ? "border-gold" : "border-border"}`}>
                      <CardContent className="p-4">
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value={item.id} id={`resort-${item.id}`} />
                          <Label htmlFor={`resort-${item.id}`} className="flex-1 cursor-pointer">
                            <div className="flex items-center justify-between">
                              <span>{item.name}</span>
                              <div className="flex items-center">
                                <Sparkles className="h-3 w-3 text-gold mr-1" />
                                <span className="text-xs text-gold">{item.rating}</span>
                              </div>
                            </div>
                            <p className="text-xs text-muted-foreground mt-1">{item.address}</p>
                          </Label>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </RadioGroup>

              <div className="mt-6 flex justify-end">
                <Button disabled={!resort} onClick={handleContinue} className="bg-brown text-white hover:bg-brown-dark">
                  Continue
                </Button>
              </div>
            </motion.div>
          )}

          {/* Step 3: Choose Details (Guests & Date) */}
          {step === 3 && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <h2 className="font-serif text-xl font-semibold text-brown mb-4">Visit Details</h2>

              <div className="space-y-6">
                <div>
                  <div className="flex items-center mb-2">
                    <Users className="h-5 w-5 text-muted-foreground mr-2" />
                    <span className="text-sm font-medium">Number of Guests</span>
                  </div>

                  <RadioGroup value={guests || ""} onValueChange={setGuests}>
                    <div className="grid grid-cols-4 gap-3">
                      {["1", "2", "3", "4+"].map((num) => (
                        <Card key={num} className={`border ${guests === num ? "border-gold" : "border-border"}`}>
                          <CardContent className="p-3 text-center">
                            <div className="flex flex-col items-center">
                              <RadioGroupItem value={num} id={`guests-${num}`} className="sr-only" />
                              <Label
                                htmlFor={`guests-${num}`}
                                className="cursor-pointer w-full h-full flex items-center justify-center"
                              >
                                {num}
                              </Label>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </RadioGroup>
                </div>

                <div>
                  <div className="flex items-center mb-2">
                    <Calendar className="h-5 w-5 text-muted-foreground mr-2" />
                    <span className="text-sm font-medium">When would you like to visit?</span>
                  </div>

                  <RadioGroup value={date || ""} onValueChange={setDate}>
                    <div className="space-y-3">
                      {[
                        { id: "today", label: "Today", sublabel: "April 11, 2025" },
                        { id: "tomorrow", label: "Tomorrow", sublabel: "April 12, 2025" },
                        { id: "weekend", label: "This Weekend", sublabel: "April 13-14, 2025" },
                        { id: "custom", label: "Custom Date", sublabel: "Choose a specific date" },
                      ].map((item) => (
                        <Card key={item.id} className={`border ${date === item.id ? "border-gold" : "border-border"}`}>
                          <CardContent className="p-4">
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value={item.id} id={item.id} />
                              <Label htmlFor={item.id} className="flex-1 cursor-pointer">
                                <div>
                                  <div>{item.label}</div>
                                  <div className="text-xs text-muted-foreground">{item.sublabel}</div>
                                </div>
                              </Label>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </RadioGroup>
                </div>
              </div>

              <div className="mt-6 flex justify-end">
                <Button
                  disabled={!guests || !date}
                  onClick={handleContinue}
                  className="bg-brown text-white hover:bg-brown-dark"
                >
                  Continue
                </Button>
              </div>
            </motion.div>
          )}

          {/* Step 4: Confirmation & QR Code */}
          {step === 4 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-center"
            >
              <div className="mb-6">
                <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-emerald/10 text-emerald mb-4">
                  <Check className="h-8 w-8" />
                </div>
                <h2 className="font-serif text-2xl font-semibold text-brown mb-2">Booking Confirmed!</h2>
                <p className="text-muted-foreground">Your booking has been confirmed</p>
              </div>

              <div className="bg-white rounded-lg border border-border p-4 mb-6">
                <div className="space-y-4 text-left">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Sparkles className="h-4 w-4 text-gold" />
                      <span className="text-sm text-muted-foreground">Experience</span>
                    </div>
                    <span className="text-sm font-medium">
                      {experienceTypes.find((e) => e.id === experience)?.name || "Selected Experience"}
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm text-muted-foreground">Resort</span>
                    </div>
                    <span className="text-sm font-medium">
                      {resortLocations.find((r) => r.id === resort)?.name || "Selected Resort"}
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm text-muted-foreground">Date</span>
                    </div>
                    <span className="text-sm font-medium">
                      {date === "today"
                        ? "Today"
                        : date === "tomorrow"
                          ? "Tomorrow"
                          : date === "weekend"
                            ? "This Weekend"
                            : "Custom Date"}
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Users className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm text-muted-foreground">Guests</span>
                    </div>
                    <span className="text-sm font-medium">{guests}</span>
                  </div>

                  <div className="pt-3 border-t border-border">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Essence Points</span>
                      <span className="text-sm font-medium text-emerald">
                        +{experienceTypes.find((e) => e.id === experience)?.essencePoints || 250}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-6 space-y-3">
                <Button onClick={handleGenerateQR} className="w-full bg-brown text-white hover:bg-brown-dark">
                  Generate QR Code
                </Button>
                <Button
                  variant="outline"
                  onClick={() => router.push("/dashboard")}
                  className="w-full border-muted-foreground text-muted-foreground"
                >
                  Return to Dashboard
                </Button>
              </div>
            </motion.div>
          )}
        </div>
      </main>

      {/* QR Code Modal */}
      {showQR && (
        <EnhancedQR
          resortId={resort || "bishoftu"}
          experienceId={experience || undefined}
          onClose={() => setShowQR(false)}
          onSuccess={handleQRSuccess}
        />
      )}
    </div>
  )
}
