const express = require("express");
const router = express.Router();
const Medical_Practitioner = require("../models/Medical_Practitioner");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const verifyMedicalToken = require("../middleware/verifyMedicalToken");

// Medical Practitioner Signup
router.post("/medical/signup", async (req, res) => {
  try {
    const {
      name,
      email,
      phonenumber,
      role,
      specializations,
      licenseCertificate,
      password,
    } = req.body;

    // Check if role is valid
    if (!["doctor", "nurse"].includes(role)) {
      return res.status(400).json({
        error: "Role must be either 'doctor' or 'nurse'",
      });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: "Invalid email format" });
    }

    // Check if email or phonenumber already exists
    const existingEmail = await Medical_Practitioner.findOne({ email });
    const existingPhonenumber = await Medical_Practitioner.findOne({
      phonenumber,
    });
    if (existingEmail || existingPhonenumber) {
      return res
        .status(400)
        .json({ error: "Email or phone number already in use" });
    }

    // Check if name combines with either email or phone number
    const existingEntry = await Medical_Practitioner.findOne({
      $or: [
        { name, email },
        { name, phonenumber },
      ],
    });

    if (existingEntry) {
      return res.status(400).json({
        error: "Name is already in use",
      });
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create new Medical Practitioner
    const medical_practitioner = new Medical_Practitioner({
      name,
      email,
      phonenumber,
      role,
      specializations,
      licenseCertificate,
      password: hashedPassword,
    });

    await medical_practitioner.save();

    // Generate token
    const token = jwt.sign(
      {
        id: medical_practitioner._id,
        name: medical_practitioner.name,
        role: medical_practitioner.role,
      },
      process.env.JWT_SECRET,
      { expiresIn: 86400 } // Token expiration set to 24 hours
    );

    res.status(201).json({ medical_practitioner, token });
  } catch (err) {
    console.error("Error during signup", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Medical Practitioner Login
router.post("/medical/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if medical practitioner exists
    const medical_practitioner = await Medical_Practitioner.findOne({ email });
    if (!medical_practitioner) {
      return res.status(404).json({ error: "Medical Practitioner not found" });
    }

    // Validate password
    const isPasswordValid = await bcrypt.compare(
      password,
      medical_practitioner.password
    );
    if (!isPasswordValid) {
      return res.status(401).json({ error: "Invalid password" });
    }

    // Generate token
    const token = jwt.sign(
      {
        id: medical_practitioner._id,
        name: medical_practitioner.name,
        role: medical_practitioner.role,
      },
      process.env.JWT_SECRET,
      { expiresIn: 86400 } // Token expiration set to 24 hours
    );

    res.status(200).json({ medical_practitioner, token });
  } catch (err) {
    console.error("Error during login", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Get all Medical Practitioners (doctors)
router.get("/medical/doctors", verifyMedicalToken, async (req, res) => {
  try {
    const doctors = await Medical_Practitioner.find({ role: "doctor" });
    res.status(200).json(doctors);
  } catch (err) {
    console.error("Error fetching doctors", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Get all Medical Practitioners (nurses)
router.get("/medical/nurses", verifyMedicalToken, async (req, res) => {
  try {
    const nurses = await Medical_Practitioner.find({ role: "nurse" });
    res.status(200).json(nurses);
  } catch (err) {
    console.error("Error fetching nurses", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
