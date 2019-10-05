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

test('test main GroupBy', function () {
  const arr = [
    { parentId: '3', parentText: 'text3', id: '1', text: '1' },
    { parentId: '1', parentText: 'text1', id: '2', text: '1' },
    { parentId: '1', parentText: 'text1', id: '3', text: '1' },
    { parentId: '2', parentText: 'text2', id: '4', text: '1' },
    { parentId: '3', parentText: 'text3', id: '5', text: '1' },
    { parentId: '3', parentText: 'text3', id: '6', text: '1' },
    { parentId: '2', parentText: 'text2', id: '7', text: '1' },
    { parentId: '4', parentText: 'text4', id: '8', text: '4' }
  ];

  const arrGrouped = Index.GroupBy(arr, 'parentId');

  expect(arrGrouped.length).toBe(4);
  expect(Object.prototype.hasOwnProperty.call(arrGrouped[0], 'parentId')).toBe(true);
  expect(Object.prototype.hasOwnProperty.call(arrGrouped[0], 'parentText')).toBe(false);

  const arrGrouped2 = Index.GroupBy(arr, 'parentId', (cur) => {
    return {
      parentText: cur.parentText
    };
  });

  expect(arrGrouped2.length).toBe(4);
  expect(Object.prototype.hasOwnProperty.call(arrGrouped2[0], 'parentId')).toBe(true);
  expect(Object.prototype.hasOwnProperty.call(arrGrouped2[0], 'parentText')).toBe(true);
});

test('test main Index.ToFixed', function () {
  const num = 12345.6789;
  expect(Index.ToFixed(num, 2, 'normal')).toBe(12345.68);
  expect(Index.ToFixed(num, 2, 'round')).toBe(12345.68);
  expect(Index.ToFixed(num, 2, 'increase')).toBe(12345.68);
  expect(Index.ToFixed(num, 2, 'ignore')).toBe(12345.67);

  expect(Index.ToFixed(12345.6749, 2, 'normal')).toBe(12345.67);
  expect(Index.ToFixed(12345.6769, 2, 'normal')).toBe(12345.68);
  expect(Index.ToFixed(12345.6759, 2, 'normal')).toBe(12345.68);
  expect(Index.ToFixed(12345.6659, 2, 'normal')).toBe(12345.66);
  expect(Index.ToFixed(12345.6759, 5, 'normal')).toBe(12345.6759);

  expect(Index.ToFixed(12345.6749, 2, 'round')).toBe(12345.67);
  expect(Index.ToFixed(12345.6769, 2, 'round')).toBe(12345.68);
  expect(Index.ToFixed(12345.6759, 2, 'round')).toBe(12345.68);
  expect(Index.ToFixed(12345.6659, 2, 'round')).toBe(12345.67);
  expect(Index.ToFixed(12345.6759, 5, 'round')).toBe(12345.6759);

  expect(Index.ToFixed(12345.6709, 2, 'increase')).toBe(12345.67);
  expect(Index.ToFixed(12345.6749, 2, 'increase')).toBe(12345.68);
  expect(Index.ToFixed(12345.6769, 2, 'increase')).toBe(12345.68);
  expect(Index.ToFixed(12345.6759, 2, 'increase')).toBe(12345.68);
  expect(Index.ToFixed(12345.6659, 2, 'increase')).toBe(12345.67);
  expect(Index.ToFixed(12345.6759, 5, 'increase')).toBe(12345.6759);

  expect(Index.ToFixed(12345.6709, 2, 'ignore')).toBe(12345.67);
  expect(Index.ToFixed(12345.6749, 2, 'ignore')).toBe(12345.67);
  expect(Index.ToFixed(12345.6769, 2, 'ignore')).toBe(12345.67);
  expect(Index.ToFixed(12345.6759, 2, 'ignore')).toBe(12345.67);
  expect(Index.ToFixed(12345.6659, 2, 'ignore')).toBe(12345.66);
  expect(Index.ToFixed(12345.6759, 5, 'ignore')).toBe(12345.6759);

  expect(Index.ToFixed(1.000000000000000000001)).toBe(1);
  expect(Index.ToFixed(1.000000000000000000001, 2, 'normal')).toBe(1);
});
