/**
 * CSS样式 操作
 */

import { ForEach } from './';
import { IsString } from './type-check';

let supportPrefix: '' | '-webkit-' | '-moz-' | '-ms-' = '';

if (typeof document !== 'undefined') {
  const _style = document.createElement('div').style;
  ForEach(['', '-webkit-', '-moz-', '-ms-'], function(prev, o: string) {
    const s = o + 'transition';
    if (s in _style) {
      supportPrefix = o as any;
      return false;
    }
  });
}

/**
 * 当前浏览器支持的前缀
 * @return '', '-webkit-', '-moz-', '-ms-'
 */
export const SupportPrefix = supportPrefix;

/**
 * 判断当前浏览器是否支持指定的CSS属性
 * @param {String} style
 * @return {Boolean} isSupport
 */
export function IsSupport(style: string) {
  if (IsString(style)) {
    const style_ = document.createElement('div').style;
    return style in style_;
  }
}

/**
 * 为指定的CSS属性添加当前浏览器支持的前缀
 * @param {String} style
 * @return {String} style
 */
export function AddStylePrefix(style: string) {
  if (IsSupport(style)) {
    return style;
  } else {
    return SupportPrefix + style;
  }
}
