export class Callable {
	constructor(id, fn, line, ownTime) {
		this.id = id;
		this.fn = fn;
		this.line = line;
		this.ownTime = ownTime;
		this.time = ownTime;
		this._calls = 0;
		this.subCalls = {};
	}

	get id() {
		return this._id
	}

	set id(value) {
		this._id = parseInt(value)
	}

	get fn() {
		return this._fn
	}

	set fn(value) {
		this._fn = value
	}

	get line() {
		return this._line
	}

	set line(value) {
		this._line = parseInt(value);
	}

	get ownTime() {
		return this._ownTime
	}

	set ownTime(value) {
		this._ownTime = parseInt(value);
	}

	get time() {
		return this._time
	}

	set time(value) {
		this._time = parseInt(value);
	}

	setSubCall(callable) {
		this.subCalls[callable.id] = callable;
	}
	hasSubCall(id) {
		return !!this[id];
	}

	get calls() {
		return this._calls
	}

	set calls(value) {
		this._calls = value
	}
}