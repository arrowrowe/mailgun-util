var expect = require('chai').expect;
var sinon = require('sinon');

var mgu = {
  config: {api: 'api', key: 'key'},
  log: {
    info: sinon.spy(),
    warn: sinon.spy()
  },
  send: require('../../lib/send')
};
var needle = require('needle');

describe('lib/send', function () {

  var data = {
    'from': 'Sample <me@sample.io>',
    'to': 'Receiver1 <r1@some.io>, Receiver2 <r2@some.io>',
    'subject': 'A Sample Mail',
    'text': 'Something with\na new line...'
  };

  it('posts to Mailgun server', function () {

    sinon.stub(needle, 'post');

    mgu.send(data);

    expect(needle.post.calledWith(mgu.config.api, data, {
      username: 'api',
      password: mgu.config.key
    })).to.equal(true);

    needle.post.restore();

  });

  it('warns http errors', function () {

    sinon.stub(needle, 'post', function (url, data, option, callback) {
      callback('err');
    });

    mgu.send(data);

    expect(mgu.log.warn.calledWith('err')).to.equal(true);

    needle.post.restore();

  });

  it('logs http results', function () {

    sinon.stub(needle, 'post', function (url, data, option, callback) {
      callback(null, 'resp', 'body');
    });

    mgu.send(data);

    expect(mgu.log.info.calledWith('resp', 'body')).to.equal(true);

    needle.post.restore();

  });

});
