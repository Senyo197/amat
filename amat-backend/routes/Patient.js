const express = require("express");
const router = express.Router();
const { MongoClient, ObjectId } = require("mongodb");

const client = new MongoClient(process.env.MONGO_URI);

// Middleware to connect to the database
async function connectToDatabase() {
  try {
    await client.connect();
    console.log("MongoDB connected");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    throw error; // Rethrow the error for handling in the route
  }
}

// Middleware to connect to database for every request
router.use(async (req, res, next) => {
  try {
    await connectToDatabase();
    next();
  } catch (error) {
    res.status(500).json({ message: "Database connection error." });
  }
});

// GET all patients
router.get("/", async (req, res) => {
  try {
    const database = client.db("amat_backend");
    const patientsCollection = database.collection("users");
    const patients = await patientsCollection.find({}).toArray();
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
    const database = client.db("amat_backend"); // Use your MongoDB database name
    const patientsCollection = database.collection("users");
    const patient = await patientsCollection.findOne({
      _id: new ObjectId(patientId), // Correctly convert string ID to ObjectId
    });
    if (!patient) {
      return res.status(404).json({ message: "Patient not found." });
    }
    res.status(200).json(patient);
  } catch (error) {
    console.error("Error fetching patient:", error);
    res.status(500).json({ message: "Error fetching patient." });
  }
});

// Update patient by ID
router.put("/:id", async (req, res) => {
  const patientId = req.params.id;
  const updatedPatient = req.body; // Get the updated patient data from the request body

  try {
    const database = client.db("amat_backend"); // Use your MongoDB database name
    const patientsCollection = database.collection("users");
    const result = await patientsCollection.updateOne(
      { _id: new ObjectId(patientId) }, // Correctly convert string ID to ObjectId
      { $set: updatedPatient }
    );

    if (result.matchedCount === 0) {
      return res.status(404).json({ message: "Patient not found" });
    }

    res
      .status(200)
      .json({ message: "Patient updated successfully", updatedPatient });
  } catch (error) {
    console.error("Error updating patient:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Delete patient by ID
router.delete("/:id", async (req, res) => {
  const patientId = req.params.id;
  try {
    const database = client.db("amat_backend"); // Use your MongoDB database name
    const patientsCollection = database.collection("users");
    const result = await patientsCollection.deleteOne({
      _id: new ObjectId(patientId),
    }); // Correctly convert string ID to ObjectId

    if (result.deletedCount === 0) {
      return res.status(404).json({ message: "Patient not found" });
    }

    res.status(200).json({ message: "Patient deleted successfully" });
  } catch (error) {
    console.error("Error deleting patient:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
