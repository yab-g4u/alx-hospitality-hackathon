"use client"

import type React from "react"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { CreditCard, Wallet, QrCode, Check, X, Lock, CreditCardIcon, Smartphone, Gift, Sparkles } from "lucide-react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { cn } from "@/lib/utils"

// Types for our payment system
type PaymentMethod = {
  id: string
  name: string
  icon: React.ElementType
  description: string
}

type RedeemableItem = {
  id: string
  name: string
  description: string
  pointsCost: number
  price: number
  image?: string
  available: boolean
}

// Sample data
const paymentMethods: PaymentMethod[] = [
  {
    id: "credit-card",
    name: "Credit Card",
    icon: CreditCard,
    description: "Pay securely with your credit or debit card",
  },
  {
    id: "mobile-money",
    name: "Mobile Money",
    icon: Smartphone,
    description: "Pay using your mobile money account",
  },
  {
    id: "qr-code",
    name: "QR Code",
    icon: QrCode,
    description: "Scan a QR code to complete payment",
  },
  {
    id: "essence-points",
    name: "Essence Points",
    icon: Sparkles,
    description: "Redeem your Essence Points for eligible items",
  },
]

const redeemableItems: RedeemableItem[] = [
  {
    id: "premium-tier",
    name: "Kuriftu Premium Membership",
    description: "1 year of premium membership benefits",
    pointsCost: 500,
    price: 2500,
    available: true,
  },
  {
    id: "spa-package",
    name: "Deluxe Spa Package",
    description: "Full day spa experience with traditional treatments",
    pointsCost: 300,
    price: 1500,
    available: true,
  },
  {
    id: "dinner-for-two",
    name: "Dinner for Two",
    description: "Romantic dinner with Ethiopian cuisine",
    pointsCost: 200,
    price: 1000,
    available: true,
  },
  {
    id: "gift-card",
    name: "Kuriftu Gift Card",
    description: "Gift card for any Kuriftu service",
    pointsCost: 100,
    price: 500,
    available: true,
  },
]

