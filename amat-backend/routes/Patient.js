const express = require("express");
const router = express.Router();
const User = require("../models/User");
const BookAppointment = require("../models/Book_Appointment");

// GET all patients
router.get("/", async (req, res) => {
  try {
    const patients = await User.find({});
    res.status(200).json(patients);
  } catch (error) {
    console.error("Error fetching patients:", error);
    res.status(500).json({ message: "Error fetching patients." });
  }
});

// GET patient by ID
router.get("/:id", async (req, res) => {
  const patientId = req.params.id;
  try {
    const patient = await User.findById(patientId);

    if (!patient) {
      return res.status(404).json({ message: "Patient not found." });
    }

    const patientInformation = {
      name: patient.name,
      dob: patient.dob,
      gender: patient.gender,
      email: patient.email,
      phonenumber: patient.phonenumber,
      address: patient.address,
      city: patient.city,
      country: patient.country,
      education: patient.education,
      occupation: patient.occupation,
      religion: patient.religion,
      maritalStatus: patient.maritalStatus,
      preexisting_conditions: patient.preexisting_conditions || "",
      current_medications: patient.current_medications || "",
    };

    res.status(200).json(patientInformation);
  } catch (error) {
    console.error("Error fetching patient:", error);
    res.status(500).json({ message: "Error fetching patient." });
  }
});

// Update patient by ID
router.put("/:id", async (req, res) => {
  const patientId = req.params.id;
  const updatedPatient = req.body;

  try {
    const result = await User.findByIdAndUpdate(patientId, updatedPatient, {
      new: true,
    });
    if (!result) {
      return res.status(404).json({ message: "Patient not found" });
    }
    res.status(200).json({
      message: "Patient updated successfully",
      updatedPatient: result,
    });
  } catch (error) {
    console.error("Error updating patient:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// Delete patient by ID
router.delete("/:id", async (req, res) => {
  const patientId = req.params.id;
  try {
    const result = await User.findByIdAndDelete(patientId);
    if (!result) {
      return res.status(404).json({ message: "Patient not found" });
    }
    res.status(200).json({ message: "Patient deleted successfully" });
  } catch (error) {
    console.error("Error deleting patient:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// GET patient and their appointments by ID
router.get("/:id/appointments", async (req, res) => {
  const patientId = req.params.id;
  try {
    // Fetch the patient
    const patient = await User.findById(patientId);
    if (!patient) {
      return res.status(404).json({ message: "Patient not found." });
    }

    // Fetch appointments for the patient
    const appointments = await BookAppointment.find({ patientId: patientId });

    res.status(200).json({ patient, appointments });
  } catch (error) {
    console.error("Error fetching user and appointments:", error);
    res.status(500).json({ message: "Error fetching user and appointments." });
  }
});

module.exports = router;
