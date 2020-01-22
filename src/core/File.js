export class File {
	constructor(id) {
		this._id = id;
		this._name = null;
	}

	get id() {
		return this._id
	}

	set id(value) {
		this._id = value
	}

	get name() {
		return this._name
	}

	set name(value) {
		this._name = value
	}
}