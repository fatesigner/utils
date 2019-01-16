/**
 * debug
 */

import { InjectAround, PointcutInjectType } from './aspect';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

/**
 * 往指定函数切入代码，统计每次该函数执行的耗时
 * @param pointcut 要切入的函数名
 * @param format console.log 输出格式
 * @constructor
 */
export function LatencyTimeLog<F extends (...arg: any[]) => Promise<any>>(
  pointcut: PointcutInjectType<any>,
  format = 'spend time：[time]'
) {
  return InjectAround<F, any>(function(originFunc) {
    return async function(...args) {
      const timeStart = new Date().getTime();
      const res = await originFunc(args);
      console.log(format.replace('[time]', (new Date().getTime() - timeStart).toString()));
      return res;
    } as F;
  }, pointcut);
}

/**
 * 为指定的 observable source 添加用于调试的 log 记录
 * @param source
 * @constructor
 */
export function CreateInstrument<T>(source: Observable<T>) {
  return new Observable<T>(observer => {
    console.log('source: subscribing');
    const subscription = source
      .pipe(
        tap(value => {
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
