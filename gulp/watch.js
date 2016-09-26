var gulp = require('gulp');

var SRC_PATH = 'src/';
var jsFiles = SRC_PATH + '*/*.js';
var stylesheets = 'styles/**/*.less';

gulp.task('watch', function() {
  gulp.watch(
    [
      '!dist/*.js', //exclude dist
      '!dist/**/*.css',
      jsFiles,
      stylesheets
    ],
    ['less', 'assets', 'babel']
  );
});
