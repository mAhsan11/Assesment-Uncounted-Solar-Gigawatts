import {
  APIProvider,
  Map,
  MapControl,
  ControlPosition
} from "@vis.gl/react-google-maps";
import { useState, useCallback } from "react";
import GeojsonLayer from "../GeojsonLayer/GeojsonLayer";
import MoveMap from "./MoveMap";
import "./css/GoogleMap.css"
import FeaturePopup from "./FeaturePopup";
import MapTypeToggler from "./MapTypeToggler";
import ZoomControls from "./ZoomControl";

function GoogleMap({ selectedAOI }) {
  const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
  const API_URL = import.meta.env.VITE_API_URL;
  const [selectedFeature, setSelectedFeature] = useState(null);


  const handleBuildingClick = useCallback((feature) => {
    setSelectedFeature({
      feature,
      type: "building",
    });
  }, []);

  const handleSolarClick = useCallback((feature) => {
    setSelectedFeature({
      feature,
      type: "solar",
    });
  }, []);


  return (
    <div className="google-map-wrapper">
      <APIProvider apiKey={apiKey}>
        <Map
          defaultCenter={{
            lat: 33.6844,
            lng: 73.0479,
          }}
          defaultZoom={12}
          disableDefaultUI={true}
          mapTypeId={"hybrid"}
        >
          <MapTypeToggler />
          <ZoomControls />
          <MoveMap selectedAOI={selectedAOI} />

          {/*Boundary Layer*/}
          <GeojsonLayer
            url={`${API_URL}/aois/${selectedAOI}/boundary`}
            fillColor="#1BA098"
            fillOpacity={0.08}
            strokeColor="#1BA098"
            strokeWeight={3}
            zIndex={10}
          />

          {/*Buildings Layer*/}
          <GeojsonLayer
            url={`${API_URL}/aois/${selectedAOI}/buildings`}
            fillColor="#0F7A6E"
            fillOpacity={0.25}
            strokeColor="#0A2342"
            strokeWeight={2}
            zIndex={50}
            selectedFeature={
              selectedFeature?.type === "building"
                ? selectedFeature.feature
                : null
            }
            onFeatureClick={handleBuildingClick}
          />

          {/*Solar PV Layer */}
          <GeojsonLayer
            url={`${API_URL}/aois/${selectedAOI}/solar-pv`}
            fillColor="#F5A623"
            fillOpacity={0.90}
            strokeColor="#F5A623"
            strokeWeight={2}
            zIndex={100}
            selectedFeature={
              selectedFeature?.type === "solar"
                ? selectedFeature.feature
                : null
            }
            onFeatureClick={handleSolarClick}
          />
        </Map>
      </APIProvider>

      {selectedFeature && (
        <FeaturePopup
          feature={selectedFeature.feature}
          type={selectedFeature.type}
          onClose={() => setSelectedFeature(null)}
        />
      )}
    </div>

  );
}

export default GoogleMap;