'use strict';

const config = require('../../config');
const ngAnnotate = require('gulp-ng-annotate');
const concat = require('gulp-concat');
const gulp   = require('gulp');

gulp.task('build:js', function () {
  return gulp.src([config.jsFirstPath, config.jsPath])
          .pipe(concat('app.js'))
          .pipe(ngAnnotate())
          .pipe(gulp.dest(config.distFolder));
});
