const requireDir  = require('require-dir');
const runSequence = require('run-sequence');
const gulp        = require('gulp');

//requiring all tasks from gulp folder
requireDir( './gulp/tasks', { recurse: true } );

gulp.task('build', function (cb) {
  runSequence( ['clean:dist', 'jshint:app'],
               ['copy:js',
                'copy:scss',
                'copy:index',
                'copy:html',
                'copy:imgs',
                'build:js',
                'build:css'
               ], cb);
});

gulp.task('run', function (cb) {
  runSequence(['build'], ['webserver', 'watch']);
});

gulp.task('default', function (cb) {
  runSequence(['build'], ['webserver']);
});
