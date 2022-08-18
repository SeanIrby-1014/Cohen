const FileDb = require('../file-db.js');

const db = new FileDb('task-data.json');

class Task {
  constructor({ id, description, due_date, priority, todo_id, completed } = {}) {
    this.id = Number(id) || null;
    this.description = description || '';
    this.due_date = due_date || '';
    this.priority = priority || '';
    this.todo_id = Number(todo_id) || null;
    this.completed = completed || false;
  }

  static async findAll() {
    const records = await db.read();
    return records;
  }

  static async findById(id) {
    const records = await db.read();
    for(let record of records) {
      if(record.id === Number(id))
        return record;
    }
    return ;
  }

  static async findByTodoId(id) {
    const records = await db.read();
    let res = [];
    for(let record of records) {
      if(record.todo_id === Number(id))
        res.push(record);
    }
    return res;
  }

  static async add(description, due_date, priority, todo_id, completed) {
    let records = await db.read();
    let newId = 0;
    if(records.length > 0) newId = records[records.length - 1].id + 1;
    records.push({
      id: Number(newId),
      description: description,
      due_date: due_date,
      priority: priority,
      todo_id: Number(todo_id),
      completed: completed,
    });
    await db.write(records);
  }

  static async deleteByTaskId(id) {
    const records = await db.read();
    const newRecords = records.filter((record) => {
      if(record.id !== Number(id))
        return record;
    });
    await db.write(newRecords);
  }

  static async deleteAllByTodoId(id) {
    const records = await db.read();
    const newRecords = records.filter((record) => {
      if(record.todo_id !== Number(id))
        return record;
    });
    await db.write(newRecords);
  }

  static async findByDescriptionAndTodoId(description, id) {
    const records = await db.read();
    for(let record of records) {
      if(record.description === description && record.todo_id === Number(id))
        return record;
    }
    return ;
  }

  static async findByDescriptionAndTaskId(description, id) {
    const records = await db.read();
    for(let record of records) {
      if(record.description === description && record.id !== Number(id))
        return record;
    }
    return ;
  }

  static async update(id, todo_id, description, due_date, priority, completed) {
    const records = await db.read();
    const newRecords = records.map((record) => {
      if(record.id === Number(id)){
        if(completed === undefined)
          return {
            id: Number(id),
            description: description,
            due_date: due_date,
            priority: priority,
            todo_id: Number(todo_id),
            completed: record.completed,
          }
        else
          return {
            ...record,
            completed: completed,
          }
      }
      return record;
    });
    await db.write(newRecords);
  }

}

module.exports = Task;