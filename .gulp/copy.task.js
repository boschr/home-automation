require('dotenv').config();

const gulp = require('gulp');
const path = require('../package.json').paths;
const gulpif = require('gulp-if');

const isProduction = process.env.ENVIRONMENT === 'production';

const arrWhatToCopy = [
  { base: path.src.root, src: 'robots.txt', dest: path.dist.root, condition: isProduction },
  { base: path.src.root, src: 'humans.txt', dest: path.dist.root },
  { base: path.src.root, src: '.htaccess', dest: path.dist.root },
  { base: path.src.html, src: '**/*', dest: path.dist.root },
];

module.exports = (done) => {
  Array.prototype.forEach.call(arrWhatToCopy, (object) => {
    const blnCondition = object.hasOwnProperty('condition') ? object.condition : true;

    gulp.src(object.base + object.src, { base: object.base })
      .pipe(gulpif(blnCondition, gulp.dest(object.dest)));
  });

  done();
};
