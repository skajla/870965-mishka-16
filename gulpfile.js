"use strict";

var gulp = require("gulp");
var plumber = require("gulp-plumber");
var sourcemap = require("gulp-sourcemaps");
var less = require("gulp-less");
var postcss = require("gulp-postcss");
var autoprefixer = require("autoprefixer");
var server = require("browser-sync").create();

gulp.task("css", function () {
  return gulp.src("source/less/style.less")
    .pipe(plumber())
    .pipe(sourcemap.init())
    .pipe(less())
    .pipe(postcss([
      autoprefixer()
    ]))
    .pipe(sourcemap.write("."))
    .pipe(gulp.dest("source/css"))
    .pipe(server.stream());
});

gulp.task("server", function () {
  server.init({
    server: "source/",
    notify: false,
    open: true,
    cors: true,
    ui: false
  });

  gulp.watch("source/less/**/*.less", gulp.series("css"));
  gulp.watch("source/*.html").on("change", server.reload);
});

gulp.task("start", gulp.series("css", "server"));




// var gulp = require('gulp');
// var imagemin = require('gulp-imagemin');
// var cheerio = require('gulp-cheerio');

// gulp.task('images', function() {
//   return gulp.src('source/img/**/*.{jpg,svg}')
//     .pipe(imagemin([
//       imagemin.jpegtran({progressive: true}),
//       imagemin.svgo()
//     ]))
//     .pipe(cheerio({
//       run: function ($) {
//         $('[fill]').removeAttr('fill');
//         $('[stroke]').removeAttr('stroke');
//         $('[style]').removeAttr('style');
//       },
//       parserOptions: {xmlMode: true}
//     }))
//     .pipe(gulp.dest('source/img'));
// });



var gulp = require('gulp');
var imagemin = require('gulp-imagemin');

gulp.task('images', function() {
  return gulp.src('source/img/**/*.{jpg,svg}')
    .pipe(imagemin([
      imagemin.jpegtran({progressive: true}),
      imagemin.svgo()
    ]))
    .pipe(gulp.dest('source/img'));
});



var gulp = require('gulp');
var cheerio = require('gulp-cheerio');
var replace = require('gulp-replace');

gulp.task('fillDelete', function() {
  return gulp.src('source/img/icon-*.svg')
    .pipe(cheerio({
      run: function ($) {
        $('[fill]').removeAttr('fill');
        $('[stroke]').removeAttr('stroke');
        $('[style]').removeAttr('style');
      },
      parserOptions: {xmlMode: true}
    }))
    .pipe(replace('&gt;', '>'))
    .pipe(gulp.dest('source/img'));
});






var gulp = require("gulp");
var rename = require("gulp-rename");
var svgstore = require("gulp-svgstore");

gulp.task("sprite", function () {
  return gulp.src("source/img/icon-*.svg")
    .pipe(svgstore({
      inlineSvg: true
    }))
    .pipe(rename("sprite.svg"))
    .pipe(gulp.dest("source/img/"));
});




var gulp = require('gulp');
var svgFill = require('gulp-svg-fill');

gulp.task('colorSvgs', function() {
  return gulp.src('source/img/icon-feature-*.svg')
    .pipe(svgFill({
      colors: {
        'seafoam-blue': '#63d1bb',
      }
    }))
    .pipe(gulp.dest('source/img'));
});
