const gulp = require('gulp');
const babel = require('gulp-babel');
var SRC_PATH = 'src/';
var jsFiles = SRC_PATH + '*/*.js';

gulp.task('babel', () => {
    gulp.src(jsFiles)
    .pipe(babel())
    .pipe(gulp.dest('lib'));
});
