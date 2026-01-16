import { expect } from 'chai';

import { LenLimit, Password, Required, isCellphone, isDecimal, isEmail, isIdCard, isInt, isNumber } from '../dist/validator';

describe('# test validator.', function () {
  it('## isNumber', function () {
    expect(isNumber(12)).to.be.ok;
    expect(isNumber('12')).to.be.ok;
    expect(isNumber('14d')).to.not.be.ok;
  });
  it('## isInt', function () {
    expect(isInt(231)).to.be.ok;
    expect(isInt(231.0)).to.be.ok;
    expect(isInt(231.01)).to.not.be.ok;
    expect(isInt(231.2)).to.not.be.ok;
    expect(isInt('231')).to.be.ok;
    expect(isInt(-231)).to.be.ok;
    expect(isInt('-231')).to.be.ok;
    expect(isInt('--231')).to.not.be.ok;
    expect(isInt('13', true)).to.be.ok;
    expect(isInt('-13', true)).to.not.be.ok;
    expect(isInt('-13', false)).to.be.ok;
    expect(isInt('13', false)).to.not.be.ok;
  });
  it('## isDecimal', function () {
    expect(isDecimal(231)).to.be.ok;
    expect(isDecimal(-231)).to.be.ok;
    expect(isDecimal('--231')).to.not.be.ok;
    expect(isDecimal('2d')).to.not.be.ok;
    expect(isDecimal('-2dda')).to.not.be.ok;
    expect(isDecimal('134', [1, 3], [2])).to.be.ok;
    expect(isDecimal('1342', [1, 3], [2])).to.not.be.ok;
    expect(isDecimal('134', [2, 3], [2])).to.be.ok;
    expect(isDecimal('1', [2, 3], [2])).to.not.be.ok;
    expect(isDecimal('13', [1, 18], [0, 2])).to.be.ok;
    expect(isDecimal('13', [1, 18], [0, 2])).to.be.ok;
    expect(isDecimal('13.33', [1, 18], [2, 2])).to.be.ok;
    expect(isDecimal('13.3334', [1, 18], [2, 2])).to.not.be.ok;
  });
  it('## isCellphone', function () {
    const nums = [
      ...[...Array(10).keys()].map((i) => 130 + i),
      ...[145, 147],
      ...[...Array(10).keys()].map((i) => 150 + i),
      ...[...Array(10).keys()].map((i) => 160 + i),
      ...[170, 176, 177, 178],
      ...[...Array(10).keys()].map((i) => 180 + i),
      ...[198, 199]
    ];

    nums.forEach((num) => {
      const rdm = num + Math.random().toString().replace('0.', '').substr(0, 8).toString();
      expect(isCellphone(num + rdm)).to.be.ok;
    });
  });
  it('## isIdCard', function () {
    expect(isIdCard('360731199601021245')).to.be.ok;
    expect(isIdCard('60731199601021245')).to.not.be.ok;
    expect(isIdCard('3607311996010212451')).to.not.be.ok;
    expect(isIdCard('360731850213582')).to.be.ok;
    expect(isIdCard('36073119960102124X')).to.be.ok;
  });
  it('## isEmail', function () {
    expect(isEmail('123123@gmail.com')).to.be.ok;
    expect(isEmail('@gmail.com')).to.not.be.ok;
    expect(isEmail('123123gmail.com')).to.not.be.ok;
    expect(isEmail('123123@.com')).to.not.be.ok;
    expect(isEmail('123123@gmailcom')).to.be.ok;
    expect(isEmail('123123@gmail.')).to.not.be.ok;
  });

  it('## Required', function () {
    expect(Required(undefined)).to.not.be.ok;
    expect(Required(null)).to.not.be.ok;
    expect(Required('')).to.not.be.ok;
    expect(Required('x')).to.be.ok;
    expect(Required([])).to.not.be.ok;
    expect(Required([1])).to.be.ok;
    expect(Required(false)).to.not.be.ok;
    expect(Required(true)).to.be.ok;
    expect(Required(0)).to.be.ok;
  });

  it('## LenLimit', function () {
    expect(LenLimit('abc', 1, 3)).to.be.ok;
    expect(LenLimit('abcd', 1, 3)).to.not.be.ok;
    expect(LenLimit(undefined as any, 1, 3)).to.be.ok;
    let error: Error;
    try {
      LenLimit('abc', undefined as any, undefined as any);
    } catch (err: any) {
      error = err;
    }
    expect(error).to.be.instanceof(Error);
  });

  it('## isInt null and string empty', function () {
    expect(isInt(undefined as any)).to.be.ok;
    expect(isInt('')).to.not.be.ok;
  });

  it('## isDecimal null', function () {
    expect(isDecimal(undefined as any)).to.be.ok;
  });

  it('## isCellphone empty', function () {
    expect(isCellphone('')).to.be.ok;
  });

  it('## isIdCard empty', function () {
    expect(isIdCard('')).to.be.ok;
  });

  it('## Password', function () {
    expect(Password('abc123')).to.be.ok;
    expect(Password('abcdef')).to.not.be.ok;
    expect(Password('123456')).to.not.be.ok;
    expect(Password('a1', 1, 2)).to.be.ok;
    expect(Password('', 1, 2)).to.be.ok;
  });
});
