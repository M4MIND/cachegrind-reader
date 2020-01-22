let gulp = require('gulp');
let {watch, task} = require('gulp');
let babel = require('gulp-babel');
let clean = require('gulp-clean');
let cached = require('gulp-cached');
let fs = require('fs');

let path = {
	src: {
		backend: ['./src/**/*.js'],
		json: ['./src/**/*.json'],
	},
	dist: {
		backendOut: ['./dist/'],
		jsonOut: ['./dist/'],
		dist: ['./dist/']
	},
	test: {
		backend: ['./test/**.js']
	},
};

task('npm-run-test', () => {

});

task('compile-src', () => {
	return gulp.src(path.src.backend)
		.pipe(cached('backend'))
		.pipe(babel())
		.pipe(gulp.dest(path.dist.backendOut));
});

task('copy-json', () => {
	return gulp.src(path.src.json).pipe(gulp.dest(path.dist.jsonOut));
});

task('dist-clean', gulp.parallel(() => {
	if (!fs.existsSync('./dist/')) {
		fs.mkdirSync('dist');
	}

	return gulp.src(path.dist.dist, {read: false})
		.pipe(clean());
}));

task('watch-dev', gulp.parallel(() => {
	watch(path.src.backend, gulp.series('compile-src'));
}));

task('watch-test', gulp.parallel(() => {
	watch(path.test.backend)
}));

task('dev', gulp.series('dist-clean', 'compile-src', gulp.parallel('watch-dev')));