"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Lightbulb, X } from "lucide-react"
import { Button } from "@/components/ui/button"

interface AISuggestionProps {
  suggestion: string
  actionText?: string
  onAction?: () => void
}

export function AISuggestion({ suggestion, actionText, onAction }: AISuggestionProps) {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    // Show the suggestion after a delay
    const timer = setTimeout(() => {
      setIsVisible(true)
    }, 2000)

    return () => clearTimeout(timer)
  }, [])

  const handleDismiss = () => {
    setIsVisible(false)
  }

  const handleAction = () => {
    if (onAction) {
      onAction()
    }
    setIsVisible(false)
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="fixed bottom-4 right-4 max-w-sm z-50"
          initial={{ opacity: 0, y: 50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.9 }}
          transition={{ type: "spring", stiffness: 500, damping: 30 }}
        >
          <div className="relative rounded-xl border border-emerald/20 bg-white p-4 shadow-lg">
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-2 right-2 h-6 w-6 text-muted-foreground hover:text-foreground"
              onClick={handleDismiss}
            >
              <X className="h-4 w-4" />
              <span className="sr-only">Dismiss</span>
            </Button>

            <div className="flex gap-3">
              <div className="flex-shrink-0 h-10 w-10 rounded-full bg-emerald/10 text-emerald flex items-center justify-center">
                <Lightbulb className="h-5 w-5" />
              </div>

              <div className="flex-1">
                <h4 className="font-serif text-sm font-medium text-foreground mb-1">AI Suggestion</h4>
                <p className="text-sm text-muted-foreground mb-3">{suggestion}</p>

                {actionText && onAction && (
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full border-emerald text-emerald hover:bg-emerald hover:text-white"
                    onClick={handleAction}
                  >
                    {actionText}
                  </Button>
                )}
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
