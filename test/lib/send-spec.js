var expect = require('chai').expect;

var send = require('../../lib/send');

describe('lib/send', function () {
  it('returns Mgu\'s config for now', function () {
    expect(send.apply({
      config: {api: 'api', key: 'key'}
    })).to.equal('Try sending with api [api] and key [key]...');
  });
});
