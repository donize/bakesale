import gulp from 'gulp';
import sass from 'gulp-sass';
import sourcemaps from 'gulp-sourcemaps';
import autoprefixer from 'gulp-autoprefixer';
import browserSync from 'browser-sync';

gulp.task('styles', () => {
    gulp.src('src/css/style.scss')
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer({browsers: ['last 3 versions', 'Safari 8']}))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('build/css'));
});

gulp.task('html', () => {
    return gulp.src('src/*.html')
        .pipe(gulp.dest('build'))
});

gulp.task('images', () => {
    return gulp.src('src/images/**')
        .pipe(gulp.dest('build/images'))
});

gulp.task('server', function() {
    browserSync.init({
        server: {
            baseDir: "./build"
        }
    });
});

gulp.task('serve', ['build', 'server']);

gulp.task('build', ['html', 'styles', 'images']);

