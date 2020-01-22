"use strict";

exports.Info = void 0;

class Info {
  constructor() {
    this._version = null;
    this._creator = null;
    this._cmd = null;
    this._part = null;
    this._positions = null;
    this._events = null;
    this._summary = null;
  }

  get version() {
    return this._version;
  }

  set version(value) {
    this._version = value;
  }

  get creator() {
    return this._creator;
  }

  set creator(value) {
    this._creator = value;
  }

  get cmd() {
    return this._cmd;
  }

  set cmd(value) {
    this._cmd = value;
  }

  get part() {
    return this._part;
  }

  set part(value) {
    this._part = value;
  }

  get positions() {
    return this._positions;
  }

  set positions(value) {
    this._positions = value;
  }

  get events() {
    return this._events;
  }

  set events(value) {
    this._events = value;
  }

  get summary() {
    return this._summary;
  }

  set summary(value) {
    this._summary = value;
  }

}

exports.Info = Info;