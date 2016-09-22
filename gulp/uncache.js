var gulp = require('gulp');
var rename = require('gulp-rename');
var uncache = require('gulp-uncache');

gulp.task('uncache:prod', ['webpack:prod'], function () {
    return gulp.src('./index.template.html')
		.pipe(uncache({
            append: 'hash',
            rename: true,
            srcDir: 'dist',
            distDir: 'dist'
		}))
        .pipe(rename('index.html'))
		.pipe(gulp.dest('dist'));
});


gulp.task('uncache:local', ['webpack:local'], function () {
    return gulp.src('./index.template.html')
		.pipe(uncache({
            rename: false,
            srcDir: 'dist',
            distDir: 'dist'
		}))
        .pipe(rename('index.html'))
		.pipe(gulp.dest('dist/'));
});
