'use strict';

const config = require('../../config');
const jshint = require('gulp-jshint');
const gulp   = require('gulp');

gulp.task('jshint:app', function () {
  return gulp.src(config.jsPath)
          .pipe(jshint())
          .pipe(jshint.reporter('default'))
          .pipe(jshint.reporter('fail'));
});
