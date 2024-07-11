"use client";
import { useEffect, useRef } from "react";

import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

const Map = () => {
  const mapContainer = useRef<any>(null);
  const map = useRef<mapboxgl.Map | any>(null);

  useEffect(() => {
    mapboxgl.accessToken = process.env
      .NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN as string;

    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/0xjaden/clxy5fbxa001y01pr172g8iqr",
      center: [-149.496, 48.8915],
      zoom: 3,
    });

    map.current.on("load", () => {
      map.current.addSource("planes", {
        type: "geojson",
        data: {
          type: "FeatureCollection",
          features: [
            {
              geometry: {
                type: "Point",
                coordinates: [-149.496, 48.8915],
              },
              type: "Feature",
              properties: {
                description:
                  '<strong>Truckeroo</strong><p><a href="http://www.truckeroodc.com/www/" target="_blank">Truckeroo</a> brings dozens of food trucks, live music, and games to half and M Street SE (across from Navy Yard Metro Station) today from 11:00 a.m. to 11:00 p.m.</p>',
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
          "icon-rotate": 110,
        },
      });
    });

    // click event

    // map.current.on("click", "places", (e: any) => {
    //   const coordinates = e.features[0].geometry.coordinates.slice();
    //   const description = e.features[0].properties.description;

    //   while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
    //     coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
    //   }

    //   new mapboxgl.Popup()
    //     .setLngLat(coordinates)
    //     .setHTML(description)
    //     .addTo(map.current);
    // });

    // map.current.on("mouseenter", "places", () => {
    //   map.current.getCanvas().style.cursor = "pointer";
    // });

    // map.current.on("mouseleave", "places", () => {
    //   map.current.getCanvas().style.cursor = "";
    // });

    // remove mapbox logo
    mapContainer.current.querySelector(".mapboxgl-ctrl-logo").remove();
    mapContainer.current.querySelector(".mapboxgl-ctrl-attrib").remove();

    return () => map.current.remove();
  }, []);

  return <div className="flex-1 rounded-lg" ref={mapContainer} id="map" />;
};

export default Map;
