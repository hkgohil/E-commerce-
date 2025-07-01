const express = require("express");
const { searchProducts } = require("../../controllers/shop/search-controller");

const router = express.Router();

// Route for searching products by keyword
router.get("/:keyword", searchProducts);

module.exports = router; 