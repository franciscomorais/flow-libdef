'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

/**
 * `flowCheck` util.
 */

let flowCheck = (() => {
  var _ref = (0, _asyncToGenerator3.default)(function* (file) {
    const result = yield (0, _asyncExec2.default)(`flow check-contents < ${file} --json`);
    const data = JSON.parse(result);

    data.errors = data.errors.map(function (item) {
      return (0, _extends3.default)({
        file
      }, item);
    });

    return data.errors;
  });

  return function flowCheck(_x) {
    return _ref.apply(this, arguments);
  };
})();

/**
 * `getIgnoredModules` util.
 */

var _lodash = require('lodash');

var _asyncExec = require('async-exec');

var _asyncExec2 = _interopRequireDefault(_asyncExec);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Whitelist files list.
 */

/**
 * Module dependencies.
 */

const whitelistFilesList = ['.js'];

/**
 * Ignore files list.
 */

const ignoreFilesList = ['node_modules', '.git'];

/**
 * `getAllJsFiles` util.
 */

const getAllJsFiles = (directory = '.') => {
  const result = [];
  const files = _fs2.default.readdirSync(directory);

  files.map(file => {
    if ((0, _lodash.includes)(ignoreFilesList, file)) {
      return;
    }

    const filePath = `${directory}/${file}`;

    if (_fs2.default.statSync(filePath).isDirectory()) {
      const filelist = getAllJsFiles(filePath);
      result.push(...filelist);
    } else {
      if ((0, _lodash.includes)(whitelistFilesList, _path2.default.extname(file))) {
        result.push(filePath);
      }
    }
  });

  return result;
};const getIgnoredModules = () => {
  try {
    const file = _fs2.default.readFileSync(`${process.cwd()}/.babelrc`, 'utf-8');
    const moduleList = (0, _lodash.flattenDeep)((0, _lodash.compact)((0, _lodash.get)(JSON.parse(file), 'plugins').map(item => {
      if ((0, _lodash.isArray)(item) && (0, _lodash.includes)(item, 'module-resolver') && (0, _lodash.isObject)((0, _lodash.get)(item, '1'))) {
        const alias = (0, _lodash.get)(item, '1');
        const result = [];

        const modules = (0, _lodash.keys)(alias).map(key => {
          const paths = (0, _lodash.isArray)(alias[key]) ? alias[key] : [alias[key]];

          paths.map(filePath => {
            const fullPath = _path2.default.resolve(process.cwd(), filePath);
            const dirList = _fs2.default.readdirSync(fullPath);

            dirList.map(dir => {
              if (_fs2.default.lstatSync(_path2.default.resolve(fullPath, dir)).isDirectory()) {

                result.push(dir);
              }
            });
          });
        });

        return result;
      }
    })));

    return moduleList || [];
  } catch (e) {
    return [];
  }
};

/**
 * `captureMissingModules` util.
 */

const captureMissingModules = errors => {
  const result = [];

  const ignoredModules = getIgnoredModules();

  errors.map(item => (0, _lodash.get)(item, 'message').map(item => {
    const description = (0, _lodash.get)(item, 'descr');
    const regx = new RegExp('Cannot resolve module `(.*?)(`|\/)');
    const test = regx.exec(description);

    if (test && !(0, _lodash.includes)(ignoredModules, test[1])) {
      result.push(test[1]);
    }
  }));

  return (0, _lodash.difference)((0, _lodash.uniq)(result), ['.', '']);
};

/**
 * Export `installAll` command.
 */

exports.default = (() => {
  var _ref2 = (0, _asyncToGenerator3.default)(function* (library, options) {

    const files = getAllJsFiles(process.cwd());
    const errors = [];

    yield Promise.all(files.map((() => {
      var _ref3 = (0, _asyncToGenerator3.default)(function* (file) {
        const errorsList = yield flowCheck(file);

        errors.push(...errorsList);
      });

      return function (_x4) {
        return _ref3.apply(this, arguments);
      };
    })()));

    const listMissingModules = captureMissingModules(errors);

    console.log("List of modules that will be install:");
    console.log(listMissingModules);
  });

  return function (_x2, _x3) {
    return _ref2.apply(this, arguments);
  };
})();