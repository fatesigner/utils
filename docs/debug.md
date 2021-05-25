# debug
一些用助于调试的函数

## latencyTimeLog
往指定函数切入代码，统计每次该函数执行的耗时。（借助于 aspect 函数）

```js
import { latencyTimeLog } from '@fatesigner/utils/debug';

/**
 * @param pointcut 要切入的函数名
 * @param format console.log 输出格式
 * @constructor
 */

const obj = {
  sync(): Promise<number> {
    return new Promise(resolve => {
      setTimeout(x => {
        resolve(1000);
      }, 2000);
    });
  }
};

latencyTimeLog(
  {
    target: obj,
    func: 'sync'
  },
  '_____time spend：[time]'
);

obj.sync();

// 输出：_____time spend：2001
```

## createInstrument
为指定的 observable source 添加用于调试的 log 记录。

```js
import { createInstrument, createObserver } from '@fatesigner/utils/debug';

let source$ = of(0).pipe(delay(3000));

source$ = createInstrument(source$);

source$.subscribe(createObserver('a'));

// 输出：
source: subscribing
source: emit 0
observer a next: 0
observer a complete
```

## createObserver
创建具有指定名称的观察者。

```js
import { createInstrument, createObserver } from '@fatesigner/utils/debug';

let source$ = of(0).pipe(delay(3000));

source$ = createInstrument(source$);

source$.subscribe(createObserver('c'));

// 输出：
source: subscribing
source: emit 0
observer c next: 0
observer c complete
```
