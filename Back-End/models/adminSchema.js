const mongoose = require("mongoose");
const { mongo_connection } = require("../config/connection");

const adminSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    last_name: { type: String, required: true },
    first_name: { type: String, required: true },
    reset_password_token: { type: String },
    invitation_token: { type: String },
    is_deleted: { type: Boolean, default: false },
    profile_image: { type: String },
  },
  { timestamps: true }
);

const Admin = mongo_connection.model("admin", adminSchema);
module.exports = Admin;
