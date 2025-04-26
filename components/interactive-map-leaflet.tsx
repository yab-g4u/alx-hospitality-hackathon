"use client"

import { useEffect, useRef } from "react"
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet"
import L from "leaflet"
import "leaflet/dist/leaflet.css"
import { resortLocations } from "@/lib/data"

interface InteractiveMapLeafletProps {
  onSelectLocation?: (locationId: string) => void
  className?: string
  currentLocation?: string
}

export function InteractiveMapLeaflet({
  onSelectLocation,
  className = "",
  currentLocation,
}: InteractiveMapLeafletProps) {
  const mapRef = useRef<L.Map | null>(null)

  // Fix Leaflet marker icon issues
  useEffect(() => {
    // @ts-ignore
    delete L.Icon.Default.prototype._getIconUrl
    L.Icon.Default.mergeOptions({
      iconRetinaUrl: "/images/marker-icon.png",
      iconUrl: "/images/marker-icon.png",
      shadowUrl: "/images/marker-shadow.png",
    })
  }, [])

  // Create custom marker icons
  const createCustomIcon = (isCurrentLocation: boolean, isVisited = false) => {
    let iconUrl = "/images/marker-icon.png"

    if (isCurrentLocation) {
      iconUrl = "/images/marker-visited.png" // Green marker for current location
    }

    return new L.Icon({
      iconUrl,
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      shadowUrl: "/images/marker-shadow.png",
      shadowSize: [41, 41],
    })
  }

  // Center map on Ethiopia
  const ethiopiaCenter: [number, number] = [9.145, 40.4897]
  const defaultZoom = 6

  // Find the current location's coordinates if available
  useEffect(() => {
    if (currentLocation && mapRef.current) {
      const location = resortLocations.find((loc) => loc.id === currentLocation)
      if (location) {
        mapRef.current.setView([location.latitude, location.longitude], 10)
      }
    }
  }, [currentLocation, mapRef.current])

  return (
    <div className={`rounded-xl overflow-hidden border border-kuriftu-sand/30 ${className}`}>
      <MapContainer
        center={ethiopiaCenter}
        zoom={defaultZoom}
        style={{ height: "100%", width: "100%" }}
        whenCreated={(map) => {
          mapRef.current = map
        }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {resortLocations.map((location) => (
          <Marker
            key={location.id}
            position={[location.latitude, location.longitude]}
            icon={createCustomIcon(location.id === currentLocation)}
            eventHandlers={{
              click: () => {
                if (onSelectLocation) {
                  onSelectLocation(location.id)
                }
              },
            }}
          >
            <Popup>
              <div className="p-1">
                <h3 className="font-serif font-semibold text-kuriftu-charcoal">{location.name}</h3>
                <p className="text-xs text-kuriftu-charcoal/70 mt-1">{location.address}</p>
                {location.id === currentLocation && (
                  <div className="mt-2 text-xs font-medium text-kuriftu-green">You are here</div>
                )}
                <button
                  className="mt-2 text-xs text-kuriftu-green hover:text-kuriftu-green-light"
                  onClick={() => onSelectLocation && onSelectLocation(location.id)}
                >
                  View details
                </button>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  )
}
