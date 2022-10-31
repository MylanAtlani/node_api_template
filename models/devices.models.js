const { ObjectId } = require("mongoose");
const mongoose = require("mongoose");
const checker = require("validator");

const DevicesSchema = new mongoose.Schema({
  user_id: {
    type: ObjectId,
    required: true,
  },
  token: {
    type: String,
    required: true,
  },
  created_at: {
    type: Date,
    required: true,
    default: Date.now,
  },
  updated_at: {
    type: Date,
    required: true,
  },
});

const Device = mongoose.model("Device", DevicesSchema);

module.exports = Device;
