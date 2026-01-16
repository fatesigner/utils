# Utils

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
