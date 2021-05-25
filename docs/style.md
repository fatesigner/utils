# style
样式类操作

## supportPrefix
当前浏览器支持的前缀。-webkit-, -moz-, -ms-

```js
import { supportPrefix } from '@fatesigner/utils/style';

console.log(supportPrefix);

// 输出：-webkit-
```

## isSupport
判断当前浏览器是否支持指定的CSS属性。

```js
import { isSupport } from '@fatesigner/utils/style';

console.log(isSupport('background'));

// 输出：true
```

## addStylePrefix
为指定的CSS属性添加当前浏览器支持的前缀。（不推荐使用）
- 此前缀只是简单的将浏览器支持的前缀进行拼接，所以不支持一些特殊的属性譬如 [display: flex](https://developer.mozilla.org/zh-CN/docs/Web/CSS/flex)。建议用 [PostCSS](https://postcss.org/) 构建您的样式。

```js
import { addStylePrefix } from '@fatesigner/utils/style';

console.log(addStylePrefix('box'));

// 输出：-webkit-box
```
