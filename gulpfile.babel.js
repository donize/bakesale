import gulp from 'gulp';
import sass from 'gulp-sass';
import sourcemaps from 'gulp-sourcemaps';
import autoprefixer from 'gulp-autoprefixer';
import cleanCss from 'gulp-clean-css';
const bs = require('browser-sync').create();

gulp.task('styles', () => {
  gulp
    .src('src/css/style.scss')
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer({ browsers: ['last 3 versions', 'Safari 8'] }))
    .pipe(sourcemaps.write())
    .pipe(cleanCss())
    .pipe(gulp.dest('docs/css'))
    .pipe(bs.reload({ stream: true }));
});

gulp.task('html', () => {
  return gulp.src('src/*.html').pipe(gulp.dest('docs'));
});

gulp.task('images', () => {
  return gulp.src('src/images/**').pipe(gulp.dest('docs/images'));
});

gulp.task('server', function() {
  bs.init({
    server: {
      baseDir: './docs',
    },
  });
});

gulp.task('serve', ['server'], () => {
  gulp.watch('src/css/*.scss', ['styles']);
  gulp.watch('src/images/**', ['images']);
  gulp.watch('src/*.html').on('change', bs.reload);
});

gulp.task('build', ['html', 'styles', 'images']);
