const express = require("express");

const {
  getAOIs,
  getAOI,
  getGeoJSON,
} = require("../services/GeojsonService");

const {
  calculateAOIStatistics,
} = require("../services/StatisticsService");

const router = express.Router();


// GET /api/aois
router.get("/", (req, res) => {
  res.json({
    success: true,
    data: getAOIs(),
  });
});


// GET /api/aois/:aoi/statistics
router.get("/:aoi/statistics", (req, res) => {
  try {
    const data = calculateAOIStatistics(
      req.params.aoi
    );

    res.json({
      success: true,
      data,
    });
  } catch (error) {
    console.error("Statistics error:", error);

    res.status(404).json({
      success: false,
      message: error.message,
    });
  }
});


// GET /api/aois/:aoi/boundary
router.get("/:aoi/boundary", (req, res) => {
  try {
    const data = getGeoJSON(
      req.params.aoi,
      "boundary"
    );

    res.json({
      success: true,
      data,
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: error.message,
    });
  }
});


// GET /api/aois/:aoi/buildings
router.get("/:aoi/buildings", (req, res) => {
  try {
    const data = getGeoJSON(
      req.params.aoi,
      "buildings"
    );

    res.json({
      success: true,
      data,
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: error.message,
    });
  }
});


// GET /api/aois/:aoi/solar-pv
router.get("/:aoi/solar-pv", (req, res) => {
  try {
    const data = getGeoJSON(
      req.params.aoi,
      "solarPV"
    );

    res.json({
      success: true,
      data,
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: error.message,
    });
  }
});


module.exports = router;