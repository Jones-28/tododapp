const express = require("express");
const router = express.Router();
const Task = require("../models/Task");

// Create Task
router.post("/", async (req, res) => {
  try {
    const { title, description, status } = req.body;
    if (!title || !title.trim())
      return res.status(400).json({ error: "Title is required" });
    const task = new Task({
      title: title.trim(),
      description: description?.trim() || "",
      status,
    });
    await task.save();
    res.status(201).json(task);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

// Get all tasks (with optional status filter and pagination)
router.get("/", async (req, res) => {
  try {
    const { status, page = 1, limit = 20 } = req.query;
    const query = {};
    if (status) query.status = status;
    const skip =
      (Math.max(1, parseInt(page)) - 1) * Math.max(1, parseInt(limit));
    const tasks = await Task.find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit));
    const total = await Task.countDocuments(query);
    res.json({ tasks, total });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

// Get single task
router.get("/:id", async (req, res) => {
  try {
    const t = await Task.findById(req.params.id);
    if (!t) return res.status(404).json({ error: "Task not found" });
    res.json(t);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

// Update task
router.put("/:id", async (req, res) => {
  try {
    const { title, description, status } = req.body;
    const task = await Task.findById(req.params.id);
    if (!task) return res.status(404).json({ error: "Task not found" });
    if (title !== undefined) {
      if (!title || !String(title).trim())
        return res.status(400).json({ error: "Title cannot be empty" });
      task.title = title.trim();
    }
    if (description !== undefined)
      task.description = (description || "").trim();
    if (status !== undefined) task.status = status;
    await task.save();
    res.json(task);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

// Delete task
router.delete("/:id", async (req, res) => {
  try {
    const deleted = await Task.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ error: "Task not found" });
    res.json({ message: "Deleted" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
