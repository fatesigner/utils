# Utils

[![build][travis-image]][travis-url]
[![commitizen][commitizen-image]][commitizen-url]
[![codecov][codecov-image]][codecov-url]
[![download][download-image]][download-url]
[![npm][npm-image]][npm-url]
[![semantic][semantic-image]][semantic-url]

[npm-image]: https://img.shields.io/npm/v/@fatesigner/utils.svg?color=green
[npm-url]: https://npmjs.com/package/@fatesigner/utils
[travis-image]: https://travis-ci.com/fatesigner/utils.svg?token=i21P7stb8bZPNjZakvsi&color=success&branch=master
[travis-url]: https://travis-ci.com/fatesigner/utils
[codecov-image]: https://codecov.io/gh/fatesigner/utils/branch/master/graph/badge.svg?token=i5Q9N7m8v5
[codecov-url]: https://codecov.io/gh/fatesigner/utils
[david-image]: https://david-dm.org/fatesigner/utils.svg
[david-url]: https://david-dm.org/fatesigner/utils
[download-image]: https://img.shields.io/npm/dw/@fatesigner/utils.svg?style=flat-square
[download-url]: https://npmjs.com/package/@fatesigner/utils
[commitizen-image]: https://img.shields.io/badge/commitizen-friendly-green.svg
[commitizen-url]: http://commitizen.github.io/cz-cli/
[semantic-image]: https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg?style=flat-square
[semantic-url]: https://opensource.org/licenses/MIT

JavaScript工具库.

## 说明

- js 工具库，里面有些函数可以用 [Underscore](https://underscorejs.org/) 和 [lodash](https://lodash.com/docs) 代替。
- 由 typescript 编写，并编译为一份 ESnext 和 [CommonJs](https://requirejs.org/docs/commonjs.html) 的代码。
  所以如果引入到您的项目中使用，需搭建好 [babel](https://babeljs.io/docs/en/) 编译环境。
- 借助于 [tree shaking](https://webpack.docschina.org/guides/tree-shaking/) 可以不用担心导入多余的代码。

## 安装

```bash
npm i -S @fatesigner/utils
```

## 具体用法可查看 [文档](https://fatesigner.github.io/utils/)

```js
import { toDecimal } from '@fatesigner/utils';

let num = 120;
console.log(toDecimal(num, 2));
// 120.00

// 绑定事件：delegate
import { on } from '@fatesigner/utils/event';

on(document.body, 'scroll', null, (event) => {
  console.log(event.target);
});
```
