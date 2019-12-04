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

jest.setTimeout(30000);

test('test main BindLazyFunc', (done) => {
  const target: {
    sayHello: (name: string, words: string, num: number) => Promise<string>;
  } = {
    sayHello: null
  };

  const targetLazy = Index.BindLazyFunc(target, ['sayHello']);

  // 立即执行
  targetLazy.sayHello('tom', 'hello', 100).then((res) => {
    expect(res).toBe('tom hello 100 3');
  });

  // 等待 3s 后设置 func
  setTimeout(() => {
    targetLazy.sayHello = (name: string, words: string, num: number) => {
      return new Promise((resolve) => {
        let i = 0;

        let timer = setInterval(() => {
          i++;
        }, 1000);

        // 模拟延迟
        setTimeout(() => {
          i++;
          resolve(`${name} ${words} ${num} ${i}`);
          clearInterval(timer);
          timer = null;
        }, 3000);
      });
    };
    targetLazy.sayHello('jerry1', 'hello', 200);
    targetLazy.sayHello('jerry2', 'hello', 200);
    setTimeout(() => {
      targetLazy.sayHello('jerry3', 'hello', 200).then((res) => {
        expect(res).toBe('jerry3 hello 200 3');
        done();
      });
    }, 12000);
  }, 5000);
});

function BindLazyFuncTest() {
  const target: {
    sayHello: (name: string, words: string, num: number) => Promise<string>;
  } = {
    sayHello: null
  };

  const targetLazy = Index.BindLazyFunc(target, ['sayHello']);

  // 保存到变量，延迟调用
  const sayHello = targetLazy.sayHello;

  // 立即执行
  console.time('tom call completed');
  targetLazy.sayHello('tom', 'hello', 100).then((res) => {
    console.timeEnd('tom call completed');
  });

  // 等待 2s 后再次执行
  setTimeout(() => {
    console.time('tom2 call completed');
    targetLazy.sayHello('tom2', 'hello', 100).then((res) => {
      console.timeEnd('tom2 call completed');
    });
  }, 2000);

  // 等待 5s 后设置 func
  setTimeout(() => {
    targetLazy.sayHello = (name: string, words: string, num: number) => {
      return new Promise((resolve) => {
        let i = 0;

        let timer = setInterval(() => {
          i++;
        }, 1000);

        // 模拟延迟
        setTimeout(() => {
          resolve(`${name} ${words} ${num} ${i}`);
          clearInterval(timer);
          timer = null;
        }, 3000);
      });
    };

    console.time('jerry1 call completed');
    targetLazy.sayHello('jerry1', 'hello', 200).then((res) => {
      console.timeEnd('jerry1 call completed');
    });

    console.time('jerry2 call completed');
    targetLazy.sayHello('jerry2', 'hello', 200).then((res) => {
      console.timeEnd('jerry2 call completed');
    });

    console.time('tom3 call completed');
    sayHello('tom3', 'hello', 200).then((res) => {
      console.timeEnd('tom3 call completed');
    });

    setTimeout(() => {
      console.time('jerry3 call completed');
      targetLazy.sayHello('jerry3', 'hello', 200).then((res) => {
        console.timeEnd('jerry3 call completed');
      });
    }, 10000);
  }, 5000);
}

const promise = function (ref: { num: number }, name: string, time: number): Promise<string> {
  return new Promise((resolve) => {
    // 累加
    let timer = setInterval(() => {
      ref.num++;
    }, 1000);

    // 模拟延迟
    setTimeout(() => {
      ref.num++;
      resolve(ref.num + name);
      clearInterval(timer);
      timer = null;
    }, time);
  });
};

test('utils BindPromiseQueue normal', (done) => {
  const g = { num: 0 };

  promise(g, 'tom', 3000).then((res) => {
    expect(g.num).toBe(4);
  });

  // 等待 1s 后再次执行，此时前一次执行还未完成
  setTimeout(() => {
    promise(g, 'jerry', 4000).then((res) => {
      expect(g.num).toBe(7);
      done();
    });
  }, 1000);
});

test('utils BindPromiseQueue', (done) => {
  const promise_ = Index.BindPromiseQueue(promise);

  const g = { num: 0 };

  promise_(g, 'tom', 3000).then(() => {
    expect(g.num).toBe(3);
  });

  // 等待 1s 后再次执行，此时前一次执行还未完成
  setTimeout(() => {
    promise_(g, 'jerry', 4000).then(() => {
      expect(g.num).toBe(7);
      done();
    });
  }, 1000);
});

test('utils BindPromiseQueue skipped', (done) => {
  const promise_ = Index.BindPromiseQueue(promise, true);

  const g = { num: 0 };

  promise_(g, 'tom', 3000).then(() => {
    expect(g.num).toBe(3);
  });

  // 等待 1s 后再次执行，此时前一次执行还未完成
  setTimeout(() => {
    promise_(g, 'jerry', 4000).then(() => {
      expect(g.num).toBe(3);
      done();
    });
  }, 1000);
});

test('utils MergeProps', (done) => {
  const target = {
    a: 2,
    b: {
      arr: [{ a: 1, b: 2 }],
      arr2: [{ c: '312' }],
      c: '3',
      e: 123,
      h: {
        s: 111
      }
    },
    c: {
      dd: 1
    }
  };

  const source = {
    a: '3',
    b: {
      arr: [{ a: 3, b: 4, d: 5 }],
      c: 1412,
      d: 4,
      e: {
        f: 123,
        g: '31'
      }
    }
  } as any;

  Index.MergeProps(target, source);

  expect(source.a).toBe('3');
  expect(source.b.arr[0].a).toBe(3);
  expect(source.b.arr2[0].c).toBe('312');
  expect(source.b.c).toBe(1412);
  expect(source.b.d).toBe(4);
  expect(source.b.h.s).toBe(111);

  setTimeout(() => {
    target.c.dd = 1234;
    target.b.arr2[0].c = '12312';

    expect(source.c.dd).toBe(1234);
    expect(source.b.arr2[0].c).toBe('12312');

    done();
  }, 3000);
});

test('utils MergeProps deep', (done) => {
  const target = {
    a: 2,
    b: {
      arr: [{ a: 1, b: 2 }],
      arr2: [{ c: '312' }],
      c: '3',
      e: 123,
      h: {
        s: 111
      }
    },
    c: {
      dd: 1
    }
  };

  const source = {
    a: '3',
    b: {
      arr: [{ a: 3, b: 4, d: 5 }],
      c: 1412,
      d: 4,
      e: {
        f: 123,
        g: '31'
      }
    }
  } as any;

  Index.MergeProps(target, source, true);

  expect(source.a).toBe('3');
  expect(source.b.arr[0].a).toBe(3);
  expect(source.b.arr2[0].c).toBe('312');
  expect(source.b.c).toBe(1412);
  expect(source.b.d).toBe(4);
  expect(source.b.h.s).toBe(111);

  setTimeout(() => {
    target.c.dd = 1234;
    target.b.arr2[0].c = '12312';

    expect(source.c.dd).toBe(1);
    expect(source.b.arr2[0].c).toBe('312');

    done();
  }, 3000);
});
