'use strict';

const gulp = require('gulp');
const runSequence = require('run-sequence');
const wrap = require('gulp-wrap');
const rename = require('gulp-rename');
const htmlPrettify = require('gulp-html-prettify');
const argv = require('yargs').argv;
const file = require('gulp-file');
const livereload = require('gulp-livereload');

// wrap components in base styles
gulp.task('component-update', function() {
	return gulp.src('src/**/src.html', { base: "./" })
	.pipe(wrap({ src: 'src/base/base.html'}))
	.pipe(htmlPrettify({indent_char: ' ', indent_size: 4}))
	.pipe(rename({basename: 'test'}))
	.pipe(gulp.dest('.'))
	.pipe(livereload({
		reloadPage: './test.html'
	}));
});

// creating new components - NOT DONE
gulp.task('new-component', function() {
	console.log(argv.name);
	return gulp.src('')
		.pipe(file(`${argv.name}.html`))
		.pipe(gulp.dest(`src/components/${argv.name}/`));
});

// watching for file changes
gulp.task('watch', function() {
	gulp.watch('src/**/src.html', ['component-update']);
});

// our default task
gulp.task('default', function(callback) {
	runSequence(
		'component-update',
		'watch'
	)
});