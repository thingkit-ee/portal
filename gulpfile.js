var gulp = require('gulp');
var babel = require('gulp-babel');
var concat = require('gulp-concat');
var less = require('gulp-less');

gulp.task('buildJs', function () {
	return gulp.src(['js/controllers/**/*.js', 'js/Mocks.js', 'js/Main.js', 'js/services/**/*.js'])
		.pipe(babel())
		.pipe(concat('thingkit.min.js'))
		.pipe(gulp.dest('public/js'));
});

gulp.task('buildCss', function () {
	return gulp.src(['styles/**/*.less'])
		.pipe(less())
		.pipe(concat('thingkit.min.css'))
		.pipe(gulp.dest('public/css'));
});

gulp.task('develop', function () {
	gulp.watch('src/**/*.js', ['buildJs']);
	gulp.watch('styles/**/*.less', ['buildCss']);
});

gulp.task('default', ['buildJs', 'buildCss']);