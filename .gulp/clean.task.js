const del = require('del');
const path = require('../package.json').paths;

const arrWhatToDel = [
  path.dist.root,
];

module.exports = (done) => {
  del(arrWhatToDel, (err, paths) => {
    console.log('Deleted files/folders:\n', paths.join('\n')); // eslint-disable-line no-console
    done();
  });
};
