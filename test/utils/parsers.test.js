
/**
 * Module dependencies.
 */

import { checkLibrary, parseYarnResult } from 'utils/parsers';

/**
 * Mock `async-exec` module.
 */

jest.mock('async-exec', () => jest.fn(command => new Promise((resolve, reject) => {

  if (command.startsWith('yarn list')) {

    const module = new RegExp('yarn\ list\ (.*?)\ ').exec(command)[1];

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

  resolve('');
})));

/**
 * Parsers util test.
 */

describe('Utils - Parsers', () => {

  /**
   * Describe `parseYarnResult` util.
   */

  describe('parseYarnResult', () => {
    it('Should return a empty object if data is null', () => {
      const data = null;

      expect(parseYarnResult(data)).toEqual({});
    });

    it('Should return a empty object if data is undefined', () => {
      expect(parseYarnResult()).toEqual({});
    });

    it('Should return a empty object if data doesn\'t contain a valid name on the tree', () => {
      const data = {
        data: {
          trees: [{}, {
            name: 'foo'
          }]
        }
      };

      expect(parseYarnResult(data)).toEqual({});
    });

    it('Should return an object with a result attribute if data contains a valid name on the tree', () => {
      const data = {
        data: {
          trees: [{
            name: 'foo'
          }]
        }
      };

      expect(parseYarnResult(data)).toEqual({
        result: 'foo',
        splitLibrary: null
      });
    });

    it('Should return an object with a result and splittedLibrary attribute if data contains a valid name with version on the tree', () => {
      const data = {
        data: {
          trees: [{
            name: 'foo@bar'
          }]
        }
      };

      expect(parseYarnResult(data)).toEqual({
        result: 'foo@bar',
        splitLibrary: ['foo', 'bar']
      });
    });
  })

  /**
   * Describe `checkLibrary` util.
   */

  describe('checkLibrary', () => {
    it('Should return null if pass an invalid module to install', async () => {
      expect(await checkLibrary('invalidModule')).toBeNull();
    });

    it('Should return null if exec trigger an exception', async () => {
      expect(await checkLibrary('throwTerminal')).toBeNull();
    });

    it('Should return null if not pass anything', async () => {
      expect(await checkLibrary()).toBeNull();
    });

    it('Should returns success object if pass a valid module with version to install', async () => {
      expect(await checkLibrary('foo@bar')).toEqual({
        result: 'foo@bar',
        splitLibrary: [ 'foo', 'bar' ]
      });
    });

    it('Should returns success object if pass a valid module to install', async () => {
      expect(await checkLibrary('foo')).toEqual({
        result: 'foo@bar',
        splitLibrary: [ 'foo', 'bar' ]
      });
    });
  });
});
