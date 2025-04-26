"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { useRouter } from "next/navigation"
import { ChevronLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { TierCard } from "@/components/tier-card"
import { Confetti } from "@/components/ui/confetti"

export default function Tiers() {
  const router = useRouter()
  const [activeTier, setActiveTier] = useState<"bronze" | "silver" | "gold" | "platinum">("silver")
  const [showConfetti, setShowConfetti] = useState(false)

  const handleTierClick = (tier: "bronze" | "silver" | "gold" | "platinum") => {
    if (tier !== activeTier) {
      setActiveTier(tier)
      if (tier === "gold" || tier === "platinum") {
        setShowConfetti(true)
        setTimeout(() => setShowConfetti(false), 5000)
      }
    }
  }

  const handleBack = () => {
    router.push("/dashboard")
  }

  return (
    <div className="min-h-screen bg-background">
      <Confetti active={showConfetti} />

      <header className="bg-brown text-white p-4">
        <div className="container mx-auto">
          <div className="flex items-center">
            <Button variant="ghost" size="icon" className="mr-2 text-white hover:bg-brown-light" onClick={handleBack}>
              <ChevronLeft className="h-5 w-5" />
              <span className="sr-only">Back</span>
            </Button>
            <h1 className="font-serif text-xl font-bold">Membership Tiers</h1>
          </div>
        </div>
      </header>

      <main className="container mx-auto p-4 md:p-6">
        <motion.div
          className="mb-6 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="font-serif text-2xl font-semibold text-brown mb-2">Your Kuriftu Journey</h2>
          <p className="text-muted-foreground">Unlock exclusive benefits as you progress</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <TierCard
            tier="bronze"
            title="Bronze Tier"
            points={0}
            benefits={[
              "10% discount on dining",
              "Early check-in when available",
              "Welcome drink on arrival",
              "Access to basic amenities",
            ]}
            isActive={activeTier === "bronze"}
            onClick={() => handleTierClick("bronze")}
          />

          <TierCard
            tier="silver"
            title="Silver Tier"
            points={1000}
            benefits={[
              "15% discount on dining",
              "Early check-in guaranteed",
              "Welcome drink and fruit basket",
              "Access to premium amenities",
              "One free spa treatment",
            ]}
            isActive={activeTier === "silver"}
            onClick={() => handleTierClick("silver")}
          />

          <TierCard
            tier="gold"
            title="Gold Tier"
            points={5000}
            benefits={[
              "20% discount on all services",
              "Early check-in and late checkout",
              "VIP welcome package",
              "Access to exclusive areas",
              "Two free spa treatments",
              "Room upgrade when available",
            ]}
            isActive={activeTier === "gold"}
            onClick={() => handleTierClick("gold")}
          />

          <TierCard
            tier="platinum"
            title="Platinum Tier"
            points={15000}
            benefits={[
              "25% discount on all services",
              "Flexible check-in and checkout",
              "Luxury welcome package",
              "Access to all exclusive areas",
              "Unlimited spa treatments",
              "Guaranteed room upgrade",
              "Personal concierge service",
            ]}
            isActive={activeTier === "platinum"}
            onClick={() => handleTierClick("platinum")}
          />
        </div>
      </main>
    </div>
  )
}
