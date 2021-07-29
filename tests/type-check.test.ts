import { expect } from 'chai';

import { isArray, isBoolean, isEqual, isNull, isNullOrUndefined, isNumber, isObject, isString, isUndefined } from '../dist/type-check';

describe('# test ', function () {
  it('## isEqual(obj).', function () {
    expect(isEqual(1, 1)).to.be.ok;
    expect(isEqual(3, '3')).to.not.be.ok;
  });
  it('## isString(obj).', function () {
    expect(isString('1.213')).to.be.ok;
    expect(isString(1)).to.not.be.ok;
    expect(isString(true)).to.not.be.ok;
    expect(isString(false)).to.not.be.ok;
    expect(isString(null)).to.not.be.ok;
    expect(isString(undefined)).to.not.be.ok;
    expect(isString(NaN)).to.not.be.ok;
    expect(isString([])).to.not.be.ok;
    expect(isString([1, 2, 3, 4, 5])).to.not.be.ok;
    expect(isString({ d: '1' })).to.not.be.ok;
  });
  it('## isNumber(obj).', function () {
    expect(isNumber('1.213')).to.not.be.ok;
    expect(isNumber(1)).to.be.ok;
    expect(isNumber(1.213)).to.be.ok;
    expect(isNumber(-1.213)).to.be.ok;
    expect(isNumber(true)).to.not.be.ok;
    expect(isNumber(false)).to.not.be.ok;
    expect(isNumber(null)).to.not.be.ok;
    expect(isNumber(undefined)).to.not.be.ok;
    expect(isNumber(NaN)).to.not.be.ok;
    expect(isNumber([])).to.not.be.ok;
    expect(isNumber([1, 2, 3, 4, 5])).to.not.be.ok;
    expect(isNumber({ d: '1' })).to.not.be.ok;
  });
  it('## isBoolean(obj).', function () {
    expect(isBoolean('1.213')).to.not.be.ok;
    expect(isBoolean(1)).to.not.be.ok;
    expect(isBoolean(true)).to.be.ok;
    expect(isBoolean(false)).to.be.ok;
    expect(isBoolean(null)).to.not.be.ok;
    expect(isBoolean(undefined)).to.not.be.ok;
    expect(isBoolean(NaN)).to.not.be.ok;
    expect(isBoolean([])).to.not.be.ok;
    expect(isBoolean([1, 2, 3, 4, 5])).to.not.be.ok;
    expect(isBoolean({ d: '1' })).to.not.be.ok;
  });
  it('## isUndefined(obj).', function () {
    expect(isUndefined('1.213')).to.not.be.ok;
    expect(isUndefined(1)).to.not.be.ok;
    expect(isUndefined(true)).to.not.be.ok;
    expect(isUndefined(false)).to.not.be.ok;
    expect(isUndefined(null)).to.not.be.ok;
    expect(isUndefined(undefined)).to.be.ok;
    expect(isUndefined(NaN)).to.not.be.ok;
    expect(isUndefined([])).to.not.be.ok;
    expect(isUndefined([1, 2, 3, 4, 5])).to.not.be.ok;
    expect(isUndefined({ d: '1' })).to.not.be.ok;
  });
  it('## isNull(obj).', function () {
    expect(isNull('1.213')).to.not.be.ok;
    expect(isNull(1)).to.not.be.ok;
    expect(isNull(true)).to.not.be.ok;
    expect(isNull(false)).to.not.be.ok;
    expect(isNull(null)).to.be.ok;
    expect(isNull(undefined)).to.not.be.ok;
    expect(isNull(NaN)).to.not.be.ok;
    expect(isNull([])).to.not.be.ok;
    expect(isNull([1, 2, 3, 4, 5])).to.not.be.ok;
    expect(isNull({})).to.not.be.ok;
  });
  it('## isNullOrUndefined(obj).', function () {
    expect(isNullOrUndefined('1.213')).to.not.be.ok;
    expect(isNullOrUndefined(1)).to.not.be.ok;
    expect(isNullOrUndefined(true)).to.not.be.ok;
    expect(isNullOrUndefined(false)).to.not.be.ok;
    expect(isNullOrUndefined(null)).to.be.ok;
    expect(isNullOrUndefined(undefined)).to.be.ok;
    expect(isNullOrUndefined(NaN)).to.not.be.ok;
    expect(isNullOrUndefined([])).to.not.be.ok;
    expect(isNullOrUndefined([1, 2, 3, 4, 5])).to.not.be.ok;
    expect(isNullOrUndefined({ d: '1' })).to.not.be.ok;
  });
  it('## isObject(obj).', function () {
    expect(isObject('1.213')).to.not.be.ok;
    expect(isObject(1)).to.not.be.ok;
    expect(isObject(true)).to.not.be.ok;
    expect(isObject(false)).to.not.be.ok;
    expect(isObject(null)).to.not.be.ok;
    expect(isObject(undefined)).to.not.be.ok;
    expect(isObject(NaN)).to.not.be.ok;
    expect(isObject({ d: '1' })).be.ok;
    expect(isObject([])).to.not.be.ok;
    expect(isObject([1, 2, 3, 4, 5])).to.not.be.ok;
  });
  it('## isArray(obj).', function () {
    expect(isArray('1.213')).to.not.be.ok;
    expect(isArray(1)).to.not.be.ok;
    expect(isArray(true)).to.not.be.ok;
    expect(isArray(false)).to.not.be.ok;
    expect(isArray(null)).to.not.be.ok;
    expect(isArray(undefined)).to.not.be.ok;
    expect(isArray(NaN)).to.not.be.ok;
    expect(isArray({ d: '1' })).to.not.be.ok;
    expect(isArray([])).to.be.ok;
    expect(isArray([1, 2, 3, 4, 5])).to.be.ok;
  });
});
