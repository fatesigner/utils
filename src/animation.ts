/**
 * requestAnimationFrame
 * 优化并行的动画动作，更合理的重新排列动作序列
 * 把能够合并的动作放在一个渲染周期内完成，从而呈现出更流畅的动画效果
 */

import { SupportPrefix } from './style';

let requestAnimationFrame: (callback: Function) => number;
let cancelAnimationFrame: (id: number) => void;

const prefix = {
  '': '',
  '-moz-': 'moz',
  '-webkit-': 'webkit',
  '-ms-': ''
}[SupportPrefix];

if (prefix) {
  requestAnimationFrame = (this as any)[prefix + 'RequestAnimationFrame'];
  cancelAnimationFrame =
    (this as any)[prefix + 'CancelAnimationFrame'] || (this as any)[prefix + 'CancelRequestAnimationFrame'];
} else {
  let lastTime = 0;
  requestAnimationFrame = function(callback) {
    const currTime = new Date().getTime();
    const timeToCall = Math.max(0, 16.7 - (currTime - lastTime));
    const id: any = setTimeout(function() {
      callback(currTime + timeToCall);
    }, timeToCall);
    lastTime = currTime + timeToCall;
    return id;
  };
  cancelAnimationFrame = function(id) {
    clearTimeout(id);
  };
}

export const RequestAnimationFrame = requestAnimationFrame;

export const CancelAnimationFrame = cancelAnimationFrame;
