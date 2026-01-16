import { expect } from 'chai';

jest.mock(
  'gsap',
  () => ({
    __esModule: true,
    gsap: {
      to: jest.fn(),
      utils: {
        snap: jest.fn((increment, value) => value)
      }
    },
    Power1: {
      easeIn: 'easeIn'
    }
  }),
  { virtual: true }
);

import { gaspCounter } from '../dist/gsap';

describe('# test gsap.', function () {
  it('## gaspCounter', function () {
    gaspCounter({}, { end: 10, duration: 0.2 });
    const { gsap } = require('gsap');
    expect(gsap.to.mock.calls.length).to.equal(1);
  });

  it('## gaspCounter with timeline', function () {
    const timeline = {
      to: jest.fn()
    };
    gaspCounter({}, { end: 20 }, 0, timeline as any);
    expect(timeline.to.mock.calls.length).to.equal(1);
  });
});
