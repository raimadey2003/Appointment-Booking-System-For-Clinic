// routes/uploadRoutes.js
const express = require("express");
const router = express.Router();
const upload = require("../middleware/upload");

// POST /api/upload/doctor-image
router.post("/doctor-image", upload.single("image"), (req, res) => {
  if (!req.file || !req.file.path) {
    return res.status(400).json({ error: "Image upload failed" });
  }

  res.status(200).json({ imageUrl: req.file.path }); // Cloudinary image URL
});

module.exports = router;
