"use client";
import { useEffect, useRef } from "react";

import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

const Map = () => {
  const mapContainer = useRef<any>(null);
  const map = useRef<mapboxgl.Map | any>(null);

  useEffect(() => {
    mapboxgl.accessToken =
      "pk.eyJ1IjoiMHhqYWRlbiIsImEiOiJjbHh5MmtrN3kwOHRlMnFvandjY2dvZzUwIn0.BvuPkHpQT1GScP5vLRadVQ";

    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/0xjaden/clxy5fbxa001y01pr172g8iqr",
      center: [127.02761, 37.498095],
      zoom: 5,
    });

    map.current.on("load", () => {
      map.current.addSource("places", {
        // This GeoJSON contains features that include an "icon"
        // property. The value of the "icon" property corresponds
        // to an image in the Mapbox Streets style's sprite.
        type: "geojson",
        data: {
          type: "FeatureCollection",
          features: [
            {
              geometry: {
                type: "Point",
                coordinates: [-77.4918, 39.0395],
              },
              type: "Feature",
              properties: {
                description: "Virginia, United States",
                title: "degenwtf.eth",
                url: "https://warpcast.com/degenwtf.eth",
                version: "v0.1",
              },
            },
            {
              geometry: {
                type: "Point",
                coordinates: [-77.4918, 39.0395],
              },
              type: "Feature",
              properties: {
                description: "Virginia, United States",
                title: "mentats.eth",
                url: "https://warpcast.com/mentats.eth",
                version: "v0.1",
              },
            },
            {
              geometry: {
                type: "Point",
                coordinates: [127.4424, 37.2792],
              },
              type: "Feature",
              properties: {
                description: "Seoul, South Korea",
                title: "FG-9",
                url: "null",
                version: "v0.1",
              },
            },
            {
              geometry: {
                type: "Point",
                coordinates: [127.4424, 37.2792],
              },
              type: "Feature",
              properties: {
                description: "Seoul, South Korea",
                title: "FG-9",
                url: "null",
                version: "v0.1",
              },
            },
            {
              geometry: {
                type: "Point",
                coordinates: [103.8503, 1.29],
              },
              type: "Feature",
              properties: {
                description: "Singapore",
                title: "jiri123.eth",
                url: "https://warpcast.com/jiri123.eth",
                version: "v0.1",
              },
            },
          ],
        },
      });

      map.current.addLayer({
        id: "places",
        type: "circle",
        paint: {
          "circle-radius": 8,
          "circle-color": "#f3b2ff",
          // "circle-stroke-width": 2,
          // "circle-stroke-color": "#fff",
        },
        source: "places",
      });
    });

    map.current.on("click", "places", (e: any) => {
      const coordinates = e.features[0].geometry.coordinates.slice();
      const description = e.features[0].properties.description;

      while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
        coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
      }

      new mapboxgl.Popup()
        .setLngLat(coordinates)
        .setHTML(description)
        .addTo(map.current);
    });

    map.current.on("mouseenter", "places", () => {
      map.current.getCanvas().style.cursor = "pointer";
    });

    map.current.on("mouseleave", "places", () => {
      map.current.getCanvas().style.cursor = "";
    });

    mapContainer.current.querySelector(".mapboxgl-ctrl-logo").remove();
    mapContainer.current.querySelector(".mapboxgl-ctrl-attrib").remove();

    return () => map.current.remove();
  }, []);

  return <div className="flex-1 rounded-lg" ref={mapContainer} id="map" />;
};

export default Map;
