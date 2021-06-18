# trim
trim 操作

## trimStart
从前部开始替换指定字符串为其他字符。

```js
import { trimStart } from '@fatesigner/utils/trim';

/**
 * 清除首部空格
 * @param str 待处理字符串
 * @param char 需替换的字符串 默认为空字符
 * @returns {*}
 */

console.log(trimStart('    123'));

// 输出: 123

console.log(trimStart('ffff123', 'f'));

// 输出: 123
```

## trimEnd
从尾部开始替换指定字符串为其他字符。

```js
import { trimEnd } from '@fatesigner/utils/trim';

/**
 * 清除尾部空格
 * @param str 待处理字符串
 * @param char 需替换的字符串 默认为空字符
 * @returns {*}
 */

console.log(trimEnd('123  '));

// 输出: 123

console.log(trimEnd('123ffff', 'f'));

// 输出: 123
```

## trim
从前后开始替换指定字符串为其他字符。

```js
import { trim } from '@fatesigner/utils/trim';

/**
 * 清除尾部空格
 * @param str 待处理字符串
 * @param char 需替换的字符串 默认为空字符
 * @returns {*}
 */

console.log(trim('  123  '));

// 输出: 123

console.log(trim('ffff123ffff', 'f'));

// 输出: 123
```
