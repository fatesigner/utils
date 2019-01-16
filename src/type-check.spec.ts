/**
 * TypeCheck.spec
 */

import * as TypeCheck from './type-check';

test('test TypeCheck IsEqual(obj).', function() {
  expect(TypeCheck.IsEqual(1, 1)).toBe(true);
  expect(TypeCheck.IsEqual(3, '3')).toBe(false);
});

test('test TypeCheck IsString(obj).', function() {
  expect(TypeCheck.IsString('1.213')).toBe(true);
  expect(TypeCheck.IsString(1)).toBe(false);
  expect(TypeCheck.IsString(true)).toBe(false);
  expect(TypeCheck.IsString(false)).toBe(false);
  expect(TypeCheck.IsString(null)).toBe(false);
  expect(TypeCheck.IsString(undefined)).toBe(false);
  expect(TypeCheck.IsString(NaN)).toBe(false);
  expect(TypeCheck.IsString([])).toBe(false);
  expect(TypeCheck.IsString([1, 2, 3, 4, 5])).toBe(false);
  expect(TypeCheck.IsString({ d: '1' })).toBe(false);
});

test('test TypeCheck IsNumber(obj).', function() {
  expect(TypeCheck.IsNumber('1.213')).toBe(false);
  expect(TypeCheck.IsNumber(1)).toBe(true);
  expect(TypeCheck.IsNumber(1.213)).toBe(true);
  expect(TypeCheck.IsNumber(-1.213)).toBe(true);
  expect(TypeCheck.IsNumber(true)).toBe(false);
  expect(TypeCheck.IsNumber(false)).toBe(false);
  expect(TypeCheck.IsNumber(null)).toBe(false);
  expect(TypeCheck.IsNumber(undefined)).toBe(false);
  expect(TypeCheck.IsNumber(NaN)).toBe(false);
  expect(TypeCheck.IsNumber([])).toBe(false);
  expect(TypeCheck.IsNumber([1, 2, 3, 4, 5])).toBe(false);
  expect(TypeCheck.IsNumber({ d: '1' })).toBe(false);
});

test('test TypeCheck IsBoolean(obj).', function() {
  expect(TypeCheck.IsBoolean('1.213')).toBe(false);
  expect(TypeCheck.IsBoolean(1)).toBe(false);
  expect(TypeCheck.IsBoolean(true)).toBe(true);
  expect(TypeCheck.IsBoolean(false)).toBe(true);
  expect(TypeCheck.IsBoolean(null)).toBe(false);
  expect(TypeCheck.IsBoolean(undefined)).toBe(false);
  expect(TypeCheck.IsBoolean(NaN)).toBe(false);
  expect(TypeCheck.IsBoolean([])).toBe(false);
  expect(TypeCheck.IsBoolean([1, 2, 3, 4, 5])).toBe(false);
  expect(TypeCheck.IsBoolean({ d: '1' })).toBe(false);
});

it('test TypeCheck IsUndefined(obj).', function() {
  expect(TypeCheck.IsUndefined('1.213')).toBe(false);
  expect(TypeCheck.IsUndefined(1)).toBe(false);
  expect(TypeCheck.IsUndefined(true)).toBe(false);
  expect(TypeCheck.IsUndefined(false)).toBe(false);
  expect(TypeCheck.IsUndefined(null)).toBe(false);
  expect(TypeCheck.IsUndefined(undefined)).toBe(true);
  expect(TypeCheck.IsUndefined(NaN)).toBe(false);
  expect(TypeCheck.IsUndefined([])).toBe(false);
  expect(TypeCheck.IsUndefined([1, 2, 3, 4, 5])).toBe(false);
  expect(TypeCheck.IsUndefined({ d: '1' })).toBe(false);
});

test('test TypeCheck IsNull(obj).', function() {
  expect(TypeCheck.IsNull('1.213')).toBe(false);
  expect(TypeCheck.IsNull(1)).toBe(false);
  expect(TypeCheck.IsNull(true)).toBe(false);
  expect(TypeCheck.IsNull(false)).toBe(false);
  expect(TypeCheck.IsNull(null)).toBe(true);
  expect(TypeCheck.IsNull(undefined)).toBe(false);
  expect(TypeCheck.IsNull(NaN)).toBe(false);
  expect(TypeCheck.IsNull([])).toBe(false);
  expect(TypeCheck.IsNull([1, 2, 3, 4, 5])).toBe(false);
  expect(TypeCheck.IsNull({})).toBe(false);
});

test('test TypeCheck IsNullOrUndefined(obj).', function() {
  expect(TypeCheck.IsNullOrUndefined('1.213')).toBe(false);
  expect(TypeCheck.IsNullOrUndefined(1)).toBe(false);
  expect(TypeCheck.IsNullOrUndefined(true)).toBe(false);
  expect(TypeCheck.IsNullOrUndefined(false)).toBe(false);
  expect(TypeCheck.IsNullOrUndefined(null)).toBe(true);
  expect(TypeCheck.IsNullOrUndefined(undefined)).toBe(true);
  expect(TypeCheck.IsNullOrUndefined(NaN)).toBe(false);
  expect(TypeCheck.IsNullOrUndefined([])).toBe(false);
  expect(TypeCheck.IsNullOrUndefined([1, 2, 3, 4, 5])).toBe(false);
  expect(TypeCheck.IsNullOrUndefined({ d: '1' })).toBe(false);
});

test('test TypeCheck IsObject(obj).', function() {
  expect(TypeCheck.IsObject('1.213')).toBe(false);
  expect(TypeCheck.IsObject(1)).toBe(false);
  expect(TypeCheck.IsObject(true)).toBe(false);
  expect(TypeCheck.IsObject(false)).toBe(false);
  expect(TypeCheck.IsObject(null)).toBe(false);
  expect(TypeCheck.IsObject(undefined)).toBe(false);
  expect(TypeCheck.IsObject(NaN)).toBe(false);
  expect(TypeCheck.IsObject({ d: '1' })).toBe(true);
  expect(TypeCheck.IsObject([])).toBe(false);
  expect(TypeCheck.IsObject([1, 2, 3, 4, 5])).toBe(false);
});

test('test TypeCheck IsArray(obj).', function() {
  expect(TypeCheck.IsArray('1.213')).toBe(false);
  expect(TypeCheck.IsArray(1)).toBe(false);
  expect(TypeCheck.IsArray(true)).toBe(false);
  expect(TypeCheck.IsArray(false)).toBe(false);
  expect(TypeCheck.IsArray(null)).toBe(false);
  expect(TypeCheck.IsArray(undefined)).toBe(false);
  expect(TypeCheck.IsArray(NaN)).toBe(false);
  expect(TypeCheck.IsArray({ d: '1' })).toBe(false);
  expect(TypeCheck.IsArray([])).toBe(true);
  expect(TypeCheck.IsArray([1, 2, 3, 4, 5])).toBe(true);
});
