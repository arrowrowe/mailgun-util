var expect = require('chai').expect;

var mgu = require('../index');

describe('Mgu', function () {
  it('shows its version', function () {
    expect(mgu.version).to.match(/^\d+\.\d+\.\d+$/);
  });
  it('carries its config', function () {
    expect(mgu.config.api).to.match(/^https:\/\/api.mailgun.net\/v\d+\/.+?\/messages$/);
    expect(mgu.config.key).to.match(/^key-[a-z0-9]{32}$/);
  });
});
