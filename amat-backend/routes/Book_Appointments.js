const express = require("express");
const router = express.Router();
const BookAppointment = require("../models/Book_Appointment");
const Medical_Practitioner = require("../models/Medical_Practitioner");
const verifyToken = require("../middleware/verifyToken");
const verifyMedicalToken = require("../middleware/verifyMedicalToken");

/**
 * @swagger
 * tags:
 *   name: Appointments
 *   description: API for managing appointments
 */

/**
 * @swagger
 * /appointments:
 *   post:
 *     summary: Create a new appointment
 *     tags: [Appointments]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               newHealthConcern:
 *                 type: string
 *               duration:
 *                 type: string
 *               symptoms:
 *                 type: string
 *               medication:
 *                 type: string
 *               allergies:
 *                 type: string
 *               medicalConditions:
 *                 type: string
 *               surgeries:
 *                 type: string
 *               familyHistory:
 *                 type: string
 *               practitionerId:
 *                 type: string
 *             required:
 *               - practitionerId
 *     responses:
 *       201:
 *         description: Appointment created successfully
 *       500:
 *         description: Internal server error
 */
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

    const visitCount = await BookAppointment.countDocuments({
      patientId: req.userId,
    });

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

/**
 * @swagger
 * /appointments/{appointmentId}:
 *   put:
 *     summary: Update an appointment's details
 *     tags: [Appointments]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: appointmentId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the appointment
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               vitals:
 *                 type: string
 *               diagnoses:
 *                 type: string
 *               prescribedMedications:
 *                 type: array
 *                 items:
 *                   type: string
 *               labXrayReports:
 *                 type: string
 *               referral:
 *                 type: string
 *     responses:
 *       200:
 *         description: Appointment updated successfully
 *       403:
 *         description: Access denied
 *       404:
 *         description: Appointment not found
 *       500:
 *         description: Internal server error
 */
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

/**
 * @swagger
 * /appointments:
 *   get:
 *     summary: Retrieve all appointments
 *     tags: [Appointments]
 *     responses:
 *       200:
 *         description: List of all appointments
 *       500:
 *         description: Internal server error
 */
router.get("/", async (req, res) => {
  try {
    const appointments = await BookAppointment.find({});
    res.status(200).json(appointments);
  } catch (error) {
    console.error("Error fetching appointments:", error);
    res.status(500).json({ message: "Error fetching appointments." });
  }
});

/**
 * @swagger
 * /appointments/patient/{patientId}:
 *   get:
 *     summary: Retrieve all appointments for a specific patient
 *     tags: [Appointments]
 *     parameters:
 *       - in: path
 *         name: patientId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the patient
 *     responses:
 *       200:
 *         description: List of appointments for the specified patient
 *       404:
 *         description: No appointments found for the specified patient
 *       500:
 *         description: Internal server error
 */
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

/**
 * @swagger
 * /appointments/practitioner/{practitionerId}:
 *   get:
 *     summary: Retrieve all appointments for a specific practitioner
 *     tags: [Appointments]
 *     parameters:
 *       - in: path
 *         name: practitionerId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the medical practitioner
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of appointments for the specified practitioner
 *       404:
 *         description: No appointments found for the specified practitioner
 *       500:
 *         description: Internal server error
 */
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

/**
 * @swagger
 * /appointments/history/{patientId}:
 *   get:
 *     summary: Retrieve the appointment history for a specific patient
 *     tags: [Appointments]
 *     parameters:
 *       - in: path
 *         name: patientId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the patient
 *     responses:
 *       200:
 *         description: List of appointments sorted by visit number
 *       404:
 *         description: No appointment history found for the specified patient
 *       500:
 *         description: Internal server error
 */
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

/**
 * @swagger
 * /appointments/visit-count/{patientId}:
 *   get:
 *     summary: Retrieve the visit count for a specific patient
 *     tags: [Appointments]
 *     parameters:
 *       - in: path
 *         name: patientId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the patient
 *     responses:
 *       200:
 *         description: The total number of visits for the specified patient
 *       500:
 *         description: Internal server error
 */
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

/**
 * @swagger
 * /appointments/{appointmentId}/vitals:
 *   get:
 *     summary: Retrieve the vitals for a specific appointment
 *     tags: [Appointments]
 *     parameters:
 *       - in: path
 *         name: appointmentId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the appointment
 *     responses:
 *       200:
 *         description: Vitals of the specified appointment
 *       404:
 *         description: Appointment not found
 *       500:
 *         description: Internal server error
 */
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

/**
 * @swagger
 * /appointments/{appointmentId/diagnoses}:
 *   get:
 *     summary: Retrieve the diagnoses for a specific appointment
 *     tags: [Appointments]
 *     parameters:
 *       - in: path
 *         name: appointmentId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the appointment
 *     responses:
 *       200:
 *         description: Diagnoses of the specified appointment
 *       404:
 *         description: Appointment not found
 *       500:
 *         description: Internal server error
 */
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

module.exports = router;
