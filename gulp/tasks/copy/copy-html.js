'use strict';

const config  = require('../../config');
const flatten = require('gulp-flatten');
const gulp    = require('gulp');

gulp.task('copy:html', function () {
  return gulp.src(config.htmlPath)
          .pipe(flatten())
          .pipe(gulp.dest(`${config.distFolder}/views`));
});
