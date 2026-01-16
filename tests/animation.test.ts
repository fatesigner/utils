/**
 * @jest-environment jsdom
 */

import { expect } from 'chai';

describe('# test animation.', function () {
  it('## requestAnimationFrame fallback', function () {
    let called = false;
    jest.useFakeTimers();

    jest.resetModules();
    delete (window as any).requestAnimationFrame;
    delete (window as any).cancelAnimationFrame;
    const { cancelAnimationFrame, requestAnimationFrame } = require('../dist/animation');

    const id = requestAnimationFrame((time) => {
      called = typeof time === 'number';
    });

    expect(id).to.be.ok;
    jest.advanceTimersByTime(20);
    expect(called).to.be.ok;
    cancelAnimationFrame(id as number);
  });

  it('## requestAnimationFrame fallback with error arg', function () {
    let called = false;
    jest.useFakeTimers();

    jest.resetModules();
    delete (window as any).requestAnimationFrame;
    delete (window as any).cancelAnimationFrame;
    const { requestAnimationFrame } = require('../dist/animation');

    requestAnimationFrame((err, time) => {
      called = err === null && typeof time === 'number';
    });

    jest.advanceTimersByTime(20);
    expect(called).to.be.ok;
  });

  it('## requestAnimationFrame native', function () {
    jest.resetModules();
    const originalRaf = (window as any).requestAnimationFrame;
    const originalCaf = (window as any).cancelAnimationFrame;
    const raf = jest.fn((cb: any) => {
      cb(123);
      return 1;
    });
    const caf = jest.fn();
    (window as any).requestAnimationFrame = raf;
    (window as any).cancelAnimationFrame = caf;

    const { requestAnimationFrame, cancelAnimationFrame } = require('../dist/animation');
    const id = requestAnimationFrame((time) => {
      expect(time).to.equal(123);
    });
    cancelAnimationFrame(id);

    expect(raf.mock.calls.length).to.equal(1);
    expect(caf.mock.calls.length).to.equal(1);

    (window as any).requestAnimationFrame = originalRaf;
    (window as any).cancelAnimationFrame = originalCaf;
  });

});
