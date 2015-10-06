#!/usr/bin/env node

var mgu = require('../index');
var PACKAGE = require('../package');

var program = require('commander');

program
  .version(PACKAGE.version);

program
  .command('send [dataPath]')
  .description('send emails according to the parameters in data path')
  .action(function (dataPath) {
    mgu.sendFrom(dataPath);
  });

program.parse(process.argv);
