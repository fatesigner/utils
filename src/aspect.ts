/**
 * aspect
 * AOP（切面编程）的js实现
 */

import { isFunction } from './type-check';

const InvalidAspect = new Error('Missing a valid aspect. Aspect is not a function.');
const InvalidMethod = new Error('Missing valid method to apply aspect on.');

export type PointcutBindType<F, C> = {
  func: F;
  context: C;
};

export type PointcutInjectType<T> = {
  func: string;
  target: T;
};

export type InjectResType = {
  cancel: () => void;
};

/**
 * 创建一个新函数，并以指定的作用域执行切入的代码，之后调用目标函数
 * @param aspectFunc
 * @param pointcut
 * @constructor
 */
export function bindBefore<A extends (...args: Parameters<F>) => Parameters<F>, F extends (...args: any) => any, C>(
  aspectFunc: A,
  pointcut: PointcutBindType<F, C>
): F {
  if (!isFunction(aspectFunc)) {
    throw InvalidAspect;
  }

  if (!pointcut.func) {
    throw InvalidMethod;
  }

  return function (...args) {
    args = aspectFunc.apply(pointcut.context || this, args);
    return pointcut.func.apply(pointcut.context || this, args);
  } as F;
}

/**
 * 往目标函数的执行前阶段以指定的作用域注入代码
 * @param aspectFunc
 * @param pointcut
 * @constructor
 */
export function injectBefore<F extends (...args: any) => any, T>(
  aspectFunc: (...args: Parameters<F>) => Parameters<F>,
  pointcut: PointcutInjectType<T>
): InjectResType {
  if (!isFunction(aspectFunc)) {
    throw InvalidAspect;
  }

  const prototype = (pointcut.target as any).prototype ? (pointcut.target as any).prototype : pointcut.target;

  const originalFunc = prototype[pointcut.func];

  if (!originalFunc) {
    throw InvalidMethod;
  }

  prototype[pointcut.func] = function (...args: Parameters<F>): ReturnType<F> {
    args = aspectFunc.apply(pointcut.target || this, args);
    return originalFunc.apply(pointcut.target || this, args);
  } as any;

  return {
    cancel() {
      if (originalFunc) {
        prototype[pointcut.func] = originalFunc;
      }
    }
  };
}

/**
 * 创建一个新函数，并以指定的作用域调用目标函数，之后执行切入的代码
 * @param aspectFunc
 * @param pointcut
 * @constructor
 */
export function bindAfter<F extends (...args: any[]) => any, C>(
  aspectFunc: (args: ReturnType<F>) => ReturnType<F>,
  pointcut: PointcutBindType<F, C>
): F {
  if (!isFunction(aspectFunc)) {
    throw InvalidAspect;
  }

  if (!pointcut.func) {
    throw InvalidMethod;
  }

  return function (...args) {
    const res = pointcut.func.apply(pointcut.context || this, args);
    return aspectFunc.apply(pointcut.context || this, [res]);
  } as F;
}

/**
 * 往目标函数的执行后阶段以指定的作用域注入代码
 * @param aspectFunc
 * @param pointcut
 * @constructor
 */
export function injectAfter<F extends (...args: any) => any, T>(
  aspectFunc: (args: ReturnType<F>) => ReturnType<F>,
  pointcut: PointcutInjectType<T>
): InjectResType {
  if (!isFunction(aspectFunc)) {
    throw InvalidAspect;
  }

  const prototype = (pointcut.target as any).prototype ? (pointcut.target as any).prototype : pointcut.target;

  const originalFunc = prototype[pointcut.func];

  if (!originalFunc) {
    throw InvalidMethod;
  }

  prototype[pointcut.func] = function (...args) {
    const res = originalFunc.apply(pointcut.target || this, args);
    return aspectFunc.apply(pointcut.target || this, [res]);
  } as F;

  return {
    cancel() {
      if (originalFunc) {
        prototype[pointcut.func] = originalFunc;
      }
    }
  };
}

/**
 * 创建一个新函数，并以指定的作用域和顺序执行切入的代码和调用目标函数
 * @param aspectFunc
 * @param pointcut
 * @constructor
 */
export function bindAround<F extends (...args: any) => any, C>(
  aspectFunc: (originalFunc: F) => F,
  pointcut: PointcutBindType<F, C>
): F {
  if (!isFunction(aspectFunc)) {
    throw InvalidAspect;
  }

  if (!pointcut.func) {
    throw InvalidMethod;
  }

  return aspectFunc(pointcut.func);
}

/**
 * 往目标函数的执行后阶段以指定的作用域和顺序执行切入的代码
 * @param aspectFunc
 * @param pointcut
 * @constructor
 */
export function injectAround<F extends (...args: any) => any, T>(
  aspectFunc: (originalFunc: F) => F,
  pointcut: PointcutInjectType<T>
): InjectResType {
  if (!isFunction(aspectFunc)) {
    throw InvalidAspect;
  }

  const prototype = (pointcut.target as any).prototype ? (pointcut.target as any).prototype : pointcut.target;

  const originalFunc = prototype[pointcut.func];

  if (!originalFunc) {
    throw InvalidMethod;
  }

  prototype[pointcut.func] = aspectFunc(originalFunc);

  return {
    cancel() {
      if (originalFunc) {
        prototype[pointcut.func] = originalFunc;
      }
    }
  };
}
