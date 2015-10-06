var expect = require('chai').expect;
var sinon = require('sinon');

var mgu = {
  send: sinon.spy(),
  sendFrom: require('../../lib/send-from')
};
var fs = require('fs-extra');

describe('lib/send-from', function () {

  var data = {'hi': 'there'};

  it('simply reads data and calls lib/send', function () {

    sinon.stub(fs, 'readJsonSync').returns(data);

    mgu.sendFrom('dataPath');

    expect(fs.readJsonSync.calledWith('dataPath')).to.equal(true);
    expect(mgu.send.calledWith(data)).to.equal(true);

    fs.readJsonSync.restore();

  });

});
