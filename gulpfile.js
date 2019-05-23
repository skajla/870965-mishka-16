var gulp = require("gulp");
var plumber = require("gulp-plumber");
var sourcemap = require("gulp-sourcemaps");
var rename = require("gulp-rename");
var less = require("gulp-less");
var postcss = require("gulp-postcss");
var autoprefixer = require("autoprefixer");
var server = require("browser-sync").create();

/* CSS: сборка LESS, автопрефиксер, sourcemap и тд и тп */
gulp.task("css", function () {
  return gulp.src("source/less/style.less")
    .pipe(plumber())
    .pipe(sourcemap.init())
    .pipe(less())
    .pipe(postcss([
      autoprefixer()
    ]))
    .pipe(sourcemap.write("."))
    .pipe(gulp.dest("build/css"))
    .pipe(server.stream());
});



/* Локальный сервер */
var gulp = require("gulp");

gulp.task("server", function () {
  server.init({
    server: "build/",
    notify: false,
    open: true,
    cors: true,
    ui: false
  });

  gulp.watch("source/less/**/*.less", gulp.series("css", "refresh"));
  gulp.watch("source/js/**/*.js", gulp.series("jsmin"));
  gulp.watch("source/css/**/*.css", gulp.series("cssmin"));
  gulp.watch("source/img/icon-*.svg", gulp.series("sprite", "html", "refresh"));
  gulp.watch("source/*.html", gulp.series("html", "refresh"));
});

gulp.task("refresh", function(done) {
  server.reload();
  done();
});



/* Минификация CSS */
var gulp = require("gulp");
var csso = require("gulp-csso");

gulp.task("cssmin", function () {
  return gulp.src("build/css/**/*.css")
    .pipe(csso())
    .pipe(rename({suffix: "-min"}))
    .pipe(gulp.dest("build/css"));
});



/* Минификация JS */
var gulp = require("gulp");
var uglify = require("gulp-uglify");

gulp.task("jsmin", function () {
  return gulp.src("build/js/**/*.js")
    .pipe(uglify())
    .pipe(gulp.dest("build/js"));
});



/* Сжатие изображений */
var gulp = require("gulp");
var imagemin = require("gulp-imagemin");

gulp.task("images", function() {
  return gulp.src("source/img/**/*.{jpg,svg}")
    .pipe(imagemin([
      imagemin.jpegtran({progressive: true}),
      imagemin.svgo()
    ]))
    .pipe(gulp.dest("build/img"));
});



/* Конвертация в WEBP */
var gulp = require("gulp");
var webp = require("gulp-webp");

gulp.task("webp", function() {
  return gulp.src("source/img/**/*.{png,jpg}")
    .pipe(webp({quality: 90}))
    .pipe(gulp.dest("build/img"))
});



/* Удаление из SVG атрибутов fill, stoke, style */
var gulp = require("gulp");
var cheerio = require("gulp-cheerio");
var replace = require("gulp-replace");

gulp.task("fillDelete", function() {
  return gulp.src("build/img/icon-*.svg")
    .pipe(cheerio({
      run: function ($) {
        $("[fill]").removeAttr("fill");
        $("[stroke]").removeAttr("stroke");
        $("[style]").removeAttr("style");
      },
      parserOptions: {xmlMode: true}
    }))
    .pipe(replace("&gt;", ">"))
    .pipe(gulp.dest("build/img"));
});



/* Окрашивание SVG */
var gulp = require("gulp");
var svgFill = require("gulp-svg-fill");

gulp.task("colorSvgs", function() {
  return gulp.src("build/img/icon-feature-*.svg")
    .pipe(svgFill({
      colors: {
        "seafoam-blue": "#63d1bb",
      }
    }))
    .pipe(gulp.dest("build/img"));
});



/* Сборка спрайта */
var gulp = require("gulp");
var rename = require("gulp-rename");
var svgstore = require("gulp-svgstore");

gulp.task("sprite", function () {
  return gulp.src("build/img/icon-*.svg")
    .pipe(svgstore({
      inlineSvg: true
    }))
    .pipe(rename("sprite.svg"))
    .pipe(gulp.dest("build/img/"));
});



/* PostHTML */
var gulp = require("gulp");
var posthtml = require("gulp-posthtml");
var include = require("posthtml-include");

gulp.task("html", function () {
  return gulp.src("source/*.html")
    .pipe(posthtml([
      include()
    ]))
    .pipe(gulp.dest("build"));
});



/* Очищение build перед копированием */
var gulp = require("gulp");
var del = require("del");

gulp.task("clean", function () {
  return del("build");
});



/* Копирование в build */
var gulp = require("gulp");

gulp.task("copy", function () {
  return gulp.src([
      "source/fonts/**/*.{woff,woff2}",
      "source/img/**",
      "source/js/**",
      "source/normalize-min.css"
    ], {
      base: "source"
    })
  .pipe(gulp.dest("build"));
});



/* Запуск сборки */
var gulp = require("gulp");

gulp.task("build", gulp.series(
  "clean",
  "copy",
  "css",
  "cssmin",
  "jsmin",
  "images",
  "webp",
  "fillDelete",
  "sprite",
  "html",
  "colorSvgs"
));

gulp.task("start", gulp.series("build", "server"));
