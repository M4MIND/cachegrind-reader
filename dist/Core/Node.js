"use strict";

exports.Node = void 0;

class Node {
  constructor(id) {
    this._id = id;
    this._name = null;
    this._filename = null;
    this._line = null;
    this._invocationCount = 0;
    this._summedSelfCost = 0;
    this._summedInclusiveCost = 0;
    this._calledFrom = {};
    this._subCalls = {};
  }

  get id() {
    return this._id;
  }

  set id(value) {
    this._id = value;
  }

  get name() {
    return this._name;
  }

  set name(value) {
    this._name = value;
  }

  get line() {
    return this._line;
  }

  set line(value) {
    this._line = value;
  }

  get filename() {
    return this._filename;
  }

  set filename(value) {
    this._filename = value;
  }

  get calledFrom() {
    return this._calledFrom;
  }

  set calledFrom(value) {
    this._calledFrom[value.node.id] = value;
  }

  get subCalls() {
    return this._subCalls;
  }

  set subCalls(value) {
    this._subCalls[value.node.id] = value;
  }

  get invocationCount() {
    return this._invocationCount;
  }

  set invocationCount(value) {
    this._invocationCount = value;
  }

  get summedSelfCost() {
    return this._summedSelfCost;
  }

  set summedSelfCost(value) {
    this._summedSelfCost = value;
  }

  get summedInclusiveCost() {
    return this._summedInclusiveCost;
  }

  set summedInclusiveCost(value) {
    this._summedInclusiveCost = value;
  }

  getSubCallById(id) {
    return this._subCalls[id] || null;
  }

  hasSubCallById(id) {
    return !!this._subCalls[id];
  }

  getCalledFromById(id) {
    return this._calledFrom[id] || null;
  }

  hasCalledFromById(id) {
    return !!this._calledFrom[id];
  }

}

exports.Node = Node;