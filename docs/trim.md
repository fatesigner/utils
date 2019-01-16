# trim
trim 操作

## TrimStart
从前部开始替换指定字符串为其他字符。

```js
import { TrimStart } from '@fatesigner/utils/trim';

/**
 * 清除首部空格
 * @param str 待处理字符串
 * @param char 需替换的字符串 默认为空字符
 * @returns {*}
 */

console.log(TrimStart('    123'));

// 输出: 123

console.log(TrimStart('ffff123', 'f'));

// 输出: 123
```

## TrimEnd
从尾部开始替换指定字符串为其他字符。

```js
import { TrimEnd } from '@fatesigner/utils/trim';

/**
 * 清除尾部空格
 * @param str 待处理字符串
 * @param char 需替换的字符串 默认为空字符
 * @returns {*}
 */

console.log(TrimEnd('123  '));

// 输出: 123

console.log(TrimEnd('123ffff', 'f'));

// 输出: 123
```

## Trim
从前后开始替换指定字符串为其他字符。

```js
import { Trim } from '@fatesigner/utils/trim';

/**
 * 清除尾部空格
 * @param str 待处理字符串
 * @param char 需替换的字符串 默认为空字符
 * @returns {*}
 */

console.log(Trim('  123  '));

// 输出: 123

console.log(Trim('ffff123ffff', 'f'));

// 输出: 123
```
