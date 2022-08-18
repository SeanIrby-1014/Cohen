const FileDb = require('../file-db.js');

const db = new FileDb('todo-data.json');

class Todo {
  constructor({ id, name } = {}) {
    this.id = Number(id) || null;
    this.name = name || '';
  }

  static async add(name) {
    var records = await db.read();
    let newId = 0;
    if(records.length > 0) newId = records[records.length - 1].id + 1;
    records.push({
      id: Number(newId),
      name: name,
    });
    await db.write(records);
    return records;
  }

  static async findAll() {
    const records = await db.read();
    return records;
  }

  static async deleteById(id) {
    const records = await db.read();
    const newRecords = records.filter((record) => {
      if(record.id !== Number(id))
        return record;
    });
    await db.write(newRecords);
    return newRecords;
  }

  static async findById(id) {
    const records = await db.read();
    for(let record of records) {
      if(record.id === Number(id))
        return record;
    }
    return ;
  }

  static async findByName(name) {
    const records = await db.read();
    for(let record of records) {
      if(record.name === name)
        return record;
    }
    return ;
  }
  
}

module.exports = Todo;