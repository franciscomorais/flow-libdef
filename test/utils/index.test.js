/**
 * Module dependencies.
 */

import utils from 'utils';

/**
 * Module util test.
 */

describe('Utils', () => {
  it('Should return an object with a valid signature.', () => {
    expect(utils).toEqual({
      checkLibrary: expect.any(Function),
      flowCreateStub: expect.any(Function),
      installFlowDependency: expect.any(Function),
      yarnList: expect.any(Function)
    });
  });
});
