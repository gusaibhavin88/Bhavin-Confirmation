const mongoose = require("mongoose");
const { mongo_connection } = require("../config/connection");

const notificationSchema = new mongoose.Schema(
  {
    user_id: { type: mongoose.Types.ObjectId },
    data_reference_id: { type: mongoose.Types.ObjectId },
    message: { type: String },
    is_read: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const Notification = mongo_connection.model("notification", notificationSchema);

module.exports = Notification;
