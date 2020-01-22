"use strict";

exports.Collection = void 0;

var _Info = require("./Info");

class Collection {
  constructor() {
    this._node = [];
    this._file = [];
    this._info = new _Info.Info();
  }

  get node() {
    return this._node;
  }

  get file() {
    return this._file;
  }

  get info() {
    return this._info;
  }

  addNode(fn) {
    this.node.push(fn);
  }

  hasNode(id) {
    return !!this.node[id - 1];
  }

  getNode(id) {
    return this.node[id - 1] || null;
  }

  addFile(file) {
    this.file.push(file);
  }

  hasFile(id) {
    return !!this.file[id - 1];
  }

  getFile(id) {
    return this.file[id - 1] || null;
  }

}

exports.Collection = Collection;