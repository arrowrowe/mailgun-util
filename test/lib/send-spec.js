var expect = require('chai').expect;
var sinon = require('sinon');

var send = require('../../lib/send');
var needle = require('needle');

describe('lib/send', function () {

  var mgu = {
    config: {api: 'api', key: 'key'},
    log: {
      info: sinon.spy(),
      warn: sinon.spy()
    }
  };
  var data = {
    'from': 'Sample <me@sample.io>',
    'to': 'Receiver1 <r1@some.io>, Receiver2 <r2@some.io>',
    'subject': 'A Sample Mail',
    'text': 'Something with\na new line...'
  };

  it('posts to Mailgun server', function () {

    sinon.stub(needle, 'post');

    send.call(mgu, data);

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

    send.call(mgu, data);

    expect(mgu.log.warn.calledWith('err')).to.equal(true);

    needle.post.restore();

  });

  it('logs http results', function () {

    sinon.stub(needle, 'post', function (url, data, option, callback) {
      callback(null, 'resp', 'body');
    });

    send.call(mgu, data);

    expect(mgu.log.info.calledWith('resp', 'body')).to.equal(true);

    needle.post.restore();

  });

});
