const mongoose = require("mongoose");
const { mongo_connection } = require("../config/connection");

const skillSchema = new mongoose.Schema(
  {
    value: { type: String },
    label: { type: String },
  },
  { timestamps: true }
);

const Skill = mongo_connection.model("skill", skillSchema);
module.exports = Skill;
