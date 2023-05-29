import React, { useEffect } from "react";
import "./MapLeaflet.css";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";
//import { RoutingMachine } from "react-leaflet-routing-machine";
import LeafletRoutingMachine from "./LeafletRoutingMachine";
import "leaflet-control-geocoder/dist/Control.Geocoder.css";
import "leaflet-control-geocoder/dist/Control.Geocoder.js";
import marcer2 from "../images/marker-icon.png";

const icon = L.icon({
  iconUrl: "./placeholder.png",
  iconSize: [38, 38],
});

const position = [55.767193, 37.608239];

export const MapLeaflet = (props) => {
  const { setFirstMarker, setSecondMarker, firstMarker, secondMarker } = props;
  const { selectPosition } = props;
  const locationSelection = [selectPosition?.lat, selectPosition?.lon];

  return (
    <div
      style={{ height: "100%", width: "100%", position: "relative", zIndex: 1 }}
    >
      <MapContainer
        style={{ height: "100%", width: "100%" }}
        center={[55.767193, 37.608239]}
        zoom={13}

        //   scrollWheelZoom={false}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {/* марке проверочный */}
        <Marker
          position={position}
          icon={L.divIcon({
            className: "custom-div-icon",
            html: `<div class='marker-pin'><div class='marker-pin-in'></div></div> <i class=marcer-number'></i>`,
            //html: `<div class='marker-pin'><div class='marker-pin-in'></div></div> <i class='marcer-number'>${ isHandleWidgetT && givStateNumber(i.client)}</i>`,
            iconSize: [30, 42],
            iconAnchor: [15, 42],
          })}
          eventHandlers={{
            click: (e) => {
              console.log("Проверка нажатия");
            },
          }}
        ></Marker>
        {/* марке проверочный */}
        {/* марке который отображается после поиска */}
        {selectPosition && (
          <Marker
            position={locationSelection}
            icon={L.divIcon({
              className: "custom-div-icon",
              html: `<div class='marker-pin'><div class='marker-pin-in'></div></div> <i class=marcer-number'></i>`,
              //html: `<div class='marker-pin'><div class='marker-pin-in'></div></div> <i class='marcer-number'>${ isHandleWidgetT && givStateNumber(i.client)}</i>`,
              iconSize: [30, 42],
              iconAnchor: [15, 42],
            })}
          >
            <Popup>
              A pretty CSS3 popup. <br /> Easily customizable.
            </Popup>
          </Marker>
        )}
        {/* марке который отображается после поиска */}

        {/* поиск маршрута */}
        <LeafletRoutingMachine
          setFirstMarker={setFirstMarker}
          setSecondMarker={setSecondMarker}
          firstMarker={firstMarker}
          secondMarker={secondMarker}
        />

        {/* поиск маршрута */}
      </MapContainer>
    </div>
  );
};

let DefaultIcon = L.icon({
  iconUrl: marcer2,
  iconSize: [25, 41],
  iconAnchor: [10, 41],
  popupAnchor: [2, -40],
});
L.Marker.prototype.options.icon = DefaultIcon;
