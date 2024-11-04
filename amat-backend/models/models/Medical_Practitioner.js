const mongoose = require("mongoose");

const Medical_PractitionerSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    phonenumber: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      required: true,
      enum: ["doctor", "nurse", "hospital Admin"],
    },
    specializations: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Medical_Practitioner = mongoose.model(
  "Medical_Practitioner",
  Medical_PractitionerSchema
);
module.exports = Medical_Practitioner;
