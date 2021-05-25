/**
 * requestAnimationFrame
 * 优化并行的动画动作，更合理的重新排列动作序列
 * 把能够合并的动作放在一个渲染周期内完成，从而呈现出更流畅的动画效果
 */

import { supportPrefix } from './style';

let _requestAnimationFrame: (callback: (...any) => any) => number;
let _cancelAnimationFrame: (id: number) => void;

const prefix = {
  '': '',
  '-moz-': 'moz',
  '-webkit-': 'webkit'
}[supportPrefix];

if (prefix) {
  _requestAnimationFrame = window[prefix + 'RequestAnimationFrame'];
  _cancelAnimationFrame = window[prefix + 'CancelAnimationFrame'] || window[prefix + 'CancelRequestAnimationFrame'];
} else {
  let lastTime = 0;
  _requestAnimationFrame = function (callback) {
    const currTime = new Date().getTime();
    const timeToCall = Math.max(0, 16.7 - (currTime - lastTime));
    const id: any = setTimeout(function () {
      callback(currTime + timeToCall);
    }, timeToCall);
    lastTime = currTime + timeToCall;
    return id;
  };
  _cancelAnimationFrame = function (id) {
    clearTimeout(id);
  };
}

export const requestAnimationFrame = _requestAnimationFrame;

export const cancelAnimationFrame = _cancelAnimationFrame;
