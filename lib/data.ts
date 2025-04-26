// Resort locations with accurate coordinates
export const resortLocations = [
  {
    id: "bishoftu",
    name: "Kuriftu Resort & Spa Bishoftu",
    latitude: 8.7579,
    longitude: 38.9959,
    address: "Bishoftu, Ethiopia",
    description:
      "Nestled on the shores of Lake Bishoftu, this resort offers a serene escape just an hour from Addis Ababa.",
    rating: 4.8,
    essencePoints: 150,
    image: "/images/bishoftu-resort.jpg",
    amenities: ["Spa", "Restaurant", "Pool", "Lake View", "Conference Facilities"],
  },
  {
    id: "bahirdar",
    name: "Kuriftu Resort & Spa Bahir Dar",
    latitude: 11.5742,
    longitude: 37.3614,
    address: "Bahir Dar, Ethiopia",
    description: "Located on the shores of Lake Tana, offering stunning views and access to the Blue Nile Falls.",
    rating: 4.7,
    essencePoints: 180,
    image: "/images/bahirdar-resort.jpg",
    amenities: ["Spa", "Restaurant", "Pool", "Lake View", "Boat Tours"],
  },
  {
    id: "adama",
    name: "Kuriftu Resort & Spa Adama",
    latitude: 8.54,
    longitude: 39.27,
    address: "Adama, Ethiopia",
    description: "A luxurious retreat in the heart of Adama, perfect for weekend getaways and business retreats.",
    rating: 4.6,
    essencePoints: 130,
    image: "/images/adama-resort.jpg",
    amenities: ["Spa", "Restaurant", "Pool", "Conference Facilities", "Gym"],
  },
  {
    id: "diplomat",
    name: "Diplomat Restaurant by Kuriftu",
    latitude: 9.0092,
    longitude: 38.7645,
    address: "Addis Ababa, Ethiopia",
    description: "Experience fine Ethiopian and international cuisine in the heart of Addis Ababa.",
    rating: 4.5,
    essencePoints: 80,
    image: "/images/diplomat-restaurant.jpg",
    amenities: ["Fine Dining", "Private Events", "Cultural Shows", "Vegan Options"],
  },
  {
    id: "boston",
    name: "Boston Day Spa by Kuriftu",
    latitude: 9.0233,
    longitude: 38.7472,
    address: "Addis Ababa, Ethiopia",
    description: "Urban wellness sanctuary offering premium spa treatments and relaxation therapies.",
    rating: 4.7,
    essencePoints: 100,
    image: "/images/boston-spa.jpg",
    amenities: ["Massage", "Facial Treatments", "Sauna", "Steam Room", "Wellness Packages"],
  },
  {
    id: "entoto",
    name: "Entoto Kuriftu Park",
    latitude: 9.0847,
    longitude: 38.7633,
    address: "Entoto, Addis Ababa, Ethiopia",
    description: "Scenic mountain park with hiking trails, cultural experiences, and panoramic views of Addis Ababa.",
    rating: 4.6,
    essencePoints: 120,
    image: "/images/entoto-park.jpg",
    amenities: ["Hiking Trails", "Cultural Center", "Restaurant", "Viewpoints", "Adventure Activities"],
  },
]

// User visit history
export const userVisits = [
  {
    id: "visit1",
    locationId: "bishoftu",
    experienceId: "stay",
    date: "2023-10-15",
    points: 150,
    completed: true,
  },
  {
    id: "visit2",
    locationId: "bishoftu",
    experienceId: "spa",
    date: "2023-10-16",
    points: 75,
    completed: true,
  },
  {
    id: "visit3",
    locationId: "bahirdar",
    experienceId: "dining",
    date: "2023-11-20",
    points: 50,
    completed: true,
  },
  {
    id: "visit4",
    locationId: "diplomat",
    experienceId: "dining",
    date: "2023-12-05",
    points: 40,
    completed: true,
  },
  {
    id: "visit5",
    locationId: "boston",
    experienceId: "spa",
    date: "2024-01-10",
    points: 60,
    completed: true,
  },
]

