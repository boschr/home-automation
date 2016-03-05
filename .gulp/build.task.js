const runSequence = require('run-sequence');

module.exports = (done) => {
  return runSequence(
    'clean',
    'imagemin',
    'copy',
    'sass',
    'browserify',
    done
  );
};
