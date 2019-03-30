const gulp = require('gulp');
const less = require('gulp-less');
const cssmin = require('gulp-clean-css');
const rename = require('gulp-rename');
const imagemin = require('gulp-imagemin');


const imgFiles = [
    `../src/static/*.{png,jpg,gif,ico}`,
  ];
gulp.task('compile-image', ()=> {
    return gulp
    .src(imgFiles)
    .pipe(imagemin())
    .pipe(gulp.dest('../dist/static'));
});

gulp.task('compile-css', () => {
    return gulp.src(['../src/**/*.less', '!../src/**/_*.less'])
        .pipe(less())
        .pipe(cssmin())
        .pipe(rename((path) => {
            path.extname = '.wxss';
        }))
        .pipe(gulp.dest('../dist/'));
});

gulp.task('compile-js', () => {
    return gulp.src(['../src/**/*.js'])
        .pipe(gulp.dest('../dist/'));
});


gulp.task('compile-json', () => {
    return gulp.src(['../src/**/*.json'])
        .pipe(gulp.dest('../dist/'));
});

gulp.task('compile-wxml', () => {
    return gulp.src(['../src/**/*.wxml'])
        .pipe(gulp.dest('../dist/'));
});

gulp.task('auto', () => {
    gulp.watch('../src/**/*.less', ['compile-css']);
    gulp.watch('../src/**/*.js', ['compile-js']);
    gulp.watch('../src/**/*.json', ['compile-json']);
    gulp.watch('../src/**/*.wxml', ['compile-wxml']);
    gulp.watch('../src/static/*.{png,jpg,gif,ico}', ['compile-image']);
});

gulp.task('default', ['compile-css', 'compile-js', 'compile-json', 'compile-wxml', 'compile-image','auto']);