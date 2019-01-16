# date
日期类相关的操作

## ConvertStrToDate
将指定的 str 转换为 date
- 将所有的'-'转为'/'，以解决IE、firefox浏览器下JS的new Date()的值为Invalid Date、NaN-NaN的问题

```js
import { ConvertStrToDate } from '@fatesigner/utils/date';

let date = ConvertStrToDate('2012-12-12 12:12:12');
```

## DateFormat
格式化日期

```js
import { DateFormat } from '@fatesigner/utils/date';

/**
 * 对 Date的扩展，将 Date 转化为指定格式的String * 年(y)、月(M)、日(d)、12小时(h)、24小时(H)、分(m)、秒(s)、周(E)、季度(q)
 * 可以用 1-2 个占位符 * 年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字)
 * format(new Date(), 'yyyy-MM-dd hh:mm:ss.S')==> 2006-07-02 08:09:04.423
 * 'yyyy-MM-dd E HH:mm:ss') ==> 2009-03-10 二 20:09:04
 * 'yyyy-MM-dd EE hh:mm:ss') ==> 2009-03-10 周二 08:09:04
 * 'yyyy-MM-dd EEE hh:mm:ss') ==> 2009-03-10 星期二 08:09:04
 * 'yyyy-M-d h:m:s.S') ==> 2006-7-2 8:9:4.18
 * @returns { String }
 */

let dateStr = DateFormat(new Date(), 'yyyy-MM-dd hh:mm:ss');

console.log(dateStr);

// 输出：2006-07-02 08:09:04
```

## GetTimeAgo
获取指定当前时间与过去的一个时间的差值，然后转换为过去的一个时间的描述，可用于列表的时间显示。

```js
import { GetTimeAgo } from '@fatesigner/utils/date';

/**
 * @param pastTime
 * @param currentTime
 * @constructor
 */

const currentTime = new Date('2012-12-12 01:12:12');

console.log(GetTimeAgo(new Date('2012-12-12 00:12:13'), currentTime));
// 输出：00:12
console.log(GetTimeAgo(new Date('2012-12-11 23:42:13'), currentTime));
// 输出：昨天 23:42
console.log(GetTimeAgo(new Date('2012-12-10 23:59:59'), currentTime));
// 输出：前天 23:59
console.log(GetTimeAgo(new Date('2012-12-09 23:52:23'), currentTime));
// 输出：周日 23:52
console.log(GetTimeAgo(new Date('2012-12-01 23:41:12'), currentTime));
// 输出：12-01 23:41
console.log(GetTimeAgo(new Date('2011-12-21 12:42:22'), currentTime));
// 输出：2011-12-21 12:42
```
