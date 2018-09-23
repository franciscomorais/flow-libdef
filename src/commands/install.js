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

import { messages } from 'locale';


/**
 * Export `install` command.
 */

export default async function(library, options) {
  const libraryData = await checkLibrary(library);

  if (!libraryData) {
    messages.libraryNotFound(library);

    return false;
  }

  const { result, splitLibrary } = libraryData;

  if (!splitLibrary || splitLibrary.length !== 2) {
    messages.cantReadVersion(result);

    return false;
  }

  try {
    const installationResult = await installFlowDependency(result);

    if (!(installationResult)) {
      const tryCreateStub = await flowCreateStub(result);

      if (!(tryCreateStub)) {
        messages.somethingWrong(result);

        return false;
      } else {
        console.log(tryCreateStub);
      }
    } else {
      console.log(installationResult);
    }

    messages.successful(result);

    return true;
  } catch(e) {
    messages.somethingWrong(result);

    return false;
  }
};
