'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.checkLibrary = exports.parseYarnResult = undefined;

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

/**
 * Export `checkLibrary` util.
 */

let checkLibrary = exports.checkLibrary = (() => {
  var _ref = (0, _asyncToGenerator3.default)(function* (library) {
    if (!library) {
      return null;
    }

    const splitLibrary = library.split('@');
    const libraryName = splitLibrary.length >= 2 ? splitLibrary[0] : library;

    try {
      const json = yield (0, _shellCommands.yarnList)(libraryName);

      return parseYarnResult(json);
    } catch (e) {
      return null;
    }
  });

  return function checkLibrary(_x) {
    return _ref.apply(this, arguments);
  };
})();

var _lodash = require('lodash');

var _shellCommands = require('./shell-commands');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Export `parseYarnResult` util.
 */

/**
 * Module dependencies.
 */

const parseYarnResult = exports.parseYarnResult = data => {
  const result = (0, _lodash.get)(data, 'data.trees.0.name');
  const splitLibrary = result ? result.split('@') : [];

  return result ? {
    result,
    splitLibrary: splitLibrary.length === 2 ? splitLibrary : null
  } : {};
};;