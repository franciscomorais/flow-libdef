#!/usr/bin/env node

/**
 * Module dependencies.
 */

import { install } from 'commands';
import { version } from '../package.json';
import program from 'commander';

/**
 * Version.
 */

program.version(version);

/**
 * `install` command.
 */

program
  .command('install [library]')
  .description('run this command to install flow-typed dependency')
  .action(install);

/**
 * Show help if no pass any command.
 */

if (process.argv.length == 2) console.log(program.helpInformation());

/**
 * Parse arguments.
 */

program.parse(process.argv);