export function PaymentSystem() {
  const [selectedMethod, setSelectedMethod] = useState<string>("credit-card")
  const [selectedItem, setSelectedItem] = useState<RedeemableItem | null>(null)
  const [showPaymentModal, setShowPaymentModal] = useState(false)
  const [paymentComplete, setPaymentComplete] = useState(false)
  const [cardDetails, setCardDetails] = useState({
    number: "",
    name: "",
    expiry: "",
    cvc: "",
  })
  const [mobileDetails, setMobileDetails] = useState({
    number: "",
    provider: "telebirr",
  })
  const [essencePoints, setEssencePoints] = useState(175)

  // Handle item selection
  const selectItem = (item: RedeemableItem) => {
    setSelectedItem(item)
    setShowPaymentModal(true)
  }

  // Handle payment method change
  const handleMethodChange = (method: string) => {
    setSelectedMethod(method)
  }

  // Handle card details change
  const handleCardChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setCardDetails((prev) => ({ ...prev, [name]: value }))
  }

  // Handle mobile details change
  const handleMobileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setMobileDetails((prev) => ({ ...prev, [name]: value }))
  }

  // Handle provider selection
  const handleProviderChange = (value: string) => {
    setMobileDetails((prev) => ({ ...prev, provider: value }))
  }

  // Process payment
  const processPayment = () => {
    // In a real app, this would integrate with a payment gateway
    console.log("Processing payment:", {
      method: selectedMethod,
      item: selectedItem,
      cardDetails: selectedMethod === "credit-card" ? cardDetails : undefined,
      mobileDetails: selectedMethod === "mobile-money" ? mobileDetails : undefined,
    })

    // Simulate payment processing
    setTimeout(() => {
      // If using essence points, deduct them
      if (selectedMethod === "essence-points" && selectedItem) {
        setEssencePoints((prev) => prev - selectedItem.pointsCost)
      }

      setPaymentComplete(true)

      // Reset after a delay
      setTimeout(() => {
        setShowPaymentModal(false)
        setPaymentComplete(false)
        setSelectedItem(null)
      }, 3000)
    }, 2000)
  }

  // Check if payment can be processed
  const canProcessPayment = () => {
    if (!selectedItem) return false

    if (selectedMethod === "credit-card") {
      return cardDetails.number && cardDetails.name && cardDetails.expiry && cardDetails.cvc
    }

    if (selectedMethod === "mobile-money") {
      return mobileDetails.number && mobileDetails.provider
    }

    if (selectedMethod === "essence-points") {
      return essencePoints >= selectedItem.pointsCost
    }

    return true
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Wallet className="h-5 w-5 text-amber-600" />
          <span>Payment & Redemption</span>
        </CardTitle>
        <CardDescription>Purchase premium services or redeem your Essence Points</CardDescription>
      </CardHeader>

      <CardContent>
        <Tabs defaultValue="premium">
          <TabsList className="grid grid-cols-2 mb-6">
            <TabsTrigger value="premium">Premium Services</TabsTrigger>
            <TabsTrigger value="redeem">Redeem Points</TabsTrigger>
          </TabsList>

          <TabsContent value="premium" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {redeemableItems.map((item) => (
                <Card key={item.id} className="overflow-hidden">
                  <CardHeader className="p-4 pb-2">
                    <CardTitle className="text-base">{item.name}</CardTitle>
                    <CardDescription>{item.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="p-4 pt-2">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <Gift className="h-5 w-5 text-amber-600" />
                        <span className="text-sm text-muted-foreground">Or {item.pointsCost} Essence Points</span>
                      </div>
                      <div className="text-lg font-bold text-amber-800">{item.price.toLocaleString()} Birr</div>
                    </div>
                  </CardContent>
                  <CardFooter className="p-4 pt-0">
                    <Button
                      onClick={() => selectItem(item)}
                      className="w-full bg-amber-600 hover:bg-amber-700 text-white"
                    >
                      Purchase
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="redeem" className="space-y-4">
            <div className="bg-amber-50 p-4 rounded-lg border border-amber-200 mb-6">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-lg font-semibold text-amber-800">Your Essence Points</h3>
                  <p className="text-sm text-amber-700">Use your points to redeem exclusive rewards</p>
                </div>
                <div className="flex items-center gap-1 bg-white px-3 py-2 rounded-lg border border-amber-200">
                  <Sparkles className="h-5 w-5 text-amber-600" />
                  <span className="text-xl font-bold text-amber-800">{essencePoints}</span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {redeemableItems.map((item) => (
                <Card key={item.id} className={cn("overflow-hidden", essencePoints < item.pointsCost && "opacity-60")}>
                  <CardHeader className="p-4 pb-2">
                    <CardTitle className="text-base">{item.name}</CardTitle>
                    <CardDescription>{item.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="p-4 pt-2">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-1 text-amber-800">
                        <Sparkles className="h-5 w-5" />
                        <span className="text-lg font-bold">{item.pointsCost}</span>
                      </div>
                      <div className="text-sm text-muted-foreground">Value: {item.price.toLocaleString()} Birr</div>
                    </div>
                  </CardContent>
                  <CardFooter className="p-4 pt-0">
                    <Button
                      onClick={() => {
                        setSelectedMethod("essence-points")
                        selectItem(item)
                      }}
                      className="w-full bg-amber-600 hover:bg-amber-700 text-white"
                      disabled={essencePoints < item.pointsCost}
                    >
                      {essencePoints < item.pointsCost
                        ? `Need ${item.pointsCost - essencePoints} more points`
                        : "Redeem Now"}
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>

      {/* Payment modal */}
      <AnimatePresence>
        {showPaymentModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/70 flex items-center justify-center z-50"
            onClick={() => !paymentComplete && setShowPaymentModal(false)}
          >
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 50, opacity: 0 }}
              className="bg-white rounded-lg p-6 max-w-md w-full mx-4"
              onClick={(e) => e.stopPropagation()}
            >
              {paymentComplete ? (
                <div className="text-center py-8">
                  <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
                    <Check className="h-8 w-8 text-green-600" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Payment Successful!</h3>
                  <p className="text-gray-600 mb-4">
                    {selectedMethod === "essence-points"
                      ? `You've redeemed ${selectedItem?.pointsCost} Essence Points for ${selectedItem?.name}.`
                      : `Your payment for ${selectedItem?.name} has been processed successfully.`}
                  </p>
                  <Button
                    onClick={() => {
                      setShowPaymentModal(false)
                      setPaymentComplete(false)
                      setSelectedItem(null)
                    }}
                    className="bg-amber-600 hover:bg-amber-700 text-white"
                  >
                    Continue
                  </Button>
                </div>
              ) : (
                <>
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-xl font-bold text-gray-900">
                      {selectedMethod === "essence-points" ? "Redeem Points" : "Payment"}
                    </h3>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-gray-500 hover:bg-gray-100"
                      onClick={() => setShowPaymentModal(false)}
                    >
                      <X className="h-5 w-5" />
                    </Button>
                  </div>

                  <div className="space-y-4">
                    {selectedItem && (
                      <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                        <div className="flex justify-between items-center">
                          <div>
                            <p className="font-semibold">{selectedItem.name}</p>
                            <p className="text-sm text-gray-600">{selectedItem.description}</p>
                          </div>
                          <div className="text-right">
                            {selectedMethod === "essence-points" ? (
                              <div className="flex items-center gap-1 text-amber-800">
                                <Sparkles className="h-4 w-4" />
                                <span className="font-bold">{selectedItem.pointsCost}</span>
                              </div>
                            ) : (
                              <p className="font-bold text-amber-800">{selectedItem.price.toLocaleString()} Birr</p>
                            )}
                          </div>
                        </div>
                      </div>
                    )}

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Payment Method</label>
                      <div className="grid grid-cols-2 gap-2 mb-4">
                        {paymentMethods.map((method) => (
                          <div
                            key={method.id}
                            className={cn(
                              "flex items-center gap-2 p-3 rounded-lg border cursor-pointer transition-colors",
                              selectedMethod === method.id
                                ? "border-amber-600 bg-amber-50"
                                : "border-gray-200 hover:border-amber-300",
                            )}
                            onClick={() => handleMethodChange(method.id)}
                          >
                            <method.icon
                              className={cn(
                                "h-5 w-5",
                                selectedMethod === method.id ? "text-amber-600" : "text-gray-500",
                              )}
                            />
                            <span
                              className={cn(
                                "font-medium",
                                selectedMethod === method.id ? "text-amber-800" : "text-gray-700",
                              )}
                            >
                              {method.name}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Credit Card Form */}
                    {selectedMethod === "credit-card" && (
                      <div className="space-y-3">
                        <div>
                          <Label htmlFor="card-number">Card Number</Label>
                          <div className="relative">
                            <Input
                              id="card-number"
                              name="number"
                              value={cardDetails.number}
                              onChange={handleCardChange}
                              placeholder="1234 5678 9012 3456"
                              className="pl-10"
                            />
                            <CreditCardIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
                          </div>
                        </div>

                        <div>
                          <Label htmlFor="card-name">Cardholder Name</Label>
                          <Input
                            id="card-name"
                            name="name"
                            value={cardDetails.name}
                            onChange={handleCardChange}
                            placeholder="John Doe"
                          />
                        </div>

                        <div className="grid grid-cols-2 gap-3">
                          <div>
                            <Label htmlFor="card-expiry">Expiry Date</Label>
                            <Input
                              id="card-expiry"
                              name="expiry"
                              value={cardDetails.expiry}
                              onChange={handleCardChange}
                              placeholder="MM/YY"
                            />
                          </div>
                          <div>
                            <Label htmlFor="card-cvc">CVC</Label>
                            <Input
                              id="card-cvc"
                              name="cvc"
                              value={cardDetails.cvc}
                              onChange={handleCardChange}
                              placeholder="123"
                            />
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Mobile Money Form */}
                    {selectedMethod === "mobile-money" && (
                      <div className="space-y-3">
                        <div>
                          <Label htmlFor="mobile-provider">Select Provider</Label>
                          <RadioGroup
                            value={mobileDetails.provider}
                            onValueChange={handleProviderChange}
                            className="flex gap-4 mt-2"
                          >
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="telebirr" id="telebirr" />
                              <Label htmlFor="telebirr">TeleBirr</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="cbe-birr" id="cbe-birr" />
                              <Label htmlFor="cbe-birr">CBE Birr</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="amole" id="amole" />
                              <Label htmlFor="amole">Amole</Label>
                            </div>
                          </RadioGroup>
                        </div>

                        <div>
                          <Label htmlFor="mobile-number">Mobile Number</Label>
                          <div className="relative">
                            <Input
                              id="mobile-number"
                              name="number"
                              value={mobileDetails.number}
                              onChange={handleMobileChange}
                              placeholder="09XXXXXXXX"
                              className="pl-10"
                            />
                            <Smartphone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
                          </div>
                        </div>
                      </div>
                    )}

                    {/* QR Code */}
                    {selectedMethod === "qr-code" && (
                      <div className="text-center py-4">
                        <div className="bg-white p-4 rounded-lg border border-gray-200 inline-block mb-3">
                          <div className="w-48 h-48 bg-gray-800 rounded-lg flex items-center justify-center">
                            <QrCode className="w-32 h-32 text-white" />
                          </div>
                        </div>
                        <p className="text-sm text-gray-600">
                          Scan this QR code with your mobile banking app to complete the payment
                        </p>
                      </div>
                    )}

                    {/* Essence Points */}
                    {selectedMethod === "essence-points" && selectedItem && (
                      <div className="space-y-3">
                        <div className="bg-amber-50 p-4 rounded-lg border border-amber-200">
                          <div className="flex justify-between items-center">
                            <div>
                              <p className="font-semibold text-amber-800">Your Essence Points</p>
                              <p className="text-sm text-amber-700">Available for redemption</p>
                            </div>
                            <div className="flex items-center gap-1">
                              <Sparkles className="h-5 w-5 text-amber-600" />
                              <span className="text-xl font-bold text-amber-800">{essencePoints}</span>
                            </div>
                          </div>
                        </div>

                        <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                          <div className="flex justify-between items-center">
                            <p className="font-medium">Points Required</p>
                            <div className="flex items-center gap-1 text-amber-800">
                              <Sparkles className="h-4 w-4" />
                              <span className="font-bold">{selectedItem.pointsCost}</span>
                            </div>
                          </div>
                          <div className="flex justify-between items-center mt-2">
                            <p className="font-medium">Remaining After Redemption</p>
                            <div className="flex items-center gap-1 text-amber-800">
                              <Sparkles className="h-4 w-4" />
                              <span className="font-bold">{essencePoints - selectedItem.pointsCost}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    <div className="flex items-center gap-2 text-sm text-gray-600 mt-2">
                      <Lock className="h-4 w-4" />
                      <span>Your payment information is secure and encrypted</span>
                    </div>

                    <Button
                      onClick={processPayment}
                      className="w-full bg-amber-600 hover:bg-amber-700 text-white mt-2"
                      disabled={!canProcessPayment()}
                    >
                      {selectedMethod === "essence-points" ? "Confirm Redemption" : "Complete Payment"}
                    </Button>
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
