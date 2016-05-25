'use strict';

const runSequence = require('run-sequence');
const config      = require('../../config');
const gulp        = require('gulp');

gulp.task('watch', function () {
  gulp.watch(config.jsPath, ['build:js']);

  gulp.watch('./sass/**/*.scss', ['build:css']);
});
