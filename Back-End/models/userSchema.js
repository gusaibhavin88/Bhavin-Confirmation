const mongoose = require("mongoose");
const { mongo_connection } = require("../config/connection");

const userSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    last_name: { type: String, required: true },
    profile_image: { type: String },
    contact_number: { type: String, required: true },
    first_name: { type: String, required: true },
    reset_password_token: { type: String },
    verification_token: { type: String },
    is_deleted: { type: Boolean, default: false },
    is_active: { type: Boolean, default: false },
    is_verified: { type: Boolean, default: false },
    role: { type: String, default: "user" },
    gender: { type: String },
    department: { type: String },
    skills: [
      {
        value: {
          type: String,
        },
        label: {
          type: String,
        },
      },
    ],
  },
  { timestamps: true }
);

const User = mongo_connection.model("user", userSchema);
module.exports = User;
