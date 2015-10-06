var fs = require('fs-extra');

module.exports = function (dataPath) {
  this.send(fs.readJsonSync(dataPath));
};
