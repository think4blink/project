'use strict';

var gulp = require('gulp'); // сам галп
var sass = require('gulp-sass'); // сасс
var gcmq = require('gulp-group-css-media-queries'); // объединяет @media
var rigger = require('gulp-rigger'); //работа с инклюдами в html и js
var rimraf = require('rimraf'); // ебенит всё к хуям
var browserSync = require('browser-sync'); // недосервер
var reload = browserSync.reload;

var config = {
   server: {
      baseDir: './dist/',
      index : 'index.html'
   },
   tunnel: false,
   host: 'localhost',
   port: 9000,
   logPrefix: 'Artemiy!'
};
gulp.task('webserver', function () {
	browserSync(config);
});

gulp.task('clean', function (cb) {
    rimraf('./dist/', cb);
});

gulp.task('sass', function() {
	gulp.src('src/scss/[^_]*.scss')
		.pipe(sass())
		.pipe(gcmq())
		.pipe(gulp.dest('dist/css'))
		.pipe(reload({stream: true}));
});
gulp.task('html', function() {
	gulp.src(['src/*.html', 'src/templates/*.html'])
		.pipe(rigger())
		.pipe(gulp.dest('dist'))
		.pipe(reload({stream: true}));
});
gulp.task('js', function() {
	gulp.src('src/js/*.js')
		.pipe(gulp.dest('dist/js'))
		.pipe(reload({stream: true}));
});
gulp.task('fonts', function() {
	gulp.src('src/fonts/*.*')
		.pipe(gulp.dest('dist/fonts'))
		.pipe(reload({stream: true}));
});

gulp.task('watch', function() {
	gulp.watch('src/scss/[^_]*.scss', function() {
		gulp.start('sass')
	});
	gulp.watch(['src/*.html', 'src/templates/*.html'], function() {
		gulp.start('html')
	});
	gulp.watch('src/js/*.js', function() {
		gulp.start('js')
	});
});


gulp.task('deploy', ['sass', 'html', 'js', 'fonts']);
gulp.task('default', ['webserver', 'watch']);
