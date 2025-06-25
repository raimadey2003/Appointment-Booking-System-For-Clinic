// 📁 routes/appointmentRoutes.js
const express = require("express");
const router = express.Router();
const Appointment = require("../models/Appointment");
const auth = require("../middleware/auth");
const User = require("../models/User");

// ✅ Book Appointment
router.post("/", auth, async (req, res) => {
  try {
    const { doctor, date, time } = req.body;

    if (!doctor || !date || !time) {
      return res.status(400).json({ error: "Doctor, date and time are required" });
    }

    const alreadyBooked = await Appointment.findOne({ doctor, date, time });
    if (alreadyBooked) {
      return res.status(409).json({ error: "Slot already booked" });
    }

    const newAppointment = new Appointment({
      patient: req.user.id,
      doctor,
      date,
      time,
    });

    const saved = await newAppointment.save();
    res.status(201).json({ message: "Appointment booked!", appointment: saved });
  } catch (err) {
    console.error("❌ Booking error:", err.message);
    res.status(500).json({ error: "Server error" });
  }
});

// ✅ Get appointments for logged-in patient
router.get("/patient", auth, async (req, res) => {
  try {
    if (req.user.role !== "patient") {
      return res.status(403).json({ error: "Access denied" });
    }

    const appointments = await Appointment.find({ patient: req.user.id })
      .populate("doctor", "name email specialization doctorImage")
      .sort({ date: -1, time: -1 });

    res.json(appointments);
  } catch (err) {
    console.error("❌ Fetching appointments failed:", err.message);
    res.status(500).json({ error: "Server error" });
  }
});

// ✅ Cancel appointment
router.delete("/:id", auth, async (req, res) => {
  try {
    const appointment = await Appointment.findById(req.params.id);
    if (!appointment) {
      return res.status(404).json({ error: "Appointment not found" });
    }

    if (appointment.patient.toString() !== req.user.id) {
      return res.status(403).json({ error: "Unauthorized" });
    }

    await appointment.deleteOne();
    res.json({ message: "Appointment cancelled" });
  } catch (err) {
    console.error("❌ Cancel error:", err.message);
    res.status(500).json({ error: "Server error" });
  }
});



// ✅ Book Appointment
router.post("/", auth, async (req, res) => {
  try {
    const { doctor, date, time } = req.body;

    if (!doctor || !date || !time) {
      return res.status(400).json({ error: "Doctor, date and time are required" });
    }

    const alreadyBooked = await Appointment.findOne({ doctor, date, time });
    if (alreadyBooked) {
      return res.status(409).json({ error: "Slot already booked" });
    }

    const newAppointment = new Appointment({
      patient: req.user.id,
      doctor,
      date,
      time,
    });

    const saved = await newAppointment.save();
    res.status(201).json({ message: "Appointment booked!", appointment: saved });
  } catch (err) {
    console.error("❌ Booking error:", err.message);
    res.status(500).json({ error: "Server error" });
  }
});

// ✅ Get appointments for logged-in patient
router.get("/patient", auth, async (req, res) => {
  try {
    if (req.user.role !== "patient") {
      return res.status(403).json({ error: "Access denied" });
    }

    const appointments = await Appointment.find({ patient: req.user.id })
      .populate("doctor", "name email specialization doctorImage")
      .sort({ date: -1, time: -1 });

    res.json(appointments);
  } catch (err) {
    console.error("❌ Fetching appointments failed:", err.message);
    res.status(500).json({ error: "Server error" });
  }
});

// ✅ Cancel appointment by patient
router.delete("/:id", auth, async (req, res) => {
  try {
    const appointment = await Appointment.findById(req.params.id);
    if (!appointment) {
      return res.status(404).json({ error: "Appointment not found" });
    }

    if (appointment.patient.toString() !== req.user.id) {
      return res.status(403).json({ error: "Unauthorized" });
    }

    appointment.status = "Cancelled by Patient";
    await appointment.save();

    res.json({ message: "Appointment cancelled" });
  } catch (err) {
    console.error("❌ Cancel error:", err.message);
    res.status(500).json({ error: "Server error" });
  }
});

// ✅ Admin: View all appointments
router.get("/admin/all", auth, async (req, res) => {
  try {
    if (req.user.role !== "admin") {
      return res.status(403).json({ error: "Access denied" });
    }

    const appointments = await Appointment.find()
      .populate("patient", "name email")
      .populate("doctor", "name email")
      .sort({ date: -1 });

    res.json(appointments);
  } catch (err) {
    console.error("❌ Admin fetch error:", err.message);
    res.status(500).json({ error: "Server error" });
  }
});

// ✅ Admin: Delete any appointment
router.delete("/admin/:id", auth, async (req, res) => {
  try {
    if (req.user.role !== "admin") {
      return res.status(403).json({ error: "Access denied" });
    }

    const appointment = await Appointment.findById(req.params.id);
    if (!appointment) {
      return res.status(404).json({ error: "Appointment not found" });
    }

    await appointment.deleteOne();
    res.json({ message: "Appointment deleted by admin" });
  } catch (err) {
    console.error("❌ Admin delete error:", err.message);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;



module.exports = router;
