import { expect } from 'chai';

import { addStylePrefix, isSupport } from '../dist/style';

describe('# test style.', function () {
  it('## isSupport in node', function () {
    expect(isSupport('transition')).to.equal(false);
    expect(isSupport({} as any)).to.equal(false);
  });

  it('## addStylePrefix', function () {
    expect(addStylePrefix('transition')).to.equal('transition');
  });
});
