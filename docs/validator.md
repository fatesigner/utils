# validator
各类验证函数

## Required
判断指定的值是否符合必填规则。

```js
import { Required } from '@fatesigner/utils/validator';

console.log(Required([]));

// 输出: false
```

## IsNumber
判断是否为数字。

```js
import { IsNumber } from '@fatesigner/utils/validator';

console.log(IsNumber(12));
// 输出: true
console.log(IsNumber('12'));
// 输出: true
console.log(IsNumber('12d'));
// 输出: false
```

## LenLimit
判断指定的字符串长度是否符合给定的范围。

```js
import { LenLimit } from '@fatesigner/utils/validator';

console.log(LenLimit('1234567',3, 10));

// 输出: true

console.log(LenLimit('1234567',3, 5));

// 输出: false
```

## IsInt
判断是否为整数。

```js
import { IsInt } from '@fatesigner/utils/validator';

/**
 * @param {Object} value
 * @param {boolean} positive 是否为正整数数，否则为负整数
 * @returns {boolean}
 */

console.log(IsInt(12));
// 输出: true
console.log(IsInt('12', true));
// 输出: true
console.log(IsInt('12d', true));
// 输出: false
console.log(IsInt(-12));
// 输出: true
console.log(IsInt('12', false));
// 输出: false
console.log(IsInt('12d', false));
// 输出: false
console.log(IsInt('-12', false));
// 输出: true
```

## IsDecimal
判断给定的值是否为符合指定规则的 decimal 格式

```js
import { IsDecimal } from '@fatesigner/utils/validator';

/**
 * @param {Object} value
 * @param intLimit 整数部分位数长度限制 [minLength, maxLength]
 * @param dicimalLimit 小数部分位数长度限制 [minLength, maxLength]
 * @returns {boolean}
 */

console.log(IsDecimal(231));
// 输出: true
console.log(IsDecimal(-231));
// 输出: true
console.log(IsDecimal('--231'));
// 输出: false
console.log(IsDecimal('2d'));
// 输出: false
console.log(IsDecimal('-2dda'));
// 输出: false
console.log(IsDecimal('134', [1, 3], [2]));
// 输出: true
console.log(IsDecimal('1342', [1, 3], [2]));
// 输出: false
console.log(IsDecimal('134', [2, 3], [2]));
// 输出: true
console.log(IsDecimal('1', [2, 3], [2]));
// 输出: false
console.log(IsDecimal('13', [1, 18], [0, 2]));
// 输出: true
console.log(IsDecimal('13', [1, 18], [0, 2]));
// 输出: true
console.log(IsDecimal('13.33', [1, 18], [2, 2]));
// 输出: true
console.log(IsDecimal('13.3334', [1, 18], [2, 2]));
// 输出: false
```

## IsCellphone
验证手机号

```js
import { IsCellphone } from '@fatesigner/utils/validator';

/**
 * 11位
 * 13段：130、131、132、133、134、135、136、137、138、139
 * 14段：145、147
 * 15段：150-159
 * 16段：160-169
 * 15段：150、151、152、153、155、156、157、158、159
 * 17段：170、176、177、178
 * 18段：180、181、182、183、184、185、186、187、188、189
 * 19段：198、199
 * @param {Object} value
 * @returns {boolean}
 */

const nums = [
  ...[...Array(10).keys()].map(i => 130 + i),
  ...[145, 147],
  ...[...Array(10).keys()].map(i => 150 + i),
  ...[...Array(10).keys()].map(i => 160 + i),
  ...[170, 176, 177, 178],
  ...[...Array(10).keys()].map(i => 180 + i),
  ...[198, 199]
];

nums.forEach(num => {
  const rdm =
    num +
    Math.random()
      .toString()
      .replace('0.', '')
      .substr(0, 8)
      .toString();
  console.log(rdm + '：valid ' + Validator.IsCellphone(rdm));
});

// 输出: 
13028396401：valid true
13148548196：valid true
13267794842：valid true
13362783079：valid true
13442578928：valid true
13597481813：valid true
13659228384：valid true
13706493169：valid true
13868592299：valid true
13957514645：valid true
14503723957：valid true
14726861332：valid true
15063084374：valid true
15128838690：valid true
...
```

## IsIdCard
验证身份证号码，简单版本，验证15或18位

```js
import { IsIdCard } from '@fatesigner/utils/validator';

console.log(IsIdCard('360731199601021245'));
// 输出: true
console.log(IsIdCard('60731199601021245'));
// 输出: false
console.log(IsIdCard('3607311996010212451'));
// 输出: false
console.log(IsIdCard('360731850213582'));
// 输出: true
console.log(IsIdCard('36073119960102124X'));
// 输出: true
```

## IsEmail
验证邮箱号码

```js
import { IsEmail } from '@fatesigner/utils/validator';

/**
 * 1.邮箱以a-z、A-Z、0-9开头，最小长度为1.
 * 2.如果左侧部分包含-、_、.则这些特殊符号的前面必须包一位数字或字母。
 * 3.@符号是必填项
 * 4.右则部分可分为两部分，第一部分为邮件提供商域名地址，第二部分为域名后缀，现已知的最短为2位。最长的为6为。
 * 5.邮件提供商域可以包含特殊字符-、_、.
 * @param {Object} value
 * @returns {boolean}
 */

console.log(IsEmail('123123@gmail.com'));
// 输出: true
console.log(IsEmail('123123.com'));
// 输出: false
console.log(IsEmail('@gmail.com'));
// 输出: false
console.log(IsEmail('dasda@gmail.'));
// 输出: false
```

## Password
验证密码，至少同时包含数字和字母

```js
import { Password } from '@fatesigner/utils/validator';

/**
 * @param {string} value
 * @param {number} minLength 默认为 6 位
 * @param {number} maxLength 默认为 20 位
 * @returns {boolean}
 */

console.log(Password('12345'));
// 输出: false
console.log(Password('1234545123412345123'));
// 输出: false
console.log(Password('123456'));
// 输出: false
console.log(Password('asdsaf'));
// 输出: false
console.log(Password('123456csd', 20, 23));
// 输出: false
console.log(Password('123456csd', 6, 12));
// 输出: true
console.log(Password('1234#$.12dqwe56csd'));
// 输出: true
console.log(Password('1234#$.12dqwe56csdgasdasdasdasda'));
// 输出: false
```
