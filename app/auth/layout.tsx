import type React from "react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Authentication - Kuriftu Loyalty & Membership",
  description: "Sign in or create an account for Kuriftu Loyalty & Membership",
}

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-kuriftu-brown to-kuriftu-coffee flex flex-col">
      <div className="absolute inset-0 bg-ethiopian-pattern opacity-10 pointer-events-none" />
      <div className="flex-1 flex items-center justify-center p-4">
        <div className="w-full max-w-md">{children}</div>
      </div>
      <footer className="py-4 text-center text-white/70 text-sm">
        <p>© 2025 Kuriftu Resorts & Spa. All rights reserved.</p>
      </footer>
    </div>
  )
}
