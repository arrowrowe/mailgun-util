var PACKAGE = require('./package');

module.exports = {
  version: PACKAGE.version,
  config: require('./.env'),
  send: require('./lib/send'),
  sendFrom: require('./lib/send-from'),
  log: require('log4js').getLogger(PACKAGE.name)
};