// Experience types
export const experienceTypes = [
  {
    id: "stay",
    name: "Resort Stay",
    icon: "Coffee",
    color: "#1B4332", // kuriftu-green
  },
  {
    id: "spa",
    name: "Spa Treatment",
    icon: "Spa",
    color: "#D4AF37", // kuriftu-gold
  },
  {
    id: "dining",
    name: "Dining Experience",
    icon: "Utensils",
    color: "#B76E48", // kuriftu-terracotta
  },
  {
    id: "adventure",
    name: "Adventure Activity",
    icon: "Mountain",
    color: "#2D6A4F", // kuriftu-green-light
  },
  {
    id: "cultural",
    name: "Cultural Experience",
    icon: "Landmark",
    color: "#9C27B0", // purple
  },
]

// User stats
export const userStats = {
  totalEssencePoints: 375,
  totalVisits: 5,
  memberSince: "2023-10-01",
  tier: "Pathfinder",
  tierProgress: 75,
}

// Membership tiers
export const membershipTiers = [
  {
    id: "explorer",
    name: "Explorer",
    amharicName: "አስሳሽ",
    pointsRequired: 0,
    benefits: ["Basic booking access", "Essence Points on stays", "Digital passport"],
    color: "#6B7280", // gray
  },
  {
    id: "pathfinder",
    name: "Pathfinder",
    amharicName: "መንገድ ፈላጊ",
    pointsRequired: 100,
    benefits: ["10% discount on dining", "Welcome drink", "Late checkout when available"],
    color: "#2D6A4F", // kuriftu-green-light
  },
  {
    id: "heritage",
    name: "Heritage Seeker",
    amharicName: "የቅርስ ፈላጊ",
    pointsRequired: 250,
    benefits: ["15% spa discount", "Room upgrade when available", "Cultural experience discount"],
    color: "#B76E48", // kuriftu-terracotta
  },
  {
    id: "nomad",
    name: "Cultural Nomad",
    amharicName: "የባህል ተዘዋዋሪ",
    pointsRequired: 500,
    benefits: ["20% off all services", "Priority booking", "Exclusive cultural events"],
    color: "#D4AF37", // kuriftu-gold
  },
  {
    id: "ambassador",
    name: "Kuriftu Ambassador",
    amharicName: "የኩሪፍቱ አምባሳደር",
    pointsRequired: 900,
    benefits: ["25% off all services", "Dedicated concierge", "Free airport transfers", "Annual free night"],
    color: "#9C27B0", // purple
  },
]

// Upcoming events
export const upcomingEvents = [
  {
    id: "event1",
    name: "Ethiopian Coffee Ceremony",
    locationId: "bishoftu",
    date: "2024-05-15",
    description: "Experience the traditional Ethiopian coffee ceremony with local experts.",
    image: "/images/coffee-ceremony.jpg",
    points: 30,
    price: "Free for guests",
  },
  {
    id: "event2",
    name: "Lake Tana Sunset Cruise",
    locationId: "bahirdar",
    date: "2024-05-20",
    description: "Enjoy a scenic sunset cruise on Lake Tana with traditional music and refreshments.",
    image: "/images/lake-tana-cruise.jpg",
    points: 45,
    price: "1200 Birr",
  },
  {
    id: "event3",
    name: "Wellness Weekend Retreat",
    locationId: "adama",
    date: "2024-06-10",
    description: "A full weekend of spa treatments, yoga, and wellness activities.",
    image: "/images/wellness-retreat.jpg",
    points: 100,
    price: "5000 Birr",
  },
]

