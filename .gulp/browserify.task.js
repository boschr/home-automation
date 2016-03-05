require('dotenv').config();

const gulp = require('gulp');
const browserify = require('browserify');
const babelify = require('babelify');
const path = require('../package.json').paths;
const livereload = require('gulp-livereload');
const source = require('vinyl-source-stream');
const notify = require('gulp-notify');
const uglify = require('gulp-uglify');
const gulpif = require('gulp-if');
const buffer = require('vinyl-buffer');

const isDevelopment = process.env.ENVIRONMENT === 'development';

const settings = {
  modules: {
    browserify: {
      entries: path.src.js + 'app.js',
      extensions: ['.js'],
      insertGlobals: false,
      debug: isDevelopment,
    },
  },
};

const jsTask = () => {
  return browserify(settings.modules.browserify)
    .transform(babelify)
    .bundle()
    .on('error', notify.onError((error) => {
      return 'Something happend: ' + error.message;
    }))
    .pipe(source('app.js'))
    .pipe(buffer())

    // if not development
    .pipe(gulpif(!isDevelopment, uglify()))

    .pipe(gulp.dest(path.dist.js))
    .pipe(livereload());
};

module.exports = jsTask;
