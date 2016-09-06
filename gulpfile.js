'use strict';

const argv = require('yargs').argv;
const config = require('./config');
const gulp = require('gulp');
const htmlPrettify = require('gulp-html-prettify');
const inlineCss = require('gulp-inline-css');
const litmus = require('gulp-litmus');
const open = require('gulp-open');
const rename = require('gulp-rename');
const replace = require('gulp-replace');
const runSequence = require('run-sequence');
const template = require('gulp-template');
const wrap = require('gulp-wrap');

/*
	Base Tasks
*/

// setting up base
gulp.task('base-styles', function() {
	return gulp.src('src/base/src.css', { base: "./" })
		.pipe(template(config))
		.pipe(rename({basename: 'base'}))
        .pipe(gulp.dest('.'))
})

// inline css styles in base
gulp.task('base-inline', function() {
	return gulp.src('src/base/src.html', { base: "./" })
		.pipe(inlineCss())
		.pipe(rename({basename: 'base'}))
		.pipe(gulp.dest('.'))
})

// add custom includes for wrapping
gulp.task('base-finalize', function() {
	return gulp.src('src/base/base.html', {base: "./"})
		.pipe(replace('<component-include>', '<%= contents %>'))
		.pipe(gulp.dest('.'))
})

// group base tasks
gulp.task('base', function() {
	runSequence('base-styles', 'base-inline', 'base-finalize');
});

/*
	Component Tasks
*/

// Update and process components
gulp.task('component-update', function() {
	return gulp.src('src/components/**/src.html', { base: './' })

	// wrap in base styles and markup
	.pipe(wrap({ src: 'src/base/base.html'}))

	// inline CSS
	.pipe(inlineCss())

	// prettify HTML
	.pipe(htmlPrettify({indent_char: ' ', indent_size: 4}))

	// rename file to test
	.pipe(rename({basename: 'test'}))

	// move file to same location
	.pipe(gulp.dest('.'))
});

// Create new component by passing flag in
gulp.task('new', function() {
	// check if component name is valid
	if (!argv.name) {
		console.error('Need proper name. Try again using: gulp new --name [component-name]')
	}

	// create the component
	else if (argv.name) {
		console.log(`Creating new component: ${argv.name}`);
		gulp.src('src/components/component-template.html')
			.pipe(rename({basename: 'src'}))
			.pipe(gulp.dest(`src/components/${argv.name}`));
		gulp.src('src/components/styles-template.css')
			.pipe(rename({basename: 'styles'}))
			.pipe(gulp.dest(`src/components/${argv.name}`));
	}
});

/*
	Testing Post Processing
*/

// litmus testing
var litmusConfig = {
    username: 'phillipchan1@gmail.com',
    password: 'thebible',
    url: 'https://phillipchan1.litmus.com',
    applications: [
        'chromeaolonline',
        'appmail8',
        'gmailnew',
        'ffgmailnew',
        'chromegmailnew',
        'iphone4s',
        'iphone5'
    ]
}

gulp.task('test', function () {

	console.log(argv.name);
	// check if component name is valid
	if (!argv.name) {
		console.error('Need proper name. Try again using: gulp new --name [component-name]')
	}

	else {
		console.log(`Testing src/components/${argv.name}/test.html`)
		gulp.src(`src/components/${argv.name}/test.html`)
        .pipe(litmus(litmusConfig))
	}

	runSequence('openLitmus');
    
});

gulp.task('openLitmus', function() {
	gulp.src('index.html')
  	.pipe(open({uri: 'https://litmus.com/checklist'}));
});

/*
	File Watcher
*/
gulp.task('watch', function() {
	gulp.watch('src/**/src.html', function(callback) {
		runSequence(
			'base',
			'component-update'
		);
	} ['component-update']);

	gulp.watch(
		[
			'config.js',
			'src/base/src.css'
		], function(callback) {
			runSequence(
				'base'
			);
	})

	gulp.watch(
		[
			'src/components/**/*.css'
		], function(callback) {
			runSequence(
				'component-update'
			);
	})
});


/*
	Default Task
*/ 

gulp.task('default', function(callback) {
	runSequence(
		'base',
		'component-update'
		// 'watch'
	)
});