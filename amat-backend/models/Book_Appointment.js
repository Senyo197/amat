const mongoose = require("mongoose");

const Book_AppointmentSchema = new mongoose.Schema({
  patientId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  newHealthConcern: {
    type: String,
    required: false,
  },
  duration: {
    value: {
      type: Number,
      required: false,
    },
    unit: {
      type: String,
      enum: ["Days", "Weeks", "Months"],
      required: false,
    },
  },
  symptoms: {
    type: [String],
    enum: [
      "Difficulty sleeping",
      "Fatigue / weakness",
      "Fever",
      "Loss of appetite",
      "Mood changes",
      "Night sweats",
      "Congestion",
      "Ear pain",
      "Eye redness",
      "Headaches",
    ],
  },
  medication: [
    {
      name: String,
      dosage: String,
      frequency: String,
    },
  ],
  allergies: {
    hasAllergies: {
      type: Boolean,
      required: false,
    },
    allergyList: {
      type: [String],
      default: [],
    },
  },
  medicalConditions: {
    hasConditions: {
      type: Boolean,
      required: false,
    },
    conditionList: {
      type: [String],
      default: [],
    },
  },
  surgeries: {
    hasSurgeries: {
      type: Boolean,
      required: false,
    },
    surgeryList: {
      type: [String],
      default: [],
    },
  },
  familyHistory: {
    hasFamilyHistory: {
      type: Boolean,
      required: false,
    },
    familyConditionList: {
      type: [String],
      default: [],
    },
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("BookAppointment", Book_AppointmentSchema);
