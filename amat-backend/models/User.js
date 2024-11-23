const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    dob: {
      type: Date,
      required: true,
    },
    gender: {
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
    address: {
      type: String,
      required: true,
    },
    town: {
      type: String,
      required: true,
    },
    country: {
      type: String,
      required: true,
    },
    education: {
      type: String,
      required: true,
    },
    occupation: {
      type: String,
      required: true,
    },
    religion: {
      type: String,
      required: true,
    },
    maritalStatus: {
      type: String,
      required: true,
    },
    preexisting_conditions: {
      type: String,
      required: false,
    },
    current_medications: {
      type: String,
      required: false,
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", UserSchema);
module.exports = User;
