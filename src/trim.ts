/**
 * trim
 */

/**
 * 清除首部空格
 * @param str 待处理字符串
 * @param char 需替换的字符串 默认为空
 * @returns {*}
 */
export function trimStart(str: string, char = '') {
  if (char === '') {
    char = ' \n\r\t\f\x0b\xa0\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u200b\u2028\u2029\u3000';
  }
  for (let i = 0, len = str.length; i < len; i++) {
    if (char.indexOf(str.charAt(i)) === -1) {
      str = str.substring(i);
      break;
    }
  }
  return char.indexOf(str.charAt(0)) === -1 ? str : '';
}

/**
 * 清除尾部空格
 * @param str 待处理字符串
 * @param char 需替换的字符串 默认为空
 * @returns {*}
 */
export function trimEnd(str: string, char = '') {
  if (char === '') {
    char = ' \n\r\t\f\x0b\xa0\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u200b\u2028\u2029\u3000';
  }
  for (let i = str.length - 1; i >= 0; i--) {
    if (char.indexOf(str.charAt(i)) === -1) {
      str = str.substring(0, i + 1);
      break;
    }
  }
  return char.indexOf(str.charAt(0)) === -1 ? str : '';
}

/**
 * 清除首尾空格
 * @param str 待处理字符串
 * @param char 需替换的字符串 默认为空
 * @returns {*}
 */
export function trim(str: string, char = '') {
  str = trimStart(str, char);
  str = trimEnd(str, char);
  return str;
}
