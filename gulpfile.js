var gulp = require('gulp'),
    prefixer = require('gulp-autoprefixer'),
    sass = require('gulp-sass'),
    useref = require('gulp-useref'),
    plumber = require('gulp-plumber'),
    rigger = require('gulp-rigger'),
    sourcemaps = require('gulp-sourcemaps'),
    shorthand = require('gulp-shorthand'),
    cssmin = require('gulp-clean-css'),
    rimraf = require('rimraf'),
    htmlmin = require('gulp-htmlmin'),
    uglify = require('gulp-uglify'),
    watch = require('gulp-watch'),
    browserSync = require('browser-sync'),
    babel = require('gulp-babel'),
    reload = browserSync.reload;

var path = {
    build: {
        html: 'dist',
        js: 'dist/js/',
        css: 'dist/css/',
        img: 'dist/img/',
        fonts: 'dist/fonts/'
    },
    src: {
        html: 'src/*.html',
        js: 'src/js/*.js',
        css: 'src/css/*.scss',
        img: 'src/img/**/*.+(jpeg|jpg|png|tiff|webp)',
        fonts: 'src/fonts/**/*.*'
    },
    watch: {
        html: 'src/**/*.html',
        js: 'src/js/**/*.js',
        css: 'src/**/*.scss',
        img: 'src/img/**/*.*',
        fonts: 'src/fonts/**/*.*'
    },
    clean: './dist'
};

var config = {
        server: {
            baseDir: './dist'
        },
        tunnel: false,
        host: 'localhost',
        port: 9000,
        logPrefix: 'front_log'
};

var logErr = function(err) {
    console.warn(err);
    this.emit('end');
}

gulp.task('html:build', function () {
    gulp.src(path.src.html)
        .pipe(plumber())
        .pipe(rigger())
        .pipe(useref())
        .pipe(htmlmin({collapseWhitespace: true}))
        .pipe(gulp.dest(path.build.html))
        .pipe(reload({stream: true}));
});

gulp.task('js:build', function () {
    gulp.src(path.src.js)
        .pipe(plumber())
        .pipe(rigger())
        .pipe(sourcemaps.init())
        .pipe(babel({
            presets: ['es2015']
        }))
        .pipe(uglify())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(path.build.js))
        .pipe(reload({stream: true}));
});

gulp.task('style:build', function () {
    gulp.src(path.src.css)
        .pipe(plumber())
        .pipe(sourcemaps.init())
        .pipe(sass())
        .pipe(shorthand())
        .pipe(prefixer({
            browsers: ['last 100 versions'],
            cascade: false
        }))
        .pipe(cssmin())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(path.build.css))
        .pipe(reload({stream: true}));
});

gulp.task('image:build', function () {
    gulp.src(path.src.img)
        .pipe(plumber())
        .pipe(gulp.dest(path.build.img))
        .pipe(reload({stream: true}));
});

gulp.task('fonts:build', function () {
    gulp.src(path.src.fonts)
        .pipe(plumber())
        .pipe(gulp.dest(path.build.fonts))
        .pipe(reload({stream: true}));
})

gulp.task('build', [
    'html:build',
    'js:build',
    'style:build',
    'image:build',
    'fonts:build'
]);

gulp.task('watch', function () {
    watch([path.watch.html], function (event, cb) {
        gulp.start('html:build');
    });
    watch([path.watch.js], function (event, cb) {
        gulp.start('js:build');
    });
    watch([path.watch.css], function (event, cb) {
        gulp.start('style:build');
    });
    watch([path.watch.img], function (event, cb) {
        gulp.start('image:build');
    });
    watch([path.watch.fonts], function (event, cb) {
        gulp.start('fonts:build');
    });
});

gulp.task('webserver', function () {
    browserSync(config);
});

gulp.task('clean', function (cb) {
    rimraf(path.clean, cb);
});

gulp.task('default', ['build', 'webserver', 'watch']);
