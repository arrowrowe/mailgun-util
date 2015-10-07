var fs = require('fs');

module.exports = function (data) {
  if ('textPath' in data) {
    data.text = fs.readFileSync(data.textPath, 'utf8');
    delete data.textPath;
  }
  return data;
};
