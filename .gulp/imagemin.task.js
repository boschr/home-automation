const gulp = require('gulp');
const imagemin = require('gulp-imagemin');
const newer = require('gulp-newer');
const pngquant = require('imagemin-pngquant');
const path = require('../package.json').paths;
const livereload = require('gulp-livereload');

module.exports = (done) => {
  gulp.src(path.src.img + '**')
    .pipe(newer(path.dist.img))
    .pipe(imagemin({
      progressive: true,
      svgoPlugins: [{ removeViewBox: false }],
      use: [pngquant()],
    }))
    .pipe(gulp.dest(path.dist.img))
    .pipe(livereload())
    .on('end', done);
};
