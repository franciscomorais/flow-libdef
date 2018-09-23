'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _lodash = require('lodash');

var _utils = require('../utils');

var _locale = require('../locale');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Export `install` command.
 */

exports.default = (() => {
  var _ref = (0, _asyncToGenerator3.default)(function* (library, options) {
    const libraryData = yield (0, _utils.checkLibrary)(library);

    if (!libraryData) {
      _locale.messages.libraryNotFound(library);

      return false;
    }

    const result = libraryData.result,
          splitLibrary = libraryData.splitLibrary;


    if (!splitLibrary || splitLibrary.length !== 2) {
      _locale.messages.cantReadVersion(result);

      return false;
    }

    try {
      const installationResult = yield (0, _utils.installFlowDependency)(result);

      if (!installationResult) {
        const tryCreateStub = yield (0, _utils.flowCreateStub)(result);

        if (!tryCreateStub) {
          _locale.messages.somethingWrong(result);

          return false;
        } else {
          console.log(tryCreateStub);
        }
      } else {
        console.log(installationResult);
      }

      _locale.messages.successful(result);

      return true;
    } catch (e) {
      _locale.messages.somethingWrong(result);

      return false;
    }
  });

  return function (_x, _x2) {
    return _ref.apply(this, arguments);
  };
})(); /**
       * Module dependencies.
       */