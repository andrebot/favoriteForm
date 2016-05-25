'use strict';

const config = require('../../config');
const gulp   = require('gulp');

gulp.task('copy:index', function () {
  return gulp.src(config.indexLibPath)
          .pipe(gulp.dest(config.distFolder));
});
