/*
 * validator.spec
 */

import * as Validator from './validator';

test('test validator Required', function() {
  expect(Validator.Required(12)).toBe(true);
  expect(Validator.Required([])).toBe(false);
  expect(Validator.Required([1])).toBe(true);
});

test('test validator IsNumber', function() {
  expect(Validator.IsNumber(12)).toBe(true);
  expect(Validator.IsNumber('12')).toBe(true);
  expect(Validator.IsNumber('14d')).toBe(false);
});

test('test validator LenLimit', function() {
  expect(Validator.LenLimit('13', 3, 5)).toBe(false);
  expect(Validator.LenLimit('1344', 3, 5)).toBe(true);
  expect(Validator.LenLimit('12afasda', 1, 10)).toBe(true);
  expect(Validator.LenLimit('14dfasdas', 1, 4)).toBe(false);
});

test('test validator IsInt', function() {
  expect(Validator.IsInt(231)).toBe(true);
  expect(Validator.IsInt(231.0)).toBe(true);
  expect(Validator.IsInt(231.01)).toBe(false);
  expect(Validator.IsInt(231.2)).toBe(false);
  expect(Validator.IsInt('231')).toBe(true);
  expect(Validator.IsInt(-231)).toBe(true);
  expect(Validator.IsInt('-231')).toBe(true);
  expect(Validator.IsInt('--231')).toBe(false);
  expect(Validator.IsInt('13', true)).toBe(true);
  expect(Validator.IsInt('-13', true)).toBe(false);
  expect(Validator.IsInt('-13', false)).toBe(true);
  expect(Validator.IsInt('13', false)).toBe(false);
});

test('test validator IsDecimal', function() {
  expect(Validator.IsDecimal(231)).toBe(true);
  expect(Validator.IsDecimal(-231)).toBe(true);
  expect(Validator.IsDecimal('--231')).toBe(false);
  expect(Validator.IsDecimal('2d')).toBe(false);
  expect(Validator.IsDecimal('-2dda')).toBe(false);
  expect(Validator.IsDecimal('134', [1, 3], [2])).toBe(true);
  expect(Validator.IsDecimal('1342', [1, 3], [2])).toBe(false);
  expect(Validator.IsDecimal('134', [2, 3], [2])).toBe(true);
  expect(Validator.IsDecimal('1', [2, 3], [2])).toBe(false);
  expect(Validator.IsDecimal('13', [1, 18], [0, 2])).toBe(true);
  expect(Validator.IsDecimal('13', [1, 18], [0, 2])).toBe(true);
  expect(Validator.IsDecimal('13.33', [1, 18], [2, 2])).toBe(true);
  expect(Validator.IsDecimal('13.3334', [1, 18], [2, 2])).toBe(false);
});

test('test validator IsCellphone', function() {
  const nums = [
    ...[...Array(10).keys()].map(i => 130 + i),
    ...[145, 147],
    ...[...Array(10).keys()].map(i => 150 + i),
    ...[...Array(10).keys()].map(i => 160 + i),
    ...[170, 176, 177, 178],
    ...[...Array(10).keys()].map(i => 180 + i),
    ...[198, 199]
  ];

  nums.forEach(num => {
    const rdm =
      num +
      Math.random()
        .toString()
        .replace('0.', '')
        .substr(0, 8)
        .toString();
    expect(Validator.IsCellphone(num + rdm)).toBe(true);
  });
});

test('test validator IsIdCard', function() {
  expect(Validator.IsIdCard('360731199601021245')).toBe(true);
  expect(Validator.IsIdCard('60731199601021245')).toBe(false);
  expect(Validator.IsIdCard('3607311996010212451')).toBe(false);
  expect(Validator.IsIdCard('360731850213582')).toBe(true);
  expect(Validator.IsIdCard('36073119960102124X')).toBe(true);
});

test('test validator IsEmail', function() {
  expect(Validator.IsEmail('123123@gmail.com')).toBe(true);
  expect(Validator.IsEmail('@gmail.com')).toBe(false);
  expect(Validator.IsEmail('123123gmail.com')).toBe(false);
  expect(Validator.IsEmail('123123@.com')).toBe(false);
  expect(Validator.IsEmail('123123@gmailcom')).toBe(true);
  expect(Validator.IsEmail('123123@gmail.')).toBe(false);
});

test('test validator Password', function() {
  expect(Validator.Password('12345')).toBe(false);
  expect(Validator.Password('1234545123412345123')).toBe(false);
  expect(Validator.Password('123456')).toBe(false);
  expect(Validator.Password('asdsaf')).toBe(false);
  expect(Validator.Password('123456csd', 20, 23)).toBe(false);
  expect(Validator.Password('123456csd', 6, 12)).toBe(true);
  expect(Validator.Password('1234#$.12dqwe56csd')).toBe(true);
  expect(Validator.Password('1234#$.12dqwe56csdgasdasdasdasda')).toBe(false);
});
