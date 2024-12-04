const express = require("express");
const router = express.Router();
const User = require("../models/User");
const BookAppointment = require("../models/Book_Appointment");

/**
 * @swagger
 * /patients:
 *   get:
 *     summary: Get all patients
 *     responses:
 *       200:
 *         description: List of all patients
 *       500:
 *         description: Internal server error
 */
router.get("/", async (req, res) => {
  try {
    const patients = await User.find({});
    res.status(200).json(patients);
  } catch (error) {
    console.error("Error fetching patients:", error);
    res.status(500).json({ message: "Error fetching patients." });
  }
});

/**
 * @swagger
 * /patients/{id}:
 *   get:
 *     summary: Get a patient by ID
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID of the patient
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Patient information
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 name:
 *                   type: string
 *                 dob:
 *                   type: string
 *                 gender:
 *                   type: string
 *                 email:
 *                   type: string
 *                 phonenumber:
 *                   type: string
 *                 address:
 *                   type: string
 *                 city:
 *                   type: string
 *                 country:
 *                   type: string
 *                 education:
 *                   type: string
 *                 occupation:
 *                   type: string
 *                 religion:
 *                   type: string
 *                 maritalStatus:
 *                   type: string
 *       404:
 *         description: Patient not found
 *       500:
 *         description: Internal server error
 */
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

/**
 * @swagger
 * /patients/{id}:
 *   put:
 *     summary: Update a patient's information by ID
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID of the patient
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               dob:
 *                 type: string
 *               gender:
 *                 type: string
 *               email:
 *                 type: string
 *               phonenumber:
 *                 type: string
 *               address:
 *                 type: string
 *               city:
 *                 type: string
 *               country:
 *                 type: string
 *               education:
 *                 type: string
 *               occupation:
 *                 type: string
 *               religion:
 *                 type: string
 *               maritalStatus:
 *                 type: string
 *     responses:
 *       200:
 *         description: Patient updated successfully
 *       404:
 *         description: Patient not found
 *       500:
 *         description: Internal server error
 */
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

/**
 * @swagger
 * /patients/{id}:
 *   delete:
 *     summary: Delete a patient by ID
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID of the patient
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Patient deleted successfully
 *       404:
 *         description: Patient not found
 *       500:
 *         description: Internal server error
 */
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

/**
 * @swagger
 * /patients/{id}/appointments:
 *   get:
 *     summary: Get all appointments for a patient by ID
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID of the patient
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: List of patient's appointments
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 patient:
 *                   $ref: '#/components/schemas/Patient'
 *                 appointments:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Appointment'
 *       404:
 *         description: Patient not found
 *       500:
 *         description: Internal server error
 */
router.get("/:id/appointments", async (req, res) => {
  const patientId = req.params.id;
  try {
    const patient = await User.findById(patientId);
    if (!patient) {
      return res.status(404).json({ message: "Patient not found." });
    }

    const appointments = await BookAppointment.find({ patientId: patientId });

    res.status(200).json({ patient, appointments });
  } catch (error) {
    console.error("Error fetching user and appointments:", error);
    res.status(500).json({ message: "Error fetching user and appointments." });
  }
});

module.exports = router;
