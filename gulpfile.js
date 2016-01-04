var postcss = require('gulp-postcss');
var ext_replace = require('gulp-ext-replace');
var gulp = require('gulp');

gulp.task('default', ['css'], function() {
  var watcher = gulp.watch('./frontend/styles/*.scss', ['css']);
});


gulp.task('css', function () {
  var processors = [
    require("postcss-import")(),
    require("postcss-url")(),
    require("postcss-cssnext")(),
    require("postcss-browser-reporter")(),
    require("postcss-reporter")(),
    require('precss')
  ];
  return gulp.src('./frontend/styles/*.scss')
    .pipe(postcss(processors))
    .pipe(ext_replace('.css'))
    .pipe(gulp.dest('./public/styles'));
});