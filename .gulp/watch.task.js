const gulp = require('gulp');
const watch = require('gulp-watch');
const livereload = require('gulp-livereload');
const path = require('../package.json').paths;

module.exports = () => {
  livereload.listen();

  const arrToBeWatched = [
    { path: path.src.js + '**/*.js', task: ['browserify'] },
    { path: path.src.scss + '**', task: ['sass'] },
    { path: path.src.img + '**', task: ['imagemin'] },
    { path: path.src.html + '**/*', task: ['copy'] },
  ];

  Array.prototype.forEach.call(arrToBeWatched, (objWatch) => {
    watch(objWatch.path, () => {
      Array.prototype.forEach.call(objWatch.task, (strTask) => {
        gulp.start(strTask);
      });
    });
  });
};
