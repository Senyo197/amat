const mongoose = require("mongoose");

const Book_AppointmentSchema = new mongoose.Schema({
  patientId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  practitionerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Medical_Practitioner",
    required: true,
  },
  visitNumber: {
    type: Number,
    required: true,
  },
  appointmentDetails: {
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
      type: String,
      required: false,
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
  },
  vitals: {
    bloodPressure: { type: String, required: false },
    heartRate: { type: String, required: false },
    respiratoryRate: { type: String, required: false },
    temperature: { type: String, required: false },
    weight: { type: String, required: false },
    height: { type: String, required: false },
    bmi: { type: String, required: false },
    rbs: { type: String, required: false },
    fbs: { type: String, required: false },
    bloodGroup: { type: String, required: false },
    sickling: { type: Boolean, required: false },
  },
  diagnoses: [
    {
      diagnosisName: { type: String, required: true },
      diagnosisDate: {
        type: Date,
        required: true,
        validate: {
          validator: function (value) {
            return value <= Date.now();
          },
          message: "Diagnosis date cannot be in the future.",
        },
      },
      additionalNotes: { type: String, required: true },
    },
  ],
  prescribedMedications: [
    {
      name: { type: String, required: true },
      dosage: { type: String, required: true },
      frequency: { type: String, required: true },
      route: {
        type: String,
        required: false,
      },
      instructions: { type: String, required: false },
      startDate: { type: Date, required: false },
      endDate: { type: Date, required: false },
    },
  ],
  labXrayReports: [
    {
      patientName: { type: String, required: true },
      reportType: { type: String, required: true },
      reportDate: { type: Date, required: true },
      reportDetails: { type: String, required: true },
      status: {
        type: String,
        enum: ["Pending", "Completed"],
        default: "Pending",
        required: true,
      },
    },
  ],
  referral: [
    {
      referralDate: { type: Date, required: true },
      referredTo: { type: String, required: true },
      reasonForReferral: { type: String, required: true },
      referralNotes: { type: String, required: false },
      status: {
        type: String,
        enum: ["pending", "completed", "cancelled"],
        default: "pending",
      },
    },
  ],
  status: {
    type: String,
    enum: ["pending", "completed", "cancelled"],
    default: "pending",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("BookAppointment", Book_AppointmentSchema);
