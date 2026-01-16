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
  applyBind,
  debounce,
  deepExtend,
  extend,
  forEach,
  getParamsFromUrl,
  groupBy,
  mergeProps,
  throttle,
  toFixed
} from '../dist';

jest.setTimeout(30000);
jest.useFakeTimers();

describe('# test main.', function () {
  it('## capitalize.', function () {
    expect(capitalize('capitalize')).to.equal('Capitalize');
  });
  it('## convertToCDB.', function () {
    expect(convertToCDB('ａｂｃｄ')).to.equal('abcd');
    expect(convertToCDB('　')).to.equal(' ');
    expect(convertToCDB('abc')).to.equal('abc');
  });
  it('## convertToDBC.', function () {
    expect(convertToDBC('abcd')).to.equal('ａｂｃｄ');
    expect(convertToDBC(' ')).to.equal('　');
    expect(convertToDBC('中')).to.equal('中');
  });
  it('## convertBridgeStrToHump.', function () {
    expect(convertBridgeStrToHump('convert-hump-str-to-bridge')).to.equal('convertHumpStrToBridge');
    expect(convertBridgeStrToHump('')).to.equal('');
  });
  it('## convertHumpStrToBridge.', function () {
    expect(convertHumpStrToBridge('convertHumpStrToBridge')).to.equal('convert-hump-str-to-bridge');
    expect(convertHumpStrToBridge('Abc')).to.equal('abc');
    expect(convertHumpStrToBridge('')).to.equal('');
  });
  it('## convertToBytesUnit.', function () {
    expect(convertToBytesUnit(234123)).to.equal('228.64kb');
    expect(convertToBytesUnit(234123, undefined, true)).to.equal('228.64KB');
    expect(convertToBytesUnit(166018, 3, true)).to.equal('162.127KB');
    expect(convertToBytesUnit(1073741824)).to.equal('1.00gb');
    expect(convertToBytesUnit(1073741824, 4, false)).to.equal('1.0000gb');
    expect(convertToBytesUnit(null as any)).to.equal('0 Bytes');
    expect(convertToBytesUnit(1024, 'x' as any)).to.equal('1kb');
  });
  it('## convertToQueryParameters', function () {
    expect(convertToQueryParameters({ id: 'a', username: 'user' })).to.equal('id=a&username=user');
    expect(convertToQueryParameters({ id: undefined })).to.equal('id=');
  });

  it('## applyBind', function () {
    const ctx = { v: 2 };
    function add(a: number, b: number) {
      return this.v + a + b;
    }
    const bound = applyBind(add, ctx, 3);
    expect(bound(4)).to.equal(9);
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
  it('## forEach without function', function () {
    const res = forEach([1, 2], null as any, 5);
    expect(res).to.equal(5);
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
  it('## clone null', function () {
    expect(clone(null as any)).to.equal(null);
  });
  it('## clone non-circular', function () {
    const original = { a: 1, b: { c: 2 } };
    const copied = clone(original, false);
    copied.b.c = 3;
    expect(original.b.c).to.equal(2);
    expect(copied.b.c).to.equal(3);
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

  it('## extend null target', function () {
    expect(() => extend(null as any, { a: 1 })).to.throw(Error);
  });

  it('## clone circular', function () {
    const obj: any = { a: 1 };
    obj.self = obj;
    const cloned = clone(obj, true);
    expect(cloned).to.not.equal(obj);
    expect(cloned.self).to.equal(cloned);
  });

  it('## deepExtend special values', function () {
    const date = new Date(0);
    const reg = /a/;
    const buf = Buffer.from('x');
    const res: any = deepExtend({}, { date, reg, buf });
    expect(res.date.getTime()).to.equal(0);
    expect(res.reg.source).to.equal('a');
    expect(Buffer.isBuffer(res.buf)).to.equal(true);
  });

  it('## deepExtend arrays', function () {
    const res: any = deepExtend({}, { arr: [1, { a: 2 }, [3]] });
    expect(res.arr[0]).to.equal(1);
    expect(res.arr[1].a).to.equal(2);
    expect(Array.isArray(res.arr[2])).to.equal(true);
  });
  it('## deepExtend invalid params', function () {
    expect(deepExtend() as any).to.equal(false);
    const target = { a: 1 };
    expect(deepExtend(target)).to.equal(target);
  });
  it('## deepExtend ignore array param', function () {
    const target = { a: 1 };
    const res: any = deepExtend(target, [] as any);
    expect(res).to.equal(target);
    expect(res.a).to.equal(1);
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

  it('## mergeProps default and array', function () {
    const defaults = { a: [1, 2], b: { c: 1 } };
    const res = mergeProps(defaults as any, undefined as any);
    expect(res).to.equal(defaults);

    const res2: any = mergeProps({ a: [1, 2], b: { c: 1 } } as any, {} as any, true);
    expect(Array.isArray(res2.a)).to.equal(true);
    expect(res2.a.length).to.equal(2);
    expect(res2.b.c).to.equal(1);
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

  it('## groupBy by function and undefined key', function () {
    const arr = [{ id: 1 }, { id: undefined }, { id: 1 }];
    const res = groupBy(arr, (item) => item.id as any);
    expect(res.length).to.equal(2);
    expect(res[1].children.length).to.equal(1);
  });
  it('## groupBy multiple undefined', function () {
    const arr = [{ id: undefined }, { id: undefined }, { id: 1 }];
    const res = groupBy(arr, (item) => item.id as any);
    expect(res.length).to.equal(2);
    expect(res[0].children.length).to.equal(2);
  });

  it('## groupBy invalid key', function () {
    let error: Error;
    try {
      groupBy([{ id: 1 }], 123 as any);
    } catch (err: any) {
      error = err;
    }
    expect(error).to.be.instanceof(Error);
  });

  it('## getParamsFromUrl undefined', function () {
    expect(getParamsFromUrl(undefined)).to.deep.equal({});
  });
  it('## getParamsFromUrl empty key', function () {
    const params = getParamsFromUrl('https://example.com?=1&b=2');
    expect(params.b).to.equal('2');
  });

  it('## debounce', function (done) {
    let index = 0;
    let index2 = 0;
    let res;
    let res2;

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

  it('## debounce alwaysDo', function () {
    jest.useFakeTimers();
    let count = 0;
    let always = 0;
    const fn = debounce(
      () => {
        count += 1;
      },
      1000,
      false,
      () => {
        always += 1;
      }
    );
    fn();
    fn();
    expect(always).to.equal(2);
    jest.advanceTimersByTime(1000);
    expect(count).to.equal(1);
  });

  it('## debounce immediate and spend>=delay', function () {
    const fn = jest.fn();
    const nowSpy = jest.spyOn(Date, 'now');
    let now = 1000;
    nowSpy.mockImplementation(() => now);
    const debounced = debounce(fn, 1000, true);
    debounced();
    expect(fn.mock.calls.length).to.equal(1);
    now += 1100;
    debounced();
    expect(fn.mock.calls.length).to.equal(2);
    nowSpy.mockRestore();
  });

  it('## throttle spend>=delay', function () {
    const fn = jest.fn();
    const nowSpy = jest.spyOn(Date, 'now');
    let now = 2000;
    nowSpy.mockImplementation(() => now);
    const throttled = throttle(fn, 1000, true, false);
    throttled();
    expect(fn.mock.calls.length).to.equal(1);
    now += 1500;
    throttled();
    expect(fn.mock.calls.length).to.equal(2);
    nowSpy.mockRestore();
  });

  it('## throttle trailing init', function () {
    const fn = jest.fn();
    const nowSpy = jest.spyOn(Date, 'now');
    let now = 3000;
    nowSpy.mockImplementation(() => now);
    const throttled = throttle(fn, 1000, false, true);
    throttled();
    expect(fn.mock.calls.length).to.equal(0);
    jest.advanceTimersByTime(1000);
    expect(fn.mock.calls.length).to.equal(1);
    nowSpy.mockRestore();
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
  it('## toFixed', function () {
    expect(toFixed(12.3232)).to.equal(12);
    expect(toFixed(12.3232, 2)).to.equal(12.32);
    expect(toFixed(12.3232, 4)).to.equal(12.3232);
    expect(toFixed(12.08, 4)).to.equal(12.08);
    expect(toFixed(12.086, 4)).to.equal(12.086);
    expect(toFixed(12.0867, 4)).to.equal(12.0867);
    expect(toFixed(12.08679, 4)).to.equal(12.0868);
    expect(toFixed(12.086793, 4)).to.equal(12.0868);
    expect(toFixed(12.086793, 4, 'ignore')).to.equal(12.0867);
    expect(toFixed(12.086793, 2, 'ignore')).to.equal(12.08);
    expect(toFixed(12.086793, 0, 'ignore')).to.equal(12);
    expect(toFixed(12.086793)).to.equal(12);
    expect(toFixed(12.086793)).to.equal(12);
    expect(toFixed(171162018.64999998, 4)).to.equal(171162018.65);
    expect(toFixed(171162018.641111, 4)).to.equal(171162018.6411);
    expect(toFixed(265652418.89999998, 4)).to.equal(265652418.9);
    expect(toFixed(265652418.89999998, 4, 'ignore')).to.equal(265652418.8999);
    expect(toFixed(265345, 4)).to.equal(265345);
    expect(toFixed(265345.12, 4)).to.equal(265345.12);
    expect(toFixed(265345.99, 4, 'ignore')).to.equal(265345.99);
    expect(toFixed(1.235, 2, 'round')).to.equal(1.24);
    expect(toFixed(1.231, 2, 'increase')).to.equal(1.24);
    expect(toFixed(1.2, 5, 'ignore')).to.equal(1.2);
    expect(toFixed(1.25, 1)).to.equal(1.2);
    expect(toFixed(1.35, 1)).to.equal(1.4);
    expect(toFixed(1.26, 1)).to.equal(1.3);
  });
});
