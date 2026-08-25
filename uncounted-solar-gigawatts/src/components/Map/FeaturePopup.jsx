// import "./css/FeaturePopup.css";

// function FeaturePopup({ feature, type, onClose }) {
//   if (!feature) {
//     return null;
//   }

//   const properties = {};

//   feature.forEachProperty((value, key) => {
//     properties[key] = value;
//   });

//   return (
//     <div className="feature-popup">
//       <div className="feature-popup-header">
//         <h3>
//           {type === "solar"
//             ? "Solar PV"
//             : "Building"}
//         </h3>

//         <button
//           type="button"
//           onClick={onClose}
//           className="popup-close"
//         >
//           ×
//         </button>
//       </div>

//       <div className="feature-popup-content">
//         {Object.entries(properties).map(
//           ([key, value]) => (
//             <div
//               className="popup-property"
//               key={key}
//             >
//               <span className="popup-property-name">
//                 {key}
//               </span>

//               <span className="popup-property-value">
//                 {typeof value === "number"
//                   ? value.toLocaleString(
//                       "en-US",
//                       {
//                         maximumFractionDigits: 2,
//                       }
//                     )
//                   : String(value)}
//               </span>
//             </div>
//           )
//         )}
//       </div>
//     </div>
//   );
// }

// export default FeaturePopup;

import "./css/FeaturePopup.css";

const PROPERTY_LABELS = {
  FID: "Feature ID",
  class: "Class",
  "SolarPV_Area(sqm)": "Solar PV Area",
  "Rooftop_Area(sqm)": "Rooftop Area",
  "Boundary_Area(sqm)": "AOI Area",
};

const PROPERTY_UNITS = {
  "SolarPV_Area(sqm)": "m²",
  "Rooftop_Area(sqm)": "m²",
  "Boundary_Area(sqm)": "m²",
};

function formatValue(key, value) {
  if (value === null || value === undefined) {
    return "—";
  }

  if (typeof value === "number") {
    return value.toLocaleString("en-US", {
      maximumFractionDigits: 2,
    });
  }

  return String(value);
}

function FeaturePopup({ feature, type, onClose }) {
  if (!feature) {
    return null;
  }

  const properties = {};

  feature.forEachProperty((value, key) => {
    properties[key] = value;
  });

  const isSolar = type === "solar";

  const title = isSolar ? "Solar PV" : "Building";

  const accentClass = isSolar
    ? "popup-solar"
    : "popup-building";

  return (
    <div className={`feature-popup ${accentClass}`}>
      {/* Header */}
      <div className="feature-popup-header">
        <div className="feature-popup-title">
          <div className="feature-popup-icon">
            {isSolar ? "☀" : "⌂"}
          </div>

          <div>
            <h3>{title}</h3>
            <span className="feature-popup-subtitle">
              Feature information
            </span>
          </div>
        </div>

        <button
          type="button"
          onClick={onClose}
          className="popup-close"
          aria-label="Close popup"
        >
          ×
        </button>
      </div>

      {/* Properties */}
      <div className="feature-popup-content">
        <table className="feature-popup-table">
          <tbody>
            {Object.entries(properties).map(
              ([key, value]) => (
                <tr key={key}>
                  <td className="popup-property-name">
                    {PROPERTY_LABELS[key] || key}
                  </td>

                  <td className="popup-property-value">
                    {formatValue(key, value)}

                    {PROPERTY_UNITS[key] && (
                      <span className="popup-unit">
                        {" "}
                        {PROPERTY_UNITS[key]}
                      </span>
                    )}
                  </td>
                </tr>
              )
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default FeaturePopup;