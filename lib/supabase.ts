import { createClient } from "@supabase/supabase-js"

// Create a single supabase client for the entire app (server-side)
export const createServerSupabaseClient = () => {
  const supabaseUrl = process.env.SUPABASE_URL
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY

  if (!supabaseUrl || !supabaseKey) {
    throw new Error("Missing Supabase environment variables")
  }

  return createClient(supabaseUrl, supabaseKey)
}

// Create a singleton client for the browser
let clientSingleton: ReturnType<typeof createClient> | null = null

export const createClientSupabaseClient = () => {
  if (clientSingleton) return clientSingleton

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!supabaseUrl || !supabaseKey) {
    throw new Error("Missing Supabase environment variables")
  }

  clientSingleton = createClient(supabaseUrl, supabaseKey)
  return clientSingleton
}

// Database types
export type User = {
  id: string
  email: string
  full_name: string
  journey_type: string
  tier: string
  essence_points: number
  member_since: string
  preferences: string | null
  profile_image: string | null
}

export type Visit = {
  id: string
  user_id: string
  location_id: string
  experience_id: string
  date: string
  points: number
  completed: boolean
  notes: string | null
}

export type Location = {
  id: string
  name: string
  address: string
  latitude: number
  longitude: number
  description: string
  image: string
  rating: number
  essence_points: number
}

export type Experience = {
  id: string
  name: string
  icon: string
  color: string
  description: string
  points: number
}

export type Badge = {
  id: string
  name: string
  amharic_name: string
  description: string
  icon: string
  color: string
  required_count: number
}

export type UserBadge = {
  id: string
  user_id: string
  badge_id: string
  earned_date: string
  progress: number
}

export type Reward = {
  id: string
  name: string
  description: string
  points_required: number
  image: string | null
}

export type UserReward = {
  id: string
  user_id: string
  reward_id: string
  redeemed_date: string
  status: "available" | "redeemed" | "expired"
}
