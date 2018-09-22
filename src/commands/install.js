/**
 * Module dependencies.
 */

import { get } from 'lodash';
import {
  checkLibrary,
  flowCreateStub,
  installFlowDependency,
  yarnList
} from 'utils';

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
