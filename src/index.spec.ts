/**
 * index.spec
 */

import { expect } from 'chai';

import * as Index from './';

describe('# test main.', function () {
  it('## capitalize.', function () {
    expect(Index.capitalize('capitalize')).to.equal('Capitalize');
  });
  it('## convertToCDB.', function () {
    expect(Index.convertToCDB('ａｂｃｄ')).to.equal('abcd');
  });
  it('## convertToDBC.', function () {
    expect(Index.convertToDBC('abcd')).to.equal('ａｂｃｄ');
  });
  it('## convertBridgeStrToHump.', function () {
    expect(Index.convertBridgeStrToHump('convert-hump-str-to-bridge')).to.equal('convertHumpStrToBridge');
  });
  it('## convertHumpStrToBridge.', function () {
    expect(Index.convertHumpStrToBridge('convertHumpStrToBridge')).to.equal('convert-hump-str-to-bridge');
  });
  it('## convertToBytesUnit.', function () {
    expect(Index.convertToBytesUnit(234123)).to.equal('228.64kb');
    expect(Index.convertToBytesUnit(234123, undefined, true)).to.equal('228.64KB');
    expect(Index.convertToBytesUnit(166018, 3, true)).to.equal('162.127KB');
    expect(Index.convertToBytesUnit(1073741824)).to.equal('1.00gb');
    expect(Index.convertToBytesUnit(1073741824, 4, false)).to.equal('1.0000gb');
  });
  it('## convertToQueryParameters', function () {
    expect(Index.convertToQueryParameters({ id: 'a', username: 'user' })).to.equal('id=a&username=user');
  });
  it('## forEach', function () {
    const res = Index.forEach(
      [1, 2, 3, 4, 5, 6],
      function (prev, cur, index) {
        if (index === 4) {
          // 模拟 break 退出此次循环
          return false;
        }
        prev += cur;
        return prev;
      },
      0
    );
    expect(res).to.equal(10);

    const res2 = Index.forEach(
      {
        a: 'a1',
        b: 'b1',
        c: 'c1',
        d: 'd1'
      },
      function (prev, cur, index, data) {
        if (index === 2) {
          // 模拟 break 退出此次循环
          return false;
        }
        prev += data[cur];
        return prev;
      },
      ''
    );
    expect(res2).to.equal('a1b1');
  });
  it('## clone', function () {
    const originalObject = {
      a: 1,
      b: '2',
      c: {
        d: [1, 2, 3],
        f: 4
      }
    };

    const clone = Index.clone(originalObject, true);

    // 改变 shadowClone 的对象属性
    clone.c.f = 5;

    expect(clone.c.f).to.equal(5);

    expect(originalObject.c.f).to.equal(4);
  });
  it('## extend', function () {
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

    const obj = Index.extend({}, originalObject, extendObj);

    expect(obj.c.f).to.equal(undefined);
    expect(obj.c.g.h).to.equal(undefined);

    // 深度合并
    const obj2 = Index.deepExtend({}, originalObject, extendObj);
    expect(obj2.c.f).to.equal(4);
    expect(obj2.c.g.h).to.equal(2);
  });
  it('## mergeProps', function () {
    const res = Index.mergeProps(
      {
        d: '1',
        dd: [1, 2, 3]
      },
      {
        d: '232',
        dd: [3, 4, 5]
      },
      true
    );
    expect(res.dd[0]).to.equal(3);
    expect(res.dd[1]).to.equal(4);
    expect(res.dd[2]).to.equal(5);
  });
});
