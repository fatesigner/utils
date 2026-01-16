/**
 * @jest-environment jsdom
 */

import { expect } from 'chai';

import { LocalStorage, setIdentification } from '../dist/local-storage';

describe('# test local-storage.', function () {
  it('## set/get/remove', function () {
    setIdentification('app');
    LocalStorage.set('key', { a: 1 });
    const res = LocalStorage.get('key');
    expect(res).to.deep.equal({ a: 1 });
    LocalStorage.remove('key');
    expect(LocalStorage.get('key')).to.equal(null);
  });

  it('## get invalid json', function () {
    setIdentification('app');
    window.localStorage.setItem('app_key', '{');
    expect(LocalStorage.get('key')).to.equal(null);
  });

  it('## no localStorage', function () {
    const originalStorage = window.localStorage;
    Object.defineProperty(window, 'localStorage', {
      value: undefined,
      configurable: true
    });
    LocalStorage.set('x', 1);
    expect(LocalStorage.get('x')).to.equal(null);
    LocalStorage.remove('x');
    Object.defineProperty(window, 'localStorage', {
      value: originalStorage,
      configurable: true
    });
  });
});
