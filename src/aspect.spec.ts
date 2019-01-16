/**
 * aspect.spec
 */

import * as Aspect from './aspect';

const obj = {
  // 模拟 padStar 方法
  padStart(str: string, num: number, replace: string) {
    const l = num - str.length;
    if (l > 0) {
      return (
        Array.from(Array(l))
          .map(() => replace)
          .join('') + str
      );
    }
    return str;
  }
};

test('test aspect bind', () => {
  expect('hello').toBe('hello');
  // 绑定执行前的代码 修改参数
  const bindBefore = Aspect.BindBefore(
    function(str, num, replace) {
      replace = '*';
      return [str, num, replace];
    },
    {
      context: obj,
      func: obj.padStart
    }
  );
  // 绑定执行后的代码 修改结果
  const bindAfter = Aspect.BindAfter(
    function(res) {
      res += '000';
      return res;
    },
    {
      context: obj,
      func: obj.padStart
    }
  );
  // 绑定环绕代码
  const bindAround = Aspect.BindAround(
    function(originalFunc) {
      return function(str, num, replace) {
        // 修改参数
        replace = '%';
        // 执行原函数
        let res = originalFunc(str, num, replace);
        // 修改结果
        res += '111';
        return res;
      };
    },
    {
      context: obj,
      func: obj.padStart
    }
  );
  expect(obj.padStart('363300', 10, '0')).toBe('0000363300');
  expect(bindBefore('363300', 10, '0')).toBe('****363300');
  expect(obj.padStart('363', 7, '1')).toBe('1111363');
  expect(bindAfter('363', 7, '1')).toBe('1111363000');
  expect(bindAround('363000', 10, '1')).toBe('%%%%363000111');
});

test('test aspect inject', function() {
  // 绑定执行前的代码 修改参数
  const injectBefore = Aspect.InjectBefore<typeof obj.padStart, typeof obj>(
    function(str, num, replace) {
      replace = '*';
      return [str, num, replace];
    },
    {
      func: 'padStart',
      target: obj
    }
  );
  expect(obj.padStart('363300', 10, '0')).toBe('****363300');
  injectBefore.cancel();
  expect(obj.padStart('363300', 10, '0')).toBe('0000363300');
  // 绑定执行后的代码 修改结果
  const injectAfter = Aspect.InjectAfter<typeof obj.padStart, typeof obj>(
    function(res) {
      res += '000';
      return res;
    },
    {
      func: 'padStart',
      target: obj
    }
  );
  expect(obj.padStart('363', 7, '1')).toBe('1111363000');
  injectAfter.cancel();
  expect(obj.padStart('363', 7, '1')).toBe('1111363');
  // 绑定环绕代码
  const injectAround = Aspect.InjectAround<typeof obj.padStart, typeof obj>(
    function(originalFunc) {
      return function(str, num, replace) {
        // 修改参数
        replace = '%';
        let res = originalFunc(str, num, replace);
        // 修改结果
        res += '111';
        return res;
      };
    },
    {
      func: 'padStart',
      target: obj
    }
  );
  expect(obj.padStart('363000', 10, '1')).toBe('%%%%363000111');
  injectAround.cancel();
  expect(obj.padStart('363000', 10, '1')).toBe('1111363000');
});
