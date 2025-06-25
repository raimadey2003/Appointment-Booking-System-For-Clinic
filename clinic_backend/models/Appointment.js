const mongoose = require("mongoose");

const appointmentSchema = new mongoose.Schema(
  {
    patient: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",     // References users collection
      required: true,
    },

    doctor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",     // References users collection
      required: true,
    },

    date: {
      type: String,     // Format: "YYYY-MM-DD"
      required: true,
    },

    time: {
      type: String,     // Format: "HH:mm"
      required: true,
    },

    status: {
      type: String,
      enum: ["Booked", "Completed", "Cancelled"],
      default: "Booked",
    },

    notes: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Appointment", appointmentSchema);
