var gulp = require('gulp');
var webpack = require('webpack-stream');
var webpackProd = require('../webpack.prod.config.js');
var webpackDev = require('../webpack.local.config.js');

gulp.task('webpack:prod', function() {
  return gulp.src('src/index.js')
    .pipe(webpack(webpackProd))
    .pipe(gulp.dest('dist/js'));
});

gulp.task('webpack:local', function() {
  return gulp.src('src/index.js')
    .pipe(webpack(webpackDev))
    .pipe(gulp.dest('dist/'));
});
