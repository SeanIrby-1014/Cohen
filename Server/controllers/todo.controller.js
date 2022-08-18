const Todo = require('../models/todo');
const Task = require('../models/task');

async function getTodos(req, res) {
  const todos = await Todo.findAll();

  return res.json(todos);
}

async function addTodo(req, res) {
  const { name } = req.body;
  const existingTodo = await Todo.findByName(name);
  if (existingTodo === undefined) {
    const todos = await Todo.add(name);

    return res.json(todos);
  }

  return res.status(422).send({ message: "Name already exist!" });
}

async function deleteTodo(req, res) {
  const { id } = req.params;
  const todos = await Todo.deleteById(id);
  await Task.deleteAllByTodoId(id);

  return res.json(todos);
}

module.exports = {
  getTodos,
  addTodo,
  deleteTodo
}