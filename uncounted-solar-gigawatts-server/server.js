const express = require("express");
const cors = require("cors");
require("dotenv").config();
const app = express();
const aoiRoutes = require("./routes/AoiRoutes");

const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.get("/api/health", (req, res) => {
  res.json({
    success: true,
    message: "Solar WebGIS API is running",
  });
});

app.use("/api/aois", aoiRoutes);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});