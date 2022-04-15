/**
 * aspect
 * AOP（切面编程）的js实现
 */

import { isFunction } from './type-check';

const InvalidAspect = new Error('Missing a valid aspect. Aspect is not a function.');
const InvalidMethod = new Error('Missing valid method to apply aspect on.');

export type InjectResType = {
  cancel: () => void;
};

/**
 * 创建一个新函数，以指定的作用域执行切入的代码，之后调用目标函数
 * @param aspectFunc 切入的自定义函数
 * @param sourceFunc 要切入的目标函数
 * @param context 函数执行的作用域
 */
export function bindBefore<S extends (...args: unknown[]) => unknown, A extends (...args: Parameters<S>) => Parameters<S>>(
  aspectFunc: A,
  sourceFunc: S,
  context?
) {
  if (!isFunction(aspectFunc)) {
    throw InvalidAspect;
  }

  if (!isFunction(sourceFunc)) {
    throw InvalidMethod;
  }

  return function (...args: Parameters<S>): ReturnType<S> {
    const ctx = context ?? this;
    const args_ = aspectFunc.apply(ctx, args);
    return sourceFunc.apply(ctx, args_);
  };
}

/**
 * 创建一个新函数，以指定的作用域执行目标函数，之后执行切入的代码
 * @param aspectFunc 切入的自定义函数
 * @param sourceFunc 要切入的目标函数
 * @param context 函数执行的作用域
 */
export function bindAfter<S extends (...args: unknown[]) => unknown>(aspectFunc: (args: ReturnType<S>) => ReturnType<S>, sourceFunc: S, context?) {
  if (!isFunction(aspectFunc)) {
    throw InvalidAspect;
  }

  if (!isFunction(sourceFunc)) {
    throw InvalidMethod;
  }

  return function (...args: Parameters<S>): ReturnType<S> {
    const ctx = context ?? this;
    const args_ = sourceFunc.apply(ctx, args);
    return aspectFunc.apply(ctx, [args_]);
  };
}

/**
 * 往目标函数的执行前阶段切入代码
 * @param aspectFunc 切入的自定义函数
 * @param name 要切入的目标函数名
 * @param target 目标函数对象（作用域）
 */
export function injectBefore<S extends (...args: unknown[]) => unknown>(
  aspectFunc: (...args: Parameters<S>) => Parameters<S>,
  name: string,
  target
): InjectResType {
  if (!isFunction(aspectFunc)) {
    throw InvalidAspect;
  }

  if (!name) {
    throw InvalidMethod;
  }

  const prototype = (target as any)?.prototype ?? target;

  const originalFunc = prototype?.[name];

  if (!originalFunc) {
    throw InvalidMethod;
  }

  prototype[name] = function (...args: Parameters<S>): ReturnType<S> {
    const ctx = target ?? this;
    const args_ = aspectFunc.apply(ctx, args);
    return originalFunc.apply(ctx, args_);
  };

  return {
    cancel() {
      if (originalFunc) {
        prototype[name] = originalFunc;
      }
    }
  };
}

/**
 * 往目标函数的执行后阶段注入代码
 * @param aspectFunc 切入的自定义函数
 * @param name 要切入的目标函数名
 * @param target 目标函数对象（作用域）
 */
export function injectAfter<S extends (...args: unknown[]) => unknown>(
  aspectFunc: (args: ReturnType<S>) => ReturnType<S>,
  name: string,
  target
): InjectResType {
  if (!isFunction(aspectFunc)) {
    throw InvalidAspect;
  }

  if (!name) {
    throw InvalidMethod;
  }

  const prototype = (target as any)?.prototype ?? target;

  const originalFunc = prototype?.[name];

  if (!originalFunc) {
    throw InvalidMethod;
  }

  prototype[name] = function (...args: Parameters<S>): ReturnType<S> {
    const ctx = target ?? this;
    const args_ = originalFunc.apply(ctx, args);
    return aspectFunc.apply(ctx, [args_]);
  };

  return {
    cancel() {
      if (originalFunc) {
        prototype[name] = originalFunc;
      }
    }
  };
}

/**
 * 创建一个新函数，将目标函数作为参数
 * @param aspectFunc 切入的自定义函数
 * @param sourceFunc 要切入的目标函数
 */
export function bindAround<S extends (...args: unknown[]) => unknown>(aspectFunc: (func: S) => S, sourceFunc: S) {
  if (!isFunction(aspectFunc)) {
    throw InvalidAspect;
  }

  if (!isFunction(sourceFunc)) {
    throw InvalidMethod;
  }

  return aspectFunc(sourceFunc);
}

/**
 * 往目标函数以指定的作用域和顺序执行切入的代码
 * @param aspectFunc 切入的自定义函数
 * @param name 要切入的目标函数名
 * @param target 目标函数对象（作用域）
 */
export function injectAround<S extends (...args: unknown[]) => unknown>(aspectFunc: (func: S) => S, name: string, target): InjectResType {
  if (!isFunction(aspectFunc)) {
    throw InvalidAspect;
  }

  if (!name) {
    throw InvalidMethod;
  }

  const prototype = (target as any)?.prototype ?? target;

  const originalFunc = prototype?.[name];

  if (!originalFunc) {
    throw InvalidMethod;
  }

  prototype[name] = aspectFunc(originalFunc);

  return {
    cancel() {
      if (originalFunc) {
        prototype[name] = originalFunc;
      }
    }
  };
}
