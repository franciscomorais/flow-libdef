#!/usr/bin/env node
'use strict';

var _commands = require('./commands');

var _commander = require('commander');

var _commander2 = _interopRequireDefault(_commander);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Version.
 */

/**
 * Module dependencies.
 */

_commander2.default.version('1.0.0');

/**
 * `install` command.
 */

_commander2.default.command('install [library]').description('run this command to install flow-typed dependency').action(_commands.install);

/**
 * Show help if no pass any command.
 */

if (process.argv.length == 2) console.log(_commander2.default.helpInformation());

/**
 * Parse arguments.
 */

_commander2.default.parse(process.argv);