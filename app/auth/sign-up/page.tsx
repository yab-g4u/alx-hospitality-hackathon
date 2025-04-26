"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { motion } from "framer-motion"
import { Eye, EyeOff, Coffee, Lock, User, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Separator } from "@/components/ui/separator"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

export default function SignUp() {
  const router = useRouter()
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [journeyType, setJourneyType] = useState("solo")
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [step, setStep] = useState(1)

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate authentication
    setTimeout(() => {
      setIsLoading(false)
      router.push("/dashboard")
    }, 1500)
  }

  const handleNextStep = () => {
    setStep(2)
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-kuriftu-sand/30 to-white flex items-center justify-center p-4">
      <motion.div
        className="bg-white rounded-2xl shadow-xl overflow-hidden w-full max-w-md"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="relative h-40 bg-kuriftu-green flex items-center justify-center">
          <div className="absolute inset-0 bg-coffee-pattern opacity-20" />
          <motion.div
            className="relative z-10 text-center"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <div className="flex items-center justify-center mb-2">
              <div className="h-20 w-20 rounded-full bg-white flex items-center justify-center">
                <Coffee className="h-10 w-10 text-kuriftu-green" />
              </div>
            </div>
            <h1 className="font-serif text-2xl font-bold text-white">Kuriftu Loyalty</h1>
            <p className="text-white/80 text-sm mt-1">Experience Ethiopian Luxury</p>
          </motion.div>
        </div>

        <div className="p-6 md:p-8">
          <h2 className="font-serif text-xl font-semibold text-center mb-6">Create Your Account</h2>

          {/* Progress indicator */}
          <div className="mb-8">
            <div className="flex items-center justify-between">
              <div
                className={`flex h-10 w-10 items-center justify-center rounded-full ${
                  step >= 1 ? "bg-kuriftu-green text-white" : "bg-muted text-muted-foreground"
                }`}
              >
                {step > 1 ? <Check className="h-5 w-5" /> : 1}
              </div>
              <div className={`h-1 flex-1 mx-2 ${step >= 2 ? "bg-kuriftu-green" : "bg-muted"}`} />
              <div
                className={`flex h-10 w-10 items-center justify-center rounded-full ${
                  step >= 2 ? "bg-kuriftu-green text-white" : "bg-muted text-muted-foreground"
                }`}
              >
                {step > 2 ? <Check className="h-5 w-5" /> : 2}
              </div>
            </div>
            <div className="mt-2 grid grid-cols-2 text-xs">
              <div className="text-center text-kuriftu-charcoal">Account Details</div>
              <div className="text-center text-kuriftu-charcoal">Journey Type</div>
            </div>
          </div>

          {step === 1 && (
            <motion.form
              className="space-y-4"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="space-y-2">
                <Label htmlFor="name" className="text-kuriftu-charcoal">
                  Full Name
                </Label>
                <div className="relative">
                  <Input
                    id="name"
                    type="text"
                    placeholder="Your Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="pl-10 border-kuriftu-sand focus-visible:ring-kuriftu-green"
                    required
                  />
                  <div className="absolute left-3 top-1/2 -translate-y-1/2 text-kuriftu-gray">
                    <User className="h-4 w-4" />
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="text-kuriftu-charcoal">
                  Email
                </Label>
                <div className="relative">
                  <Input
                    id="email"
                    type="email"
                    placeholder="your.email@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10 border-kuriftu-sand focus-visible:ring-kuriftu-green"
                    required
                  />
                  <div className="absolute left-3 top-1/2 -translate-y-1/2 text-kuriftu-gray">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <rect width="20" height="16" x="2" y="4" rx="2" />
                      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                    </svg>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-kuriftu-charcoal">
                  Password
                </Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-10 border-kuriftu-sand focus-visible:ring-kuriftu-green"
                    required
                  />
                  <div className="absolute left-3 top-1/2 -translate-y-1/2 text-kuriftu-gray">
                    <Lock className="h-4 w-4" />
                  </div>
                  <button
                    type="button"
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-kuriftu-gray hover:text-kuriftu-charcoal transition-colors"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
                <p className="text-xs text-kuriftu-gray">
                  Password must be at least 8 characters long with a number and a special character.
                </p>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="terms"
                  required
                  className="border-kuriftu-sand data-[state=checked]:bg-kuriftu-green data-[state=checked]:border-kuriftu-green"
                />
                <Label htmlFor="terms" className="text-sm text-kuriftu-charcoal">
                  I agree to the{" "}
                  <Link href="#" className="text-kuriftu-green hover:text-kuriftu-green-light transition-colors">
                    Terms of Service
                  </Link>{" "}
                  and{" "}
                  <Link href="#" className="text-kuriftu-green hover:text-kuriftu-green-light transition-colors">
                    Privacy Policy
                  </Link>
                </Label>
              </div>

              <Button
                type="button"
                className="w-full bg-kuriftu-green hover:bg-kuriftu-green-light text-white h-11"
                onClick={handleNextStep}
                disabled={!name || !email || !password}
              >
                Continue
              </Button>
            </motion.form>
          )}

          {step === 2 && (
            <motion.form
              onSubmit={handleSignUp}
              className="space-y-4"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="space-y-2">
                <Label className="text-kuriftu-charcoal">Choose Your Journey Type</Label>
                <p className="text-sm text-kuriftu-gray mb-4">This helps us personalize your Kuriftu experience</p>

                <RadioGroup value={journeyType} onValueChange={setJourneyType} className="space-y-3">
                  <div className="flex items-center space-x-2 rounded-lg border border-kuriftu-sand p-3 cursor-pointer hover:bg-kuriftu-sand/10 transition-colors">
                    <RadioGroupItem value="solo" id="solo" className="border-kuriftu-sand text-kuriftu-green" />
                    <Label htmlFor="solo" className="flex-1 cursor-pointer">
                      <div className="font-medium text-kuriftu-charcoal">Solo Journey</div>
                      <div className="text-sm text-kuriftu-gray">Personal retreat for relaxation</div>
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2 rounded-lg border border-kuriftu-sand p-3 cursor-pointer hover:bg-kuriftu-sand/10 transition-colors">
                    <RadioGroupItem value="family" id="family" className="border-kuriftu-sand text-kuriftu-green" />
                    <Label htmlFor="family" className="flex-1 cursor-pointer">
                      <div className="font-medium text-kuriftu-charcoal">Family Bond</div>
                      <div className="text-sm text-kuriftu-gray">Create memories with loved ones</div>
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2 rounded-lg border border-kuriftu-sand p-3 cursor-pointer hover:bg-kuriftu-sand/10 transition-colors">
                    <RadioGroupItem value="business" id="business" className="border-kuriftu-sand text-kuriftu-green" />
                    <Label htmlFor="business" className="flex-1 cursor-pointer">
                      <div className="font-medium text-kuriftu-charcoal">Business Retreat</div>
                      <div className="text-sm text-kuriftu-gray">Team building and corporate experiences</div>
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2 rounded-lg border border-kuriftu-sand p-3 cursor-pointer hover:bg-kuriftu-sand/10 transition-colors">
                    <RadioGroupItem value="cultural" id="cultural" className="border-kuriftu-sand text-kuriftu-green" />
                    <Label htmlFor="cultural" className="flex-1 cursor-pointer">
                      <div className="font-medium text-kuriftu-charcoal">Cultural Explorer</div>
                      <div className="text-sm text-kuriftu-gray">Immerse in Ethiopian heritage</div>
                    </Label>
                  </div>
                </RadioGroup>
              </div>

              <div className="flex gap-3 mt-6">
                <Button
                  type="button"
                  variant="outline"
                  className="flex-1 border-kuriftu-sand text-kuriftu-charcoal hover:bg-kuriftu-sand/10"
                  onClick={() => setStep(1)}
                >
                  Back
                </Button>
                <Button
                  type="submit"
                  className="flex-1 bg-kuriftu-green hover:bg-kuriftu-green-light text-white h-11"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <div className="flex items-center justify-center">
                      <svg
                        className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        />
                      </svg>
                      Creating Account...
                    </div>
                  ) : (
                    "Create Account"
                  )}
                </Button>
              </div>
            </motion.form>
          )}

          <div className="mt-8">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <Separator className="w-full" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-white px-2 text-kuriftu-gray">Or continue with</span>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-3">
              <Button
                variant="outline"
                className="w-full border-kuriftu-sand hover:bg-kuriftu-sand/10 text-kuriftu-charcoal"
              >
                <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24">
                  <path
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    fill="#4285F4"
                  />
                  <path
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    fill="#34A853"
                  />
                  <path
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    fill="#FBBC05"
                  />
                  <path
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    fill="#EA4335"
                  />
                  <path d="M1 1h22v22H1z" fill="none" />
                </svg>
                Google
              </Button>
              <Button
                variant="outline"
                className="w-full border-kuriftu-sand hover:bg-kuriftu-sand/10 text-kuriftu-charcoal"
              >
                <svg className="mr-2 h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
                </svg>
                Facebook
              </Button>
            </div>
          </div>

          <div className="mt-8 text-center text-sm">
            <p className="text-kuriftu-charcoal">
              Already have an account?{" "}
              <Link
                href="/auth/sign-in"
                className="text-kuriftu-green hover:text-kuriftu-green-light transition-colors font-medium"
              >
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
