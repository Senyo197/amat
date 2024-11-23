require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");

const app = express();
const port = process.env.PORT || 5000;

// Middleware to parse JSON
app.use(express.json());

// Enable CORS
app.use(cors());

// MongoDB connection
connectDB();

// Basic route for testing
app.get("/", (req, res) => {
  res.send("Hello World!");
});

// Import and use routes
const userRoutes = require("./routes/Users");
app.use("/api/users", userRoutes);

const patientRoutes = require("./routes/Patient");
app.use("/api/patients", patientRoutes);

const medicalPractitionerRoutes = require("./routes/Medical_Practitioners");
app.use("/api/medical-practitioners", medicalPractitionerRoutes);

const bookAppointmentRoutes = require("./routes/Book_Appointments");
app.use("/api/book-appointment", bookAppointmentRoutes);

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
