const { join } = require('path');
const fs = require('fs');

class FileDb {
  constructor(filename) {
    this.filePath = join(process.env.INIT_CWD, filename);
  }

  async read() {
    return new Promise(resolve => {
      fs.readFile(this.filePath, (err, rawData) => {
        try {
          resolve(JSON.parse(rawData || '[]'));
        } catch (err) {
          resolve([]);
        }
      });
    });
  }

  async write(data) {
    return new Promise((resolve, reject) => {
      fs.writeFile(this.filePath, JSON.stringify(data), err => {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      });
    });
  }
}

module.exports = FileDb;