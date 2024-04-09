/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import "./styles.css";
import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer, Marker, Popup, GeoJSON } from "react-leaflet";
import MarkerClusterGroup from "react-leaflet-cluster";
import { Icon, divIcon, point } from "leaflet";
// @ts-ignore
import placeholderIcon from "./icons/placeholder.png";
import indiaStatesData from "./data/Indian_States.json";

const customIcon = new Icon({
  iconUrl: placeholderIcon,
  iconSize: [38, 38],
});

const createClusterCustomIcon = function (cluster) {
  // @ts-ignore
  return new divIcon({
    html: `<span class="cluster-icon">${cluster.getChildCount()}</span>`,
    className: "custom-marker-cluster",
    iconSize: point(33, 33, true),
  });
};

const markers = [
  {
    geocode: [28.6139, 77.209],
    popUp: "Hello, I am pop up 1",
  },
  {
    geocode: [20.5937, 78.9629],
    popUp: "Hello, I am pop up 2",
  },
  {
    geocode: [22.5726, 88.3639],
    popUp: "Hello, I am pop up 3",
  },
];

export default function App() {
  const [map, setMap] = useState(null);

  const handleLocateMe = () => {
    if (map) {
      // @ts-ignore
      map.locate();
    }
  };

  return (
    <div className="app-container">
      <MapContainer
        center={[20.5937, 78.9629]}
        zoom={5}
        // @ts-ignore
        whenReady={setMap}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {/* Render GeoJSON layer for Indian states */}
        <GeoJSON
          // @ts-ignore
          data={indiaStatesData}
          style={stateStyle}
        />

        <MarkerClusterGroup
          chunkedLoading
          iconCreateFunction={createClusterCustomIcon}
        >
          {markers.map((marker, index) => (
            <Marker
              key={index}
              // @ts-ignore
              position={marker.geocode}
              icon={customIcon}
            >
              <Popup>{marker.popUp}</Popup>
            </Marker>
          ))}
        </MarkerClusterGroup>
      </MapContainer>

      <button className="locate-button" onClick={handleLocateMe}>
        Locate Me
      </button>
    </div>
  );
}

// @ts-ignore
function stateStyle(feature) {
  const lightColors = [
    "#F5A9A9",
    "#F5D0A9",
    "#F5F6CE",
    "#CEF6F5",
    "#A9F5F2",
    "#A9D0F5",
    "#A9A9F5",
    "#F5A9F2",
    "#F6CED8",
    "#F2F5A9",
  ];

  const randomIndex = Math.floor(Math.random() * lightColors.length);
  const randomColor = lightColors[randomIndex];

  return {
    fillColor: randomColor,
    weight: 2,
    opacity: 1,
    color: "#ffffff",
    fillOpacity: 0.7,
  };
}
