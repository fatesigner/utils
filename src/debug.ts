/**
 * debug
 */

import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import { injectAround, InjectResType } from './aspect';

/**
 * 往指定函数切入代码，统计每次该函数执行的耗时
 * @param name 要切入的目标函数名
 * @param target 目标函数对象（作用域）
 * @param format console.log 输出格式
 * @constructor
 */
export function LatencyTimeLog<S extends (...args: unknown[]) => unknown>(name: string, target, format = 'spend time：[time]'): InjectResType {
  return injectAround(
    function (originFunc) {
      return function (...args) {
        const timeStart = Date.now();
        const res = originFunc.apply(this, args);
        if (res && typeof (res as Promise<unknown>).finally === 'function') {
          return (res as Promise<unknown>).finally(() => {
            const spend = Date.now() - timeStart;
            console.log(format.replace('[time]', spend.toString()));
          });
        }
        const spend = Date.now() - timeStart;
        console.log(format.replace('[time]', spend.toString()));
        return res;
      };
    },
    name,
    target
  );
}

/**
 * 为指定的 observable source 添加用于调试的 log 记录
 * @param source
 * @constructor
 */
export function CreateInstrument<T>(source: Observable<T>) {
  return new Observable<T>((observer) => {
    console.log('source: subscribing');
    const subscription = source
      .pipe(
        tap((value) => {
          console.log(`source: emit ` + JSON.stringify(value));
        })
      )
      .subscribe(observer);
    return () => {
      subscription.unsubscribe();
      console.log('source: unsubscribed');
    };
  });
}

/**
 * 创建具有指定名称的观察者
 * @param name
 * @constructor
 */
export function CreateObserver<T>(name: string) {
  return {
    next: (value: T) => console.log(`observer ${name} next: ${JSON.stringify(value)}`),
    complete: () => console.log(`observer ${name} complete`)
  };
}
