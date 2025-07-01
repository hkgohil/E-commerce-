const express = require("express");
const router = express.Router();

// Dummy controller for feature images
router.get("/feature/get", (req, res) => {
  res.json({
    success: true,
    data: [
      { _id: "1", image: "https://via.placeholder.com/600x300?text=Banner+1" },
      { _id: "2", image: "https://via.placeholder.com/600x300?text=Banner+2" },
      { _id: "3", image: "https://via.placeholder.com/600x300?text=Banner+3" }
    ]
  });
});

module.exports = router; 