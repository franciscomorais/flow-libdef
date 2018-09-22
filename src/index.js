#!/usr/bin/env node

/**
 * Module dependencies.
 */

import { install } from 'commands';
import program from 'commander';

/**
 * Version.
 */

program.version('1.0.0');

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
