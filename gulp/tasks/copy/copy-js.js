'use strict';

const config  = require('../../config');
const flatten = require('gulp-flatten');
const gulp    = require('gulp');

gulp.task('copy:js', function () {
  return gulp.src(config.jsLibPath)
          .pipe(flatten())
          .pipe(gulp.dest(`${config.distFolder}/lib/js`));
});
