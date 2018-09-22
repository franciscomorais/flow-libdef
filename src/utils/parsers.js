/**
 * Module dependencies.
 */

import { get } from 'lodash';
import { yarnList } from './shell-commands';

/**
 * Export `checkLibrary` util.
 */

export async function checkLibrary(library) {
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
