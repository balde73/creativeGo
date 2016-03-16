var gulp = require('gulp');
var uglify = require('gulp-uglify');
var rename = require("gulp-rename");
var cssnano = require('gulp-cssnano');

gulp.task('min', ['compress','minify-css']);
gulp.task('compress', function() {
  return gulp.src('script/*.js')
    .pipe(uglify().on('error', function(e){
            console.log(e);
         }))
    .pipe(rename(function (path) {
	    path.dirname += "";
	    path.basename += ".min";
	    path.extname = ".js"
	  }))
    .pipe(gulp.dest('dist'));
});

gulp.task('minify-css', function() {
  return gulp.src('css/*.css')
    .pipe(cssnano())
    .pipe(rename(function (path) {
	    path.dirname += "";
	    path.basename += ".min";
	    path.extname = ".css"
	  }))
    .pipe(gulp.dest('dist'));
});