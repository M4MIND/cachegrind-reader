export class Call {
	constructor(line, node) {
		this._line = line
		this._node = node
		this._cost = 0
		this._callCount = 0
	}

	get cost() {
		return this._cost
	}

	set cost(value) {
		this._cost = value
	}

	get callCount() {
		return this._callCount
	}

	set callCount(value) {
		this._callCount = value
	}

	get line() {
		return this._line
	}

	set line(value) {
		this._line = value
	}

	get node() {
		return this._node
	}

	set node(value) {
		this._node = value
	}
}