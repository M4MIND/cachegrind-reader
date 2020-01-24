"use strict";

exports.FileReader = void 0;

let fs = require('fs');

class FileReader {
  constructor(file, callback, state) {
    this.path = file;
    this.state = state;
    this.cursor = {
      x: 0
    };
    this.file = [];
    /*fs.access(file, fs.F_OK, (err) => {
    	if (err) {
    		callback(err, null);
    		return;
    	}
    			fs.readFile(file, 'utf8', (err, data) => {
    		this.file = data.split(new RegExp('\\r\\n|\\n|\\r', 'gm'));
    		callback(err, this);
    	});
    });*/
  }

  read() {
    return new Promise((resolve, reject) => {
      fs.access(this.path, fs.F_OK, err => {
        if (err) {
          reject(new Error(`No such file: ${this.path}`));
        } else {
          fs.readFile(this.path, 'utf8', (err, data) => {
            this.file = data.split(new RegExp('\\r\\n|\\n|\\r', 'gm'));
            resolve(this);
          });
        }
      });
    });
  }

  line() {
    return this.file[this.cursor.x];
  }

  end() {
    return this.cursor.x >= this.file.length - 1;
  }

  nextLine() {
    this.cursor.x++;
    return this.file[this.cursor.x];
  }

}

exports.FileReader = FileReader;