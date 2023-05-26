const gulp = require('gulp')
const browserSync = require('browser-sync').create()
const autoPrefixer = require('gulp-autoprefixer')
const clean = require('gulp-clean')
const cleanCss = require('gulp-clean-css')
const concat = require('gulp-concat')
const imageMin = require('gulp-imagemin')
const jsMinify = require('gulp-minify')
const sass = require('gulp-sass')(require('sass'))
const uglify = require('gulp-uglify')
const watch = require('gulp-watch')

function distBuild(){
  return gulp.src('*.html')
  .pipe(gulp.dest('dist'))
  .pipe(browserSync.stream())
}

function sassBuild(){
  return gulp.src('src/scss/*.scss')
  .pipe(sass())
  .pipe(autoPrefixer())
  .pipe(cleanCss())
  .pipe(concat('styles.min.css'))
  .pipe(gulp.dest('dist/css'))
  .pipe(browserSync.stream())
}

function jsBuild(){
  return gulp.src('src/js/*')
  .pipe(uglify())
  .pipe(concat('scripts.min.js'))
  .pipe(gulp.dest('dist/js'))
  .pipe(browserSync.stream())
}

function imgBuild(){
  return gulp.src('src/img/*')
  .pipe(imageMin())
  .pipe(gulp.dest('dist/img'))
  .pipe(browserSync.stream())
}

function watchFiles(){

  browserSync.init({
    server: {
      baseDir: 'dist/'
    }
  });

  gulp.watch('src/scss/**/*', sassBuild).on('change', browserSync.reload)
  gulp.watch('src/js/**/*', jsBuild).on('change', browserSync.reload)
  gulp.watch('src/img/**/*', imgBuild).on('change', browserSync.reload)
  gulp.watch('*.html', distBuild).on('change', browserSync.reload)
}

gulp.task('dev', watchFiles)
gulp.task('build', gulp.series( sassBuild, jsBuild, imgBuild))

exports.distBuild=distBuild;
exports.sassBuild=sassBuild;
exports.jsBuild=jsBuild;
exports.imgBuild=imgBuild;
exports.watchFiles=watchFiles;




