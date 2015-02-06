var gulp = require('gulp');
var sourcemaps = require('gulp-sourcemaps');
var to5 = require('gulp-6to5');
var concat = require('gulp-concat');
var less = require('gulp-less');
var path = require('path');
var plumber = require('gulp-plumber');

var LessPluginCleanCSS = require("less-plugin-clean-css"),
    cleancss = new LessPluginCleanCSS({advanced: true});

var LessPluginAutoPrefix = require('less-plugin-autoprefix'),
    autoprefix= new LessPluginAutoPrefix({browsers: ["last 2 versions"]});

var lessFiles = 'src/**/*.less';
var es6Files = 'src/**/*.js';

gulp.task('es6', function () {
    return gulp.src(es6Files)
        .pipe(plumber())
        .pipe(sourcemaps.init())
        .pipe(to5())
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('dist'));
});


gulp.task('less', function () {
    gulp.src(lessFiles)
        .pipe(plumber())
        .pipe(sourcemaps.init())
        .pipe(less({
            plugins: [autoprefix, cleancss]/*,
            paths: [ path.join(__dirname, 'less', 'includes') ]*/
        }))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('dist'));
});

gulp.task('watch', function() {
    gulp.watch(es6Files, ['es6']);
    gulp.watch(lessFiles, ['less']);
});

gulp.task('default', ['watch', 'es6', 'less']);
