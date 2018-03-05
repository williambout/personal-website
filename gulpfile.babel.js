import gulp from "gulp";
import sass from "gulp-sass";
import autoprefixer from "gulp-autoprefixer";
import browserSync from "browser-sync";
import imagemin from "gulp-imagemin";
import cache from "gulp-cache";
import del from "del";
import runSequence from "run-sequence";
import pxtorem from "gulp-pxtorem";
import ghPages from "gulp-gh-pages";
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
		"./node_modules/pusher-feeds-client/target/pusher-feeds-client.js"
	]
};

const config = {
	deploy: {
		cname: "williambout.me"
	}
};

// Start browserSync server
gulp.task("browserSync", () => {
	browserSync({
		server: {
			baseDir: "build"
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
					// image-small.jpg is 200 pixels wide
					width: 200,
					rename: {
						suffix: "-small",
						extname: ".jpg"
					}
				},
				{
					// image-small@2x.jpg is 400 pixels wide
					width: 200 * 2,
					rename: {
						suffix: "-small@2x",
						extname: ".jpg"
					}
				},
				{
					// image-large.jpg is 480 pixels wide
					width: 480,
					rename: {
						suffix: "-large",
						extname: ".jpg"
					}
				},
				{
					// image-large@2x.jpg is 960 pixels wide
					width: 480 * 2,
					rename: {
						suffix: "-large@2x",
						extname: ".jpg"
					}
				},
				{
					// image-extralarge.jpg is 1280 pixels wide
					width: 1280,
					rename: {
						suffix: "-extralarge",
						extname: ".jpg"
					}
				},
				{
					// image-extralarge@2x.jpg is 2560 pixels wide
					width: 1280 * 2,
					rename: {
						suffix: "-extralarge@2x",
						extname: ".jpg"
					}
				},
				{
					// image-small.webp is 200 pixels wide
					width: 200,
					rename: {
						suffix: "-small",
						extname: ".webp"
					}
				},
				{
					// image-small@2x.webp is 400 pixels wide
					width: 200 * 2,
					rename: {
						suffix: "-small@2x",
						extname: ".webp"
					}
				},
				{
					// image-large.webp is 480 pixels wide
					width: 480,
					rename: {
						suffix: "-large",
						extname: ".webp"
					}
				},
				{
					// image-large@2x.webp is 960 pixels wide
					width: 480 * 2,
					rename: {
						suffix: "-large@2x",
						extname: ".webp"
					}
				},
				{
					// image-extralarge.webp is 1280 pixels wide
					width: 1280,
					rename: {
						suffix: "-extralarge",
						extname: ".webp"
					}
				},
				{
					// image-extralarge@2x.webp is 2560 pixels wide
					width: 1280 * 2,
					rename: {
						suffix: "-extralarge@2x",
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
			"icons"
		],
		callback
	);
});

// Deploy Sequence
// ---------------

gulp.task("deploy", () => {
	pump([
		gulp.src("./build/**/*"),
		file("CNAME", "williambout.me"),
		ghPages({
			remoteUrl: "git@github.com:williambout/personal-website.git"
		})
	]);
});
