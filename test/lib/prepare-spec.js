var expect = require('chai').expect;
var sinon = require('sinon');

var prepare = require('../../lib/prepare');
var fs = require('fs');

describe('lib/prepare', function () {

  it('removes data.textPath and place the content of its file to data.text', function () {
    var data = {
      textPath: 'textPath'
    };
    sinon.stub(fs, 'readFileSync').returns('text');
    prepare(data);
    expect(fs.readFileSync.callCount).to.equal(1);
    expect(data.text).to.equal('text');
    fs.readFileSync.restore();
  });

});
