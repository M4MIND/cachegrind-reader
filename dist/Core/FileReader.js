"use strict";

exports.FileReader = void 0;

let fs = require('fs');

class FileReader {
  constructor(file, callback) {
    this.cursor = {
      x: 0
    };
    this.file = '';
    fs.readFile(file, 'utf8', (err, data) => {
      this.file = data.split(new RegExp('\\r\\n|\\n|\\r', 'gm'));
      callback(err, this);
    });
  }

  line() {
    return this.file[this.cursor.x];
  }

  end() {
    return this.cursor.x >= this.file.length - 1;
  }

  nextLine(callback) {
    this.cursor.x++;

    if (callback) {
      callback(this.file[this.cursor.x]);
    } else {
      return this.file[this.cursor.x];
    }
  }

}

exports.FileReader = FileReader;