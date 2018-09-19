/**
 * Module dependencies.
 */

import { get } from 'lodash';
import exec from 'async-exec';

/**
 * Messages.
 */

const messages = {
  cantReadVersion: library => console.log(`\nERR: Something wrong. I can't read name and version of ${result}\n`),
  libraryNotFound: library => console.log(`\nERR: ${library} not found. Are you sure this library is installed?\n`),
  somethingWrong: library => console.log(`\nSomething went wrong while installing ${library} flow dependency`),
  successful: library => console.log(`\nThe library ${library} was installed successfully.\n`)
}

/**
 * `yarnList` command.
 */

async function yarnList(library) {
  const output = await exec(`yarn list ${library} --json`);

  return JSON.parse(output);
};

/**
 * `installFlowDependency` command.
 */

async function installFlowDependency(library) {
  try {
    return await exec(`flow-typed install ${library}`);
  } catch(e) {
    return false;
  }
}

/**
 * `flowCreateStub` command.
 */

async function flowCreateStub(library) {
  try {
    return await exec(`flow-typed create-stub ${library}`);
  } catch(e) {
    return false;
  }
}

/**
 * `checkLibrary` util.
 */

async function checkLibrary(library) {
  const splitLibrary = library.split('@');

  if (splitLibrary.length < 2) {
    try {
      const json = await yarnList(library);
      const result = get(json, 'data.trees.0.name');

      return result ? {
        result,
        splitLibrary: result ? result.split('@') : null
      } : {};
    } catch(e) {
      return null;
    }
  }
};

/**
 * Export `install` command.
 */

export default async function(library, options) {
  const libraryData = await checkLibrary(library);

  if (!libraryData) {
    messages.libraryNotFound(library);

    return;
  }

  const { result, splitLibrary } = libraryData;

  if (!splitLibrary || splitLibrary.length !== 2) {
    messages.cantReadVersion(result);

    return;
  }

  try {
    const installationResult = await installFlowDependency(result);

    if (!(installationResult)) {
      const tryCreateStub = await flowCreateStub(result);

      if (!(tryCreateStub)) {
        messages.somethingWrong(result);

        return;
      } else {
        console.log(tryCreateStub);
      }
    } else {
      console.log(installationResult);
    }

    messages.successful(result);
  } catch(e) {
    messages.somethingWrong(result);
  }
};
