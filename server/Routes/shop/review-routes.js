import express from "express";
import { addProductReview, getProductReviews } from "../../controllers/shop/product-review-controller.js";

const router = express.Router();

// Route to add a product review
router.post("/add", addProductReview);

// Route to get reviews for a product
router.get("/:productId", getProductReviews);

export default router; 