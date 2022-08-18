const Task = require('../models/task');

async function getTasks(req, res) {
  const { id } = req.params;
  const tasks = await Task.findByTodoId(id);

  return res.json(tasks);
}

async function deleteTask(req, res) {
  const { id, task_id } = req.params;
  await Task.deleteByTaskId(task_id);
  const tasks = await Task.findByTodoId(id);

  return res.json(tasks);
}

async function addTask(req, res) {
  const { id } = req.params;
  const { description, due_date, priority } = req.body;
  const existingTask = await Task.findByDescriptionAndTodoId(description, id);
  if (existingTask === undefined) {
    await Task.add(description, due_date, priority, id, false);
    const tasks = await Task.findByTodoId(id);
    return res.json(tasks);
  }

  return res.status(422).send({ message: "Description already exist!" });
}

async function getTask(req, res) {
  const { task_id } = req.params;
  const task = await Task.findById(task_id);

  return res.json(task);
}

async function updateTask(req, res) {
  const { id, task_id } = req.params;
  const { description, due_date, priority, completed } = req.body;
  const existingTask = await Task.findByDescriptionAndTaskId(description, task_id);
  if (existingTask === undefined) {
    await Task.update(task_id, id, description, due_date, priority, completed);
    const tasks = await Task.findByTodoId(id);

    return res.json(tasks);
  }

  return res.status(422).send({ message: "Description already exist!" });
}

async function getAllTasks(req, res) {
  const allTasks = await Task.findAll();

  return res.json(allTasks);
}

module.exports = {
  getTasks,
  deleteTask,
  addTask,
  getTask,
  updateTask,
  getAllTasks
}