import gulp from "gulp";
import sass from "gulp-sass";
import autoprefixer from "gulp-autoprefixer";
import browserSync from "browser-sync";
import imagemin from "gulp-imagemin";
import cache from "gulp-cache";
import del from "del";
import runSequence from "run-sequence";
import pxtorem from "gulp-pxtorem";
import htmlmin from "gulp-htmlmin";
import svgstore from "gulp-svgstore";
import includes from "gulp-file-include";
import file from "gulp-file";
import concat from "gulp-concat";
import responsive from "gulp-responsive";
import uglify from "gulp-uglify";
import pump from "pump";

const paths = {
  sass: "./src/assets/scss/styles.scss",
  css: "./build/assets/css",
  js: "./src/assets/js/*.js",
  vendor: "./vendor/",
  img: "./src/assets/images/**",
  fonts: "./src/assets/fonts/**",
  icons: "./src/assets/icons/**",
  build: "./build/",
  vendors: [
    "./node_modules/animejs/lib/anime.min.js",
    "./node_modules/unsplash-js/dist/unsplash.min.js",
    "./node_modules/instafeed.js/instafeed.js",
    "./node_modules/pusher-feeds-client/target/pusher-feeds-client.js",
    "./node_modules/livephotoskit/livephotoskit.js"
  ]
};

gulp.task("browserSync", () => {
  browserSync({
    server: {
      baseDir: "./build/"
    }
  });
});

gulp.task("sass", () => {
  pump([
    gulp.src(paths.sass),
    sass(),
    pxtorem(),
    autoprefixer({
      browsers: ["last 2 versions"],
      cascade: false,
      grid: false
    }),
    gulp.dest(paths.css),
    browserSync.stream()
  ]);
});

gulp.task("js", () => {
  pump([
    gulp.src(paths.js),
    concat("app.js"),
    gulp.dest("./build/assets/js"),
    browserSync.stream()
  ]);
});

gulp.task("vendors", () => {
  pump([
    gulp.src(paths.vendors),
    concat("vendors.js"),
    gulp.dest("./build/assets/js")
  ]);
});

gulp.task("headers", () => {
  pump([
    gulp.src("_headers"),
    gulp.dest("./build/")
  ]);
});

// Watchers
gulp.task("watch", () => {
  gulp.watch("src/**/*.scss", ["sass"]);
  gulp.watch(["src/**/*.html", paths.icons], ["html"]);
  gulp.watch(paths.icons, ["icons", "html"]);
  gulp.watch(paths.js, ["js"]);
});

// Optimization Tasks
// ------------------

gulp.task("html", () => {
  pump([
    gulp.src("src/**/*.html"),
    includes({
      prefix: "@@",
      basepath: "./src"
    }),
    htmlmin(),
    gulp.dest(paths.build),
    browserSync.stream()
  ]);
});

// Optimizing Images
gulp.task("images", () => {
  pump([
    gulp.src(paths.img),
    cache(
      imagemin({
        interlaced: true
      })
    ),
    gulp.dest("build/assets/images")
  ]);
});

gulp.task("responsive-images", () => {
  pump([
    gulp.src("./src/assets/images/responsive/**/*.{jpg,png}"),
    responsive({
      "*": [
        {
          width: 250,
          quality: 90,
          rename: {
            suffix: "-small",
            extname: ".jpg"
          }
        },
        {
          width: 500,
          quality: 90,
          rename: {
            suffix: "-medium",
            extname: ".jpg"
          }
        },
        {
          width: 1000,
          quality: 90,
          rename: {
            suffix: "-large",
            extname: ".jpg"
          }
        },
        {
          width: 2000,
          quality: 90,
          rename: {
            suffix: "-extralarge",
            extname: ".jpg"
          }
        },
        {
          width: 250,
          quality: 90,
          rename: {
            suffix: "-small",
            extname: ".webp"
          }
        },
        {
          width: 500,
          quality: 90,
          rename: {
            suffix: "-medium",
            extname: ".webp"
          }
        },
        {
          width: 1000,
          quality: 90,
          rename: {
            suffix: "-large",
            extname: ".webp"
          }
        },
        {
          width: 2000,
          quality: 90,
          rename: {
            suffix: "-extralarge",
            extname: ".webp"
          }
        }
      ]
    }),
    gulp.dest("build/assets/images")
  ]);
});

// Copying Fonts
gulp.task("fonts", () => {
  pump([gulp.src(paths.fonts), gulp.dest("build/assets/fonts")]);
});

gulp.task("icons", () => {
  pump([
    gulp.src(paths.icons),
    svgstore(),
    gulp.dest("./src/inc/"),
    browserSync.stream()
  ]);
});

// Cleaning
gulp.task("clean", () => {
  return del.sync("build").then(function(cb) {
    return cache.clearAll(cb);
  });
});

gulp.task("clean:build", () => {
  return del.sync(["build/**/*", "!build/images", "!build/images/**/*"]);
});

// Build Sequences
// ---------------

gulp.task("default", callback => {
  runSequence(
    [
      "html",
      "fonts",
      "sass",
      "vendors",
      "js",
      "responsive-images",
      "images",
      "icons",
      "browserSync",
      "watch"
    ],
    callback
  );
});

gulp.task("build", callback => {
  runSequence(
    "clean:build",
    [
      "html",
      "fonts",
      "sass",
      "vendors",
      "js",
      "responsive-images",
      "images",
      "icons",
	  "headers"
    ],
    callback
  );
});
