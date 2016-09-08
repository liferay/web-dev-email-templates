'use strict';

const argv = require('yargs').argv;
const chalk = require('chalk');
const config = require('./config');
const del = require('del');
const gulp = require('gulp');
const htmlPrettify = require('gulp-html-prettify');
const inky = require('inky');
const inlineCss = require('gulp-inline-css');
const litmus = require('gulp-litmus');
const livereload = require('gulp-livereload');
const open = require('gulp-open');
const rename = require('gulp-rename');
const replace = require('gulp-replace');
const removeHtmlComments = require('gulp-remove-html-comments');
const runSequence = require('run-sequence');
const sass = require('gulp-sass');
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
	Global Styles
*/
gulp.task('global-styles', function() {
	return gulp.src('src/styles/*.scss')
		.pipe(sass().on('error', sass.logError))
    	.pipe(gulp.dest('./src/styles'))
    	.pipe(livereload({start: true}))
})

/*
	Component Tasks
*/

// Update and process components 
gulp.task('components-processing', function() {

		// creating a test version to be wrapped in base styles
		gulp.src('src/components/**/src.html', { base: './' })
			// wrap in base styles and markup
			.pipe(wrap({ src: 'src/base/base.html'}))
			// turn inky into regular html
			.pipe(inky())
			// inline CSS
			.pipe(inlineCss())
			// prettify HTML
			.pipe(htmlPrettify({indent_char: ' ', indent_size: 4}))
			// rename file to test
			.pipe(rename({basename: 'test'}))
			// move file to same location
			.pipe(gulp.dest('.'))
			.pipe(livereload({start: true}))

		// create one for distribution
		gulp.src('src/components/**/src.html', { base: './' })
			// turn inky into regular html
			.pipe(inky())
			// remove HTML comments
			.pipe(removeHtmlComments())
			// inline CSS
			.pipe(inlineCss())
			// prettify HTML
			.pipe(htmlPrettify({indent_char: ' ', indent_size: 4}))
			// rename file to test
			.pipe(rename({basename: 'dist'}))
			// move file to same location
			.pipe(gulp.dest('.'))

		return;
});

gulp.task('emails-processing', function() {
	// create one for distribution
	return gulp.src('src/emails/**/src.html', { base: './' })
		// turn inky into regular html
		.pipe(inky())
		// remove HTML comments
		.pipe(removeHtmlComments())
		// inline CSS
		.pipe(inlineCss())
		// prettify HTML
		.pipe(htmlPrettify({indent_char: ' ', indent_size: 4}))
		// rename file to test
		.pipe(rename({basename: 'dist'}))
		// move file to same location
		.pipe(gulp.dest('.'))

		return;
})

// Component CSS Styling
// gulp.task('component-sass', function() {
// 	return gulp.src(['src/**/*.scss', '!src/components/styles-template.scss'], {base: './'})
// 		.pipe(sass().on('error', sass.logError))
//     	.pipe(gulp.dest('.'));
// })

// Create new components and emails
gulp.task('new-component', function() {
	console.log(chalk.bgBlue(`Creating new component: ${argv.component}`));

	gulp.src('src/components/component-template.html')
		.pipe(rename({basename: 'src'}))
		.pipe(gulp.dest(`src/components/${argv.component}`));
	gulp.src('src/components/styles-template.css')
		.pipe(rename({basename: 'main'}))
		.pipe(gulp.dest(`src/components/${argv.component}`))
	gulp.src(`src/components/${argv.component}/test.html`)
		.pipe(livereload({start: true}))
		.pipe(open())

});

gulp.task('new-email', function() {
	console.log(chalk.bgBlue(`Creating new email: ${argv.email}`));

	gulp.src('src/emails/email-template.html')
		.pipe(rename({basename: 'src'}))
		.pipe(gulp.dest(`src/emails/${argv.email}`));
	gulp.src('src/emails/styles-template.css')
		.pipe(rename({basename: 'main'}))
		.pipe(gulp.dest(`src/emails/${argv.email}`))
	gulp.src(`src/emails/${argv.email}/dist.html`)
		// .pipe(livereload({start: true}))
		.pipe(open())
});

gulp.task('new', function() {

	// acceptable flags to pass in this command
	if (argv.component || argv.email) {
		if (argv.component) {
			runSequence('new-component', 'base', 'global-styles', 'components-processing', 'watch' );	
		}

		if (argv.email) {
			runSequence('new-email', 'base', 'global-styles', 'emails-processing', 'watch' );	
		}

	} else {
		console.error(chalk.white.bgRed(`Need to know what you're making. Try using gulp new --email [email name] or gulp new --component [component name]`));
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

gulp.task('litmus', function () {
	// check if component name is valid
	if (!argv.name) {
		console.log(chalk.white.bgRed('Need proper name. Try again using: gulp new --name [component-name]'));
	}

	else {
		console.log(chalk.bgBlue(`Testing src/components/${argv.name}/test.html`));
		gulp.src(`src/components/${argv.name}/test.html`)
        	.pipe(litmus(litmusConfig))

        gulp.src('index.html')
  			.pipe(open({uri: 'https://litmus.com/checklist'}));
	}    
});

/*
	Hubspot Integration
*/

gulp.task('hubspot', function() {
	gulp.src('index.html')
  	.pipe(open({uri: 'https://app.hubspot.com/content/299703/template-builder'}));
});


/*
	File Watcher
*/
gulp.task('watch', function() {
	livereload.listen();

	gulp.watch('src/**/src.html', function(callback) {
		runSequence(
			'base',
			'components-processing',
			'emails-processing'
		);
	});

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
			'src/**/*.scss',
			'src/**/*.css'
		], function(callback) {
			runSequence(
				'global-styles',
				'components-processing',
				'emails-processing'
			);
	})
});


gulp.task('clear-all', function () {
  return del([
    'src/components/**/*',
    '!src/components/*.html',
    '!src/components/*.css',
    'src/emails/**/*',
    '!src/emails/*.html',
    '!src/emails/*.css'
  ]);
});

/*
	Default Task
*/ 

gulp.task('default', function(callback) {
	runSequence(
		'base',
		'global-styles',
		'components-processing',
		'watch'
	)
});