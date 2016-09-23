var gulp = require('gulp');
var wrench = require('wrench');

wrench.readdirSyncRecursive('./gulp').filter(function (file) {
  return (/\.(js)$/i).test(file);
}).map(function (file) {
    require('./gulp/' + file);
});

gulp.task('build', ['less', 'assets', 'webpack:prod']);
gulp.task('build:example', ['less', 'assets', 'webpack:example', 'uncache:local']);
gulp.task('build:local', ['less', 'assets', 'webpack:local', 'uncache:local']);

gulp.task('default', ['build:local']);
