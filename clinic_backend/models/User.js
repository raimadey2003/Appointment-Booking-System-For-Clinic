const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
    },

    password: {
      type: String,
      required: true,
    },

    role: {
      type: String,
      enum: ["doctor", "patient","admin"],
      required: true,
    },

    specialization: {
      type: String,
      required: function () {
        return this.role === "doctor";
      },
    },

    availableSlots: [
      {
        date: String,   // Format: "YYYY-MM-DD"
        time: String,   // Format: "HH:mm"
      },
    ],

    doctorImage: {
      type: String,     // Image URL (from Cloudinary or other)
      required: function () {
        return this.role === "doctor";
      },
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
