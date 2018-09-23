/**
 * Module dependencies.
 */

import {
  flowCreateStub,
  installFlowDependency,
  yarnList
} from 'utils/shell-commands';

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
 * Module shell commands test.
 */

describe('Shell Commands', () => {

  /**
   * Describe `flowCreateStub` util.
   */

  describe('flowCreateStub', () => {
    it('Should returns false if the exec module returns an exception', async () => {
      expect(await flowCreateStub('invalidModule')).toEqual(false);
    });

    it('Should returns a valid string if the exec module returns an exception', async () => {
      expect(typeof (await flowCreateStub('lodash'))).toBe('string');
    });
  });

  /**
   * Describe `installFlowDependency` util.
   */

  describe('installFlowDependency', () => {
    it('Should returns false if the exec module returns an exception', async () => {
      expect(await installFlowDependency('invalidModule')).toEqual(false);
    });

    it('Should returns a valid string if the exec module returns an exception', async () => {
      expect(typeof (await flowCreateStub('lodash'))).toBe('string');
    });
  });

  /**
   * Describe `yarnList` util.
   */

  describe('yarnList', () => {
    it('Should returns a valid json if pass a valid library', async () => {
      expect(await yarnList('lodash')).toEqual({
        data: {
          trees: [{
            name: 'lodash@bar'
          }]
        }
      });
    });

    it('Should returns a exception if pass an invalid library', async () => {
      let message;

      try {
        await yarnList('invalidModule')
      } catch (e) {
        message = e.message
      }

      expect(message).toEqual('Unexpected end of JSON input');
    });
  });
});
