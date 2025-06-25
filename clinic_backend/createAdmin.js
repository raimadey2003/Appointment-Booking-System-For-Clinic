// createAdmin.js
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
require("dotenv").config();

const User = require("./models/User");

async function createAdmin() {
  await mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  const existing = await User.findOne({ email: "admin@example.com" });
  if (existing) {
    console.log("✅ Admin already exists");
    return process.exit();
  }

  const hashedPassword = await bcrypt.hash("admin123", 10);

  const admin = new User({
    name: "Admin User",
    email: "admin@example.com",
    password: hashedPassword,
    role: "admin",
    availableSlots: [],
  });

  await admin.save();
  console.log("✅ Admin user created successfully");
  process.exit();
}

createAdmin().catch((err) => {
  console.error("❌ Error:", err.message);
  process.exit(1);
});
