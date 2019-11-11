/**
 * Module dependencies.
 */

import {
  compact,
  difference,
  flattenDeep,
  get,
  includes,
  isArray,
  isObject,
  keys,
  uniq
} from 'lodash';

import exec from 'async-exec';
import fs from 'fs';
import path from 'path';


/**
 * Whitelist files list.
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
  const files = fs.readdirSync(directory);

  files.map(file => {
    if (includes(ignoreFilesList, file)) {
      return;
    }

    const filePath = `${directory}/${file}`;

    if (fs.statSync(filePath).isDirectory()) {
      const filelist = getAllJsFiles(filePath);
      result.push(...filelist);
    } else {
      if (includes(whitelistFilesList, path.extname(file))) {
        result.push(filePath);
      }
    }
  });

  return result;
}

/**
 * `flowCheck` util.
 */

async function flowCheck(file) {
  const result = await exec(`flow check-contents < ${file} --json`);
  const data = JSON.parse(result);

  data.errors = data.errors.map(item => ({
    file,
    ...item
  }));

  return data.errors;
}

/**
 * `getIgnoredModules` util.
 */

const getIgnoredModules = () => {
  try {
    const file = fs.readFileSync(`${process.cwd()}/.babelrc`, 'utf-8');
    const moduleList = flattenDeep(compact(get(JSON.parse(file), 'plugins').map(item => {
      if (isArray(item) && includes(item, 'module-resolver') && isObject(get(item, '1'))) {
        const alias = get(item, '1');
        const result = [];

        const modules = keys(alias).map(key => {
          const paths = isArray(alias[key]) ? alias[key] : [alias[key]];

          paths.map(filePath => {
            const fullPath = path.resolve(process.cwd(), filePath);
            const dirList = fs.readdirSync(fullPath);

            dirList.map(dir => {
              if (fs.lstatSync(path.resolve(fullPath, dir)).isDirectory()) {

                result.push(dir);
              }
            });
          });
        });

        return result;
      }
    })));

    return moduleList || [];
  } catch(e) {
    return [];
  }
}

/**
 * `captureMissingModules` util.
 */

const captureMissingModules = (errors) => {
  const result = [];

  const ignoredModules = getIgnoredModules();

  errors.map(item => get(item, 'message').map(item => {
    const description = get(item, 'descr');
    const regx = new RegExp('Cannot resolve module `(.*?)(`|\/)');
    const test = regx.exec(description);

    if (test && !includes(ignoredModules, test[1])) {
      result.push(test[1]);
    }
  }));

  return difference(uniq(result), ['.', '']);
}


/**
 * Export `installAll` command.
 */

export default async function(library, options) {

  const files = getAllJsFiles(process.cwd());
  const errors = [];

  await Promise.all(files.map(async function(file) {
    const errorsList = await flowCheck(file);

    errors.push(...errorsList);
  }));

  const listMissingModules = captureMissingModules(errors);

  console.log("List of modules that will be install:");
  console.log(listMissingModules);
}
