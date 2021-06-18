# random
随机数据生成

## getGUID
生成 GUID

```js
import { getGUID } from '@fatesigner/utils/random';

/**
 * 说明：全局唯一标识符（GUID，Globally Unique Identifier）也称作 UUID(Universally Unique IDentifier)
 * GUID是一种由算法生成的二进制长度为128位的数字标识符。GUID 的格式为“xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx”，
 * 其中的 x 是 0-9 或 a-f 范围内的一个32位十六进制数。在理想情况下，任何计算机和计算机集群都不会生成两个相同的GUID。
 * GUID 的总数达到了2^128（3.4×10^38）个，所以随机生成两个相同GUID的可能性非常小，但并不为0。
 * @param {number} length
 * @returns {string} GUID
 */

console.log(getGUID(12));

// 输出：87D348FD6010
```
