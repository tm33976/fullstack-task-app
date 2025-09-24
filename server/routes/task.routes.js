const express = require('express');
const router = express.Router();
const Task = require('../models/task.model');

router.post('/', async (req, res) => {
  try {
    const { title } = req.body;
    const newTask = new Task({
      title,
      user: req.user.id,
    });
    const task = await newTask.save();
    res.status(201).json(task);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
});

router.get('/', async (req, res) => {
  try {
    const { search, status } = req.query;
    const query = { user: req.user.id };

    if (search) {
      query.title = { $regex: search, $options: 'i' }; 
    }

    if (status === 'completed') {
      query.completed = true;
    } else if (status === 'pending') {
      query.completed = false;
    }
 
    const tasks = await Task.find(query).sort({ createdAt: -1 });
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const { title, completed } = req.body;
    let task = await Task.findById(req.params.id);
    if (!task) return res.status(404).json({ message: 'Task not found' });
    if (task.user.toString() !== req.user.id) return res.status(401).json({ message: 'Not authorized' });

    task = await Task.findByIdAndUpdate(req.params.id, { title, completed }, { new: true });
    res.json(task);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    let task = await Task.findById(req.params.id);
    if (!task) return res.status(404).json({ message: 'Task not found' });
    if (task.user.toString() !== req.user.id) return res.status(401).json({ message: 'Not authorized' });

    await Task.findByIdAndDelete(req.params.id);
    res.json({ message: 'Task removed' });
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
});

module.exports = router;