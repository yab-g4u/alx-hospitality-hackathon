"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import {
  ChevronLeft,
  Check,
  Coffee,
  Users,
  Briefcase,
  Sparkles,
  Crown,
  Star,
  Landmark,
  ChevronDown,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function Premium() {
  const router = useRouter()
  const [isAnnual, setIsAnnual] = useState(false)
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null)
  const [showFeatures, setShowFeatures] = useState<string | null>(null)

  const handleBack = () => {
    router.push("/dashboard")
  }

  const plans = [
    {
      id: "elite",
      name: "Kuriftu Elite",
      amharicName: "ኩሪፍቱ ኤሊት",
      icon: <Crown className="h-6 w-6" />,
      color: "#D4AF37",
      price: isAnnual ? 99 : 9.99,
      description: "For luxury-seeking individuals",
      features: [
        "Priority bookings at all resorts",
        "20% discount on all services",
        "Complimentary room upgrade",
        "Early check-in & late check-out",
        "Welcome gift on arrival",
        "Spa pass included",
        "Gold-Stamped Digital Passport",
        "AI-personalized recommendations",
      ],
      popular: true,
    },
    {
      id: "family",
      name: "Family Bond",
      amharicName: "የቤተሰብ ትስስር",
      icon: <Users className="h-6 w-6" />,
      color: "#0E7E62",
      price: isAnnual ? 199 : 19.99,
      description: "Perfect for families or couples",
      features: [
        "All Elite benefits",
        "Up to 4 family members included",
        "Shared Essence Points pool",
        "25% discount on all services",
        "Kids activities included",
        "Family dining experiences",
        "Early access to festivals",
        "Family challenges with rewards",
      ],
      popular: false,
    },
    {
      id: "business",
      name: "Corporate Circle",
      amharicName: "የንግድ ክብ",
      icon: <Briefcase className="h-6 w-6" />,
      color: "#5A3E36",
      price: isAnnual ? 299 : 29.99,
      description: "Ideal for companies and retreats",
      features: [
        "All Elite benefits",
        "Up to 10 team members",
        "30% discount on event spaces",
        "Dedicated event coordinator",
        "Team building activities",
        "VIP lounges access",
        "Branding options",
        "Corporate Voyager badges",
      ],
      popular: false,
    },
    {
      id: "cultural",
      name: "Cultural Patron",
      amharicName: "የባህል ደጋፊ",
      icon: <Landmark className="h-6 w-6" />,
      color: "#CD5C5C",
      price: isAnnual ? 149 : 14.99,
      description: "For passionate cultural explorers",
      features: [
        "All Elite benefits",
        "Invites to secret cultural events",
        "Cultural tour vouchers",
        "Local artisan meet & greets",
        "Traditional cooking classes",
        "Coffee ceremony experiences",
        "Cultural Flame digital badges",
        "Ethiopian heritage workshops",
      ],
      popular: false,
    },
  ]

  const handleSelectPlan = (planId: string) => {
    setSelectedPlan(planId)
  }

  const toggleFeatures = (planId: string) => {
    setShowFeatures(showFeatures === planId ? null : planId)
  }

  const handleSubscribe = () => {
    // In a real app, this would handle payment processing
    router.push("/dashboard")
  }

  return (
    <div className="min-h-screen bg-kuriftu-brown">
      {/* Ethiopian pattern background */}
      <div className="absolute inset-0 bg-ethiopian-pattern opacity-5 pointer-events-none" />

      <header className="bg-kuriftu-brown text-white sticky top-0 z-30 border-b border-white/10">
        <div className="container mx-auto p-4">
          <div className="flex items-center">
            <Button variant="ghost" size="icon" className="mr-2 text-white hover:bg-white/10" onClick={handleBack}>
              <ChevronLeft className="h-5 w-5" />
              <span className="sr-only">Back</span>
            </Button>
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-full bg-kuriftu-gold flex items-center justify-center text-kuriftu-brown">
                <Coffee className="h-4 w-4" />
              </div>
              <h1 className="font-serif text-xl font-bold">Premium Membership</h1>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto p-4 md:p-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <motion.div
              className="inline-block mb-4"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <div className="h-20 w-20 rounded-full bg-kuriftu-gold flex items-center justify-center mx-auto">
                <Sparkles className="h-10 w-10 text-kuriftu-brown" />
              </div>
            </motion.div>
            <h1 className="font-serif text-3xl font-bold text-white mb-2">Elevate Your Kuriftu Experience</h1>
            <p className="text-white/70 max-w-xl mx-auto">
              Choose a premium membership plan and unlock exclusive benefits across all Kuriftu resorts in Ethiopia.
            </p>
            <p className="font-amharic text-kuriftu-gold mt-2">የኩሪፍቱን ልምድዎን ያሻሽሉ</p>

            {/* Billing toggle */}
            <div className="flex items-center justify-center mt-6 mb-8">
              <span className={`text-sm ${!isAnnual ? "text-white" : "text-white/50"}`}>Monthly</span>
              <div className="mx-3">
                <Switch
                  checked={isAnnual}
                  onCheckedChange={setIsAnnual}
                  className="data-[state=checked]:bg-kuriftu-gold"
                />
              </div>
              <span className={`text-sm ${isAnnual ? "text-white" : "text-white/50"}`}>
                Annual <Badge className="ml-1 bg-kuriftu-gold text-kuriftu-brown">Save 20%</Badge>
              </span>
            </div>
          </div>

          <Tabs defaultValue="individual" className="w-full mb-8">
            <TabsList className="grid w-full grid-cols-2 mb-6 bg-white/5">
              <TabsTrigger
                value="individual"
                className="data-[state=active]:bg-kuriftu-gold data-[state=active]:text-kuriftu-brown text-white"
              >
                Individual & Family
              </TabsTrigger>
              <TabsTrigger
                value="business"
                className="data-[state=active]:bg-kuriftu-gold data-[state=active]:text-kuriftu-brown text-white"
              >
                Business & Cultural
              </TabsTrigger>
            </TabsList>

            <TabsContent value="individual" className="mt-0">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {plans.slice(0, 2).map((plan) => (
                  <motion.div
                    key={plan.id}
                    className={`relative rounded-xl overflow-hidden border ${
                      selectedPlan === plan.id
                        ? "border-kuriftu-gold ring-2 ring-kuriftu-gold"
                        : "border-white/10 hover:border-white/30"
                    } bg-white/5 backdrop-blur-sm transition-all duration-300`}
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.5, delay: plans.indexOf(plan) * 0.1 }}
                    whileHover={{ y: -5 }}
                    onClick={() => handleSelectPlan(plan.id)}
                  >
                    {plan.popular && (
                      <div className="absolute top-0 right-0">
                        <div className="bg-kuriftu-gold text-kuriftu-brown text-xs font-bold px-3 py-1 rounded-bl-lg">
                          POPULAR
                        </div>
                      </div>
                    )}

                    <div className="p-6">
                      <div className="flex items-center gap-3 mb-4">
                        <div
                          className="h-12 w-12 rounded-full flex items-center justify-center"
                          style={{ backgroundColor: `${plan.color}20`, color: plan.color }}
                        >
                          {plan.icon}
                        </div>
                        <div>
                          <h3 className="font-serif text-lg font-semibold text-white">{plan.name}</h3>
                          <p className="text-xs font-amharic text-kuriftu-gold">{plan.amharicName}</p>
                          <p className="text-xs text-white/70">{plan.description}</p>
                        </div>
                      </div>

                      <div className="mb-6">
                        <div className="flex items-end">
                          <span className="text-3xl font-bold text-white">${plan.price}</span>
                          <span className="text-white/70 ml-1">/{isAnnual ? "year" : "month"}</span>
                        </div>
                        {isAnnual && <p className="text-xs text-kuriftu-gold mt-1">Includes 2 months free</p>}
                      </div>

                      <div className="space-y-3 mb-6">
                        {plan.features.slice(0, 4).map((feature, index) => (
                          <div key={index} className="flex items-start gap-2">
                            <div className="flex-shrink-0 h-5 w-5 rounded-full bg-kuriftu-green/20 text-kuriftu-green flex items-center justify-center mt-0.5">
                              <Check className="h-3 w-3" />
                            </div>
                            <span className="text-sm text-white/70">{feature}</span>
                          </div>
                        ))}

                        {/* Show more features button */}
                        <Button
                          variant="ghost"
                          size="sm"
                          className="w-full text-kuriftu-gold hover:bg-white/10"
                          onClick={(e) => {
                            e.stopPropagation()
                            toggleFeatures(plan.id)
                          }}
                        >
                          {showFeatures === plan.id ? "Show less" : "Show more features"}
                          <ChevronDown
                            className={`ml-2 h-4 w-4 transition-transform ${showFeatures === plan.id ? "rotate-180" : ""}`}
                          />
                        </Button>

                        {/* Additional features */}
                        {showFeatures === plan.id && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.3 }}
                            className="space-y-3 pt-2"
                          >
                            {plan.features.slice(4).map((feature, index) => (
                              <div key={index} className="flex items-start gap-2">
                                <div className="flex-shrink-0 h-5 w-5 rounded-full bg-kuriftu-green/20 text-kuriftu-green flex items-center justify-center mt-0.5">
                                  <Check className="h-3 w-3" />
                                </div>
                                <span className="text-sm text-white/70">{feature}</span>
                              </div>
                            ))}
                          </motion.div>
                        )}
                      </div>

                      <Button
                        className={`w-full ${
                          selectedPlan === plan.id
                            ? "bg-kuriftu-gold text-kuriftu-brown hover:bg-kuriftu-gold/90"
                            : "bg-white/10 text-white hover:bg-white/20"
                        }`}
                        onClick={() => handleSelectPlan(plan.id)}
                      >
                        {selectedPlan === plan.id ? "Selected" : "Select Plan"}
                      </Button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="business" className="mt-0">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {plans.slice(2).map((plan) => (
                  <motion.div
                    key={plan.id}
                    className={`relative rounded-xl overflow-hidden border ${
                      selectedPlan === plan.id
                        ? "border-kuriftu-gold ring-2 ring-kuriftu-gold"
                        : "border-white/10 hover:border-white/30"
                    } bg-white/5 backdrop-blur-sm transition-all duration-300`}
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.5, delay: (plans.indexOf(plan) - 2) * 0.1 }}
                    whileHover={{ y: -5 }}
                    onClick={() => handleSelectPlan(plan.id)}
                  >
                    {plan.popular && (
                      <div className="absolute top-0 right-0">
                        <div className="bg-kuriftu-gold text-kuriftu-brown text-xs font-bold px-3 py-1 rounded-bl-lg">
                          POPULAR
                        </div>
                      </div>
                    )}

                    <div className="p-6">
                      <div className="flex items-center gap-3 mb-4">
                        <div
                          className="h-12 w-12 rounded-full flex items-center justify-center"
                          style={{ backgroundColor: `${plan.color}20`, color: plan.color }}
                        >
                          {plan.icon}
                        </div>
                        <div>
                          <h3 className="font-serif text-lg font-semibold text-white">{plan.name}</h3>
                          <p className="text-xs font-amharic text-kuriftu-gold">{plan.amharicName}</p>
                          <p className="text-xs text-white/70">{plan.description}</p>
                        </div>
                      </div>

                      <div className="mb-6">
                        <div className="flex items-end">
                          <span className="text-3xl font-bold text-white">${plan.price}</span>
                          <span className="text-white/70 ml-1">/{isAnnual ? "year" : "month"}</span>
                        </div>
                        {isAnnual && <p className="text-xs text-kuriftu-gold mt-1">Includes 2 months free</p>}
                      </div>

                      <div className="space-y-3 mb-6">
                        {plan.features.slice(0, 4).map((feature, index) => (
                          <div key={index} className="flex items-start gap-2">
                            <div className="flex-shrink-0 h-5 w-5 rounded-full bg-kuriftu-green/20 text-kuriftu-green flex items-center justify-center mt-0.5">
                              <Check className="h-3 w-3" />
                            </div>
                            <span className="text-sm text-white/70">{feature}</span>
                          </div>
                        ))}

                        {/* Show more features button */}
                        <Button
                          variant="ghost"
                          size="sm"
                          className="w-full text-kuriftu-gold hover:bg-white/10"
                          onClick={(e) => {
                            e.stopPropagation()
                            toggleFeatures(plan.id)
                          }}
                        >
                          {showFeatures === plan.id ? "Show less" : "Show more features"}
                          <ChevronDown
                            className={`ml-2 h-4 w-4 transition-transform ${showFeatures === plan.id ? "rotate-180" : ""}`}
                          />
                        </Button>

                        {/* Additional features */}
                        {showFeatures === plan.id && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.3 }}
                            className="space-y-3 pt-2"
                          >
                            {plan.features.slice(4).map((feature, index) => (
                              <div key={index} className="flex items-start gap-2">
                                <div className="flex-shrink-0 h-5 w-5 rounded-full bg-kuriftu-green/20 text-kuriftu-green flex items-center justify-center mt-0.5">
                                  <Check className="h-3 w-3" />
                                </div>
                                <span className="text-sm text-white/70">{feature}</span>
                              </div>
                            ))}
                          </motion.div>
                        )}
                      </div>

                      <Button
                        className={`w-full ${
                          selectedPlan === plan.id
                            ? "bg-kuriftu-gold text-kuriftu-brown hover:bg-kuriftu-gold/90"
                            : "bg-white/10 text-white hover:bg-white/20"
                        }`}
                        onClick={() => handleSelectPlan(plan.id)}
                      >
                        {selectedPlan === plan.id ? "Selected" : "Select Plan"}
                      </Button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </TabsContent>
          </Tabs>

          {/* Ethiopian cultural elements */}
          <div className="mt-12 bg-white/5 rounded-xl border border-white/10 p-6">
            <div className="flex items-center gap-4 mb-6">
              <div className="h-12 w-12 rounded-full bg-kuriftu-terracotta/20 text-kuriftu-terracotta flex items-center justify-center">
                <Star className="h-6 w-6" />
              </div>
              <div>
                <h3 className="font-serif text-xl font-semibold text-white">Cultural Benefits</h3>
                <p className="text-white/70">Exclusive Ethiopian experiences for premium members</p>
                <p className="font-amharic text-xs text-kuriftu-gold mt-1">ለፕሪሚየም አባላት ልዩ የኢትዮጵያ ልምዶች</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white/5 rounded-lg border border-white/10 p-4">
                <h4 className="font-serif text-lg font-semibold text-white mb-2">Coffee Ceremony</h4>
                <p className="text-sm text-white/70 mb-2">
                  Experience authentic Ethiopian coffee ceremonies with traditional brewing methods.
                </p>
                <p className="font-amharic text-sm text-kuriftu-gold">የቡና ሥነ ሥርዓት</p>
              </div>

              <div className="bg-white/5 rounded-lg border border-white/10 p-4">
                <h4 className="font-serif text-lg font-semibold text-white mb-2">Cultural Tours</h4>
                <p className="text-sm text-white/70 mb-2">
                  Guided tours to historical sites and cultural landmarks across Ethiopia.
                </p>
                <p className="font-amharic text-sm text-kuriftu-gold">የባህል ጉብኝቶች</p>
              </div>

              <div className="bg-white/5 rounded-lg border border-white/10 p-4">
                <h4 className="font-serif text-lg font-semibold text-white mb-2">Traditional Cuisine</h4>
                <p className="text-sm text-white/70 mb-2">
                  Exclusive dining experiences featuring authentic Ethiopian dishes.
                </p>
                <p className="font-amharic text-sm text-kuriftu-gold">ባህላዊ ምግቦች</p>
              </div>
            </div>
          </div>

          {/* Subscribe button */}
          <div className="mt-8 text-center">
            <Button
              size="lg"
              className="bg-kuriftu-gold text-kuriftu-brown hover:bg-kuriftu-gold/90"
              disabled={!selectedPlan}
              onClick={handleSubscribe}
            >
              Subscribe Now
            </Button>
            <p className="mt-2 text-sm text-white/50">
              Cancel anytime. See our{" "}
              <a href="#" className="text-kuriftu-gold hover:underline">
                terms and conditions
              </a>
            </p>
          </div>
        </div>
      </main>
    </div>
  )
}
