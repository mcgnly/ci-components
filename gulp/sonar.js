var gulp = require('gulp');
var sonar = require('gulp-sonar');

gulp.task('sonar', function () {
    var options = {
        sonar: {
            host: {
                url: 'http://172.31.17.156:9000/'
            },
            jdbc: {
                url: 'jdbc:mysql://localhost:3306/sonar',
                username: 'sonarqube',
                password: 'sonarqube'
            },
            projectKey: 'sonar:millio-widgets:1.0.0',
            projectName: 'Millo widgets',
            projectVersion: '1.0.0',

            // comma-delimited string of source directories
            sources: 'src',
            language: 'js',
            sourceEncoding: 'UTF-8',
            exclusions: 'src/App.js, src/index.js, src/config/**',
            javascript: {
                lcov: {
                    reportPath: 'coverage/lcov.info'
                }
            },
            exec: {
                // All these properties will be send to the child_process.exec method (see: https://nodejs.org/api/child_process.html#child_process_child_process_exec_command_options_callback )
                // Increase the amount of data allowed on stdout or stderr (if this value is exceeded then the child process is killed, and the gulp-sonar will fail).
                maxBuffer : 1024*1024
            }
        }
    };

    // gulp source doesn't matter, all files are referenced in options object above
    return gulp.src('thisFileDoesNotExist.js', { read: false })
        .pipe(sonar(options));
});
