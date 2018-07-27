//loading our dependencies

var gulp = require("gulp"),

	uglify = require("gulp-uglify"),

	rename = require("gulp-rename"),

	cssnano = require("gulp-cssnano"),

	browserSync = require("browser-sync").create();



// Static server

gulp.task("browser-sync", function(done) {

	browserSync.init({

		server: {

			baseDir: "./"

		}

	});

	done();

});



gulp.task("scripts", function() {

	return gulp

		.src("./src/js/*.js") // What files do we want gulp to consume?

		.pipe(uglify()) // Call the uglify function on these files

		.pipe(rename({ extname: ".min.js" })) // Rename the uglified file

		.pipe(gulp.dest("./build/js")); // Where do we put the result?

});



gulp.task("styles", function() {

	return gulp

		.src("./src/css/*.css") // What files do we want gulp to consume?

		.pipe(cssnano()) // Call the uglify function on these files

		.pipe(rename({ extname: ".min.css" })) // Rename the uglified file

		.pipe(gulp.dest("./build/css")); // Where do we put the result?

});



gulp.task("reload", function(done) {

	browserSync.reload();

	done();

});



gulp.task("watch", function(done) {

	gulp.watch("./src/js/*.js", gulp.series("scripts", "reload"));

	gulp.watch("./src/css/*.css", gulp.series("styles", "reload"));

	gulp.watch("./index.html", gulp.series("reload"));

});



gulp.task("default", gulp.parallel("watch", "browser-sync"));