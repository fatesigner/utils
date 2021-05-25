/*
 * validator.spec
 */

import { expect } from 'chai';

import * as Validator from './validator';

describe('# test validator.', function () {
  it('## Required', function () {
    expect(Validator.Required(12)).to.be.ok;
    expect(Validator.Required([])).to.not.be.ok;
    expect(Validator.Required([1])).to.be.ok;
  });
  it('## isNumber', function () {
    expect(Validator.isNumber(12)).to.be.ok;
    expect(Validator.isNumber('12')).to.be.ok;
    expect(Validator.isNumber('14d')).to.not.be.ok;
  });
  it('## LenLimit', function () {
    expect(Validator.LenLimit('13', 3, 5)).to.not.be.ok;
    expect(Validator.LenLimit('1344', 3, 5)).to.be.ok;
    expect(Validator.LenLimit('12afasda', 1, 10)).to.be.ok;
    expect(Validator.LenLimit('14dfasdas', 1, 4)).to.not.be.ok;
  });
  it('## isInt', function () {
    expect(Validator.isInt(231)).to.be.ok;
    expect(Validator.isInt(231.0)).to.be.ok;
    expect(Validator.isInt(231.01)).to.not.be.ok;
    expect(Validator.isInt(231.2)).to.not.be.ok;
    expect(Validator.isInt('231')).to.be.ok;
    expect(Validator.isInt(-231)).to.be.ok;
    expect(Validator.isInt('-231')).to.be.ok;
    expect(Validator.isInt('--231')).to.not.be.ok;
    expect(Validator.isInt('13', true)).to.be.ok;
    expect(Validator.isInt('-13', true)).to.not.be.ok;
    expect(Validator.isInt('-13', false)).to.be.ok;
    expect(Validator.isInt('13', false)).to.not.be.ok;
  });
  it('## isDecimal', function () {
    expect(Validator.isDecimal(231)).to.be.ok;
    expect(Validator.isDecimal(-231)).to.be.ok;
    expect(Validator.isDecimal('--231')).to.not.be.ok;
    expect(Validator.isDecimal('2d')).to.not.be.ok;
    expect(Validator.isDecimal('-2dda')).to.not.be.ok;
    expect(Validator.isDecimal('134', [1, 3], [2])).to.be.ok;
    expect(Validator.isDecimal('1342', [1, 3], [2])).to.not.be.ok;
    expect(Validator.isDecimal('134', [2, 3], [2])).to.be.ok;
    expect(Validator.isDecimal('1', [2, 3], [2])).to.not.be.ok;
    expect(Validator.isDecimal('13', [1, 18], [0, 2])).to.be.ok;
    expect(Validator.isDecimal('13', [1, 18], [0, 2])).to.be.ok;
    expect(Validator.isDecimal('13.33', [1, 18], [2, 2])).to.be.ok;
    expect(Validator.isDecimal('13.3334', [1, 18], [2, 2])).to.not.be.ok;
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
      expect(Validator.isCellphone(num + rdm)).to.be.ok;
    });
  });
  it('## isIdCard', function () {
    expect(Validator.isIdCard('360731199601021245')).to.be.ok;
    expect(Validator.isIdCard('60731199601021245')).to.not.be.ok;
    expect(Validator.isIdCard('3607311996010212451')).to.not.be.ok;
    expect(Validator.isIdCard('360731850213582')).to.be.ok;
    expect(Validator.isIdCard('36073119960102124X')).to.be.ok;
  });
  it('## isEmail', function () {
    expect(Validator.isEmail('123123@gmail.com')).to.be.ok;
    expect(Validator.isEmail('@gmail.com')).to.not.be.ok;
    expect(Validator.isEmail('123123gmail.com')).to.not.be.ok;
    expect(Validator.isEmail('123123@.com')).to.not.be.ok;
    expect(Validator.isEmail('123123@gmailcom')).to.be.ok;
    expect(Validator.isEmail('123123@gmail.')).to.not.be.ok;
  });
  it('## Password', function () {
    expect(Validator.Password('12345')).to.not.be.ok;
    expect(Validator.Password('1234545123412345123')).to.not.be.ok;
    expect(Validator.Password('123456')).to.not.be.ok;
    expect(Validator.Password('asdsaf')).to.not.be.ok;
    expect(Validator.Password('123456csd', 20, 23)).to.not.be.ok;
    expect(Validator.Password('123456csd', 6, 12)).to.be.ok;
    expect(Validator.Password('1234#$.12dqwe56csd')).to.be.ok;
    expect(Validator.Password('1234#$.12dqwe56csdgasdasdasdasda')).to.not.be.ok;
  });
});
