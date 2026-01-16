import { expect } from 'chai';

import { getGUID } from '../dist/random';

describe('# test random.', function () {
  it('## GetGUID.', function () {
    expect(getGUID(12)).to.length(12);
  });

  it('## GetGUID standard', function () {
    const guid = getGUID();
    expect(guid.length).to.equal(36);
    expect(guid).to.contain('-');
  });
});
