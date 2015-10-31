var gulp = require('gulp');
var babel = require('gulp-babel');
var concat = require('gulp-concat');
var less = require('gulp-less');


gulp.task('buildClientJs', function () {
	return gulp.src(['js/services/**/*.js', 'js/Client.js'])
		.pipe(babel())
		.pipe(concat('thingkit-client.min.js'))
		.pipe(gulp.dest('public/js'));
});

gulp.task('buildAdminJs', function () {
	return gulp.src(['js/controllers/**/*.js', 'js/services/**/*.js', 'js/Admin.js'])
		.pipe(babel())
		.pipe(concat('thingkit.min.js'))
		.pipe(gulp.dest('public/js'));
});

gulp.task('buildAdminCss', function () {
	return gulp.src(['styles/**/*.less'])
		.pipe(less())
		.pipe(concat('thingkit.min.css'))
		.pipe(gulp.dest('public/css'));
});

gulp.task('default', ['buildAdminJs', 'buildAdminCss', 'buildClientJs']);

gulp.task('develop', ['default'], function () {
	gulp.watch('js/**/*.js', ['buildAdminJs', 'buildClientJs']);
	gulp.watch('styles/**/*.less', ['buildAdminCss']);
});
