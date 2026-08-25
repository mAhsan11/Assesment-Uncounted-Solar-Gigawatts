import { MapControl, ControlPosition, useMap } from "@vis.gl/react-google-maps";
import { useState } from "react";

function MapTypeToggle() {
  const map = useMap();
  const [showLabel, setShowLabel] = useState(true);

  const handleChange = (e) => {
    const checked = e.target.checked;

    setShowLabel(checked);

    if (map) {
      map.setMapTypeId(checked ? "hybrid" : "satellite");
    }
  };

  return (
    <MapControl position={ControlPosition.TOP_LEFT}>
      <div style={{
            margin: "10px",
            padding: "8px 12px",
            background: "white",
            borderRadius: "8px",
            boxShadow: "0 2px 6px rgba(0, 0, 0, 0.25)",
            display: "flex",
            color: "black",
            alignItems: "center",
            gap: "8px",
            fontSize: "14px",
          }}>
        <span>Show Label</span>

       <label
            style={{
              position: "relative",
              width: "40px",
              height: "22px",
              display: "inline-block",
            }}
          >
            <input
              type="checkbox"
              checked={showLabel}
              onChange={handleChange}
              style={{
                opacity: 0,
                width: 0,
                height: 0,
              }}
            />

            <span
              style={{
                position: "absolute",
                inset: 0,
                backgroundColor: showLabel ? "#1BA098" : "#E5E5E5",
                borderRadius: "22px",
                cursor: "pointer",
                transition: "0.2s",
              }}
            >
              <span
                style={{
                  position: "absolute",
                  width: "18px",
                  height: "18px",
                  left: showLabel ? "19px" : "2px",
                  top: "2px",
                  backgroundColor: "white",
                  borderRadius: "50%",
                  transition: "0.2s",
                  boxShadow: "0 1px 3px rgba(0,0,0,0.3)",
                }}
              />
            </span>
          </label>
      </div>
    </MapControl>
  );
}

export default MapTypeToggle;