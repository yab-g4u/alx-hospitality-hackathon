"use client"

import { useEffect, useRef, useState } from "react"
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet"
import L from "leaflet"
import "leaflet/dist/leaflet.css"
import { motion } from "framer-motion"
import { MapPin, Calendar, Award, ArrowRight, Check } from "lucide-react"
import { formatDate } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

// Fix Leaflet marker icon issues
const fixLeafletIcon = () => {
  // @ts-ignore
  delete L.Icon.Default.prototype._getIconUrl
  L.Icon.Default.mergeOptions({
    iconRetinaUrl: "/images/marker-icon.png",
    iconUrl: "/images/marker-icon.png",
    shadowUrl: "/images/marker-shadow.png",
  })
}

// Custom marker icons
const createCustomIcon = (visited: boolean) => {
  return new L.Icon({
    iconUrl: visited ? "/images/marker-visited.png" : "/images/marker-icon.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowUrl: "/images/marker-shadow.png",
    shadowSize: [41, 41],
  })
}

// Map center adjuster component
function MapCenterAdjuster({ center }: { center: [number, number] }) {
  const map = useMap()
  useEffect(() => {
    map.setView(center, map.getZoom())
  }, [center, map])
  return null
}

interface Location {
  id: string
  name: string
  latitude: number
  longitude: number
  visited?: boolean
  visitDate?: string
  points?: number
  image?: string
  description?: string
}

interface JourneyMapProps {
  locations: Location[]
  onLocationSelect?: (locationId: string) => void
  className?: string
  currentLocation?: string
}

export function JourneyMap({ locations, onLocationSelect, className = "", currentLocation }: JourneyMapProps) {
  const [mapCenter, setMapCenter] = useState<[number, number]>([9.145, 40.4897]) // Default center of Ethiopia
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(null)
  const mapRef = useRef<L.Map | null>(null)

  useEffect(() => {
    fixLeafletIcon()

    // If a current location is provided, center the map on it
    if (currentLocation) {
      const location = locations.find((loc) => loc.id === currentLocation)
      if (location) {
        setMapCenter([location.latitude, location.longitude])
        setSelectedLocation(location)
      }
    }
  }, [currentLocation, locations])

  const handleMarkerClick = (location: Location) => {
    setSelectedLocation(location)
    setMapCenter([location.latitude, location.longitude])
    if (onLocationSelect) {
      onLocationSelect(location.id)
    }
  }

  // Create a custom marker icon for each location
  const getMarkerIcon = (location: Location) => {
    return createCustomIcon(location.visited || false)
  }

  return (
    <div className={`relative rounded-xl overflow-hidden border border-kuriftu-sand/30 ${className}`}>
      <MapContainer
        center={mapCenter}
        zoom={6}
        style={{ height: "100%", width: "100%" }}
        whenCreated={(map) => {
          mapRef.current = map
        }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <MapCenterAdjuster center={mapCenter} />

        {locations.map((location) => (
          <Marker
            key={location.id}
            position={[location.latitude, location.longitude]}
            icon={getMarkerIcon(location)}
            eventHandlers={{
              click: () => handleMarkerClick(location),
            }}
          >
            <Popup>
              <div className="p-1">
                <h3 className="font-serif font-semibold text-kuriftu-charcoal">{location.name}</h3>
                {location.visited && (
                  <div className="flex items-center text-xs text-kuriftu-gray mt-1">
                    <Calendar className="h-3 w-3 mr-1" />
                    <span>Visited: {formatDate(location.visitDate || "")}</span>
                  </div>
                )}
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>

      {/* Location details overlay */}
      {selectedLocation && (
        <motion.div
          className="absolute bottom-4 left-4 right-4 bg-white rounded-lg shadow-lg overflow-hidden border border-kuriftu-gold/30"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="p-4">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="font-serif font-semibold text-kuriftu-charcoal text-lg">{selectedLocation.name}</h3>
                <div className="flex items-center text-sm text-kuriftu-gray mt-1">
                  <MapPin className="h-4 w-4 mr-1" />
                  <span>
                    {selectedLocation.latitude.toFixed(2)}, {selectedLocation.longitude.toFixed(2)}
                  </span>
                </div>
              </div>
              {selectedLocation.visited && (
                <Badge className="bg-kuriftu-green text-white">
                  <Check className="h-3 w-3 mr-1" />
                  Visited
                </Badge>
              )}
            </div>

            {selectedLocation.description && (
              <p className="text-sm text-kuriftu-charcoal/80 mt-2">{selectedLocation.description}</p>
            )}

            {selectedLocation.visited ? (
              <div className="mt-3 flex items-center justify-between">
                <div className="flex items-center text-kuriftu-gold">
                  <Award className="h-4 w-4 mr-1" />
                  <span className="font-medium">{selectedLocation.points} Kuripoints earned</span>
                </div>
                <Button
                  size="sm"
                  className="bg-kuriftu-green text-white hover:bg-kuriftu-green-light"
                  onClick={() => onLocationSelect && onLocationSelect(selectedLocation.id)}
                >
                  View Details
                  <ArrowRight className="h-3 w-3 ml-1" />
                </Button>
              </div>
            ) : (
              <div className="mt-3 flex items-center justify-between">
                <div className="flex items-center text-kuriftu-gray">
                  <Award className="h-4 w-4 mr-1" />
                  <span>Visit to earn Kuripoints</span>
                </div>
                <Button
                  size="sm"
                  variant="outline"
                  className="border-kuriftu-green text-kuriftu-green hover:bg-kuriftu-green hover:text-white"
                  onClick={() => onLocationSelect && onLocationSelect(selectedLocation.id)}
                >
                  Explore
                  <ArrowRight className="h-3 w-3 ml-1" />
                </Button>
              </div>
            )}
          </div>
        </motion.div>
      )}
    </div>
  )
}
