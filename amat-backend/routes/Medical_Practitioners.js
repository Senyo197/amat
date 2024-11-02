const express = require("express");
const router = express.Router();
const Medical_Practitioner = require("../models/Medical_Practitioner");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const verifyToken = require("../middleware/verifyToken");

// Medical Practitioner Signup
router.post("/medical/signup", async (req, res) => {
  try {
    const { name, email, phonenumber, role, specializations, password } =
      req.body;

    // Check if role is either "doctor" or "nurse"
    if (!["doctor", "nurse", "hospital Admin"].includes(role)) {
      return res.status(400).json({
        error: "Role must be either 'doctor' or 'nurse' or 'hospital Admin'",
      });
    }

    // Check if medical practitioner already exists
    let medical_practitioner = await Medical_Practitioner.findOne({ email });
    if (medical_practitioner) {
      return res
        .status(400)
        .json({ error: "Medical Practitioner already exists" });
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    medical_practitioner = new Medical_Practitioner({
      name,
      email,
      phonenumber,
      role,
      specializations,
      password: hashedPassword,
    });

    await medical_practitioner.save();

    // Generate token
    const token = jwt.sign(
      { id: medical_practitioner._id, name: medical_practitioner.name },
      process.env.JWT_SECRET,
      {
        expiresIn: 86400,
      }
    );

    res.status(201).json({ medical_practitioner, token });
  } catch (err) {
    console.error("Error in Medical_Practitioner signup", err);
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
      { id: medical_practitioner._id, name: medical_practitioner.name },
      process.env.JWT_SECRET,
      {
        expiresIn: 86400, // 24 hours
      }
    );

    res.status(200).json({ medical_practitioner, token });
  } catch (err) {
    console.error("Error logging in medical practitioner", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Get all Medical Practitioners(doctors)
router.get("/medical/doctors", async (req, res) => {
  try {
    const doctors = await Medical_Practitioner.find({ role: "doctor" });
    res.status(200).json(doctors);
  } catch (err) {
    console.error("Error fetching doctors", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Get all Medical Practitioners(nurses)
router.get("/medical/nurses", async (req, res) => {
  try {
    const nurses = await Medical_Practitioner.find({ role: "nurse" });
    res.status(200).json(nurses);
  } catch (err) {
    console.error("Error fetching nurses", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
