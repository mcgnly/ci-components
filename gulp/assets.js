var gulp = require('gulp');
var path = require('path');

gulp.task('assets', function () {
  gulp.src(['./node_modules/relayr-ci/assets/**/*.{eot,ttf,woff,otf,eof,svg,png}', './styles/assets/*.{eot,ttf,woff,otf,eof,svg,png}'])
  .pipe(gulp.dest('./dist/assets'));
});
