const mongoose = require("mongoose");
const checker = require("validator");
const { ObjectId } = require('mongoose');

const NotificationsSchema = new mongoose.Schema({
  user_id: {
    type: ObjectId,
    required: true,
  },
  title: { type: String, required: true },
  content: { type: String, required: true },
  type: { type: Number, required: true },
  created_at: { type: Date, required: true, default: Date.now() },
});

const Notification = mongoose.model("Notification", NotificationsSchema);

module.exports = Notification;
