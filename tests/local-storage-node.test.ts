import { expect } from 'chai';

import { LocalStorage, setIdentification } from '../dist/local-storage';

describe('# test local-storage in node.', function () {
  it('## no window environment', function () {
    setIdentification('app');
    LocalStorage.set('key', { a: 1 });
    expect(LocalStorage.get('key')).to.equal(null);
    LocalStorage.remove('key');
  });
});
