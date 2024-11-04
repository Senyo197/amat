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
      age,
      gender,
      email,
      phonenumber,
      address,
      city,
      country,
      preexisting_conditions,
      current_medications,
      password,
    } = req.body;

    // Check if user already exists
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ error: "User already exists" });
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create a new user
    user = new User({
      name,
      dob,
      age,
      gender,
      email,
      phonenumber,
      address,
      city,
      country,
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
      { id: user._id, name: user.name },
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
      age,
      dob,
      gender,
      phonenumber,
      address,
      city,
      country,
    } = req.body;
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { name, email, dob, age, gender, phonenumber, address, city, country },
      { new: true }
    ).select("-password");
    res.status(200).json(updatedUser);
  } catch (err) {
    console.error("Error updating profile settings:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Update Notification Settings
router.put("/notifications", verifyToken, async (req, res) => {
  try {
    const userId = req.userId;
    const { emailNotifications, smsNotifications, pushNotifications } =
      req.body;
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      {
        "notifications.emailNotifications": emailNotifications,
        "notifications.smsNotifications": smsNotifications,
        "notifications.pushNotifications": pushNotifications,
      },
      { new: true }
    ).select("-password");
    res.status(200).json(updatedUser);
  } catch (err) {
    console.error("Error updating notification settings:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Update Security Settings
router.put("/security", verifyToken, async (req, res) => {
  try {
    const userId = req.userId;
    const { newPassword, twoFactorAuth } = req.body;

    const updates = { twoFactorAuth };
    if (newPassword) {
      const salt = await bcrypt.genSalt(10);
      updates.password = await bcrypt.hash(newPassword, salt);
    }

    const updatedUser = await User.findByIdAndUpdate(userId, updates, {
      new: true,
    }).select("-password");
    res.status(200).json(updatedUser);
  } catch (err) {
    console.error("Error updating security settings:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
