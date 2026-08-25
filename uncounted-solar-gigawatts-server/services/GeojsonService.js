const fs = require("fs");
const path = require("path");

const DATA_DIR = path.join(__dirname, "..", "data");

const AOI_CONFIG = {
  ISLD: {
    name: "Islamabad",
    boundary: "Islamabad_boundary.geojson",
    buildings: "Islamabad_Buildings_all_stats.geojson",
    solarPV: "Islamabad_solarPV.geojson",
  },

  LHR: {
    name: "Lahore",
    boundary: "Lahore_Boundary.geojson",
    buildings: "Lahore_buildings_all_stats.geojson",
    solarPV: "Lahore_solarPV.geojson",
  },

  KHI: {
    name: "Karachi",
    boundary: "karachi_boundary.geojson",
    buildings: "Karachi_building_all_stats_.geojson",
    solarPV: "karachi_solarPV.geojson",
  },
};

function getAOIs() {
  return Object.entries(AOI_CONFIG).map(([id, aoi]) => ({
    id,
    name: aoi.name,
  }));
}

function getAOI(aoiId) {
  return AOI_CONFIG[aoiId];
}

function getGeoJSON(aoiId, layer) {
  const aoi = AOI_CONFIG[aoiId];

  if (!aoi) {
    throw new Error(`Unknown AOI: ${aoiId}`);
  }

  if (!aoi[layer]) {
    throw new Error(`Unknown layer: ${layer}`);
  }

  const filePath = path.join(
    DATA_DIR,
    aoiId,
    aoi[layer]
  );

  if (!fs.existsSync(filePath)) {
    throw new Error(`GeoJSON file not found: ${filePath}`);
  }

  const file = fs.readFileSync(filePath, "utf8");

  return JSON.parse(file);
}

module.exports = {
  getAOIs,
  getAOI,
  getGeoJSON,
};