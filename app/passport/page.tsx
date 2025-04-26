"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { useRouter } from "next/navigation"
import { ChevronLeft, ChevronRight, Coffee, Home, MapPin, Palmtree, SpadeIcon as Spa, Utensils } from "lucide-react"
import { Button } from "@/components/ui/button"
import { PassportPage } from "@/components/passport-page"

export default function Passport() {
  const router = useRouter()
  const [currentPage, setCurrentPage] = useState(0)

  const pages = [
    {
      pageNumber: 1,
      title: "Resort Experiences",
      stamps: [
        {
          id: "stamp1",
          title: "Resort Stay",
          date: new Date(2023, 11, 15),
          location: "Kuriftu Bishoftu",
          icon: <Home />,
          collected: true,
          points: 500,
        },
        {
          id: "stamp2",
          title: "Spa Visit",
          date: new Date(2023, 11, 16),
          location: "Kuriftu Bishoftu",
          icon: <Spa />,
          collected: true,
          points: 250,
        },
        {
          id: "stamp3",
          title: "Fine Dining",
          date: new Date(2023, 11, 16),
          location: "Kuriftu Bishoftu",
          icon: <Utensils />,
          collected: true,
          points: 200,
        },
        {
          id: "stamp4",
          title: "Coffee Ceremony",
          date: new Date(2023, 11, 17),
          location: "Kuriftu Bishoftu",
          icon: <Coffee />,
          collected: false,
          points: 150,
        },
        {
          id: "stamp5",
          title: "Lake Tour",
          date: new Date(2023, 11, 17),
          location: "Kuriftu Bishoftu",
          icon: <Palmtree />,
          collected: false,
          points: 300,
        },
        {
          id: "stamp6",
          title: "Cultural Night",
          date: new Date(2023, 11, 18),
          location: "Kuriftu Bishoftu",
          icon: <MapPin />,
          collected: false,
          points: 350,
        },
      ],
    },
    {
      pageNumber: 2,
      title: "Cultural Experiences",
      stamps: [
        {
          id: "stamp7",
          title: "Coffee Tour",
          date: new Date(2024, 0, 10),
          location: "Kuriftu Entoto",
          icon: <Coffee />,
          collected: true,
          points: 300,
        },
        {
          id: "stamp8",
          title: "Heritage Walk",
          date: new Date(2024, 0, 11),
          location: "Kuriftu Entoto",
          icon: <MapPin />,
          collected: true,
          points: 350,
        },
        {
          id: "stamp9",
          title: "Craft Workshop",
          date: new Date(2024, 0, 12),
          location: "Kuriftu Entoto",
          icon: <Home />,
          collected: false,
          points: 250,
        },
        {
          id: "stamp10",
          title: "Traditional Spa",
          date: new Date(2024, 0, 12),
          location: "Kuriftu Entoto",
          icon: <Spa />,
          collected: false,
          points: 400,
        },
        {
          id: "stamp11",
          title: "Local Cuisine",
          date: new Date(2024, 0, 13),
          location: "Kuriftu Entoto",
          icon: <Utensils />,
          collected: false,
          points: 200,
        },
        {
          id: "stamp12",
          title: "Nature Hike",
          date: new Date(2024, 0, 14),
          location: "Kuriftu Entoto",
          icon: <Palmtree />,
          collected: false,
          points: 300,
        },
      ],
    },
  ]

  const handlePrevPage = () => {
    setCurrentPage((prev) => Math.max(0, prev - 1))
  }

  const handleNextPage = () => {
    setCurrentPage((prev) => Math.min(pages.length - 1, prev + 1))
  }

  const handleShare = () => {
    // In a real app, implement sharing functionality
    alert("Sharing functionality would be implemented here")
  }

  const handleBack = () => {
    router.push("/dashboard")
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="bg-brown text-white p-4">
        <div className="container mx-auto">
          <div className="flex items-center">
            <Button variant="ghost" size="icon" className="mr-2 text-white hover:bg-brown-light" onClick={handleBack}>
              <ChevronLeft className="h-5 w-5" />
              <span className="sr-only">Back</span>
            </Button>
            <h1 className="font-serif text-xl font-bold">Journey Passport</h1>
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
          <p className="text-muted-foreground">Collect stamps and create memories</p>
        </motion.div>

        <div className="relative">
          <PassportPage
            pageNumber={pages[currentPage].pageNumber}
            title={pages[currentPage].title}
            stamps={pages[currentPage].stamps}
            onShare={handleShare}
          />

          <div className="mt-6 flex items-center justify-between">
            <Button
              variant="outline"
              size="icon"
              disabled={currentPage === 0}
              onClick={handlePrevPage}
              className="border-brown text-brown hover:bg-brown hover:text-white disabled:opacity-50"
            >
              <ChevronLeft className="h-5 w-5" />
              <span className="sr-only">Previous Page</span>
            </Button>

            <div className="text-sm text-muted-foreground">
              Page {currentPage + 1} of {pages.length}
            </div>

            <Button
              variant="outline"
              size="icon"
              disabled={currentPage === pages.length - 1}
              onClick={handleNextPage}
              className="border-brown text-brown hover:bg-brown hover:text-white disabled:opacity-50"
            >
              <ChevronRight className="h-5 w-5" />
              <span className="sr-only">Next Page</span>
            </Button>
          </div>
        </div>
      </main>
    </div>
  )
}
