/**
 * Module dependencies.
 */

import { get } from 'lodash';
import { yarnList } from 'utils/shell-commands';

/**
 * Export `parseYarnResult` util.
 */

export const parseYarnResult = data => {
  const result = get(data, 'data.trees.0.name');
  const splitLibrary = result ? result.split('@') : [];

  return result ? {
    result,
    splitLibrary: splitLibrary.length === 2 ? splitLibrary : null
  } : {};
};

/**
 * Export `checkLibrary` util.
 */

export async function checkLibrary(library) {
  if (!library) {
    return null;
  }

  const splitLibrary = library.split('@');
  const libraryName = splitLibrary.length >= 2 ? splitLibrary[0] : library;

  try {
    const json = await yarnList(libraryName);

    return parseYarnResult(json);
  } catch(e) {
    return null;
  }
};
