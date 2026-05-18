const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true }, // full name
    firstName: { type: String },
    lastName: { type: String },
    email: { type: String, required: true, unique: true },
    username: { type: String, unique: true },
    password: { type: String, required: true },
    type: {
      type: String,
      enum: ["admin", "editor", "viewer"],
      default: "viewer",
    },
    gender: { type: String, enum: ["Male", "Female"] },
    age: { type: Number },
    contactNumber: { type: String },
  },
  { timestamps: true },
);

module.exports = mongoose.model("User", userSchema);
