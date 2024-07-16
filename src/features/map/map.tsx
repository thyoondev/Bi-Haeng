"use client";
import { useEffect, useMemo, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { FlightData } from "@/entities/flights/flights.flightRegNum";
import * as turf from "@turf/turf";
import { useTheme } from "next-themes";
import { AirportData } from "@/entities/airportDatabase/airportDatabase.codelataAirport";
import { useGeoLocation } from "@/shared/hooks/useGeoLocation";

const geolocationOptions = {
  enableHighAccuracy: true,
  timeout: 10000,
  maximumAge: 86400000,
};

interface MapProps {
  flightData?: FlightData;
  arrivalAirportData?: AirportData;
}

const Map: React.FC<MapProps> = ({ flightData, arrivalAirportData }) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const { theme } = useTheme();
  const { location } = useGeoLocation(geolocationOptions);
  const map = useRef<mapboxgl.Map | null>(null);

  const [origin, setOrigin] = useState<[number, number] | null>(null);
  const [destination, setDestination] = useState<[number, number] | null>(null);
  const [zoomLevel, setZoomLevel] = useState<number>(4);

  const route = useMemo(() => {
    if (!origin || !destination) return null;
    return {
      type: "FeatureCollection" as any,
      features: [
        {
          type: "Feature" as any,
          properties: {},
          geometry: {
            type: "LineString" as any,
            coordinates: [origin, destination] as any,
          },
        },
      ],
    };
  }, [origin, destination]);

  useEffect(() => {
    if (flightData && arrivalAirportData) {
      setOrigin([
        flightData.geography.longitude,
        flightData.geography.latitude,
      ]);
      setDestination([
        arrivalAirportData.longitudeAirport,
        arrivalAirportData.latitudeAirport,
      ]);
    }
  }, [flightData, arrivalAirportData]);

  useEffect(() => {
    mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN || "";

    if (mapContainer.current) {
      map.current = new mapboxgl.Map({
        container: mapContainer.current,
        style:
          theme === "dark"
            ? "mapbox://styles/0xjaden/clxy5fbxa001y01pr172g8iqr"
            : "mapbox://styles/0xjaden/clyhdq7fh010u01r4fvxk3apb",
        center: [
          origin?.[0] || location?.longitude || 126.927187,
          origin?.[1] || location?.latitude || 37.526683,
        ],
        zoom: 4,
      });

      map.current.on("load", () => {
        const logo = mapContainer.current?.querySelector(".mapboxgl-ctrl-logo");
        const attribution = mapContainer.current?.querySelector(
          ".mapboxgl-ctrl-attrib"
        );
        logo?.remove();
        attribution?.remove();
      });
    }

    return () => {
      if (map.current) {
        map.current.remove();
      }
    };
  }, [location]);

  useEffect(() => {
    if (!map.current || !route || !origin || !destination) return;

    map.current.flyTo({ center: origin, zoom: 7, essential: true });

    const lineDistance = turf.length(route.features[0]);
    const steps = 500;

    const arc = [];
    for (let i = 0; i < steps; i++) {
      const segment = turf.along(route.features[0], (i * lineDistance) / steps);
      arc.push(segment.geometry.coordinates);
    }

    route.features[0].geometry.coordinates = arc?.slice(1, arc.length);

    if (map.current?.getLayer("route")) {
      map.current?.removeLayer("route");
      map.current?.removeSource("route");
    }

    if (!map.current?.getSource("route")) {
      map.current?.addSource("route", { type: "geojson", data: route });
      map.current?.addLayer({
        id: "route",
        source: "route",
        type: "line",
        paint: { "line-width": 2, "line-color": "#EA580C" },
      });
    }

    if (map.current?.getLayer("planes")) {
      map.current?.removeLayer("planes");
      map.current?.removeSource("planes");
    }
    map.current?.addSource("planes", {
      type: "geojson",
      data: {
        type: "FeatureCollection",
        features: [
          {
            type: "Feature",
            geometry: { type: "Point", coordinates: origin },
            properties: { icon: "airport" },
          },
        ],
      },
    });

    map.current?.addLayer({
      id: "planes",
      type: "symbol",
      source: "planes",
      layout: {
        "icon-image": ["get", "icon"],
        "icon-allow-overlap": true,
        "icon-size": 1.5,
        "icon-rotate": flightData?.geography.direction || 0,
      },
    });
  }, [route, origin, destination, flightData]);

  return <div className="flex-1 rounded-lg" ref={mapContainer} id="map" />;
};

export default Map;
