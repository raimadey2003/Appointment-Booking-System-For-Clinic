// routes/doctorRoutes.js
const express = require("express");
const router = express.Router();
const User = require("../models/User");

// ✅ GET doctors (optional filter by specialization)
router.get("/doctors", async (req, res) => {
  try {
    const filter = {};
    if (req.query.specialization) {
      filter.specialization = req.query.specialization;
    }

    const doctors = await User.find({ role: "doctor", ...filter });
    res.status(200).json(doctors);
  } catch (error) {
    console.error("Error fetching doctors:", error);
    res.status(500).json({ error: "Failed to fetch doctors" });
  }
});

// ✅ DELETE doctor by ID
router.delete("/doctors/:id", async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Doctor deleted successfully" });
  } catch (err) {
    console.error("Error deleting doctor:", err);
    res.status(500).json({ error: "Failed to delete doctor" });
  }
});

// ✅ UPDATE doctor by ID
router.put("/doctors/:id", async (req, res) => {
  try {
    const updatedDoctor = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.status(200).json(updatedDoctor);
  } catch (err) {
    console.error("Error updating doctor:", err);
    res.status(500).json({ error: "Failed to update doctor" });
  }
});


//Add Slot
// ✅ Now matches /api/doctors/:id/add-slot
router.put("/doctors/:id/add-slot", async (req, res) => {
  const { date, time } = req.body;
  const doctor = await User.findById(req.params.id); // use User instead of Doctor if your model is User
  if (!doctor) return res.status(404).json({ message: "Doctor not found" });

  doctor.availableSlots.push({ date, time });
  await doctor.save();
  res.status(200).json({ message: "Slot added successfully", doctor });
});



// Delete slot
router.put("/doctors/:id/delete-slot", async (req, res) => {
  const { slotIndex } = req.body;
  const doctor = await User.findById(req.params.id);
  if (!doctor) return res.status(404).json({ message: "Doctor not found" });

  if (slotIndex < 0 || slotIndex >= doctor.availableSlots.length)
    return res.status(400).json({ message: "Invalid slot index" });

  doctor.availableSlots.splice(slotIndex, 1);
  await doctor.save();
  res.status(200).json({ message: "Slot deleted successfully", doctor });
});

// Update slot
router.put("/doctors/:id/update-slot", async (req, res) => {
  const { slotIndex, date, time } = req.body;
  const doctor = await User.findById(req.params.id);
  if (!doctor) return res.status(404).json({ message: "Doctor not found" });

  if (slotIndex < 0 || slotIndex >= doctor.availableSlots.length)
    return res.status(400).json({ message: "Invalid slot index" });

  doctor.availableSlots[slotIndex] = { date, time };
  await doctor.save();
  res.status(200).json({ message: "Slot updated successfully", doctor });
});



module.exports = router;
