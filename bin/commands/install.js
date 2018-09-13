'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

let yarnList = (() => {
  var _ref = (0, _asyncToGenerator3.default)(function* (library) {
    const output = yield (0, _asyncExec2.default)(`yarn list ${library} --json`);

    return JSON.parse(output);
  });

  return function yarnList(_x) {
    return _ref.apply(this, arguments);
  };
})();

/**
 * `installFlowDependency` command.
 */

let installFlowDependency = (() => {
  var _ref2 = (0, _asyncToGenerator3.default)(function* (library) {
    try {
      return yield (0, _asyncExec2.default)(`flow-typed install ${library}`);
    } catch (e) {
      return false;
    }
  });

  return function installFlowDependency(_x2) {
    return _ref2.apply(this, arguments);
  };
})();

/**
 * `flowCreateStub` command.
 */

let flowCreateStub = (() => {
  var _ref3 = (0, _asyncToGenerator3.default)(function* (library) {
    try {
      return yield (0, _asyncExec2.default)(`flow-typed create-stub ${library}`);
    } catch (e) {
      return false;
    }
  });

  return function flowCreateStub(_x3) {
    return _ref3.apply(this, arguments);
  };
})();

/**
 * `checkLibrary` util.
 */

let checkLibrary = (() => {
  var _ref4 = (0, _asyncToGenerator3.default)(function* (library) {
    const splitLibrary = library.split('@');

    if (splitLibrary.length < 2) {
      try {
        const json = yield yarnList(library);
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

  return function checkLibrary(_x4) {
    return _ref4.apply(this, arguments);
  };
})();

var _lodash = require('lodash');

var _asyncExec = require('async-exec');

var _asyncExec2 = _interopRequireDefault(_asyncExec);

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
   * `yarnList` command.
   */

};;;

/**
 * Export `install` command.
 */

exports.default = (() => {
  var _ref5 = (0, _asyncToGenerator3.default)(function* (library, options) {
    const libraryData = yield checkLibrary(library);

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
      const installationResult = yield installFlowDependency(result);

      if (!installationResult) {
        const tryCreateStub = yield flowCreateStub(result);

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

  return function (_x5, _x6) {
    return _ref5.apply(this, arguments);
  };
})();