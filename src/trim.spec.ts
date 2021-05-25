/*
 * trim.spec
 */

import { expect } from 'chai';

import * as Trim from './trim';

describe('# test trim.', function () {
  it('## Trim(str).', function () {
    const str = Trim.trim('  123  ');
    expect(str).to.equal('123');
  });
  it('## Trim(str, char).', function () {
    const str = Trim.trim('ddddd123ddddd', 'd');
    expect(str).to.equal('123');
  });
  it('## TrimStart(str).', function () {
    const str = Trim.trimStart('    123');
    expect(str).to.equal('123');
  });
  it('## TrimStart(str, char).', function () {
    const str = Trim.trimStart('ffff123', 'f');
    expect(str).to.equal('123');
  });
  it('## TrimEnd(str).', function () {
    const str = Trim.trimEnd('123  ');
    expect(str).to.equal('123');
  });
  it('## TrimEnd(str, char).', function () {
    const str = Trim.trimEnd('123sssssss', 's');
    expect(str).to.equal('123');
  });
});
