'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.installFlowDependency = exports.flowCreateStub = exports.yarnList = undefined;

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

/**
 * Export `yarnList` command.
 */

let yarnList = exports.yarnList = (() => {
  var _ref = (0, _asyncToGenerator3.default)(function* (library) {
    const output = yield (0, _asyncExec2.default)(`yarn list ${library} --json`);

    return JSON.parse(output);
  });

  return function yarnList(_x) {
    return _ref.apply(this, arguments);
  };
})(); /**
       * Module dependencies.
       */

/**
 * Export `flowCreateStub` command.
 */

let flowCreateStub = exports.flowCreateStub = (() => {
  var _ref2 = (0, _asyncToGenerator3.default)(function* (library) {
    try {
      return yield (0, _asyncExec2.default)(`flow-typed create-stub ${library}`);
    } catch (e) {
      return false;
    }
  });

  return function flowCreateStub(_x2) {
    return _ref2.apply(this, arguments);
  };
})();

/**
 * Export `installFlowDependency` command.
 */

let installFlowDependency = exports.installFlowDependency = (() => {
  var _ref3 = (0, _asyncToGenerator3.default)(function* (library) {
    try {
      return yield (0, _asyncExec2.default)(`flow-typed install ${library}`);
    } catch (e) {
      return false;
    }
  });

  return function installFlowDependency(_x3) {
    return _ref3.apply(this, arguments);
  };
})();

var _asyncExec = require('async-exec');

var _asyncExec2 = _interopRequireDefault(_asyncExec);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

;