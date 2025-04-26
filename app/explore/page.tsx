"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useRouter } from "next/navigation"
import {
  ChevronLeft,
  MapPin,
  Star,
  Search,
  Filter,
  X,
  Check,
  Coffee,
  Utensils,
  Wifi,
  Dumbbell,
  SpadeIcon as Spa,
  SpadeIcon as Spa,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { InteractiveMapLeaflet } from "@/components/interactive-map-leaflet"
import { resortLocations, getCurrentUserLocation, getLocationTheme } from "@/lib/data"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function Explore() {
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedResort, setSelectedResort] = useState<string | null>(null)
  const [filterOpen, setFilterOpen] = useState(false)
  const [showAvailabilityCheck, setShowAvailabilityCheck] = useState(false)
  const [selectedDate, setSelectedDate] = useState<string | null>(null)
  const [selectedGuests, setSelectedGuests] = useState<number>(2)
  const [isAvailable, setIsAvailable] = useState<boolean | null>(null)
  const [isChecking, setIsChecking] = useState(false)
  const currentLocation = getCurrentUserLocation()
  const locationTheme = getLocationTheme(currentLocation)

  const handleBack = () => {
    router.push("/dashboard")
  }

  const handleResortClick = (resortId: string) => {
    setSelectedResort(resortId === selectedResort ? null : resortId)
  }

  const handleMapLocationSelect = (locationId: string) => {
    setSelectedResort(locationId)
    // Scroll to the resort card if on list view
    const element = document.getElementById(`resort-${locationId}`)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  const handleBookNow = (resortId: string) => {
    setSelectedResort(resortId)
    setShowAvailabilityCheck(true)
  }

  const checkAvailability = () => {
    setIsChecking(true)
    // Simulate API call to check availability
    setTimeout(() => {
      // 80% chance of availability for demo purposes
      setIsAvailable(Math.random() > 0.2)
      setIsChecking(false)
    }, 1500)
  }

  const proceedToBooking = () => {
    router.push(`/booking?resort=${selectedResort}&date=${selectedDate}&guests=${selectedGuests}`)
  }

  // Filter resorts based on search query
  const filteredResorts = resortLocations.filter(
    (resort) =>
      resort.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      resort.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      resort.address.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  // Get amenity icon
  const getAmenityIcon = (amenity: string) => {
    switch (amenity.toLowerCase()) {
      case "spa":
        return <Spa className="h-3 w-3 mr-1" />
      case "restaurant":
      case "dining venues":
        return <Utensils className="h-3 w-3 mr-1" />
      case "wifi":
        return <Wifi className="h-3 w-3 mr-1" />
      case "gym":
      case "wellness center":
        return <Dumbbell className="h-3 w-3 mr-1" />
      default:
        return <Coffee className="h-3 w-3 mr-1" />
    }
  }

  return (
    <div className={`min-h-screen ${locationTheme}`}>
      <header className="bg-kuriftu-green text-white p-4 sticky top-0 z-30 shadow-md">
        <div className="container mx-auto">
          <div className="flex items-center">
            <Button
              variant="ghost"
              size="icon"
              className="mr-2 text-white hover:bg-kuriftu-green-light"
              onClick={handleBack}
            >
              <ChevronLeft className="h-5 w-5" />
              <span className="sr-only">Back</span>
            </Button>
            <h1 className="font-serif text-xl font-bold">Explore Kuriftu Resorts</h1>
          </div>
        </div>
      </header>

      <main className="container mx-auto p-4 md:p-6">
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-kuriftu-charcoal/50" />
              <Input
                placeholder="Search resorts, locations..."
                className="pl-10 bg-white border-kuriftu-sand focus-visible:ring-kuriftu-green"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Button
              variant="outline"
              size="icon"
              className="flex-shrink-0 border-kuriftu-sand hover:bg-kuriftu-sand/20"
              onClick={() => setFilterOpen(!filterOpen)}
            >
              <Filter className="h-4 w-4 text-kuriftu-charcoal" />
              <span className="sr-only">Filter</span>
            </Button>
          </div>

          <AnimatePresence>
            {filterOpen && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="overflow-hidden mb-4"
              >
                <Card className="border-kuriftu-sand/30">
                  <CardContent className="p-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <Label className="text-kuriftu-charcoal">Amenities</Label>
                        <div className="flex flex-wrap gap-2 mt-2">
                          {["Spa", "Pool", "Restaurant", "WiFi", "Gym"].map((amenity) => (
                            <Badge
                              key={amenity}
                              variant="outline"
                              className="cursor-pointer border-kuriftu-sand hover:bg-kuriftu-sand/20"
                            >
                              {amenity}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      <div>
                        <Label className="text-kuriftu-charcoal">Price Range</Label>
                        <div className="flex items-center gap-2 mt-2">
                          <Input
                            type="number"
                            placeholder="Min"
                            className="border-kuriftu-sand focus-visible:ring-kuriftu-green"
                          />
                          <span>-</span>
                          <Input
                            type="number"
                            placeholder="Max"
                            className="border-kuriftu-sand focus-visible:ring-kuriftu-green"
                          />
                        </div>
                      </div>
                      <div>
                        <Label className="text-kuriftu-charcoal">Rating</Label>
                        <div className="flex items-center gap-1 mt-2">
                          {[1, 2, 3, 4, 5].map((rating) => (
                            <Button
                              key={rating}
                              variant="outline"
                              size="sm"
                              className="border-kuriftu-sand hover:bg-kuriftu-sand/20 p-1 h-8 w-8"
                            >
                              {rating}
                            </Button>
                          ))}
                        </div>
                      </div>
                    </div>
                    <div className="flex justify-end mt-4">
                      <Button
                        variant="outline"
                        size="sm"
                        className="mr-2 border-kuriftu-sand text-kuriftu-charcoal hover:bg-kuriftu-sand/20"
                      >
                        Reset
                      </Button>
                      <Button size="sm" className="bg-kuriftu-green text-white hover:bg-kuriftu-green-light">
                        Apply Filters
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )}
          </AnimatePresence>

          <Tabs defaultValue="map" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-6 bg-kuriftu-sand/30">
              <TabsTrigger
                value="map"
                className="data-[state=active]:bg-kuriftu-green data-[state=active]:text-white text-kuriftu-charcoal"
              >
                Map View
              </TabsTrigger>
              <TabsTrigger
                value="list"
                className="data-[state=active]:bg-kuriftu-green data-[state=active]:text-white text-kuriftu-charcoal"
              >
                List View
              </TabsTrigger>
            </TabsList>

            <TabsContent value="map" className="mt-0">
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
                <InteractiveMapLeaflet
                  onSelectLocation={handleMapLocationSelect}
                  className="h-[600px] mb-6"
                  currentLocation={currentLocation}
                />
              </motion.div>
            </TabsContent>

            <TabsContent value="list" className="mt-0">
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
                <div className="space-y-4">
                  {filteredResorts.length > 0 ? (
                    filteredResorts.map((resort) => (
                      <Card
                        key={resort.id}
                        id={`resort-${resort.id}`}
                        className={`overflow-hidden transition-all duration-300 border-kuriftu-sand/30 hover:shadow-md ${
                          selectedResort === resort.id ? "border-kuriftu-gold ring-1 ring-kuriftu-gold" : ""
                        } ${resort.id === currentLocation ? "border-kuriftu-green ring-1 ring-kuriftu-green" : ""}`}
                        onClick={() => handleResortClick(resort.id)}
                      >
                        <div className="md:flex">
                          <div className="md:w-1/3 h-48 md:h-auto bg-kuriftu-sand/20 relative">
                            <img
                              src={resort.image || "/placeholder.svg?height=300&width=400"}
                              alt={resort.name}
                              className="w-full h-full object-cover"
                            />
                            <div className="absolute top-2 right-2 bg-white/90 backdrop-blur-sm rounded-full px-2 py-1 flex items-center">
                              <Star className="h-3 w-3 text-kuriftu-gold fill-kuriftu-gold mr-1" />
                              <span className="text-xs font-medium text-kuriftu-charcoal">{resort.rating}</span>
                            </div>
                            {resort.id === currentLocation && (
                              <div className="absolute top-2 left-2 bg-kuriftu-green text-white text-xs px-2 py-1 rounded-full">
                                You are here
                              </div>
                            )}
                          </div>

                          <CardContent className="p-4 md:p-6 md:w-2/3">
                            <div className="flex flex-col h-full">
                              <div>
                                <div className="flex items-start justify-between mb-2">
                                  <h3 className="font-serif text-lg font-semibold text-kuriftu-charcoal">
                                    {resort.name}
                                  </h3>
                                  <div className="flex items-center text-xs text-kuriftu-green font-medium">
                                    <Sparkles className="h-3 w-3 mr-1" />+{resort.essencePoints} Kuripoints
                                  </div>
                                </div>

                                <div className="flex items-center text-sm text-kuriftu-charcoal/70 mb-3">
                                  <MapPin className="h-4 w-4 mr-1 flex-shrink-0" />
                                  <span>{resort.address}</span>
                                </div>

                                <p className="text-sm text-kuriftu-charcoal/70 mb-4">{resort.description}</p>
                              </div>

                              <div className="mt-auto">
                                <div className="flex flex-wrap gap-1 mb-3">
                                  {resort.amenities.slice(0, 4).map((amenity, i) => (
                                    <Badge
                                      key={i}
                                      variant="outline"
                                      className="bg-kuriftu-sand/30 text-kuriftu-charcoal border-kuriftu-sand flex items-center"
                                    >
                                      {getAmenityIcon(amenity)}
                                      {amenity}
                                    </Badge>
                                  ))}
                                  {resort.amenities.length > 4 && (
                                    <Badge
                                      variant="outline"
                                      className="bg-kuriftu-sand/30 text-kuriftu-charcoal border-kuriftu-sand"
                                    >
                                      +{resort.amenities.length - 4} more
                                    </Badge>
                                  )}
                                </div>

                                <div className="flex justify-end">
                                  <Button
                                    size="sm"
                                    className="bg-kuriftu-green text-white hover:bg-kuriftu-green-light"
                                    onClick={(e) => {
                                      e.stopPropagation()
                                      handleBookNow(resort.id)
                                    }}
                                  >
                                    Check Availability
                                  </Button>
                                </div>
                              </div>
                            </div>
                          </CardContent>
                        </div>
                      </Card>
                    ))
                  ) : (
                    <div className="text-center py-12">
                      <MapPin className="h-12 w-12 text-kuriftu-charcoal/30 mx-auto mb-4" />
                      <h3 className="font-serif text-lg font-semibold text-kuriftu-charcoal mb-2">No Resorts Found</h3>
                      <p className="text-sm text-kuriftu-charcoal/70">Try adjusting your search criteria</p>
                    </div>
                  )}
                </div>
              </motion.div>
            </TabsContent>
          </Tabs>
        </div>
      </main>

      {/* Availability Check Dialog */}
      <Dialog open={showAvailabilityCheck} onOpenChange={setShowAvailabilityCheck}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-kuriftu-charcoal">Check Availability</DialogTitle>
            <DialogDescription>
              {selectedResort && `Check availability at ${resortLocations.find((r) => r.id === selectedResort)?.name}`}
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="date" className="text-right text-kuriftu-charcoal">
                Date
              </Label>
              <div className="col-span-3">
                <Select onValueChange={setSelectedDate}>
                  <SelectTrigger className="border-kuriftu-sand">
                    <SelectValue placeholder="Select date" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="today">Today</SelectItem>
                    <SelectItem value="tomorrow">Tomorrow</SelectItem>
                    <SelectItem value="weekend">This Weekend</SelectItem>
                    <SelectItem value="next-week">Next Week</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="guests" className="text-right text-kuriftu-charcoal">
                Guests
              </Label>
              <div className="col-span-3">
                <Select defaultValue="2" onValueChange={(value) => setSelectedGuests(Number.parseInt(value))}>
                  <SelectTrigger className="border-kuriftu-sand">
                    <SelectValue placeholder="Number of guests" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">1 Guest</SelectItem>
                    <SelectItem value="2">2 Guests</SelectItem>
                    <SelectItem value="3">3 Guests</SelectItem>
                    <SelectItem value="4">4 Guests</SelectItem>
                    <SelectItem value="5">5+ Guests</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {isAvailable !== null && (
              <div className={`p-3 rounded-md ${isAvailable ? "bg-green-50" : "bg-red-50"}`}>
                {isAvailable ? (
                  <div className="flex items-center text-green-700">
                    <Check className="h-5 w-5 mr-2" />
                    <span>Available! You can proceed with booking.</span>
                  </div>
                ) : (
                  <div className="flex items-center text-red-700">
                    <X className="h-5 w-5 mr-2" />
                    <span>Sorry, no availability for the selected date.</span>
                  </div>
                )}
              </div>
            )}
          </div>

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setShowAvailabilityCheck(false)}
              className="border-kuriftu-sand text-kuriftu-charcoal hover:bg-kuriftu-sand/20"
            >
              Cancel
            </Button>
            {isAvailable === null ? (
              <Button
                onClick={checkAvailability}
                className="bg-kuriftu-green text-white hover:bg-kuriftu-green-light"
                disabled={!selectedDate || isChecking}
              >
                {isChecking ? (
                  <>
                    <span className="mr-2">Checking...</span>
                    <span className="animate-spin">⟳</span>
                  </>
                ) : (
                  "Check Availability"
                )}
              </Button>
            ) : isAvailable ? (
              <Button onClick={proceedToBooking} className="bg-kuriftu-green text-white hover:bg-kuriftu-green-light">
                Proceed to Booking
              </Button>
            ) : (
              <Button
                onClick={() => setIsAvailable(null)}
                className="bg-kuriftu-terracotta text-white hover:bg-terracotta-light"
              >
                Try Different Date
              </Button>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
