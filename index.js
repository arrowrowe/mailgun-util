module.exports = {
  version: require('./package').version,
  config: require('./.env'),
  send: require('./lib/send')
};