// Location-specific cultural information
export const culturalInfo = [
  {
    locationId: "bishoftu",
    culturalName: "Bishoftu (Debre Zeit)",
    historicalFacts: [
      "Originally called Debre Zeit, meaning 'Mountain of Olives'",
      "Home to five crater lakes formed by volcanic activity",
      "Was a retreat for Ethiopian royalty in the 20th century",
    ],
    localCuisine: ["Doro Wat", "Kitfo", "Fresh lake fish dishes"],
    traditionalCrafts: ["Pottery", "Basket weaving", "Wood carving"],
    localHeroes: [
      {
        name: "Abebe Bikila",
        description: "Olympic marathon champion who trained in the hills around Bishoftu",
      },
    ],
  },
  {
    locationId: "bahirdar",
    culturalName: "Bahir Dar",
    historicalFacts: [
      "Name means 'sea shore' in Amharic",
      "Located near the source of the Blue Nile",
      "Home to ancient monasteries on Lake Tana islands",
    ],
    localCuisine: ["Injera with Lake Tana fish", "Shiro", "Bayenetu"],
    traditionalCrafts: ["Tankwa boat making", "Religious paintings", "Papyrus crafts"],
    localHeroes: [
      {
        name: "Empress Mentewab",
        description: "18th century empress who built churches and monasteries in the region",
      },
    ],
  },
  {
    locationId: "adama",
    culturalName: "Adama (Nazret)",
    historicalFacts: [
      "Important trade center connecting highlands and lowlands",
      "Named after the biblical Adam",
      "Became a major city during the Italian occupation",
    ],
    localCuisine: ["Chechebsa", "Genfo", "Oromo coffee ceremony"],
    traditionalCrafts: ["Leather work", "Beadwork", "Traditional Oromo clothing"],
    localHeroes: [
      {
        name: "Malik Ambar",
        description: "Ethiopian-born leader who became a powerful military leader in India",
      },
    ],
  },
]

// Recommended itineraries
export const recommendedItineraries = [
  {
    id: "itinerary1",
    name: "Ethiopian Heritage Tour",
    duration: "7 days",
    locations: ["bishoftu", "bahirdar", "entoto"],
    description: "Explore Ethiopia's rich cultural heritage through historical sites and traditional experiences.",
    highlights: [
      "Coffee ceremony in Bishoftu",
      "Lake Tana monastery tour",
      "Entoto mountain hiking",
      "Traditional music and dance performances",
    ],
    essencePoints: 350,
  },
  {
    id: "itinerary2",
    name: "Wellness Escape",
    duration: "5 days",
    locations: ["bishoftu", "boston"],
    description: "Rejuvenate your body and mind with spa treatments, yoga, and healthy cuisine.",
    highlights: [
      "Daily yoga sessions",
      "Traditional Ethiopian spa treatments",
      "Meditation by Lake Bishoftu",
      "Healthy Ethiopian cuisine workshops",
    ],
    essencePoints: 250,
  },
  {
    id: "itinerary3",
    name: "Culinary Journey",
    duration: "4 days",
    locations: ["diplomat", "bishoftu", "adama"],
    description: "Discover the flavors of Ethiopia through cooking classes and dining experiences.",
    highlights: [
      "Ethiopian cooking class",
      "Coffee plantation tour",
      "Wine tasting in Adama",
      "Traditional dinner with local families",
    ],
    essencePoints: 200,
  },
]

// Format date helper function
export function formatDate(dateString: string): string {
  const options: Intl.DateTimeFormatOptions = { year: "numeric", month: "short", day: "numeric" }
  return new Date(dateString).toLocaleDateString("en-US", options)
}

// Get user's current location (for demo purposes)
export function getCurrentUserLocation() {
  // In a real app, this would use geolocation or user preferences
  return "bishoftu" // Default to Bishoftu for demo
}

// Get location-specific theme
export function getLocationTheme(locationId: string) {
  switch (locationId) {
    case "bishoftu":
      return "location-bishoftu"
    case "bahirdar":
      return "location-bahirdar"
    case "entoto":
      return "location-entoto"
    case "adama":
      return "location-adama"
    default:
      return "location-bishoftu"
  }
}
