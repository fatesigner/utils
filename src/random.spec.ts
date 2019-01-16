/*
 * random.spec
 */

import * as Random from './random';

test('test random GetGUID.', function() {
  expect(Random.GetGUID(12).length).toBe(12);
});
