import { expect } from 'chai';

import { trim, trimEnd, trimStart } from '../dist/trim';

describe('# test trim.', function () {
  it('## Trim(str).', function () {
    const str = trim('  123  ');
    expect(str).to.equal('123');
  });
  it('## Trim(str, char).', function () {
    const str = trim('ddddd123ddddd', 'd');
    expect(str).to.equal('123');
  });
  it('## TrimStart(str).', function () {
    const str = trimStart('    123');
    expect(str).to.equal('123');
  });
  it('## TrimStart(str, char).', function () {
    const str = trimStart('ffff123', 'f');
    expect(str).to.equal('123');
  });
  it('## TrimEnd(str).', function () {
    const str = trimEnd('123  ');
    expect(str).to.equal('123');
  });
  it('## TrimEnd(str, char).', function () {
    const str = trimEnd('123sssssss', 's');
    expect(str).to.equal('123');
  });
});
