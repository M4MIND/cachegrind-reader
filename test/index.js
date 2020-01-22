import {Cachegrinder} from "../index"

let path = require('path')

Cachegrinder.read(path.join(__dirname, 'data', 'minify.txt')).then(data => {})