// import { useEffect, memo } from "react";
// import { useMap } from "@vis.gl/react-google-maps";

// function GeojsonLayer({
//   url,
//   fillColor,
//   fillOpacity,
//   strokeColor,
//   strokeWeight,
//   zIndex=0,
//   onFeatureClick,
//   selectedFeature
// }) {
//   const map = useMap();

//   useEffect(() => {
//     if (!map || !window.google || !url) {
//       return;
//     }

//     let cancelled = false;

//     const dataLayer = new window.google.maps.Data({
//       map,
//     });

//     dataLayer.setStyle({
//       fillColor,
//       fillOpacity,
//       strokeColor,
//       strokeWeight,
//       zIndex
//     });

//     const loadGeoJSON = async () => {
//       try {
//         const response = await fetch(url);

//         if (!response.ok) {
//           throw new Error(
//             `Failed to fetch GeoJSON: ${response.status}`
//           );
//         }

//         const result = await response.json();
//         // extracting raw geojson
//         const geojson = result.data ?? result;

//         if (cancelled) {
//           return;
//         }

//         const features = dataLayer.addGeoJson(geojson);

//         console.log(
//           `${url}: ${features.length} features loaded`
//         );
//       } catch (error) {
//         console.error(
//           `Error loading GeoJSON from ${url}:`,
//           error
//         );
//       }
//     };

//     loadGeoJSON();

//     let clickListener;

//     if (onFeatureClick) {
//       clickListener = dataLayer.addListener(
//         "click",
//         (event) => {
//           onFeatureClick(event.feature);
//         }
//       );
//     }

//     return () => {
//       cancelled = true;

//       if (clickListener) {
//         clickListener.remove();
//       }

//       dataLayer.forEach((feature) => {
//         dataLayer.remove(feature);
//       });

//       dataLayer.setMap(null);
//     };
//   }, [
//     map,
//     url,
//     fillColor,
//     fillOpacity,
//     strokeColor,
//     strokeWeight,
//     onFeatureClick,
//   ]);

//   return null;
// }

// export default memo(GeojsonLayer);

import { useEffect, useRef, memo } from "react";
import { useMap } from "@vis.gl/react-google-maps";

function GeojsonLayer({
  url,
  fillColor,
  fillOpacity,
  strokeColor,
  strokeWeight,
  zIndex = 0,
  onFeatureClick,
  selectedFeature,
}) {
  const map = useMap();

  const dataLayerRef = useRef(null);
  const previousSelectedFeatureRef = useRef(null);

  useEffect(() => {
    if (!map || !window.google || !url) {
      return;
    }

    let cancelled = false;

    const dataLayer = new window.google.maps.Data({
      map,
    });

    dataLayerRef.current = dataLayer;

    dataLayer.setStyle({
      fillColor,
      fillOpacity,
      strokeColor,
      strokeWeight,
      zIndex,
    });

    const loadGeoJSON = async () => {
      try {
        const response = await fetch(url);

        if (!response.ok) {
          throw new Error(
            `Failed to fetch GeoJSON: ${response.status}`
          );
        }

        const result = await response.json();
        const geojson = result.data ?? result;

        if (cancelled) {
          return;
        }

        const features = dataLayer.addGeoJson(geojson);

        console.log(
          `${url}: ${features.length} features loaded`
        );
      } catch (error) {
        console.error(
          `Error loading GeoJSON from ${url}:`,
          error
        );
      }
    };

    loadGeoJSON();

    let clickListener;

    if (onFeatureClick) {
      clickListener = dataLayer.addListener(
        "click",
        (event) => {
          onFeatureClick(event.feature);
        }
      );
    }

    return () => {
      cancelled = true;

      if (clickListener) {
        clickListener.remove();
      }

      dataLayer.forEach((feature) => {
        dataLayer.remove(feature);
      });

      dataLayer.setMap(null);

      dataLayerRef.current = null;
    };
  }, [
    map,
    url,
    fillColor,
    fillOpacity,
    strokeColor,
    strokeWeight,
    zIndex,
    onFeatureClick,
  ]);

  // Highlighting feature for which popup is opened.
  useEffect(() => {
    const dataLayer = dataLayerRef.current;

    if (!dataLayer) {
      return;
    }

    // Remove highlight from previous feature
    if (previousSelectedFeatureRef.current) {
      dataLayer.revertStyle(
        previousSelectedFeatureRef.current
      );
    }

    // Highlighting new feature
    if (selectedFeature) {
      dataLayer.overrideStyle(selectedFeature, {
        fillOpacity: 0.75,
        strokeColor: "#FF0000",
        strokeWeight: 4,
        zIndex: 1000,
      });
    }

    previousSelectedFeatureRef.current = selectedFeature;

  }, [selectedFeature]);

  return null;
}

export default memo(GeojsonLayer);