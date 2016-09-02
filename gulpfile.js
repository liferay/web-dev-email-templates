'use strict';

const argv = require('yargs').argv;
const config = require('./config');
const dust = require('gulp-dust');
const file = require('gulp-file');
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


//testing
const email = require('gulp-email');


// wrap components in base styles
gulp.task('component-update', function() {
	return gulp.src('src/components/**/src.html', { base: "./" })
	.pipe(wrap({ src: 'src/base/base.html'}))
	.pipe(inlineCss())
	.pipe(htmlPrettify({indent_char: ' ', indent_size: 4}))
	.pipe(rename({basename: 'test'}))
	.pipe(gulp.dest('.'))
});

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

gulp.task('base-inline', function() {
	return gulp.src('src/base/src.html', { base: "./" })
		.pipe(inlineCss())
		.pipe(rename({basename: 'base'}))
		.pipe(gulp.dest('.'))
})

gulp.task('base-finalize', function() {
	return gulp.src('src/base/base.html', {base: "./"})
		.pipe(replace('<component-include>', '<%= contents %>'))
		.pipe(gulp.dest('.'))
})

gulp.task('base', function() {
	runSequence('base-styles', 'base-inline', 'base-finalize');
});

/*
	Component Tasks
*/

// creating new components - NOT DONE
gulp.task('new-component', function() {
	console.log(argv.name);
	return gulp.src('')
		.pipe(file(`${argv.name}.html`))
		.pipe(gulp.dest(`src/components/${argv.name}/`));
});

gulp.task('inline', function() {
	return gulp.src('src/components/button/src.html')
		.pipe(inlineCss())
		.pipe(gulp.dest('.'))
});

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

gulp.task('litmus', function () {
    return gulp.src('src/components/button/test.html')
        .pipe(litmus(litmusConfig))
});

gulp.task('openLitmus', function() {
	gulp.src('index.html')
  	.pipe(open({uri: 'https://litmus.com/builder'}));
});

// watching for file changes
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

// send email test
gulp.task('email', function () {
        return gulp.src(['something.html'])
            .pipe(email({
            	user: 'api:key-62dec20c13e1bf28895149f176da2008',
		        url: 'https://api.mailgun.net/v3/app33cb5bbe4d1748cab70db2fdca20d8be.mailgun.org',
		        form: {
		            from: 'John Doe <John.Doe@gmail.com>',
		            to: 'phillipchan1.runme@previews.emailonacid.com',
		            subject: 'Email Test'
		        }
            }));
    });

// our default task
gulp.task('default', function(callback) {
	runSequence(
		'base',
		'component-update'
		// 'watch'
	)
});