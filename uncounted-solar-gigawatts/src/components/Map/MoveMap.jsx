import { useEffect } from "react";
import { useMap } from "@vis.gl/react-google-maps";

function MoveMap({ selectedAOI }) {
  const map = useMap();

  const API_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    if (!map || !selectedAOI || !API_URL) return;

    const moveToAOI = async () => {
      try {
        const url = `${API_URL}/aois/${selectedAOI}/boundary`;
        const response = await fetch(url);

        if (!response.ok) {
          throw new Error(
            `Failed to load boundary: ${response.status}`
          );
        }

        const result = await response.json();
        const geojson = result.data ?? result;
        const bounds = new google.maps.LatLngBounds();
        geojson.features?.forEach((feature) => {
          addCoordinatesToBounds(
            feature.geometry,
            bounds
          );
        });

        if (!bounds.isEmpty()) {
          map.fitBounds(bounds);
        }
      } catch (error) {
        console.error(
          "Failed to zoom to AOI:",
          error
        );
      }
    };

    moveToAOI();
  }, [map, selectedAOI, API_URL]);

  return null;
}

function addCoordinatesToBounds(geometry, bounds) {
  if (!geometry) return;
  const { type, coordinates } = geometry;
  if (type === "Point") {
    const [lng, lat] = coordinates;
    bounds.extend({
      lat,
      lng,
    });
    return;
  }

  if (
    type === "LineString" ||
    type === "MultiPoint"
  ) {
    coordinates.forEach(([lng, lat]) => {
      bounds.extend({
        lat,
        lng,
      });
    });

    return;
  }

  if (
    type === "Polygon" ||
    type === "MultiLineString"
  ) {
    coordinates.forEach((ring) => {
      ring.forEach(([lng, lat]) => {
        bounds.extend({
          lat,
          lng,
        });
      });
    });

    return;
  }

  if (type === "MultiPolygon") {
    coordinates.forEach((polygon) => {
      polygon.forEach((ring) => {
        ring.forEach(([lng, lat]) => {
          bounds.extend({
            lat,
            lng,
          });
        });
      });
    });
  }

  if (type === "GeometryCollection") {
    geometry.geometries.forEach((childGeometry) => {
      addCoordinatesToBounds(
        childGeometry,
        bounds
      );
    });
  }
}

export default MoveMap;