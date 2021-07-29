import { expect } from 'chai';

import { bindAfter, bindAround, bindBefore, injectAfter, injectAround, injectBefore } from '../dist/aspect';

describe('# test aspect.', function () {
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
  it('## bind', function () {
    // 绑定执行前的代码 修改参数
    const _bindBefore = bindBefore(
      function (str, num, replace) {
        replace = '*';
        return [str, num, replace];
      },
      {
        context: obj,
        func: obj.padStart
      }
    );
    // 绑定执行后的代码 修改结果
    const _bindAfter = bindAfter(
      function (res) {
        res += '000';
        return res;
      },
      {
        context: obj,
        func: obj.padStart
      }
    );
    // 绑定环绕代码
    const _bindAround = bindAround(
      function (originalFunc) {
        return function (str, num, replace) {
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
    expect(obj.padStart('363300', 10, '0')).to.equal('0000363300');
    expect(_bindBefore('363300', 10, '0')).to.equal('****363300');
    expect(obj.padStart('363', 7, '1')).to.equal('1111363');
    expect(_bindAfter('363', 7, '1')).to.equal('1111363000');
    expect(_bindAround('363000', 10, '1')).to.equal('%%%%363000111');
  });
  it('## inject', function () {
    // 绑定执行前的代码 修改参数
    const _injectBefore = injectBefore<typeof obj.padStart, typeof obj>(
      function (str, num, replace) {
        replace = '*';
        return [str, num, replace];
      },
      {
        func: 'padStart',
        target: obj
      }
    );
    expect(obj.padStart('363300', 10, '0')).to.equal('****363300');
    _injectBefore.cancel();
    expect(obj.padStart('363300', 10, '0')).to.equal('0000363300');
    // 绑定执行后的代码 修改结果
    const _injectAfter = injectAfter<typeof obj.padStart, typeof obj>(
      function (res) {
        res += '000';
        return res;
      },
      {
        func: 'padStart',
        target: obj
      }
    );
    expect(obj.padStart('363', 7, '1')).to.equal('1111363000');
    _injectAfter.cancel();
    expect(obj.padStart('363', 7, '1')).to.equal('1111363');
    // 绑定环绕代码
    const _injectAround = injectAround<typeof obj.padStart, typeof obj>(
      function (originalFunc) {
        return function (str, num, replace) {
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
    expect(obj.padStart('363000', 10, '1')).to.equal('%%%%363000111');
    _injectAround.cancel();
    expect(obj.padStart('363000', 10, '1')).to.equal('1111363000');
  });
});
