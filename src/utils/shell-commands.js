/**
 * Module dependencies.
 */

import exec from 'async-exec';

/**
 * Export `yarnList` command.
 */

export async function yarnList(library) {
  const output = await exec(`yarn list ${library} --json`);

  return JSON.parse(output);
};

/**
 * Export `flowCreateStub` command.
 */

export async function flowCreateStub(library) {
  try {
    return await exec(`flow-typed create-stub ${library}`);
  } catch(e) {
    return false;
  }
}

/**
 * Export `installFlowDependency` command.
 */

export async function installFlowDependency(library) {
  try {
    return await exec(`flow-typed install ${library}`);
  } catch(e) {
    return false;
  }
}
