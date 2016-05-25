'use strict';

const gulp = require('gulp');
const connect = require('gulp-connect')
 
gulp.task('webserver', function() {
  connect.server({
    root: 'dist',
    livereload: false
  });
});