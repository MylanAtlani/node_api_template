const mongoose = require("mongoose");

const LogSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ["register", "login"],
    required: true,
  },
  created_at: {
    type: Date,
    default: Date.now(),
  },
});

const Log = mongoose.model("Log", LogSchema);

module.exports = Log;
