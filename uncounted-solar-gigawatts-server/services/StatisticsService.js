const { getGeoJSON } = require("./GeojsonService");
const { PANEL_AREA_SQM, PANEL_CAPACITY_WATTS } = require("../utils/utils");

function calculateAOIStatistics(aoiId) {
  // data for the specific aoi
  const boundary = getGeoJSON(aoiId, "boundary");
  const buildings = getGeoJSON(aoiId, "buildings");
  const solarPV = getGeoJSON(aoiId, "solarPV");

//   This func will utilizes SolarPV layer to compute totalSolarArea
  const totalSolarArea = (solarPV.features || []).reduce(
    (total, feature) => {
      return (
        total +
        Number(
          feature.properties?.["SolarPV_Area(sqm)"] || 0
        )
      );
    },
    0
  );

//   This func utilizes building stats layer to compute total rooftop area
  const totalRooftopArea = (buildings.features || []).reduce(
    (total, feature) => {
      return (
        total +
        Number(
          feature.properties?.["Rooftop_Area(sqm)"] || 0
        )
      );
    },
    0
  );

//   This func utilizes Boundary layer to compute total AOI area
  const totalAOIArea = (boundary.features || []).reduce(
    (total, feature) => {
      return (
        total +
        Number(
          feature.properties?.["Boundary_Area(sqm)"] || 0
        )
      );
    },
    0
  );

  const numberOfPanels =
    totalSolarArea / PANEL_AREA_SQM;

  const installedCapacity =
    numberOfPanels * PANEL_CAPACITY_WATTS;

  return {
    totalSolarArea,
    totalRooftopArea,
    totalAOIArea,
    numberOfPanels,
    installedCapacity,
  };
}

module.exports = {
  calculateAOIStatistics,
};