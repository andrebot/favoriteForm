'use strict';

const config = require('../../config');
const sass   = require('gulp-sass');
const concat = require('gulp-concat');
const gulp   = require('gulp');

gulp.task('build:css', function () {
  return gulp.src([config.scssPath])
          .pipe(concat('app.css'))
          .pipe(sass().on('error', sass.logError))
          .pipe(gulp.dest(`${config.distFolder}`));
});
