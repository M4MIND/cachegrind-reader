import {Cachegrinder} from "../index"

let path = require('path')

Cachegrinder.read('./test/data/data.txt').then(data => {
	console.dir(data.getCallable(2846));
}).catch(err => {
	console.dir(err);
})