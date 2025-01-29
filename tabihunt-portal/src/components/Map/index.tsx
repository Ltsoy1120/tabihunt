"use client"
import { useState, useCallback, useRef } from "react"
import {
  GoogleMap,
  useJsApiLoader,
  MarkerF,
  StandaloneSearchBox,
  Polygon,
  Libraries
} from "@react-google-maps/api"
import ZoomControl from "./components/ZoomControl"
import { PlotDto } from "../../models/plots"

const containerStyle = {
  width: "100%",
  height: "100%"
}

// Almaty
const defaultCenter = {
  lat: 43.2567,
  lng: 76.9286
}

const defaultOptions = {
  panControl: true,
  zoomControl: false,
  mapTypeControl: false,
  scaleControl: true,
  streetViewControl: true,
  rotateControl: false,
  clickableIcons: true,
  keyboardShortcuts: true,
  scrollwheel: true,
  disableDoubleClickZoom: false,
  fullScreenControl: true
}

const libraries: Libraries = ["places"]
const API_KEY =
  process.env.NEXT_PUBLIC_GOOGLE_API_KEY ??
  "AIzaSyBIzL9sZ0jJCK2kx0r7Zu9MPN9QPqEpFFs"

interface MapProps {
  center?: { lat: number; lng: number }
  plot?: PlotDto
  hasSearch?: boolean
  onMapClick?: (event: google.maps.MapMouseEvent) => void
}

const Map = ({ center, plot, hasSearch, onMapClick }: MapProps) => {
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: API_KEY,
    libraries // для поиска места на карте
  })

  const mapRef = useRef<google.maps.Map | undefined>(undefined)
  const [searchBox, setSearchBox] =
    useState<google.maps.places.SearchBox | null>(null)
  const [marker, setMarker] = useState<{ lat: number; lng: number } | null>(
    center ?? null
  )

  const onLoad = useCallback(function callback(map: google.maps.Map) {
    mapRef.current = map
  }, [])

  const onUnmount = useCallback(function callback() {
    mapRef.current = undefined
  }, [])

  const handleMapClick = (event: google.maps.MapMouseEvent) => {
    if (event.latLng) {
      const newMarker = {
        lat: event.latLng.lat(),
        lng: event.latLng.lng()
      }
      setMarker(newMarker) // установить Маркер
      onMapClick && onMapClick(event) // обработчик клика по карте с получением координат
    }
  }

  // обработчик поисковика на карте
  const onPlacesChanged = () => {
    if (searchBox) {
      const places = searchBox.getPlaces()
      if (places && places.length > 0) {
        const place = places[0]
        if (place.geometry && place.geometry.location) {
          const newCenter = {
            lat: place.geometry.location.lat(),
            lng: place.geometry.location.lng()
          }
          mapRef.current?.panTo(newCenter)
          setMarker(newCenter)
        }
      }
    }
  }

  const onSearchBoxLoad = (ref: google.maps.places.SearchBox) => {
    setSearchBox(ref)
  }

  // обработчик кнопки "+" увеличение карты
  const zoomIn = () => {
    if (mapRef.current) {
      const currentZoom = mapRef.current.getZoom()
      if (currentZoom !== undefined) {
        mapRef.current.setZoom(currentZoom + 1)
      }
    }
  }

  // обработчик кнопки "-" уменьшение карты
  const zoomOut = () => {
    if (mapRef.current) {
      const currentZoom = mapRef.current.getZoom()
      if (currentZoom !== undefined) {
        mapRef.current.setZoom(currentZoom - 1)
      }
    }
  }

  // Преобразуем координаты участка в формат, который понимает Polygon
  const plotCoordinates =
    plot &&
    plot.coordinates.map(coord => ({
      lat: coord.latitude,
      lng: coord.longitude
    }))
  return (
    <>
      {isLoaded ? (
        <>
          <ZoomControl zoomIn={zoomIn} zoomOut={zoomOut} />
          <GoogleMap
            mapContainerStyle={containerStyle}
            center={center ?? defaultCenter}
            zoom={10}
            options={defaultOptions}
            onLoad={onLoad}
            onUnmount={onUnmount}
            onClick={handleMapClick}
          >
            {marker && <MarkerF position={marker} />}
            {hasSearch && (
              <StandaloneSearchBox
                onLoad={onSearchBoxLoad}
                onPlacesChanged={onPlacesChanged}
              >
                <input
                  type="text"
                  placeholder="Поиск участка..."
                  style={{
                    boxSizing: "border-box",
                    border: "1px solid transparent",
                    background: "white",
                    width: "300px",
                    height: "32px",
                    marginTop: "10px",
                    padding: "0 12px",
                    borderRadius: "3px",
                    boxShadow: "0 2px 6px rgba(0, 0, 0, 0.3)",
                    fontSize: "14px",
                    outline: "none",
                    textOverflow: "ellipses",
                    position: "absolute",
                    top: "10px",
                    left: "50%",
                    transform: "translateX(-50%)"
                  }}
                />
              </StandaloneSearchBox>
            )}
            <Polygon
              paths={plotCoordinates}
              options={{
                fillColor: "lightblue",
                fillOpacity: 0.4,
                strokeColor: "blue",
                strokeOpacity: 0.8,
                strokeWeight: 2,
                clickable: false,
                draggable: false,
                editable: false,
                geodesic: false,
                zIndex: 1
              }}
            />
          </GoogleMap>
        </>
      ) : (
        <div>Loading</div>
      )}
    </>
  )
}

export default Map
