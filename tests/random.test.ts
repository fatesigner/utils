import { expect } from 'chai';

import { getGUID } from '../dist/random';

describe('# test random.', function () {
  it('## GetGUID.', function () {
    expect(getGUID(12)).to.length(12);
  });
});
