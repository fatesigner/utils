# Utils

[![npm][npm-image]][npm-url]
[![build][travis-image]][travis-url]
[![codecov][codecov-image]][codecov-url]
[![download][download-image]][download-url]
[![commitizen][commitizen-image]][commitizen-url]

[npm-image]: https://img.shields.io/npm/v/@fatesigner/utils.svg?color=blue
[npm-url]: https://npmjs.com/package/@fatesigner/utils
[travis-image]: https://travis-ci.com/fatesigner/utils.svg?token=i21P7stb8bZPNjZakvsi&color=success&branch=master
[travis-url]: https://travis-ci.com/fatesigner/utils
[codecov-image]: https://codecov.io/gh/fatesigner/utils/branch/master/graph/badge.svg
[codecov-url]: https://codecov.io/gh/fatesigner/utils
[download-image]: https://img.shields.io/npm/dw/@fatesigner/utils.svg
[download-url]: https://npmjs.com/package/@fatesigner/utils
[commitizen-image]: https://img.shields.io/badge/commitizen-friendly-green.svg
[commitizen-url]: http://commitizen.github.io/cz-cli/

JavaScript工具库.

## 说明

- 此工具库是自己从事前端开发以来整理和完善的，里面有些函数可以用 [Underscore](https://underscorejs.org/) 和 [lodash](https://lodash.com/docs) 代替。
- 由 typescript 编写，并编译为 [ESM](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/import) 和 [CommonJS](https://requirejs.org/docs/commonjs.html/) 、 [UMD](https://github.com/umdjs/umd) 的代码。
所以如果引入到您的项目中使用，需搭建好 [typescript](https://www.typescriptlang.org/) 或 [babel](https://babeljs.io/docs/en/) 编译环境。
- 借助于 [tree shaking](https://webpack.docschina.org/guides/tree-shaking/) 可以消除未使用的代码。

## 安装

```bash
npm i -S @fatesigner/utils
```

## 具体用法可查看 [文档](https://fatesigner.github.io/utils/)
```js
import { ConvertToCDB } from '@fatesigner/utils';

// 输出: abcd
console.log(ConvertToCDB('ａｂｃｄ'));

import { On } from '@fatesigner/utils/event';

On(document.body, 'scroll', null, (event) => {
  console.log(event.target);
});
```
