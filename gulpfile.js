const gulp = require('gulp');
const browserSync = require('browser-sync').create();
const sass = require('gulp-sass');
const concat = require('gulp-concat');
const es = require('event-stream');
const prefix = require('gulp-autoprefixer');
const minify = require('gulp-minify-css');

gulp.task('default', function(){
  browserSync.init({
    server: './'
  });
  gulp.watch(['src/*.css', 'src/*.scss'], ['dev']);
  gulp.watch('*.html', browserSync.reload);
});

gulp.task('dev', function () {
  var scss = gulp.src('src/*.scss')
    .pipe(sass());

  const css = gulp.src('src/*.css');

  es.merge(scss, css)
  .pipe(concat('style.min.css'))
  .pipe(prefix())
  .pipe(gulp.dest('src/build'))
  .pipe(browserSync.reload({stream: true}));
});

gulp.task('publish', function () {
  var scss = gulp.src('src/*.scss')
    .pipe(sass());

  const css = gulp.src('src/*.css');

  es.merge(scss, css)
  .pipe(concat('style.min.css'))
  .pipe(prefix())
  .pipe(minify())
  .pipe(gulp.dest('src/build'));
});