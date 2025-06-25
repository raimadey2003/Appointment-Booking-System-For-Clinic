// 📁 middleware/auth.js
const jwt = require("jsonwebtoken");
const User = require("../models/User"); // ✅ Import User model

module.exports = async function (req, res, next) {
  const authHeader = req.header("Authorization");
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Unauthorized - Token missing" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id); // ✅ Get full user

    if (!user) {
      return res.status(401).json({ error: "Unauthorized - User not found" });
    }

    req.user = user; // ✅ Attach full user object
    next();
  } catch (err) {
    return res.status(401).json({ error: "Unauthorized - Token invalid" });
  }
};
