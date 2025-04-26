"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { MapPin, Navigation, X, Info, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { resortLocations } from "@/lib/data"

interface InteractiveMapProps {
  onSelectLocation?: (locationId: string) => void
  className?: string
}

export function InteractiveMap({ onSelectLocation, className }: InteractiveMapProps) {
  const [selectedLocation, setSelectedLocation] = useState<string | null>(null)
  const [mapZoom, setMapZoom] = useState(1)
  const [mapCenter, setMapCenter] = useState({ x: 50, y: 50 }) // Percentage values
  const mapContainerRef = useRef<HTMLDivElement>(null)
  const [isDragging, setIsDragging] = useState(false)
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 })
  const [mapOffset, setMapOffset] = useState({ x: 0, y: 0 })

  // Convert GPS coordinates to map position
  const getMapPosition = (lat: number, lng: number) => {
    // This is a simplified conversion - in a real app, you'd use proper map projection
    // Ethiopia is roughly between 3°N to 15°N latitude and 33°E to 48°E longitude

    // Normalize to percentage coordinates on our map
    const x = ((lng - 33) / (48 - 33)) * 100
    const y = ((15 - lat) / (15 - 3)) * 100

    return { x, y }
  }

  const handleLocationClick = (locationId: string) => {
    setSelectedLocation(locationId === selectedLocation ? null : locationId)
    if (onSelectLocation) {
      onSelectLocation(locationId)
    }

    // Center map on selected location
    const location = resortLocations.find((loc) => loc.id === locationId)
    if (location) {
      const pos = getMapPosition(location.location.lat, location.location.lng)
      setMapCenter({ x: pos.x, y: pos.y })
      setMapZoom(1.5)
    }
  }

  const handleMapClick = (e: React.MouseEvent) => {
    if (isDragging) return

    // If clicking on the map background (not a marker), deselect
    if ((e.target as HTMLElement).classList.contains("map-container")) {
      setSelectedLocation(null)
    }
  }

  const handleZoomIn = () => {
    setMapZoom((prev) => Math.min(prev + 0.2, 2))
  }

  const handleZoomOut = () => {
    setMapZoom((prev) => Math.max(prev - 0.2, 0.8))
  }

  const handleResetView = () => {
    setMapZoom(1)
    setMapCenter({ x: 50, y: 50 })
    setMapOffset({ x: 0, y: 0 })
  }

  const handleMouseDown = (e: React.MouseEvent) => {
    if ((e.target as HTMLElement).classList.contains("map-container")) {
      setIsDragging(true)
      setDragStart({ x: e.clientX, y: e.clientY })
    }
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging && mapContainerRef.current) {
      const dx = e.clientX - dragStart.x
      const dy = e.clientY - dragStart.y

      const containerWidth = mapContainerRef.current.offsetWidth
      const containerHeight = mapContainerRef.current.offsetHeight

      // Convert pixel movement to percentage of container
      const percentX = (dx / containerWidth) * 100
      const percentY = (dy / containerHeight) * 100

      setMapOffset({
        x: mapOffset.x + percentX,
        y: mapOffset.y + percentY,
      })

      setDragStart({ x: e.clientX, y: e.clientY })
    }
  }

  const handleMouseUp = () => {
    setIsDragging(false)
  }

  useEffect(() => {
    // Add mouse up event listener to window to handle cases where mouse is released outside the map
    window.addEventListener("mouseup", handleMouseUp)
    return () => {
      window.removeEventListener("mouseup", handleMouseUp)
    }
  }, [])

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
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        style={{ cursor: isDragging ? "grabbing" : "grab" }}
      >
        {/* Map image - in a real app, use a proper map library */}
        <div
          className="absolute inset-0 bg-[url('/placeholder.svg?height=1000&width=1000')] bg-cover bg-center transition-transform duration-300"
          style={{
            transform: `scale(${mapZoom}) translate(${mapOffset.x}%, ${mapOffset.y}%)`,
            transformOrigin: `${mapCenter.x}% ${mapCenter.y}%`,
          }}
        >
          {/* Map markers */}
          {resortLocations.map((location) => {
            const position = getMapPosition(location.location.lat, location.location.lng)
            return (
              <div
                key={location.id}
                className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer z-10"
                style={{
                  left: `${position.x}%`,
                  top: `${position.y}%`,
                }}
                onClick={(e) => {
                  e.stopPropagation()
                  handleLocationClick(location.id)
                }}
              >
                <div className="relative">
                  <div
                    className={`h-6 w-6 rounded-full ${
                      selectedLocation === location.id ? "bg-gold" : "bg-brown"
                    } text-white flex items-center justify-center`}
                  >
                    <MapPin className="h-4 w-4" />
                  </div>
                  {selectedLocation === location.id && (
                    <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-10 h-10 rounded-full bg-gold/30 animate-map-marker-pulse" />
                  )}
                </div>
              </div>
            )
          })}
        </div>

        {/* Location info card */}
        <AnimatePresence>
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
        </AnimatePresence>
      </div>
    </div>
  )
}
