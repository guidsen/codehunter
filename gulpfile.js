var gulp = require('gulp');

require("babel/polyfill");
var babelify = require('babelify');
var brfs = require('brfs');
var browserify = require('browserify');
var bytes = require('bytes');
var chalk = require('chalk');
var connect = require('gulp-connect');
var eslint = require('gulp-eslint');
var gutil = require('gulp-util');
var less = require('gulp-less');
var merge = require('merge-stream');
var plumber = require('gulp-plumber');
var shell = require('gulp-shell');
var source = require('vinyl-source-stream');
var watchify = require('watchify');
var xtend = require('xtend');

function doBundle (target, name, dest) {
    return target.bundle()
        .on('error', function(err) {
            var parts = err.message.split('.js: ');
            var br = '\n           ';
            var msg = parts.length === 2 ? chalk.red('Browserify Error in ') + chalk.red.underline(parts[0] + '.js') + br + parts[1] : chalk.red('Browserify Error:') + br + err.message;
            gutil.log(msg);
        })
        .pipe(source(name))
        .pipe(gulp.dest(dest))
        .pipe(connect.reload());
}

function watchBundle (bundle, name, dest) {
    return watchify(bundle)
        .on('log', function (message) {
            message = message.replace(/(\d+) bytes/, function() {
                return bytes.format(Number(arguments[1]));
            });
            gutil.log(chalk.grey(message));
        })
        .on('time', function (time) {
            gutil.log(chalk.green('Application built in ' + (Math.round(time / 10) / 100) + 's'));
        })
        .on('update', function (ids) {
            var changed = ids.map(function (x) {
                return chalk.blue(x.replace(__dirname, ''));
            });

            if (changed.length > 1) {
                gutil.log(changed.length + ' scripts updated:\n* ' + changed.join('\n* ') + '\nrebuilding...');
            } else {
                gutil.log(changed[0] + ' updated, rebuilding...');
            }

            doBundle(bundle, name, dest);
        });
}

function buildApp (entries, transforms, name, dest, watch) {
    var opts = xtend(watch && watchify.args, {
        entries: entries,
        debug: true,
        cache: {}, packageCache: {}, fullPaths: true
    });

    var app = browserify(opts)
        .require('react');
    var react = browserify();

    transforms.forEach(function (target) {
        app.transform(target);
    });

    ['react'].forEach(function (pkg) {
        app.exclude(pkg);
        react.require(pkg);
    });

    if (watch) {
        watchBundle(app, name, dest);
    }

    return merge(doBundle(react, 'react.js', dest), doBundle(app, name, dest));
}

function plumb (src, transforms, dest) {
    var stream = gulp.src(src);

    transforms.forEach(function (transform) {
        stream = stream.pipe(transform());
    });

    return stream.pipe(gulp.dest(dest)).pipe(connect.reload());
}

var babelifyTransform = babelify.configure({
    plugins: [require('babel-plugin-object-assign')],
    stage: 0
});

// Build
gulp.task('less', plumb.bind(null, './dist/assets/less/app.less', [less], './build/css'));
gulp.task('scripts', buildApp.bind(null, ['./dist/components/Wrapper.js'], [babelifyTransform, brfs], 'app.js', './build/js'));

gulp.task('build-assets', ['less']);
gulp.task('build', ['build-assets', 'scripts']);
gulp.task('watch', ['build-assets', 'scripts'], function () {
    gulp.watch(['build/css/**/*.less'], ['less-mobile']);
});
gulp.task('lint', function() {
    gulp.src(['./dist/components/*.js'])
        .pipe(eslint())
        .pipe(eslint.format());
});

// Development
gulp.task('serve', function () {
    connect.server({
        root: '.',
        port: 8000,
        livereload: true
    });
});

gulp.task('dev', ['serve', 'watch']);

// Cordova
gulp.task('prepare', ['build'], function () {
    return gulp.src('').pipe(plumber()).pipe(shell(['cordova prepare'], { cwd: __dirname }));
});