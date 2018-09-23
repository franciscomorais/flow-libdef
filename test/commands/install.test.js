/**
 * Module dependencies.
 */

import { messages } from 'locale';
import installCommand from 'commands/install';

/**
 * Mocks module `async-exec`.
 */

jest.mock('async-exec', () => jest.fn(command => new Promise((resolve, reject) => {

  if (command.startsWith('yarn list')) {

    const module = new RegExp('yarn\ list\ (.*?)(\ |$)').exec(command)[1];

    if (module === 'invalidModule') {
      resolve('');
    }

    if (module === 'throwTerminal') {
      resolve('This is a terminal error!');
    }

    return resolve(JSON.stringify({
      data: {
        trees: [{
          name: `${module}@bar`
        }]
      }
    }));
  }

  if (command.startsWith('flow-typed create-stub') || command.startsWith('flow-typed install')) {
    const module = new RegExp('flow\-typed\ (create\-stub|install)\ (.*?)(\ |$)').exec(command)[2];

    if (module === 'invalidModule') {
      throw new Error('invalidModule');
    }

    resolve('success');
  }

  resolve('');
})));

/**
 * Install command test.
 */

describe('Commands - Install', () => {
  const module = 'lodash';
  const invalidModule = 'invalidModule';
  const _utils = { ...require('utils') };
  const utils = require('utils');
  const _console = {
    ...global.console
  };

  it('Should returns a valid message when you try install a module', async () => {
    global.console.log = jest.fn(value => value);

    const result = await installCommand(module, null);

    expect(result).toBe(true);
    expect(global.console.log).toHaveBeenLastCalledWith(messages.successful(`${module}@bar`));

    global.console.log = _console.log;
  });

  it('Should returns an error if create-stub returns an error', async () => {
    jest.unmock('utils');

    global.console.log = jest.fn(value => value);
    utils.flowCreateStub = jest.fn(() => false);
    utils.installFlowDependency = jest.fn(() => false);

    const result = await installCommand(module, null);

    expect(result).toBe(false);
    expect(global.console.log).toHaveBeenLastCalledWith(messages.somethingWrong(`${module}@bar`));

    global.console.log = _console.log;
    utils.flowCreateStub = _utils.flowCreateStub;
    utils.installFlowDependency = _utils.installFlowDependency;
  });

  it('Should returns success if create-stub returns success', async () => {
    jest.unmock('utils');

    global.console.log = jest.fn(value => value);
    utils.installFlowDependency = jest.fn(() => false);

    const result = await installCommand(module, null);

    expect(result).toBe(true);
    expect(global.console.log).toHaveBeenLastCalledWith(messages.somethingWrong(`${module}@bar`));

    global.console.log = _console.log;
  });

  it('Should returns an error if dont pass library name', async () => {
    global.console.log = jest.fn(value => value);

    const result = await installCommand();

    expect(result).toBe(false);
    expect(global.console.log).toHaveBeenLastCalledWith(messages.libraryNotFound(undefined));

    global.console.log = _console.log;
  });

  it('Should returns an error if could find a valid version to respective library', async () => {

    global.console.log = jest.fn(value => value);
    utils.checkLibrary = jest.fn(() => ({
      result: null,
      splitLibrary: null
    }));

    const result = await installCommand();

    expect(result).toBe(false);
    expect(global.console.log).toHaveBeenLastCalledWith(messages.libraryNotFound(undefined));

    global.console.log = _console.log;
    utils.checkLibrary = _utils.checkLibrary;
  });

  it('Should returns error if some exception is triggered while try install something', async () => {

    global.console.log = jest.fn(value => value);
    utils.installFlowDependency = jest.fn(() => {
      throw new Error();
    });

    const result = await installCommand('lodash');

    expect(result).toBe(false);
    expect(global.console.log).toHaveBeenLastCalledWith(messages.somethingWrong('lodash@bar'));

    global.console.log = _console.log;
    utils.installFlowDependency = _utils.installFlowDependency;
  });
});
