import React, { useEffect } from "react";
import L from "leaflet";
import "leaflet-routing-machine";
import "leaflet-routing-machine/dist/leaflet-routing-machine.css";
import { useMap } from "react-leaflet";
import marcer2 from "../images/marker-icon.png"

const LeafletRoutingMachine = (props) => {
  const { setFirstMarker, setSecondMarker, firstMarker, secondMarker } = props;
  
  const map = useMap();
  let DefaultIcon = L.icon({
    iconUrl: marcer2,
    iconSize: [30, 50],
  });
  useEffect(() => {
    var marker1 = L.marker([55.906583, 37.410333], { icon: DefaultIcon }).addTo(
      map
    );
    map.on("click", function (e) {
      L.marker([e.latlng.lat, e.latlng.lng]).addTo(map);
      L.Routing.control({
        waypoints: [
          L.latLng(55.906583, 37.410333),
          L.latLng(e.latlng.lat, e.latlng.lng),
        ],
        lineOptions: {
          styles: [
            {
              color: "blue",
              weight: 4,
              opacity: 0.7,
            },
          ],
        },
        routeWhileDragging: false,
        geocoder: L.Control.Geocoder.nominatim(),
        addWaypoints: true,
        draggableWaypoints: true,
        fitSelectedRoutes: true,
        showAlternatives: false, // показывать альтернативный маршрут
      })
        // .on("routesfound", function (e) {
        //   e.routes[0].coordinates.forEach((c, i) => {
        //     setTimeout(() => {
        //       marker1.setLatLng([c.lat, c.lng]);
        //     }, 1000 * i);
        //   });
        // })
        .addTo(map);
    });
  }, []);
  return null;
};

export default LeafletRoutingMachine;
