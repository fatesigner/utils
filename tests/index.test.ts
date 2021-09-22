import { expect } from 'chai';
import {
  capitalize,
  clone,
  convertBridgeStrToHump,
  convertHumpStrToBridge,
  convertToBytesUnit,
  convertToCDB,
  convertToDBC,
  convertToQueryParameters,
  debounce,
  deepExtend,
  extend,
  forEach,
  groupBy,
  mergeProps,
  throttle
} from '../dist';

jest.setTimeout(30000);
jest.useFakeTimers();

describe('# test main.', function () {
  it('## capitalize.', function () {
    expect(capitalize('capitalize')).to.equal('Capitalize');
  });
  it('## convertToCDB.', function () {
    expect(convertToCDB('ａｂｃｄ')).to.equal('abcd');
  });
  it('## convertToDBC.', function () {
    expect(convertToDBC('abcd')).to.equal('ａｂｃｄ');
  });
  it('## convertBridgeStrToHump.', function () {
    expect(convertBridgeStrToHump('convert-hump-str-to-bridge')).to.equal('convertHumpStrToBridge');
  });
  it('## convertHumpStrToBridge.', function () {
    expect(convertHumpStrToBridge('convertHumpStrToBridge')).to.equal('convert-hump-str-to-bridge');
  });
  it('## convertToBytesUnit.', function () {
    expect(convertToBytesUnit(234123)).to.equal('228.64kb');
    expect(convertToBytesUnit(234123, undefined, true)).to.equal('228.64KB');
    expect(convertToBytesUnit(166018, 3, true)).to.equal('162.127KB');
    expect(convertToBytesUnit(1073741824)).to.equal('1.00gb');
    expect(convertToBytesUnit(1073741824, 4, false)).to.equal('1.0000gb');
  });
  it('## convertToQueryParameters', function () {
    expect(convertToQueryParameters({ id: 'a', username: 'user' })).to.equal('id=a&username=user');
  });
  it('## forEach', function () {
    const res = forEach(
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

    const res2 = forEach(
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

    const cloneObject = clone(originalObject, true);

    // 改变 shadowClone 的对象属性
    cloneObject.c.f = 5;

    expect(cloneObject.c.f).to.equal(5);

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

    const obj = extend({}, originalObject, extendObj);

    expect(obj.c.f).to.equal(undefined);
    expect(obj.c.g.h).to.equal(undefined);

    // 深度合并
    const obj2 = deepExtend({}, originalObject, extendObj);
    expect(obj2.c.f).to.equal(4);
    expect(obj2.c.g.h).to.equal(2);
  });
  it('## mergeProps', function () {
    const res = mergeProps(
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
  it('## groupBy', function () {
    const arr = [
      { id: 1, name: '1', title: '1 title' },
      { id: 3, name: '3', title: '1 3' },
      { id: 2, name: '2', title: '1 2' },
      { id: 2, name: '4', title: '1 4' }
    ];
    const arrNew = groupBy(arr, 'id', (record) => {
      return {
        d: record.name
      };
    });

    expect(arrNew.length).to.equal(3);
    expect(arrNew[0].key).to.equal(1);
    expect(arrNew[0].d).to.equal('1');
  });

  it('## debounce', function (done) {
    let index = 0;
    let index2 = 0;
    let res = undefined;
    let res2 = undefined;

    const func = debounce(
      function (str: string, abs: number) {
        index++;
        return str + ' ' + index * abs;
      },
      2000,
      false
    );

    const func2 = debounce(
      function (str: string, abs: number) {
        index2++;
        return str + ' ' + index2 * abs;
      },
      2000,
      true
    );

    res = func('tom', 10);
    expect(index).to.equal(0);
    expect(res).to.equal(undefined);

    // immediate
    res2 = func2('tom2', 10);

    expect(index).to.equal(0);
    expect(res).to.equal(undefined);
    expect(index2).to.equal(1);
    expect(res2).to.equal('tom2 10');

    jest.advanceTimersByTime(1000);

    // after 1s
    expect(index).to.equal(0);
    expect(res).to.equal(undefined);
    expect(index2).to.equal(1);
    expect(res2).to.equal('tom2 10');

    jest.advanceTimersByTime(1000);

    // after 1s
    expect(index).to.equal(1);
    expect(res).to.equal(undefined);

    // run func
    func('tom', 10);
    expect(index).to.equal(1);
    expect(res).to.equal(undefined);

    jest.advanceTimersByTime(1000);

    // after 1s
    expect(index).to.equal(1);
    expect(res).to.equal(undefined);

    // run func again, will delay
    func('tom', 10);
    expect(index).to.equal(1);
    expect(res).to.equal(undefined);

    jest.advanceTimersByTime(1000);

    // after 1s, will delay again
    expect(index).to.equal(1);
    expect(res).to.equal(undefined);

    jest.advanceTimersByTime(1000);

    // after 1s, will run
    expect(index).to.equal(2);
    expect(res).to.equal(undefined);

    done();
  });

  let index = 0;
  let index2 = 0;
  let index3 = 0;
  let n = 0;
  let timer;

  const func = throttle(
    function (str: string, abs: number) {
      index++;
      return str + ' ' + index * abs;
    },
    2000,
    false
  );

  const func2 = throttle(
    function (str: string, abs: number) {
      index2++;
      return str + ' ' + index2 * abs;
    },
    2000,
    true
  );

  const func3 = throttle(
    function (str: string, abs: number) {
      index3++;
      return str + ' ' + index3 * abs;
    },
    2000,
    true,
    false
  );

  const setTime = function (delay, number) {
    index = 0;
    index2 = 0;
    index3 = 0;
    n = 0;

    func('tom', 10);
    func2('tom2', 10);
    func2('tom3', 10);
    timer = setInterval(() => {
      func('tom', 10);
      func2('tom2', 10);
      func3('tom3', 10);
      n++;
      if (n >= number) {
        clearInterval(timer);
      }
    }, delay);
  };

  it('## throttle', function (done) {
    setTime(500, 8);
    jest.advanceTimersByTime(10000);

    // after 10s
    expect(n).to.equal(8);
    expect(index).to.equal(2);
    expect(index2).to.equal(3);
    expect(index3).to.equal(2);

    jest.advanceTimersByTime(1000);

    // after 1s
    expect(index).to.equal(2);
    expect(index2).to.equal(3);
    expect(index3).to.equal(2);

    jest.advanceTimersByTime(5000);

    // after 5s
    expect(index).to.equal(2);
    expect(index2).to.equal(3);
    expect(index3).to.equal(2);

    setTime(1000, 10);
    jest.advanceTimersByTime(10000);

    // after 10s
    expect(n).to.equal(10);
    expect(index).to.equal(6);
    expect(index2).to.equal(6);
    expect(index3).to.equal(5);

    done();
  });
});
