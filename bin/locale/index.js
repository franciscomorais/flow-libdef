"use strict";

/**
 * `messages`.
 */

const messages = {
  cantReadVersion: library => console.log(`\nERR: Something wrong. I can't read name and version of ${library}\n`),
  libraryNotFound: library => console.log(`\nERR: ${library} not found. Are you sure this library is installed?\n`),
  somethingWrong: library => console.log(`\nSomething went wrong while installing ${library} flow dependency`),
  successful: library => console.log(`\nThe library ${library} was installed successfully.\n`)
};

/**
 * Module exports.
 */

module.exports = {
  messages
};