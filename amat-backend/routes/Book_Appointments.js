const express = require("express");
const router = express.Router();
const BookAppointment = require("../models/Book_Appointment");
const verifyToken = require("../middleware/verifyToken");

// Book an appointment
router.post("/", verifyToken, async (req, res) => {
  try {
    const {
      newHealthConcern,
      duration,
      symptoms,
      medication,
      allergies,
      medicalConditions,
      surgeries,
      familyHistory,
    } = req.body;

    //create a new appointment
    const appointment = new BookAppointment({
      patientId: req.userId,
      newHealthConcern,
      duration,
      symptoms,
      medication,
      allergies,
      medicalConditions,
      surgeries,
      familyHistory,
    });

    await appointment.save();

    res.status(201).json(appointment);
  } catch (err) {
    console.error("Error booking appointment:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
