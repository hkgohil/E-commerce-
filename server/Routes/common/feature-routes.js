import express from "express";
import { addFeatureImage, getFeatureImages } from "../../controllers/common/feature-controller.js";

const router = express.Router();

// Route to add a feature image
router.post("/add", addFeatureImage);

// Route to get all feature images
router.get("/", getFeatureImages);

export default router; 