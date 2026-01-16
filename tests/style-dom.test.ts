/**
 * @jest-environment jsdom
 */

import { expect } from 'chai';

import { addStylePrefix, isSupport } from '../dist/style';

describe('# test style dom.', function () {
  it('## isSupport with document', function () {
    expect(isSupport('transition')).to.equal(true);
    expect(isSupport(123 as any)).to.equal(false);
  });

  it('## addStylePrefix with document', function () {
    const res = addStylePrefix('transition');
    expect(res.endsWith('transition')).to.equal(true);
  });

});
