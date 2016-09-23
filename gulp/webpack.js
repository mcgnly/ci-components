var gulp = require('gulp');
var webpack = require('webpack-stream');
var webpackProd = require('../webpack.prod.config.js');
var webpackExample = require('../webpack.example.config.js');
var webpackDev = require('../webpack.local.config.js');

gulp.task('webpack:prod', function() {
  return gulp.src('src/index.js')
    .pipe(webpack(webpackProd))
    .pipe(gulp.dest('dist/js'));
});

gulp.task('webpack:example', function() {
  return gulp.src('exmaple/index.js')
    .pipe(webpack(webpackExample))
    .pipe(gulp.dest('dist/js'));
});

gulp.task('webpack:local', function() {
  return gulp.src('src/index.js')
    .pipe(webpack(webpackDev))
    .pipe(gulp.dest('dist/'));
});
