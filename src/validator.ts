/**
 * validator
 * 常用的一些验证
 */

import { isArray, isBoolean, isNullOrUndefined, isString } from './type-check';

/**
 * 判断指定的值是否符合必填规则
 * 对于数组，判断数量是否大于 0
 * @param value
 * @returns {boolean}
 */
export function Required(value: unknown): boolean {
  if (isNullOrUndefined(value)) {
    return false;
  } else if (isString(value)) {
    return !!value;
  } else if (isArray(value)) {
    return !!(value as unknown[]).length;
  } else if (isBoolean(value)) {
    return !!value;
  } else {
    return true;
  }
}

/**
 * 判断是否为数字
 * @param value
 * @returns {boolean}
 */
export function isNumber(value: unknown) {
  return !isNaN(value as number);
}

/**
 * 判断指定的字符串长度是否符合给定的范围
 * @param value
 * @param {number} minLength
 * @param maxLength
 * @returns {boolean}
 */
export function LenLimit(value: string, minLength = 0, maxLength: number) {
  if (!isNullOrUndefined(value)) {
    if (isNumber(minLength) && isNumber(maxLength)) {
      return minLength <= value.length && value.length <= maxLength;
    }
    throw new Error('LenLimit Argument Error：');
  }
  return true;
}

/**
 * 整数（包含0）
 * @param value
 * @param {boolean} positive 是否为正数，否则为负数
 * @returns {boolean}
 */
export function isInt(value: unknown, positive?: boolean) {
  if (!isNullOrUndefined(value)) {
    if (isNumber(value)) {
      value = value.toString();
    }
    if (isString(value) && (value as string).length) {
      if (isBoolean(positive)) {
        if (positive) {
          // 非负整数 + 0
          return /^\d+$/.test(value.toString());
        } else {
          // 负整数 + 0
          return /^((-\d+)|(0+))$/.test(value.toString());
        }
      } else {
        // 整数
        return /^-?\d+$/.test(value.toString());
      }
    } else {
      return false;
    }
  } else {
    return true;
  }
}

/**
 * 判断是否为符合指定规则的 decimal
 * @param value
 * @param intLimit 整数部分位数长度限制 [minLength, maxLength]
 * @param dicimalLimit 小数部分位数长度限制 [minLength, maxLength]
 * @returns {boolean}
 */
export function isDecimal(value: string | number, intLimit: [number, number?] = [1], dicimalLimit: [number, number?] = [0]) {
  if (!isNullOrUndefined(value)) {
    const intLimitStr = intLimit.length > 1 ? intLimit.join(',') : intLimit[0] + ',';
    const dicimalLimitStr = dicimalLimit.length > 1 ? dicimalLimit.join(',') : dicimalLimit[0] + ',';
    const reg = new RegExp(`^[-]?[0-9]{${intLimitStr}}(\\.[0-9]{${dicimalLimitStr}})?$`, 'gim');
    return reg.test(value.toString());
  }
  return true;
}

/**
 * 验证手机号
 * 11位
 * 13段：130-139
 * 14段：145、147
 * 15段：150-159
 * 16段：160-169
 * 17段：170、176、177、178
 * 18段：180-189
 * 19段：198、199
 * @param value
 * @returns {boolean}
 */
export function isCellphone(value: string | number) {
  if (value) {
    return /^(((13\d)|(14\d)|(15\d)|(16\d)|(17\d)|(18\d)|(19\d))+\d{8})$/.test(value.toString());
  }
  return true;
}

/**
 * 身份证号码，简单版本，验证15或18位
 * @param value
 * @returns {boolean}
 */
export function isIdCard(value: string) {
  if (value) {
    value = value.toString();
    return /(^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$)|(^[1-9]\d{5}\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}$)/.test(
      value
    );
  }
  return true;
}

/**
 * 邮箱
 * 1.邮箱以a-z、A-Z、0-9开头，最小长度为1.
 * 2.如果左侧部分包含-、_、.则这些特殊符号的前面必须包一位数字或字母。
 * 3.@符号是必填项
 * 4.右则部分可分为两部分，第一部分为邮件提供商域名地址，第二部分为域名后缀，现已知的最短为2位。最长的为6为。
 * 5.邮件提供商域可以包含特殊字符-、_、.
 * @param value
 * @returns {boolean}
 */
export function isEmail(value: string) {
  if (value) {
    return /^[a-z\d]+([._\\-]*[a-z\d])*@([a-z\d]+[-a-z\d]*[a-z\d]+.){1,63}[a-z\d]+$/.test(value);
  }
  return true;
}

/**
 * 验证密码，至少同时包含数字和字母
 * @param {string} value
 * @param {number} minLength 默认为 6 位
 * @param {number} maxLength 默认为 20 位
 * @returns {boolean}
 */
export function Password(value: string, minLength = 6, maxLength = 20) {
  if (value) {
    return minLength <= value.length && value.length <= maxLength && /^(?=.*[a-z])(?=.*\d)[^]*$/.test(value);
  }
  return true;
}
