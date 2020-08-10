const gulp = require('gulp');
const browserSync = require('browser-sync').create();
const sass = require('gulp-sass');
const concat = require('gulp-concat');
const es = require('event-stream');
const prefix = require('gulp-autoprefixer');
const minify = require('gulp-clean-css');

gulp.task('default', function(cb){
  browserSync.init({
    server: './'
  });
  gulp.watch(['src/css/*.css', 'src/css/*.scss'], gulp.series('dev'));
  gulp.watch(['*.html', 'src/*.js'], browserSync.reload);
  cb();
});

gulp.task('dev', function (done) {
  var scss = gulp.src('src/css/*.scss')
    .pipe(sass().on('error', sass.logError));

  const css = gulp.src('src/css/*.css');

  es.merge(scss, css)
  .pipe(concat('style.min.css'))
  .pipe(prefix())
  .pipe(gulp.dest('build'))
  .pipe(browserSync.reload({stream: true}));
  done();
});

gulp.task('publish', function (done) {
  var scss = gulp.src('src/css/*.scss')
    .pipe(sass().on('error', sass.logError));

  const css = gulp.src('src/css/*.css');

  es.merge(scss, css)
  .pipe(concat('style.min.css'))
  .pipe(prefix())
  .pipe(minify())
  .pipe(gulp.dest('build'));
  done();
});