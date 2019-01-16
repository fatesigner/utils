# aspect
AOP（切面编程）的js实现，有以下两种方式：
- （bind）无侵入性，不改变原函数，而是创建一个新函数。
- （inject）具有侵入性，改变了原函数，但提供了 cancel 接口可随时取消，类似 rxjs 的 unsubscribe 。

## Before
以指定的作用域执行切入的代码，之后调用目标函数。

```js
import { BindBefore, InjectBefore } from '@fatesigner/utils/aspect';

const obj = {
  // 模拟 padStar 方法
  padStart(str: string, num: number, replace: string) {
    const l = num - str.length;
    if (l > 0) {
      return (Array.from(Array(l)).map(() => replace).join('') + str);
    }
    return str;
  }
};

// 绑定执行前的代码 修改 replace 参数，然后将其返给原函数
const bindBefore = BindBefore(
  function(str, num, replace) {
    replace = '*';
    return [str, num, replace];
  },
  {
    context: obj,
    func: obj.padStart
  }
);

console.log(obj.padStart('363300', 10, '0'));

// 输出: 0000363300

console.log(bindBefore('363300', 10, '0'));

// 输出: ****363300

// 侵入性，更改了原函数。
const injectBefore = InjectBefore<typeof obj.padStart, typeof obj>(
  function(str, num, replace) {
    replace = '*';
    return [str, num, replace];
  },
  {
    func: 'padStart',
    target: obj
  }
);

console.log(obj.padStart('363300', 10, '0'));

// 输出: ****363300

// 取消切入
injectBefore.cancel();

console.log(obj.padStart('363300', 10, '0'));

// 输出: 0000363300
```

## After
以指定的作用域调用目标函数，之后执行切入的代码。

```js
import { BindAfter, InjectAfter } from '@fatesigner/utils/aspect';

const obj = {
  // 模拟 padStar 方法
  padStart(str: string, num: number, replace: string) {
    const l = num - str.length;
    if (l > 0) {
      return (Array.from(Array(l)).map(() => replace).join('') + str);
    }
    return str;
  }
};

// 绑定执行后的代码 修改结果并继续返回
const bindAfter = BindAfter(
  function(res) {
    res += '000';
    return res;
  },
  {
    context: obj,
    func: obj.padStart
  }
);

console.log(obj.padStart('363', 7, '1'));

// 输出: 1111363

console.log(bindAfter('363', 7, '1'));

// 输出: 1111363000

// 侵入性，更改了原函数。
const injectAfter = InjectAfter<typeof obj.padStart, typeof obj>(
  function(res) {
    res += '000';
    return res;
  },
  {
    func: 'padStart',
    target: obj
  }
);

console.log(obj.padStart('363300', 10, '1'));

// 输出: 1111363300000

// 取消切入
injectBefore.cancel();

console.log(obj.padStart('363300', 10, '1'));

// 输出: 1111363300
```

## Around
以指定的作用域和顺序执行切入的代码和调用目标函数，该方法提供原函数，并可以自定义执行顺序。

```js
import { BindAround } from '@fatesigner/utils/aspect';

const obj = {
  // 模拟 padStar 方法
  padStart(str: string, num: number, replace: string) {
    const l = num - str.length;
    if (l > 0) {
      return (Array.from(Array(l)).map(() => replace).join('') + str);
    }
    return str;
  }
};

const bindAround = BindAround(
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

console.log(obj.padStart('363000', 10, '1'));

// 输出: 1111363000

console.log(bindAround('363000', 10, '1'));

// 输出: %%%%363000111

// 侵入性，更改了原函数。
const injectAround = InjectAround<typeof obj.padStart, typeof obj>(
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

console.log(obj.padStart('363000', 10, '1'));

// 输出: %%%%363000111

// 取消切入
injectAround.cancel();

console.log(obj.padStart('363000', 10, '1'));

// 输出: 1111363000
```
