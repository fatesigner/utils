# Utils

[![npm][npm-image]][npm-url]
[![download][download-image]][download-url]
[![commitizen][commitizen-image]][commitizen-url]
[![prettier][prettier-image]][prettier-url]
[![semantic][semantic-image]][semantic-url]

[npm-image]: https://img.shields.io/npm/v/@fatesigner/utils.svg?style=flat-square&logo=npm
[npm-url]: https://npmjs.com/package/@fatesigner/utils
[prettier-image]: https://img.shields.io/badge/styled_with-prettier-ff69b4.svg?style=flat-square&logo=prettier
[prettier-url]: https://github.com/prettier/prettier
[download-image]: https://img.shields.io/npm/dw/@fatesigner/utils.svg?style=flat-square
[download-url]: https://npmjs.com/package/@fatesigner/utils
[commitizen-image]: https://img.shields.io/badge/commitizen-friendly-green.svg?style=flat-square
[commitizen-url]: http://commitizen.github.io/cz-cli/
[semantic-image]: https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg?style=flat-square&color=9cf
[semantic-url]: https://opensource.org/licenses/MIT

JavaScript工具库.

## 说明

- 此工具库是自己从事前端开发以来整理和完善的，里面有些函数可以用 [Underscore](https://underscorejs.org/) 和 [lodash](https://lodash.com/docs) 代替。
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

