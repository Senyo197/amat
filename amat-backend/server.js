require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
const port = process.env.PORT || 5000;

// Middleware to parse JSON
app.use(express.json());

// Enable CORS
app.use(cors());

// MongoDB connection
const mongoURI = process.env.MONGO_URI;

mongoose
  .connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

// Basic routes
app.get("/", (req, res) => {
  res.send("Hello World!");
});

// User routes
const userRoutes = require("./routes/Users");
app.use("/api/users", userRoutes);

// Patient routes
const patientRoutes = require("./routes/Patient");
app.use("/api/patients", patientRoutes);

// Medical Practitioner routes
const medicalPractitionerRoutes = require("./routes/Medical_Practitioners");
app.use("/api/medical-practitioners", medicalPractitionerRoutes);

// Book Appointment routes
const bookAppointmentRoutes = require("./routes/Book_Appointments");
app.use("/api/book-appointment", bookAppointmentRoutes);

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
