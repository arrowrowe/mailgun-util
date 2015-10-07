var prepare = require('./prepare');
var needle = require('needle');

module.exports = function (data) {
  var self = this;
  prepare(data);
  this.log.info('Trying send', data);
  needle.post(this.config.api, data, {
    username: 'api',
    password: this.config.key
  }, function(err, resp, body) {
    if (err) {
      self.log.warn(err);
    } else {
      self.log.info(body.message);
    }
  });
};
