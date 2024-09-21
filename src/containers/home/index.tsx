"use client"

import { Map } from "@/components/fragments/map"
import L, { LatLngExpression } from "leaflet"
import { useEffect, useState } from "react"
import { useMap } from "react-leaflet"
import { PLACES } from "./data"

const customIcon = new L.Icon({
  iconUrl: "./img/hotel.png",
  iconSize: [32, 32],
  iconAnchor: [16, 32],
  popupAnchor: [0, -32]
});

const MarkerMap: React.FC<{
  selectedMarkerId: string;
}> = ({ selectedMarkerId }) => {
  const map = useMap();
  const markerRefs: { [key: number | string]: L.Marker } = {};

  useEffect(() => {
    if (!map) return;
    PLACES.forEach((place) => {
      const position: LatLngExpression = [place.lat, place.lng];
      const marker = L.marker(position, { icon: customIcon }).addTo(map);
      marker.bindPopup(place.name, {})
      markerRefs[place.name] = marker;
    })

    console.log(selectedMarkerId);
    if (selectedMarkerId !== null) {
      const selectedMarker = PLACES.find((marker) => marker.name === selectedMarkerId);
      if (selectedMarker) {
        map.flyTo([selectedMarker.lat, selectedMarker.lng], 18);
        markerRefs[selectedMarkerId].openPopup();
      }
    }
    return () => {
      map.eachLayer((layer) => {
        if (layer instanceof L.Marker) {
          map.removeLayer(layer);
        }
      });
    };
  }, [map, selectedMarkerId])

  return null
}

export const HomeContainer = () => {
  const [activePlace, setActivePlace] = useState<string>("");
  return (
    <>
      <div className="w-screen h-screen relative">
        <div className="bg-white absolute top-3 left-3 z-50 p-3 rounded-md">
          <h1 className="text-xl font-bold">Looking for hotel in Jakarta? right, igotchu</h1>
          <p className="">here is our recomendation</p>
          <div className="mt-3">
            <form action="">
              {PLACES.map((place) => (
                <div key={place.name} className="flex gap-3">
                  <input
                    type="radio"

                    checked={activePlace === place.name}
                    onChange={() => setActivePlace(place.name)} value={place.name} />
                  <p>{place.name}</p>
                </div>
              ))}
            </form>
          </div>
        </div>
        <div className="absolute w-full h-full z-10">
          <Map>
            <MarkerMap selectedMarkerId={activePlace} />
          </Map>
        </div>
      </div>
    </>
  )
}