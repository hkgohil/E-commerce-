const express = require("express");
const { addFeatureImage, getFeatureImages } = require("../../controllers/common/feature-controller");

const router = express.Router();

// Route to add a feature image
router.post("/add", addFeatureImage);

// Route to get all feature images
router.get("/", getFeatureImages);

module.exports = router; 