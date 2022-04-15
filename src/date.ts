/**
 * 处理日期、时间
 */

import { isDate, isNullOrUndefined, isString } from './type-check';

/**
 * 将 str 转换为 date
 */
export function convertStrToDate(dateTimeStr: string) {
  if (dateTimeStr) {
    // 将所有的'-'转为'/'，以解决IE、firefox浏览器下JS的new Date()的值为Invalid Date、NaN-NaN的问题
    dateTimeStr = dateTimeStr.replace(/-/gm, '/');
    return new Date(dateTimeStr);
  }
}

/**
 * 格式化日期
 * 对 Date的扩展，将 Date 转化为指定格式的String * 年(y)、月(M)、日(d)、12小时(h)、24小时(H)、分(m)、秒(s)、周(E)、季度(q)
 * 可以用 1-2 个占位符 * 年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字)
 * format(new Date(), 'yyyy-MM-dd hh:mm:ss.S')==> 2006-07-02 08:09:04.423
 * 'yyyy-MM-dd E HH:mm:ss') ==> 2009-03-10 二 20:09:04
 * 'yyyy-MM-dd EE hh:mm:ss') ==> 2009-03-10 周二 08:09:04
 * 'yyyy-MM-dd EEE hh:mm:ss') ==> 2009-03-10 星期二 08:09:04
 * 'yyyy-M-d h:m:s.S') ==> 2006-7-2 8:9:4.18
 * @returns { String }
 */
export function dateFormat(dateTime: Date, fmt = 'yyyy-MM-dd HH:mm:ss') {
  const o = {
    'M+': dateTime.getMonth() + 1, // 月份
    'd+': dateTime.getDate(), // 日
    'h+': dateTime.getHours() % 12 === 0 ? 12 : dateTime.getHours() % 12, // 小时
    'H+': dateTime.getHours(), // 小时
    'm+': dateTime.getMinutes(), // 分
    's+': dateTime.getSeconds(), // 秒
    'q+': Math.floor((dateTime.getMonth() + 3) / 3), // 季度
    S: dateTime.getMilliseconds() // 毫秒
  };
  const week = {
    '0': '日',
    '1': '一',
    '2': '二',
    '3': '三',
    '4': '四',
    '5': '五',
    '6': '六'
  };
  let matched = fmt.match(/(y+)/);
  if (matched?.length) {
    fmt = fmt.replace(
      matched[0],
      dateTime
        .getFullYear()
        .toString()
        .substring(4 - matched[0].length)
    );
  }
  matched = fmt.match(/(E+)/);
  if (matched?.length) {
    fmt = fmt.replace(matched[0], (matched[0].length > 1 ? (matched[0].length > 2 ? '星期' : '周') : '') + week[dateTime.getDay() + '']);
  }
  for (const k in o) {
    matched = fmt.match(new RegExp('(' + k + ')'));
    if (matched?.length) {
      fmt = fmt.replace(matched[0], matched[0].length === 1 ? o[k] : ('00' + o[k]).substring(('' + o[k]).length));
    }
  }
  return fmt;
}

/**
 * 获取指定当前时间与过去的一个时间的差值，然后转换为过去的一个时间的描述
 * @param pastTime
 * @param currentTime
 * @constructor
 */
export function getTimeAgo(pastTime: Date, currentTime = null) {
  if (!currentTime) {
    currentTime = new Date();
  }

  // 时间差的毫秒数
  const timeDiff = currentTime.getTime() - pastTime.getTime();

  // 计算出相差天数
  const daysDiff = Math.ceil(timeDiff / (24 * 3600 * 1000));

  // 判断年份是否一致
  if (pastTime.getFullYear() !== currentTime.getFullYear()) {
    return dateFormat(pastTime, 'yyyy-MM-dd HH:mm');
  } else {
    // 以天为单位
    if (daysDiff > 7) {
      // 显示具体日期
      return dateFormat(pastTime, 'MM-dd HH:mm');
    } else if (daysDiff >= 3) {
      // 显示周几
      return dateFormat(pastTime, 'EE HH:mm');
    } else if (daysDiff > 0) {
      if (pastTime.getDate() === currentTime.getDate()) {
        // 和 currentTime 为同一天 显示时分秒
        return dateFormat(pastTime, 'HH:mm');
      } else {
        // 获取前一天的0点
        let lastDate = new Date(currentTime.valueOf());
        lastDate.setDate(lastDate.getDate() - 1);
        lastDate = new Date([lastDate.getFullYear().toString(), (lastDate.getMonth() + 1).toString(), lastDate.getDate().toString()].join('-') + ' 00:00:00');
        if (pastTime.getTime() > lastDate.getTime()) {
          // 显示昨天
          return `昨天 ${dateFormat(pastTime, 'HH:mm')}`;
        } else {
          // 显示前天
          return `前天 ${dateFormat(pastTime, 'HH:mm')}`;
        }
      }
    }
  }
}

/**
 * 获取指定时间的时间戳字符串，默认为当前时间
 */
export function getTimestampStr(date?: Date | string) {
  let date_;
  if (isNullOrUndefined(date)) {
    date_ = new Date();
  } else if (isString(date)) {
    date_ = new Date(date);
  }

  if (!isDate(date_)) {
    throw new Error('[getTimestampStr error]: The value is not a correct date');
  }

  return (
    date_.getFullYear() +
    (date_.getMonth() + 1).toString().padStart(2, '0') +
    date_.getDate().toString().padStart(2, '0') +
    date_.getHours().toString().padStart(2, '0') +
    date_.getMinutes().toString().padStart(2, '0') +
    date_.getSeconds().toString().padStart(2, '0') +
    date_.getMilliseconds().toString().padStart(4, '0')
  );
}
