/*
 * trim.spec
 */

import * as Trim from './trim';

it('test Trim(str).', function() {
  const str = Trim.Trim('  123  ');
  expect(str).toBe('123');
});

it('test Trim(str, char).', function() {
  const str = Trim.Trim('ddddd123ddddd', 'd');
  expect(str).toBe('123');
});

it('test TrimStart(str).', function() {
  const str = Trim.TrimStart('    123');
  expect(str).toBe('123');
});

it('test TrimStart(str, char).', function() {
  const str = Trim.TrimStart('ffff123', 'f');
  expect(str).toBe('123');
});

it('test TrimEnd(str).', function() {
  const str = Trim.TrimEnd('123  ');
  expect(str).toBe('123');
});

it('test TrimEnd(str, char).', function() {
  const str = Trim.TrimEnd('123sssssss', 's');
  expect(str).toBe('123');
});
