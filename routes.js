const express = require('express');

const { dataStore, getTask } = require('./dataStore');

const router = express.Router();
let counter = 1;

router.get('/search', (req, res) => {
  const { dueDateStart, dueDateEnd, isComplete } = req.query;
  const tasks = dataStore.filter((task) => {
    const { dueDate } = task;
    const taskDueDateBeforeStart = dueDate.valueOf() < new Date(dueDateStart).valueOf();
    const taskDueDateAfterEnd = dueDate.valueOf() > new Date(dueDateEnd).valueOf();
    if (task.deletedAt) {
      return false;
    }
    if (taskDueDateBeforeStart) {
      return false;
    }
    if (taskDueDateAfterEnd) {
      return false;
    }
    if (isComplete == "true" && !task.isComplete) {
      return false;
    }
    return true;
  });
  res.send(tasks);
});

router.post('/create', (req, res) => {
  const { name, description, dueDate } = req.body;
  if (!name) {
    res.status(400).send(`Missing required field 'name'.`);
  }
  const newTask = {
    _id: `task${counter++}`,
    name,
    description,
    dueDate: new Date(dueDate),
    createdAt: new Date()
  };
  dataStore.push(newTask);
  res.send(newTask);
});

router.post('/:taskId/delete', (req, res) => {
  const { taskId } = req.params;
  const task = getTask(taskId);
  if (!task) {
    res.status(404).send(`Task ${taskId} not found.`);
  }
  task.deletedAt = new Date();
  res.send(task);
});

router.post('/:taskId/complete', (req, res) => {
  const { taskId } = req.params;
  const task = getTask(taskId);
  if (!task) {
    res.status(404).send(`Task ${taskId} not found.`);
  }
  task.isComplete = true;
  res.send(task);
});

module.exports = router;