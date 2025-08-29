import express from "express";
import { searchProducts } from "../../controllers/shop/search-controller.js";

const router = express.Router();

// Route for searching products by keyword
router.get("/:keyword", searchProducts);

export default router; 