/*
 * random.spec
 */

import { expect } from 'chai';

import * as Random from './random';

describe('# test random.', function () {
  it('## GetGUID.', function () {
    expect(Random.getGUID(12)).to.length(12);
  });
});
