const express = require("express");
const router = express.Router();
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const verifyToken = require("../middleware/verifyToken");

// Create a new user (signup)
router.post("/signup", async (req, res) => {
  try {
    const {
      name,
      dob,
      gender,
      email,
      phonenumber,
      address,
      town,
      country,
      education,
      occupation,
      religion,
      maritalStatus,
      preexisting_conditions,
      current_medications,
      password,
    } = req.body;

    // Check if a user exists with the same name combined with either email or phone number
    const existingUser = await User.findOne({
      $or: [
        { name, email },
        { name, phonenumber },
      ],
    });

    if (existingUser) {
      return res.status(400).json({
        error: "Name is already in use",
      });
    }

    // Check if email already exists independently
    const emailExists = await User.findOne({ email });
    if (emailExists) {
      return res.status(400).json({
        error: "A user with this email already exists",
      });
    }

    // Check if phone number already exists independently
    const phonenumberExists = await User.findOne({ phonenumber });
    if (phonenumberExists) {
      return res.status(400).json({
        error: "A user with this phone number already exists",
      });
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create a new user
    const user = new User({
      name,
      dob,
      gender,
      email,
      phonenumber,
      address,
      town,
      country,
      education,
      occupation,
      religion,
      maritalStatus,
      preexisting_conditions,
      current_medications,
      password: hashedPassword,
    });

    await user.save();

    const token = jwt.sign(
      { id: user._id, name: user.name },
      process.env.JWT_SECRET,
      {
        expiresIn: 86400, // 24 hours
      }
    );

    // Remove password from response
    const userResponse = user.toObject();
    delete userResponse.password;

    res.status(201).json({ user: userResponse, token });
  } catch (err) {
    console.error("Error creating user:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// User login
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: "Invalid password" });
    }

    const token = jwt.sign(
      { id: user._id, name: user.name, lastActivity: Date.now() },
      process.env.JWT_SECRET,
      {
        expiresIn: 86400, // 24 hours
      }
    );

    // Remove password from response
    const userResponse = user.toObject();
    delete userResponse.password;

    res.status(200).json({ user: userResponse, token });
  } catch (err) {
    console.error("Error logging in:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Protected route to get user data
router.get("/protected", verifyToken, async (req, res) => {
  try {
    const user = await User.findById(req.userId).select("-password");
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.status(200).json(user);
  } catch (err) {
    console.error("Error fetching user:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Get all users
router.get("/", async (req, res) => {
  try {
    const users = await User.find().select("-password");
    res.status(200).json(users);
  } catch (err) {
    console.error("Error fetching users:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Update Profile Settings
router.put("/profile", verifyToken, async (req, res) => {
  try {
    const userId = req.userId;
    const {
      name,
      email,
      dob,
      gender,
      phonenumber,
      address,
      town,
      country,
      education,
      occupation,
      religion,
      maritalStatus,
    } = req.body;

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      {
        name,
        email,
        dob,
        gender,
        phonenumber,
        address,
        town,
        country,
        education,
        occupation,
        religion,
        maritalStatus,
      },
      { new: true }
    ).select("-password");
    res.status(200).json(updatedUser);
  } catch (err) {
    console.error("Error updating profile settings:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
