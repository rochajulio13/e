const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const soucermaps = require('gulp-sourcemaps');
const uglify = require('gulp-uglify');
const obfuscate = require('gulp-obfuscate');
const imagemin = require('gulp-imagemin');

function comprimeImage (){
    return gulp.src('./source/images/*')
    .pipe(imagemin())
    .pipe(gulp.dest('./build/images'))
}

function comprimeJava (){
    return gulp.src('./source/scripitis/*.js')
    .pipe(uglify())
    .pipe(obfuscate())
    .pipe(gulp.dest('./build/scripitis'))

}


function compilaSass (){
    return gulp.src('./source/styles/main.scss')
    .pipe(soucermaps.init())
    .pipe(sass({
        outputStyle:('compressed')
    }))
    .pipe(soucermaps.write('./maps'))
    .pipe(gulp.dest('./build/styles'));
}


exports.default = function() {
    gulp.watch('./source/styles/*.scss',{ignoreInitial: false}, gulp.series(compilaSass))
    gulp.watch('./source/scripitis/*.js',{ignoreInitial: false}, gulp.series(comprimeJava))
    gulp.watch('./source/images/*',{ignoreInitial: false}, gulp.series(comprimeImage))
}
