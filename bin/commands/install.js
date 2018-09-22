'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _lodash = require('lodash');

var _utils = require('../utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Messages.
 */

/**
 * Module dependencies.
 */

const messages = {
  cantReadVersion: library => console.log(`\nERR: Something wrong. I can't read name and version of ${result}\n`),
  libraryNotFound: library => console.log(`\nERR: ${library} not found. Are you sure this library is installed?\n`),
  somethingWrong: library => console.log(`\nSomething went wrong while installing ${library} flow dependency`),
  successful: library => console.log(`\nThe library ${library} was installed successfully.\n`)

  /**
   * Export `install` command.
   */

};
exports.default = (() => {
  var _ref = (0, _asyncToGenerator3.default)(function* (library, options) {
    const libraryData = yield (0, _utils.checkLibrary)(library);

    if (!libraryData) {
      messages.libraryNotFound(library);

      return;
    }

    const result = libraryData.result,
          splitLibrary = libraryData.splitLibrary;


    if (!splitLibrary || splitLibrary.length !== 2) {
      messages.cantReadVersion(result);

      return;
    }

    try {
      const installationResult = yield (0, _utils.installFlowDependency)(result);

      if (!installationResult) {
        const tryCreateStub = yield (0, _utils.flowCreateStub)(result);

        if (!tryCreateStub) {
          messages.somethingWrong(result);

          return;
        } else {
          console.log(tryCreateStub);
        }
      } else {
        console.log(installationResult);
      }

      messages.successful(result);
    } catch (e) {
      messages.somethingWrong(result);
    }
  });

  return function (_x, _x2) {
    return _ref.apply(this, arguments);
  };
})();