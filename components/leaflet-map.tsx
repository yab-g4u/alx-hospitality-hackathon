"use client"

import type React from "react"

import { useEffect, useRef, useState } from "react"
import { motion } from "framer-motion"
import { Navigation, X, Info, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { resortLocations } from "@/lib/data"

interface LeafletMapProps {
  onSelectLocation?: (locationId: string) => void
  className?: string
}

export function LeafletMap({ onSelectLocation, className }: LeafletMapProps) {
  const [selectedLocation, setSelectedLocation] = useState<string | null>(null)
  const [mapInitialized, setMapInitialized] = useState(false)
  const mapContainerRef = useRef<HTMLDivElement>(null)
  const mapInstanceRef = useRef<any>(null)
  const markersRef = useRef<any[]>([])

  // Initialize the map when the component mounts
  useEffect(() => {
    if (typeof window !== "undefined" && !mapInitialized && mapContainerRef.current) {
      // This would be replaced with actual Leaflet initialization in a real app
      // For demo purposes, we're simulating the map with a placeholder
      setMapInitialized(true)

      // Simulate map initialization after a short delay
      const timer = setTimeout(() => {
        if (mapContainerRef.current) {
          // Add Ethiopian map styling
          const mapContainer = mapContainerRef.current
          mapContainer.style.backgroundImage = "url('/placeholder.svg?height=1000&width=1000')"
          mapContainer.style.backgroundSize = "cover"
          mapContainer.style.backgroundPosition = "center"
          mapContainer.style.position = "relative"

          // Add Ethiopian pattern overlay
          const overlay = document.createElement("div")
          overlay.className = "absolute inset-0 bg-ethiopian-pattern opacity-10 pointer-events-none"
          mapContainer.appendChild(overlay)

          // Add markers for each resort location
          resortLocations.forEach((location) => {
            createMarker(location)
          })
        }
      }, 500)

      return () => clearTimeout(timer)
    }
  }, [mapInitialized])

  // Create a marker for a location
  const createMarker = (location: any) => {
    if (!mapContainerRef.current) return

    // Create marker element
    const marker = document.createElement("div")
    marker.className = "absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer z-10"
    marker.style.left = `${Math.random() * 80 + 10}%` // Random position for demo
    marker.style.top = `${Math.random() * 80 + 10}%` // Random position for demo

    // Create marker content
    marker.innerHTML = `
      <div class="relative">
        <div class="h-6 w-6 rounded-full bg-brown text-white flex items-center justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"></path>
            <circle cx="12" cy="10" r="3"></circle>
          </svg>
        </div>
        <div class="absolute -bottom-1 left-1/2 transform -translate-x-1/2 text-xs font-bold text-white bg-brown px-1 rounded opacity-0 transition-opacity hover:opacity-100">
          ${location.name.split(" ")[0]}
        </div>
      </div>
    `

    // Add click event
    marker.addEventListener("click", () => {
      handleLocationClick(location.id)
    })

    // Add to map
    mapContainerRef.current.appendChild(marker)
    markersRef.current.push({ element: marker, locationId: location.id })
  }

  const handleLocationClick = (locationId: string) => {
    setSelectedLocation(locationId === selectedLocation ? null : locationId)
    if (onSelectLocation) {
      onSelectLocation(locationId)
    }

    // Update marker styles
    markersRef.current.forEach((marker) => {
      const iconElement = marker.element.querySelector("div > div")
      if (iconElement) {
        if (marker.locationId === locationId) {
          iconElement.classList.remove("bg-brown")
          iconElement.classList.add("bg-gold")

          // Add pulse effect
          const pulseElement = document.createElement("div")
          pulseElement.className =
            "absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-10 h-10 rounded-full bg-gold/30 animate-map-marker-pulse"
          marker.element.querySelector(".relative").appendChild(pulseElement)
        } else {
          iconElement.classList.remove("bg-gold")
          iconElement.classList.add("bg-brown")

          // Remove pulse effect
          const pulseElement = marker.element.querySelector(".animate-map-marker-pulse")
          if (pulseElement) pulseElement.remove()
        }
      }
    })
  }

  const handleMapClick = (e: React.MouseEvent) => {
    // If clicking on the map background (not a marker), deselect
    if ((e.target as HTMLElement).classList.contains("map-container")) {
      setSelectedLocation(null)
    }
  }

  const handleZoomIn = () => {
    // Simulate zoom in
    if (mapContainerRef.current) {
      mapContainerRef.current.style.backgroundSize = "120% 120%"
    }
  }

  const handleZoomOut = () => {
    // Simulate zoom out
    if (mapContainerRef.current) {
      mapContainerRef.current.style.backgroundSize = "100% 100%"
    }
  }

  const handleResetView = () => {
    // Reset view
    if (mapContainerRef.current) {
      mapContainerRef.current.style.backgroundSize = "cover"
      mapContainerRef.current.style.backgroundPosition = "center"
    }
  }

  return (
    <div className={`relative overflow-hidden rounded-xl border border-border ${className}`}>
      {/* Map controls */}
      <div className="absolute top-4 right-4 z-10 flex flex-col gap-2">
        <Button variant="secondary" size="icon" onClick={handleZoomIn} className="bg-white/80 backdrop-blur-sm">
          <span className="text-lg">+</span>
        </Button>
        <Button variant="secondary" size="icon" onClick={handleZoomOut} className="bg-white/80 backdrop-blur-sm">
          <span className="text-lg">-</span>
        </Button>
        <Button variant="secondary" size="icon" onClick={handleResetView} className="bg-white/80 backdrop-blur-sm">
          <Navigation className="h-4 w-4" />
        </Button>
      </div>

      {/* Map container */}
      <div
        ref={mapContainerRef}
        className="map-container relative h-[500px] w-full overflow-hidden bg-sand-light"
        onClick={handleMapClick}
      >
        {/* Ethiopian outline overlay */}
        <svg
          className="absolute inset-0 w-full h-full z-0 opacity-20 pointer-events-none"
          viewBox="0 0 800 800"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M400 100C500 150 600 200 650 300C700 400 700 500 650 600C600 700 500 750 400 750C300 750 200 700 150 600C100 500 100 400 150 300C200 200 300 150 400 100Z"
            stroke="#D4AF37"
            strokeWidth="8"
            className="animate-path-draw"
            strokeDasharray="1000"
            strokeDashoffset="1000"
            strokeLinecap="round"
          />
        </svg>

        {/* Location info card */}
        {selectedLocation && (
          <motion.div
            className="absolute bottom-4 left-4 right-4 md:left-auto md:right-4 md:w-80 z-20"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.3 }}
          >
            <Card className="bg-white/90 backdrop-blur-sm border-gold">
              <CardContent className="p-4">
                {resortLocations
                  .filter((loc) => loc.id === selectedLocation)
                  .map((location) => (
                    <div key={location.id} className="space-y-3">
                      <div className="flex justify-between items-start">
                        <h3 className="font-serif text-lg font-semibold text-brown">{location.name}</h3>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-6 w-6 -mt-1 -mr-1"
                          onClick={(e) => {
                            e.stopPropagation()
                            setSelectedLocation(null)
                          }}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>

                      <p className="text-sm text-muted-foreground">{location.description}</p>

                      {/* Add Amharic name for cultural connection */}
                      <p className="text-sm font-amharic text-brown">
                        {location.id === "bishoftu" && "ቢሾፍቱ"}
                        {location.id === "bahirdar" && "ባህር ዳር"}
                        {location.id === "entoto" && "እንጦጦ"}
                        {location.id === "africanvillage" && "የአፍሪካ መንደር"}
                        {location.id === "awashfalls" && "አዋሽ ፏፏቴ"}
                      </p>

                      <div className="flex items-center gap-1 text-sm">
                        <Star className="h-4 w-4 text-gold fill-gold" />
                        <span className="font-medium">{location.rating}</span>
                        <span className="text-muted-foreground">• {location.address}</span>
                      </div>

                      <div className="flex flex-wrap gap-1">
                        {location.amenities.slice(0, 4).map((amenity, i) => (
                          <Badge key={i} variant="outline" className="bg-sand/50">
                            {amenity}
                          </Badge>
                        ))}
                        {location.amenities.length > 4 && (
                          <Badge variant="outline" className="bg-sand/50">
                            +{location.amenities.length - 4} more
                          </Badge>
                        )}
                      </div>

                      <div className="flex items-center justify-between pt-2">
                        <div className="flex items-center gap-1">
                          <Info className="h-4 w-4 text-emerald" />
                          <span className="text-sm text-emerald font-medium">
                            +{location.essencePoints} Essence Points
                          </span>
                        </div>
                        <Button
                          size="sm"
                          className="bg-brown text-white hover:bg-brown-dark"
                          onClick={(e) => {
                            e.stopPropagation()
                            if (onSelectLocation) onSelectLocation(location.id)
                          }}
                        >
                          View Details
                        </Button>
                      </div>
                    </div>
                  ))}
              </CardContent>
            </Card>
          </motion.div>
        )}
      </div>
    </div>
  )
}
