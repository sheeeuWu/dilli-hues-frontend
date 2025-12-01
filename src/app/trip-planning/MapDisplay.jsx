"use client";
import Map, { Marker } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";

export default function MapDisplay({ places }) {
  const mapboxToken = 'pk.eyJ1IjoicHJhc2hhbnQxNjExIiwiYSI6ImNtYWNyejAwZDAwZ28ycW9kdGpkNmxqMXEifQ.rv24V3N6Peq8GUSNXTc08w';

  const defaultView = {
    longitude: 77.209, // Delhi center
    latitude: 28.6139,
    zoom: 12,
  };

  return (
    <Map
      mapboxAccessToken={mapboxToken}
      initialViewState={defaultView}
      style={{ width: "100%", height: "100%" }}
      mapStyle="mapbox://styles/mapbox/streets-v11"
    >
      {places.map((place, i) => (
        <Marker
  key={i}
  longitude={parseFloat(place.longitude)}
  latitude={parseFloat(place.latitude)}
  anchor="bottom"
>
  <div className="text-xl">📍</div>
</Marker>

      ))}
    </Map>
  );
}