import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatPoints(points: number): string {
  return points.toLocaleString()
}

export function calculateTierProgress(points: number): {
  tier: "bronze" | "silver" | "gold" | "platinum"
  progress: number
  nextTier: string
  pointsToNextTier: number
} {
  if (points < 1000) {
    return {
      tier: "bronze",
      progress: (points / 1000) * 100,
      nextTier: "Silver",
      pointsToNextTier: 1000 - points,
    }
  } else if (points < 5000) {
    return {
      tier: "silver",
      progress: ((points - 1000) / 4000) * 100,
      nextTier: "Gold",
      pointsToNextTier: 5000 - points,
    }
  } else if (points < 15000) {
    return {
      tier: "gold",
      progress: ((points - 5000) / 10000) * 100,
      nextTier: "Platinum",
      pointsToNextTier: 15000 - points,
    }
  } else {
    return {
      tier: "platinum",
      progress: 100,
      nextTier: "Platinum",
      pointsToNextTier: 0,
    }
  }
}

export function getTierColor(tier: "bronze" | "silver" | "gold" | "platinum"): string {
  switch (tier) {
    case "bronze":
      return "#CD7F32"
    case "silver":
      return "#C0C0C0"
    case "gold":
      return "#D4AF37"
    case "platinum":
      return "#E5E4E2"
    default:
      return "#CD7F32"
  }
}

export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  }).format(date)
}
