"use client";
import { useEffect, useRef, useState } from "react";

import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { FlightData } from "@/entities/flights/flights.flightRegNum";
import * as turf from "@turf/turf";
import { useTheme } from "next-themes";
import { AirportData } from "@/entities/airportDatabase/airportDatabase.codelataAirport";

interface MapProps {
  flightData?: FlightData;
  arrivalAirportData?: AirportData;
}

const Map: React.FC<MapProps> = ({ flightData, arrivalAirportData }) => {
  const mapContainer = useRef<any>(null);
  const { theme } = useTheme();
  const map = useRef<mapboxgl.Map | any>(null);

  const [origin, setOrigin] = useState<[number, number]>();
  const [destination, setDestination] = useState<[number, number]>();
  const route = {
    type: "FeatureCollection",
    features: [
      {
        type: "Feature" as any,
        properties: null,
        geometry: {
          type: "LineString" as any,
          coordinates: [destination, origin] as any,
        },
      },
    ],
  };

  useEffect(() => {
    if (!flightData || !arrivalAirportData) return;
    setOrigin([
      flightData?.geography?.longitude,
      flightData?.geography?.latitude,
    ]);
    setDestination([
      arrivalAirportData?.longitudeAirport,
      arrivalAirportData?.latitudeAirport,
    ]);
  }, [flightData, arrivalAirportData]);
  useEffect(() => {
    mapboxgl.accessToken = process.env
      .NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN as string;

    if (
      !flightData ||
      !arrivalAirportData ||
      !origin?.length ||
      !destination?.length ||
      !route.features[0]
    )
      return;

    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style:
        theme === "dark"
          ? "mapbox://styles/0xjaden/clxy5fbxa001y01pr172g8iqr"
          : "mapbox://styles/0xjaden/clyhdq7fh010u01r4fvxk3apb",
      center: [origin?.[0] || 126.927187, origin?.[1] || 37.526683],
      zoom: 3,
    });

    // remove mapbox logo
    mapContainer.current.querySelector(".mapboxgl-ctrl-logo").remove();
    mapContainer.current.querySelector(".mapboxgl-ctrl-attrib").remove();

    //경로 그리기 참고 https://docs.mapbox.com/mapbox-gl-js/example/animate-point-along-route/

    // Calculate the distance in kilometers between route start/end point.
    const lineDistance = turf.length(route.features[0]);

    const arc = [] as any;

    // Number of steps to use in the arc and animation, more steps means
    // a smoother arc and animation, but too many steps will result in a
    // low frame rate
    const steps = 100;

    // Draw an arc between the `origin` & `destination` of the two points
    for (let i = 0; i < lineDistance; i += lineDistance / steps) {
      const segment = turf.along(route.features[0], i);
      arc.push(segment.geometry.coordinates);
    }

    // Update the route with calculated arc coordinates
    route.features[0].geometry.coordinates = arc;

    map.current.on("load", () => {
      map.current.addSource("route", {
        type: "geojson",
        data: route,
      });

      map.current.addLayer({
        id: "route",
        source: "route",
        type: "line",
        paint: {
          "line-width": 2,
          "line-color": "#EA580C",
        },
      });

      map.current.addSource("planes", {
        type: "geojson",
        data: {
          type: "FeatureCollection",
          features: [
            {
              geometry: {
                type: "Point",
                coordinates: [origin[0], origin[1]],
              },
              type: "Feature",
              properties: {
                description: "",
                icon: "airport",
              },
            },
          ],
        },
      });

      map.current.addLayer({
        id: "planes",
        type: "symbol",
        source: "planes",
        layout: {
          "icon-image": ["get", "icon"],
          "icon-allow-overlap": true,
          "icon-size": 1.5,
          "icon-rotate": flightData.geography.direction || 0,
        },
      });
    });

    return () => map.current.remove();
  }, [arrivalAirportData, flightData, theme, origin, destination]);

  return <div className="flex-1 rounded-lg" ref={mapContainer} id="map" />;
};

export default Map;
