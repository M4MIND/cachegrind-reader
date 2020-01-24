export class Collection {
	constructor() {
		this._callable = []
	}

	get callable() {
		return this._callable
	}

	set callable(value) {
		this._callable = value
	}

	getCallable(id) {
		return this.callable[parseInt(id) - 1];
	}

	hasCallable(id) {
		return !!this.callable[parseInt(id) - 1];
	}

	setCallable(callable) {
		this.callable.push(callable);
	}
}