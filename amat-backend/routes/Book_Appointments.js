const express = require("express");
const router = express.Router();
const BookAppointment = require("../models/Book_Appointment");
const Medical_Practitioner = require("../models/Medical_Practitioner");
const verifyToken = require("../middleware/verifyToken");
const verifyMedicalToken = require("../middleware/verifyMedicalToken");

// POST general appointment booking (authenticated patient)
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
      practitionerId,
    } = req.body;

    // Get the current visit count for this patient
    const visitCount = await BookAppointment.countDocuments({
      patientId: req.userId,
    });

    // Create the new appointment
    const appointment = new BookAppointment({
      patientId: req.userId,
      practitionerId,
      visitNumber: visitCount + 1,
      newHealthConcern,
      duration,
      symptoms,
      medication,
      allergies,
      medicalConditions,
      surgeries,
      familyHistory,
    });

    // Save the appointment
    await appointment.save();

    res.status(201).json({
      message: "Appointment created successfully",
      appointmentId: appointment._id,
    });
  } catch (err) {
    console.error("Error booking appointment:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

// PUT appointment details (authenticated medical practitioner)
router.put("/:appointmentId", verifyMedicalToken, async (req, res) => {
  try {
    const { appointmentId } = req.params;
    const {
      vitals,
      diagnoses,
      prescribedMedications,
      labXrayReports,
      referral,
    } = req.body;

    const practitioner = await Medical_Practitioner.findById(req.userId);
    if (!practitioner || !["doctor"].includes(practitioner.role)) {
      return res
        .status(403)
        .json({ error: "Access denied, not a medical practitioner" });
    }

    if (!Array.isArray(prescribedMedications)) {
      return res
        .status(400)
        .json({ error: "prescribedMedications must be an array" });
    }

    const appointment = await BookAppointment.findById(appointmentId);
    if (!appointment) {
      return res.status(404).json({ error: "Appointment not found" });
    }

    appointment.vitals = vitals || appointment.vitals;
    appointment.diagnoses = diagnoses || appointment.diagnoses;
    appointment.prescribedMedications =
      prescribedMedications || appointment.prescribedMedications;
    appointment.labXrayReports = labXrayReports || appointment.labXrayReports;
    appointment.referral = referral || appointment.referral;

    await appointment.save();

    res
      .status(200)
      .json({ message: "Appointment updated successfully", appointment });
  } catch (err) {
    console.error("Error updating appointment:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

// GET all appointments (Admin use or specific roles)
router.get("/", async (req, res) => {
  try {
    const appointments = await BookAppointment.find({});
    res.status(200).json(appointments);
  } catch (error) {
    console.error("Error fetching appointments:", error);
    res.status(500).json({ message: "Error fetching appointments." });
  }
});

// GET appointments by patient ID
router.get("/patient/:patientId", async (req, res) => {
  const { patientId } = req.params;
  try {
    const appointments = await BookAppointment.find({ patientId });
    if (!appointments.length) {
      return res.status(404).json({ message: "No appointments found." });
    }
    res.status(200).json(appointments);
  } catch (error) {
    console.error("Error fetching patient appointments:", error);
    res.status(500).json({ message: "Error fetching patient appointments." });
  }
});

// GET appointments by practitioner ID
router.get(
  "/practitioner/:practitionerId",
  verifyMedicalToken,
  async (req, res) => {
    const { practitionerId } = req.params;

    try {
      const appointments = await BookAppointment.find({ practitionerId }).sort({
        createdAt: -1,
      });

      if (!appointments.length) {
        return res
          .status(404)
          .json({ message: "No appointments found for this practitioner." });
      }

      res.status(200).json(appointments);
    } catch (error) {
      console.error("Error fetching practitioner appointments:", error);
      res
        .status(500)
        .json({ message: "Error fetching practitioner appointments." });
    }
  }
);

// GET specific appointment by ID
router.get("/:appointmentId", async (req, res) => {
  const { appointmentId } = req.params;
  try {
    const appointment = await BookAppointment.findById(appointmentId);
    if (!appointment) {
      return res.status(404).json({ message: "Appointment not found." });
    }
    res.status(200).json(appointment);
  } catch (error) {
    console.error("Error fetching appointment:", error);
    res.status(500).json({ message: "Error fetching appointment." });
  }
});

// GET appointment history for a specific patient (sorted by visitNumber)
router.get("/history/:patientId", async (req, res) => {
  const { patientId } = req.params;
  try {
    const appointments = await BookAppointment.find({ patientId }).sort({
      visitNumber: 1,
    }); // Sort by visit number to get chronological order
    if (!appointments.length) {
      return res.status(404).json({ message: "No appointment history found." });
    }
    res.status(200).json(appointments);
  } catch (error) {
    console.error("Error fetching appointment history:", error);
    res.status(500).json({ message: "Error fetching appointment history." });
  }
});

// GET visit count (number of visits for a patient)
router.get("/visit-count/:patientId", async (req, res) => {
  const { patientId } = req.params;
  try {
    const visitCount = await BookAppointment.countDocuments({ patientId });
    res.status(200).json({ visitCount });
  } catch (error) {
    console.error("Error fetching visit count:", error);
    res.status(500).json({ message: "Error fetching visit count." });
  }
});

// GET appointment vitals by ID
router.get("/:appointmentId/vitals", async (req, res) => {
  const { appointmentId } = req.params;
  try {
    const appointment = await BookAppointment.findById(appointmentId, "vitals");
    if (!appointment) {
      return res.status(404).json({ message: "Appointment not found." });
    }
    res.status(200).json(appointment.vitals);
  } catch (error) {
    console.error("Error fetching appointment vitals:", error);
    res.status(500).json({ message: "Error fetching appointment vitals." });
  }
});

// GET appointment diagnoses by ID
router.get("/:appointmentId/diagnoses", async (req, res) => {
  const { appointmentId } = req.params;
  try {
    const appointment = await BookAppointment.findById(
      appointmentId,
      "diagnoses"
    );
    if (!appointment) {
      return res.status(404).json({ message: "Appointment not found." });
    }
    res.status(200).json(appointment.diagnoses);
  } catch (error) {
    console.error("Error fetching appointment diagnoses:", error);
    res.status(500).json({ message: "Error fetching appointment diagnoses." });
  }
});

// GET appointment prescribed medications by ID
router.get("/:appointmentId/prescribedMedications", async (req, res) => {
  const { appointmentId } = req.params;
  try {
    const appointment = await BookAppointment.findById(
      appointmentId,
      "prescribedMedications"
    );
    if (!appointment) {
      return res.status(404).json({ message: "Appointment not found." });
    }
    res.status(200).json(appointment.prescribedMedications);
  } catch (error) {
    console.error("Error fetching prescribed medications:", error);
    res.status(500).json({ message: "Error fetching prescribed medications." });
  }
});

// GET appointment lab/x-ray reports by ID
router.get("/:appointmentId/labXrayReports", async (req, res) => {
  const { appointmentId } = req.params;
  try {
    const appointment = await BookAppointment.findById(
      appointmentId,
      "labXrayReports"
    );
    if (!appointment) {
      return res.status(404).json({ message: "Appointment not found." });
    }
    res.status(200).json(appointment.labXrayReports);
  } catch (error) {
    console.error("Error fetching lab/x-ray reports:", error);
    res.status(500).json({ message: "Error fetching lab/x-ray reports." });
  }
});

// GET appointment referral by ID
router.get("/:appointmentId/referral", async (req, res) => {
  const { appointmentId } = req.params;
  try {
    const appointment = await BookAppointment.findById(
      appointmentId,
      "referral"
    );
    if (!appointment) {
      return res.status(404).json({ message: "Appointment not found." });
    }
    res.status(200).json(appointment.referral);
  } catch (error) {
    console.error("Error fetching referral:", error);
    res.status(500).json({ message: "Error fetching referral." });
  }
});

module.exports = router;
