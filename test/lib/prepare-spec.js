var expect = require('chai').expect;
var sinon = require('sinon');

var prepare = require('../../lib/prepare');
var fs = require('fs');

describe('lib/prepare', function () {
  it('removes data.textPath and place the content of its file to data.text', function () {
    sinon.stub(fs, 'readFileSync');
    prepare({textPath: 'textPath'});
    expect(fs.readFileSync.callCount).to.equal(1);
    fs.readFileSync.restore();
  });
});
