const express = require("express");
const jwt = require("jsonwebtoken");
const router = express.Router();
const User = require("../models/User");

// ✅ Register route
router.post("/register", async (req, res) => {
  try {
    const {
      name,
      email,
      password,
      role,
      specialization,
      availableSlots,
      doctorImage,
    } = req.body;

    console.log("🧾 Incoming user data:", req.body);

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "User already exists" });
    }

    // Create new user (default role: patient)
    const newUser = new User({
      name,
      email,
      password,
      role: role || "patient", // Default to 'patient'
      specialization,
      availableSlots,
      doctorImage,
    });

    const savedUser = await newUser.save();
    console.log("✅ User saved:", savedUser);

    res.status(201).json({ message: "User registered successfully!" });
  } catch (err) {
    console.error("❌ Error during registration:", err.message);
    res.status(500).json({ error: err.message || "Registration failed" });
  }
});

// ✅ Regular user login
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find user
    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      return res.status(401).json({ error: "User not found" });
    }

    // Check password
    if (existingUser.password !== password) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    // Create token
    const token = jwt.sign(
      { id: existingUser._id, role: existingUser.role },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.status(200).json({
      message: "Login successful",
      token,
      user: {
        id: existingUser._id,
        name: existingUser.name,
        role: existingUser.role,
        email: existingUser.email,
      },
    });
  } catch (err) {
    console.error("❌ Login error:", err.message);
    res.status(500).json({ error: "Login failed" });
  }
});

// ✅ Admin login route (separate from doctors)
// router.post("/admin-login", async (req, res) => {
//   const { email, password } = req.body;

//   if (
//     email === process.env.ADMIN_EMAIL &&
//     password === process.env.ADMIN_PASSWORD
//   ) {
//     const token = jwt.sign({ email, role: "admin" }, process.env.JWT_SECRET, {
//       expiresIn: "1h",
//     });

//     res.json({
//       message: "Admin login successful",
//       token,
//       role: "admin",
//       email,
//     });
//   } else {
//     res.status(401).json({ message: "Invalid admin credentials" });
//   }
// });


router.post("/admin-login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const admin = await User.findOne({ email, role: "admin" });
    if (!admin || admin.password !== password) {
      return res.status(401).json({ error: "Invalid admin credentials" });
    }

    const token = jwt.sign(
      { id: admin._id, role: admin.role },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.json({
      message: "Admin login successful",
      token,
      user: {
        id: admin._id,
        name: admin.name,
        email: admin.email,
        role: admin.role,
      },
    });
  } catch (err) {
    console.error("❌ Admin login error:", err.message);
    res.status(500).json({ error: "Login failed" });
  }
});


// ✅ Patient Register route (alternative for frontend clarity)
router.post("/patient-register", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Prevent duplicate patients
    const existing = await User.findOne({ email });
    if (existing) return res.status(400).json({ error: "User already exists" });

    const newPatient = new User({
      name,
      email,
      password,
      role: "patient", // ⬅️ force role to patient
    });

    const saved = await newPatient.save();
    res.status(201).json({ message: "Patient registered successfully!" });
  } catch (err) {
    console.error("❌ Patient registration error:", err.message);
    res.status(500).json({ error: "Registration failed" });
  }
});

// ✅ Patient Login route
router.post("/patient-login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const patient = await User.findOne({ email, role: "patient" });
    if (!patient || patient.password !== password) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const token = jwt.sign({ id: patient._id, role: "patient" }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.json({
      message: "Login successful",
      token,
      role: "patient",
      email: patient.email,
      name: patient.name,
    });
  } catch (err) {
    console.error("❌ Patient login error:", err.message);
    res.status(500).json({ error: "Login failed" });
  }
});


module.exports = router;
