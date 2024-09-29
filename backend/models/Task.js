const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  name: { type: String, required: true },
  priority: { type: String, enum: ["high", "medium", "low"], required: true },
  date: { type: Date, required: true },
});

module.exports = mongoose.model("Task", taskSchema);
