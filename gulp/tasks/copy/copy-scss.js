'use strict';

const config = require('../../config');
const gulp   = require('gulp');

gulp.task('copy:scss', function () {
  return gulp.src(config.angularSCSSPath)
          .pipe(gulp.dest(`${config.assetsPath}/style`));
});
