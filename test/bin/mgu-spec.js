var expect = require('chai').expect;
var sinon = require('sinon');

var path = require('path');

var PACKAGE = require('../../package');
var mgu = require('../../index');

describe('The bin mgu', function () {

  before(function () {
    sinon.stub(process, 'exit');
  });

  var binPath = path.resolve('./bin/mgu.js');
  var commanderPath = path.resolve('./node_modules/commander/index.js');
  afterEach(function () {
    delete require.cache[binPath];
    delete require.cache[commanderPath];
  });

  after(function () {
    process.exit.restore();
  });

  function T(argv) {
    process.argv = ['', ''].concat(argv);
    require('../../bin/mgu');
  }

  it('shows its version', function () {

    sinon.stub(process.stdout, 'write');

    T(['-V']);

    expect(process.stdout.write.calledWith(PACKAGE.version + '\n')).to.equal(true);

    process.stdout.write.restore();

  });

  it('calls mgu.sendFrom for command send', function () {

    sinon.stub(mgu, 'sendFrom');

    T(['send', 'dataPath']);

    expect(mgu.sendFrom.calledWith('dataPath')).to.equal(true);

    mgu.sendFrom.restore();

  });

});
