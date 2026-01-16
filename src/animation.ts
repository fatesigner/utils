/**
 * requestAnimationFrame
 * 优化并行的动画动作，更合理的重新排列动作序列
 * 把能够合并的动作放在一个渲染周期内完成，从而呈现出更流畅的动画效果
 */

import { supportPrefix } from './style';

type RafCallback = (...args: [number] | [Error | null, number]) => any;

let _requestAnimationFrame: (callback: RafCallback) => number;
let _cancelAnimationFrame: (id: number) => void;

const prefix = {
  '': '',
  '-moz-': 'moz',
  '-webkit-': 'webkit',
  '-ms-': 'ms'
}[supportPrefix];

const hasWindow = typeof window !== 'undefined';
if (hasWindow && prefix !== undefined) {
  if (prefix === '') {
    _requestAnimationFrame = window.requestAnimationFrame?.bind(window);
    _cancelAnimationFrame = window.cancelAnimationFrame?.bind(window);
  } else {
    _requestAnimationFrame = (window as any)[prefix + 'RequestAnimationFrame'];
    _cancelAnimationFrame = (window as any)[prefix + 'CancelAnimationFrame'] || (window as any)[prefix + 'CancelRequestAnimationFrame'];
  }
}

if (!_requestAnimationFrame || !_cancelAnimationFrame) {
  let lastTime = 0;
  _requestAnimationFrame = function (cb) {
    const currTime = new Date().getTime();
    const timeToCall = Math.max(0, 16.7 - (currTime - lastTime));
    const id: any = setTimeout(function () {
      const time = currTime + timeToCall;
      if (cb.length >= 2) {
        cb(null, time);
        return;
      }
      cb(time);
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
