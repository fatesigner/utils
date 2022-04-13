import { Power1, gsap } from 'gsap';

/**
 * 创建一个数值过渡
 * @param targets
 * @param vars
 * @param position
 * @param timeline
 */
export function gaspCounter(
  targets: gsap.TweenTarget,
  vars: gsap.TweenVars & {
    end: number;
  },
  position?: gsap.Position,
  timeline?: gsap.core.Timeline
) {
  const vars_ = Object.assign(
    {
      end: 0,
      increment: 1,
      duration: 0.5,
      ease: Power1.easeIn
    },
    vars
  );
  const args = {
    duration: vars_?.duration,
    innerText: vars_?.end,
    // snap:{innerText:config.increment},
    modifiers: {
      innerText: function (innerText) {
        return gsap.utils
          .snap(vars_?.increment, innerText)
          .toString()
          .replace(/\B(?=(\d{3})+(?!\d))/g, ',');
      }
    },
    ease: vars_?.ease
  };
  if (timeline) {
    timeline.to(targets, args, position);
  } else {
    gsap.to(targets, args);
  }
}
