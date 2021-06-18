/**
 * CSS样式 操作
 */

import { forEach } from './';
import { isString } from './type-check';

let supportPrefix = '';

if (typeof document !== 'undefined') {
  const _style = document.createElement('div').style;
  forEach(['', '-webkit-', '-moz-', '-ms-'], function (o: string) {
    const s = o + 'transition';
    if (s in _style) {
      supportPrefix = o;
      return false;
    }
  });
}

/**
 * 当前浏览器支持的前缀
 * @return '', '-webkit-', '-moz-', '-ms-'
 */
export { supportPrefix };

/**
 * 判断当前浏览器是否支持指定的CSS属性
 * @param {String} style
 * @return {Boolean} isSupport
 */
export function isSupport(style) {
  if (isString(style)) {
    const style_ = document.createElement('div').style;
    return style in style_;
  }
}

/**
 * 为指定的CSS属性添加当前浏览器支持的前缀
 * @param {String} style
 * @return {String} style
 */
export function addStylePrefix(style) {
  if (isSupport(style)) {
    return style;
  } else {
    return supportPrefix + style;
  }
}
