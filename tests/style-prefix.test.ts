/**
 * @jest-environment jsdom
 */

import { expect } from 'chai';

describe('# test style prefix.', function () {
  it('## addStylePrefix with custom prefix', function () {
    const originalCreateElement = document.createElement;
    (document as any).createElement = () => ({
      style: {
        '-webkit-transition': ''
      }
    });

    jest.resetModules();
    const { addStylePrefix } = require('../dist/style');
    const res = addStylePrefix('transition');
    expect(res).to.be.a('string');
    expect(res).to.contain('transition');

    (document as any).createElement = originalCreateElement;
  });

  it('## isSupport true in jsdom', function () {
    jest.resetModules();
    const { isSupport, addStylePrefix } = require('../dist/style');
    expect(isSupport('transition')).to.be.a('boolean');
    expect(addStylePrefix('not-exists')).to.equal('not-exists');
  });

  it('## isSupport non-string in jsdom', function () {
    jest.resetModules();
    const { isSupport } = require('../dist/style');
    expect(isSupport({} as any)).to.equal(false);
  });

  it('## supportPrefix without transition support', function () {
    const originalCreateElement = document.createElement;
    (document as any).createElement = () => ({
      style: {}
    });

    jest.resetModules();
    const { addStylePrefix, supportPrefix } = require('../dist/style');
    expect(supportPrefix).to.equal('');
    expect(addStylePrefix('transition')).to.equal('transition');

    (document as any).createElement = originalCreateElement;
  });
});
