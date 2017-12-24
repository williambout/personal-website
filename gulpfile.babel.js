'use strict';

import gulp from 'gulp'
import sass from 'gulp-sass'
import autoprefixer from 'gulp-autoprefixer'
import browserSync from 'browser-sync'
import useref from 'gulp-useref'
import uglify from 'gulp-uglify'
import imagemin from 'gulp-imagemin'
import cache from 'gulp-cache'
import del from 'del'
import runSequence from 'run-sequence'
import pxtorem from 'gulp-pxtorem'
import ghPages from 'gulp-gh-pages'
import htmlmin from 'gulp-htmlmin'
import svgstore from 'gulp-svgstore'
import svgmin from 'gulp-svgmin'
import path from 'path'
import includes from 'gulp-file-include'
import file from 'gulp-file'
import concat from 'gulp-concat';

const paths = {
  sass: './src/assets/scss/**/*.scss',
  css: './build/assets/css',
  js: './src/assets/js/*.js',
  vendor: './vendor/',
  img: './src/assets/images/**',
  fonts: './src/assets/fonts/**',
  icons: './src/assets/icons/*',
  build: './build/',
  jsLibraires: [
    './node_modules/instafeed.js/instafeed.js'
  ]
}

const config = {
  deploy: {
    cname: 'williambout.me'
  }
};

// Start browserSync server
gulp.task('browserSync', () => {
  browserSync({
    server: {
      baseDir: 'build'
    }
  })
})

gulp.task('sass', () => {
  return gulp.src(paths.sass)
    .pipe(sass())
    .pipe(pxtorem())
    .pipe(autoprefixer({
			browsers: ['last 2 versions'],
			cascade: false
		}))
    .pipe(gulp.dest(paths.css))
    .pipe(browserSync.stream());
})

gulp.task('js', () => {
  return gulp.src([...paths.jsLibraires, paths.js])
    .pipe(concat('app.js'))
    .pipe(gulp.dest('./build/assets/js'))
})

// Watchers
gulp.task('watch', () => {
  gulp.watch(paths.sass, ['sass']);
  gulp.watch(['src/**/*.html'], ['html']);
  gulp.watch(paths.icons, ['icons', 'html']);
  gulp.watch(paths.js, ['js']);
})

// Optimization Tasks
// ------------------

gulp.task('html', () => {
  return gulp.src('src/**/*.html')
    .pipe(includes({
      prefix: '@@',
      basepath: './src'
    }))
    .pipe(htmlmin())
    .pipe(gulp.dest(paths.build))
    .pipe(browserSync.stream());
})

// Optimizing Images
gulp.task('images', () => {
  return gulp.src(paths.img)
    .pipe(cache(imagemin({
      interlaced: true,
    })))
    .pipe(gulp.dest('build/assets/images'))
});

// Copying Fonts
gulp.task('fonts', () => {
  return gulp.src(paths.fonts)
    .pipe(gulp.dest('build/assets/fonts'))
});

gulp.task('icons', () => {
  return gulp.src(paths.icons)
  .pipe(svgmin(function (file) {
      var prefix = path.basename(file.relative, path.extname(file.relative));
      return {
          plugins: [{
              cleanupIDs: {
                  prefix: prefix + '-',
                  minify: true
              }
          }]
      }
  }))
  .pipe(svgstore())
    .pipe(gulp.dest('./src/inc/'))
    .pipe(browserSync.stream());
})

// Cleaning
gulp.task('clean', () => {
  return del.sync('build').then(function(cb) {
    return cache.clearAll(cb);
  });
})

gulp.task('clean:build', () => {
  return del.sync(['build/**/*', '!build/images', '!build/images/**/*']);
});

// Build Sequences
// ---------------

gulp.task('default', (callback) => {
  runSequence(['html', 'fonts', 'sass', 'js', 'images', 'icons', 'browserSync', 'watch'],
    callback
  )
})

gulp.task('build', (callback) => {
  runSequence(
    'clean:build',
    ['html', 'fonts', 'sass', 'js', 'images', 'icons'],
    callback
  )
})

// Deploy Sequence
// ---------------

gulp.task('deploy', () => {
  return gulp.src('./build/**/*')
    .pipe(file('CNAME', 'williambout.me'))
    .pipe(ghPages({
      "remoteUrl" : "git@github.com:williambout/personal-website.git"
    }));
});
