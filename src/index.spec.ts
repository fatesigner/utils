/**
 * index.spec
 */

import * as Index from './';

test('## Capitalize.', function() {
  expect(Index.Capitalize('capitalize')).toBe('Capitalize');
});

test('## ConvertToCDB.', function() {
  expect(Index.ConvertToCDB('ａｂｃｄ')).toBe('abcd');
});

test('## ConvertToDBC.', function() {
  expect(Index.ConvertToDBC('abcd')).toBe('ａｂｃｄ');
});

test('## ConvertBridgeStrToHump.', function() {
  expect(Index.ConvertBridgeStrToHump('convert-hump-str-to-bridge')).toBe('convertHumpStrToBridge');
});

test('## ConvertHumpStrToBridge.', function() {
  expect(Index.ConvertHumpStrToBridge('convertHumpStrToBridge')).toBe('convert-hump-str-to-bridge');
});

test('## ConvertToBytesUnit.', function() {
  expect(Index.ConvertToBytesUnit(234123)).toBe('228.64kb');
  expect(Index.ConvertToBytesUnit(234123, undefined, true)).toBe('228.64KB');
  expect(Index.ConvertToBytesUnit(166018, 3, true)).toBe('162.127KB');
  expect(Index.ConvertToBytesUnit(1073741824)).toBe('1.00gb');
  expect(Index.ConvertToBytesUnit(1073741824, 4, false)).toBe('1.0000gb');
});

test('## ConvertToQueryParameters', function() {
  expect(Index.ConvertToQueryParameters({ id: 'a', username: 'user' })).toBe('id=a&username=user');
});

test('## ForEach', function() {
  const res = Index.ForEach(
    [1, 2, 3, 4, 5, 6],
    function(prev, cur, index) {
      if (index === 4) {
        // 模拟 break 退出此次循环
        return false;
      }
      prev += cur;
      return prev;
    },
    0
  );
  expect(res).toBe(10);

  const res2 = Index.ForEach(
    {
      a: 'a1',
      b: 'b1',
      c: 'c1',
      d: 'd1'
    },
    function(prev, cur, index, data) {
      if (index === 2) {
        // 模拟 break 退出此次循环
        return false;
      }
      prev += data[cur];
      return prev;
    },
    ''
  );
  expect(res2).toBe('a1b1');
});
test('## Clone', function() {
  const originalObject = {
    a: 1,
    b: '2',
    c: {
      d: [1, 2, 3],
      f: 4
    }
  };

  const clone = Index.Clone(originalObject, true);

  // 改变 shadowClone 的对象属性
  clone.c.f = 5;

  expect(clone.c.f).toBe(5);

  expect(originalObject.c.f).toBe(4);
});

test('## Extend', function() {
  const originalObject = {
    a: 1,
    b: '2',
    c: {
      f: 4,
      g: {
        h: 2,
        j: 'dsd'
      }
    }
  };

  const extendObj = {
    a: 2,
    b: '3',
    c: {
      g: {
        j: '111111',
        s: 231
      },
      h: {
        s: 33
      }
    }
  };

  const obj = Index.Extend({}, originalObject, extendObj);

  expect(obj.c.f).toBe(undefined);
  expect(obj.c.g.h).toBe(undefined);

  // 深度合并
  const obj2 = Index.DeepExtend({}, originalObject, extendObj);
  expect(obj2.c.f).toBe(4);
  expect(obj2.c.g.h).toBe(2);
});
