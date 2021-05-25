/**
 * TypeCheck.spec
 */

import { expect } from 'chai';

import * as TypeCheck from './type-check';

describe('# test TypeCheck.', function () {
  it('## isEqual(obj).', function () {
    expect(TypeCheck.isEqual(1, 1)).to.be.ok;
    expect(TypeCheck.isEqual(3, '3')).to.not.be.ok;
  });
  it('## isString(obj).', function () {
    expect(TypeCheck.isString('1.213')).to.be.ok;
    expect(TypeCheck.isString(1)).to.not.be.ok;
    expect(TypeCheck.isString(true)).to.not.be.ok;
    expect(TypeCheck.isString(false)).to.not.be.ok;
    expect(TypeCheck.isString(null)).to.not.be.ok;
    expect(TypeCheck.isString(undefined)).to.not.be.ok;
    expect(TypeCheck.isString(NaN)).to.not.be.ok;
    expect(TypeCheck.isString([])).to.not.be.ok;
    expect(TypeCheck.isString([1, 2, 3, 4, 5])).to.not.be.ok;
    expect(TypeCheck.isString({ d: '1' })).to.not.be.ok;
  });
  it('## isNumber(obj).', function () {
    expect(TypeCheck.isNumber('1.213')).to.not.be.ok;
    expect(TypeCheck.isNumber(1)).to.be.ok;
    expect(TypeCheck.isNumber(1.213)).to.be.ok;
    expect(TypeCheck.isNumber(-1.213)).to.be.ok;
    expect(TypeCheck.isNumber(true)).to.not.be.ok;
    expect(TypeCheck.isNumber(false)).to.not.be.ok;
    expect(TypeCheck.isNumber(null)).to.not.be.ok;
    expect(TypeCheck.isNumber(undefined)).to.not.be.ok;
    expect(TypeCheck.isNumber(NaN)).to.not.be.ok;
    expect(TypeCheck.isNumber([])).to.not.be.ok;
    expect(TypeCheck.isNumber([1, 2, 3, 4, 5])).to.not.be.ok;
    expect(TypeCheck.isNumber({ d: '1' })).to.not.be.ok;
  });
  it('## isBoolean(obj).', function () {
    expect(TypeCheck.isBoolean('1.213')).to.not.be.ok;
    expect(TypeCheck.isBoolean(1)).to.not.be.ok;
    expect(TypeCheck.isBoolean(true)).to.be.ok;
    expect(TypeCheck.isBoolean(false)).to.be.ok;
    expect(TypeCheck.isBoolean(null)).to.not.be.ok;
    expect(TypeCheck.isBoolean(undefined)).to.not.be.ok;
    expect(TypeCheck.isBoolean(NaN)).to.not.be.ok;
    expect(TypeCheck.isBoolean([])).to.not.be.ok;
    expect(TypeCheck.isBoolean([1, 2, 3, 4, 5])).to.not.be.ok;
    expect(TypeCheck.isBoolean({ d: '1' })).to.not.be.ok;
  });
  it('## isUndefined(obj).', function () {
    expect(TypeCheck.isUndefined('1.213')).to.not.be.ok;
    expect(TypeCheck.isUndefined(1)).to.not.be.ok;
    expect(TypeCheck.isUndefined(true)).to.not.be.ok;
    expect(TypeCheck.isUndefined(false)).to.not.be.ok;
    expect(TypeCheck.isUndefined(null)).to.not.be.ok;
    expect(TypeCheck.isUndefined(undefined)).to.be.ok;
    expect(TypeCheck.isUndefined(NaN)).to.not.be.ok;
    expect(TypeCheck.isUndefined([])).to.not.be.ok;
    expect(TypeCheck.isUndefined([1, 2, 3, 4, 5])).to.not.be.ok;
    expect(TypeCheck.isUndefined({ d: '1' })).to.not.be.ok;
  });
  it('## isNull(obj).', function () {
    expect(TypeCheck.isNull('1.213')).to.not.be.ok;
    expect(TypeCheck.isNull(1)).to.not.be.ok;
    expect(TypeCheck.isNull(true)).to.not.be.ok;
    expect(TypeCheck.isNull(false)).to.not.be.ok;
    expect(TypeCheck.isNull(null)).to.be.ok;
    expect(TypeCheck.isNull(undefined)).to.not.be.ok;
    expect(TypeCheck.isNull(NaN)).to.not.be.ok;
    expect(TypeCheck.isNull([])).to.not.be.ok;
    expect(TypeCheck.isNull([1, 2, 3, 4, 5])).to.not.be.ok;
    expect(TypeCheck.isNull({})).to.not.be.ok;
  });
  it('## isNullOrUndefined(obj).', function () {
    expect(TypeCheck.isNullOrUndefined('1.213')).to.not.be.ok;
    expect(TypeCheck.isNullOrUndefined(1)).to.not.be.ok;
    expect(TypeCheck.isNullOrUndefined(true)).to.not.be.ok;
    expect(TypeCheck.isNullOrUndefined(false)).to.not.be.ok;
    expect(TypeCheck.isNullOrUndefined(null)).to.be.ok;
    expect(TypeCheck.isNullOrUndefined(undefined)).to.be.ok;
    expect(TypeCheck.isNullOrUndefined(NaN)).to.not.be.ok;
    expect(TypeCheck.isNullOrUndefined([])).to.not.be.ok;
    expect(TypeCheck.isNullOrUndefined([1, 2, 3, 4, 5])).to.not.be.ok;
    expect(TypeCheck.isNullOrUndefined({ d: '1' })).to.not.be.ok;
  });
  it('## isObject(obj).', function () {
    expect(TypeCheck.isObject('1.213')).to.not.be.ok;
    expect(TypeCheck.isObject(1)).to.not.be.ok;
    expect(TypeCheck.isObject(true)).to.not.be.ok;
    expect(TypeCheck.isObject(false)).to.not.be.ok;
    expect(TypeCheck.isObject(null)).to.not.be.ok;
    expect(TypeCheck.isObject(undefined)).to.not.be.ok;
    expect(TypeCheck.isObject(NaN)).to.not.be.ok;
    expect(TypeCheck.isObject({ d: '1' })).be.ok;
    expect(TypeCheck.isObject([])).to.not.be.ok;
    expect(TypeCheck.isObject([1, 2, 3, 4, 5])).to.not.be.ok;
  });
  it('## isArray(obj).', function () {
    expect(TypeCheck.isArray('1.213')).to.not.be.ok;
    expect(TypeCheck.isArray(1)).to.not.be.ok;
    expect(TypeCheck.isArray(true)).to.not.be.ok;
    expect(TypeCheck.isArray(false)).to.not.be.ok;
    expect(TypeCheck.isArray(null)).to.not.be.ok;
    expect(TypeCheck.isArray(undefined)).to.not.be.ok;
    expect(TypeCheck.isArray(NaN)).to.not.be.ok;
    expect(TypeCheck.isArray({ d: '1' })).to.not.be.ok;
    expect(TypeCheck.isArray([])).to.be.ok;
    expect(TypeCheck.isArray([1, 2, 3, 4, 5])).to.be.ok;
  });
});
