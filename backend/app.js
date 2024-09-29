const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const Task = require("./models/Task");

const app = express();
app.use(cors());
app.use(bodyParser.json());

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

mongoose
  .connect("mongodb://localhost:27017/taskdb")
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error(err));

// Create a task
app.post("/tasks", async (req, res) => {
  const { name, priority, date } = req.body;
  const newTask = new Task({ name, priority, date });
  await newTask.save();
  res.json(newTask);
});

// Read all tasks
app.get("/tasks", async (req, res) => {
  const tasks = await Task.find();
  res.json(tasks);
});

// Update a task
app.put("/tasks/:id", async (req, res) => {
  const { name, priority, date } = req.body;
  const updatedTask = await Task.findByIdAndUpdate(
    req.params.id,
    { name, priority, date },
    { new: true }
  );
  res.json(updatedTask);
});

// Delete a task
app.delete("/tasks/:id", async (req, res) => {
  await Task.findByIdAndDelete(req.params.id);
  res.json({ message: "Task deleted" });
});

// app.listen(5000, () => {
//   console.log("Server running on port 5000");
// });
