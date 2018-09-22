'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.checkLibrary = undefined;

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

/**
 * Export `checkLibrary` util.
 */

/**
 * Module dependencies.
 */

let checkLibrary = exports.checkLibrary = (() => {
  var _ref = (0, _asyncToGenerator3.default)(function* (library) {
    const splitLibrary = library.split('@');

    if (splitLibrary.length < 2) {
      try {
        const json = yield (0, _shellCommands.yarnList)(library);
        const result = (0, _lodash.get)(json, 'data.trees.0.name');

        return result ? {
          result,
          splitLibrary: result ? result.split('@') : null
        } : {};
      } catch (e) {
        return null;
      }
    }
  });

  return function checkLibrary(_x) {
    return _ref.apply(this, arguments);
  };
})();

var _lodash = require('lodash');

var _shellCommands = require('./shell-commands');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

;