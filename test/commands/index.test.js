/**
 * Module dependencies.
 */

import commands from 'commands';

/**
 * Module util test.
 */

describe('Utils', () => {
  it('Should return an object with a valid signature.', () => {
    expect(commands).toEqual({
      install: expect.any(Function)
    });
  });
});
