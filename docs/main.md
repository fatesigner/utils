# main

```js
import * as Utils from '@fatesigner/utils';
```

## Noop
当某些函数必须要传递一个回调函数的参数时，可以将其作为占位符执行空的功能，避免报错，而且无需每次新建一个空函数，而占用内存。和 angular 的 noop 作用一致。

```js
import { Noop } from '@fatesigner/utils';

function foo(callback) { 
  var result = calculateResult(); 
  (callback || Noop)(result); 
} 
```

## ApplyBind
该方法会创建一个新函数，称为绑定函数，当调用这个绑定函数时，绑定函数会以创建它时传入第 context 作为 this，
传入后续的参数加上绑定函数运行时本身的参数按照顺序作为原函数的参数来调用原函数。

与 js 的 bind 作用一致，详细可点击  [Function.prototype.bind()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Function/bind) 。
```js
import { ApplyBind } from '@fatesigner/utils';

function log(...args) {
  console.log(JSON.stringify(this));
  console.log(JSON.stringify(args, null, 2));
}

ApplyBind(log, { context: 0 }, 1, 2, 3, 4)(5, 6, 7);

// 输出:
// {"context":0}
// [1,2,3,4,5,6,7]
```

## Debounce
防抖动函数，常用于DOM之类的高频发事件的触发频率控制。替代用法可查看 rxjs 的 [debounce](https://rxjs-cn.github.io/learn-rxjs-operators/operators/filtering/debounce.html)

```js
import { Debounce } from '@fatesigner/utils';

/**
 * debounce
 * 空闲控制 返回函数连续调用时，空闲时间必须大于或等于 idle（ms），fn 才会执行
 * 描述：如果用手指一直按住一个弹簧，它将不会弹起直到你松手为止。
 * 也就是说当调用动作n毫秒后，才会执行该动作，若在这n毫秒内又调用此动作则将重新计算执行时间。
 * @param {Function} fn 需要延迟调用的函数
 * @param {Number=0} idle 空闲时间，单位毫秒
 * @param {Boolean=false} immediate
 * true：表示首次调用返回值方法时，会马上调用fn
 * @param {Function=null} alwaysDo 延迟期间仍会调用的函数 默认为空
 * @returns {Function}
 */

```

## Throttle
节流函数，常用于DOM之类的高频发事件的触发频率控制。替代用法可查看 rxjs 的 [throttle](https://rxjs-cn.github.io/learn-rxjs-operators/operators/filtering/throttle.html)

```js
import { Throttle } from '@fatesigner/utils';

/**
 * throttle
 * 频率控制 返回函数连续调用时，fn 执行频率限定为每多少时间（ms）执行一次
 * 描述：如果将水龙头拧紧直到水是以水滴的形式流出，那你会发现每隔一段时间，就会有一滴水流出。
 * 就是会说预先设定一个执行周期，当调用动作的时刻大于等于执行周期则执行该动作，然后进入下一个新周期。
 * @param {Function} fn 需要调用的函数
 * @param {Number} delay 延迟时间，单位毫秒
 * @param {Boolean} immediate
 * true：首次调用返回值方法时，会马上调用fn
 * false：仅会记录当前时刻，当第二次调用的时间间隔超过delay时，才调用fn。
 * @param {Boolean} trailing
 * true：当调用方法时，未到达delay指定的时间间隔，则启动计时器延迟调用fn函数，
 * 若后续在既未达到delay指定的时间间隔和fn函数又未被调用的情况下调用返回值方法，则被调用请求将被忽略。
 */

```

## Capitalize
将指定的字符串的首字母替换为大写

```js
import { Capitalize } from '@fatesigner/utils';

console.log(Capitalize('capitalize'));

// 输出: Capitalize
```

## ConvertToCDB
将全角符号转化为半角符号

```js
import { ConvertToCDB } from '@fatesigner/utils';

console.log(ConvertToCDB('ａｂｃｄ'));

// 输出: abcd
```

## ConvertToDBC
将半角符号转化为全角符号

```js
import { ConvertToDBC } from '@fatesigner/utils';

console.log(ConvertToDBC('abcd'));

// 输出: ａｂｃｄ
```

## ConvertBridgeStrToHump
将-连接字符串转换为驼峰式

```js
import { ConvertBridgeStrToHump } from '@fatesigner/utils';

console.log(ConvertBridgeStrToHump('convert-hump-str-to-bridge'));

// 输出: ConvertHumpStrToBridge
```

## ConvertHumpStrToBridge
将驼峰式字符串转换为-连接

```js
import { ConvertHumpStrToBridge } from '@fatesigner/utils';

console.log(ConvertHumpStrToBridge('convertHumpStrToBridge'));

// 输出: convert-hump-str-to-bridge
```

## ConvertToBytesUnit
将指定的转换字节数的单位 GB、MB、KB...

```js
import { ConvertToBytesUnit } from '@fatesigner/utils';

console.log(ConvertToBytesUnit(166018, 3, true));

// 输出: 162.127KB
```

## ConvertBlobToFile
将 blob 文件 转换为 file 类型

```js
import { ConvertBlobToFile } from '@fatesigner/utils';

let file = ConvertBlobToFile(blob);
```

## ConvertBase64ToBlob
将 base64 转换为 blob

```js
import { ConvertBase64ToBlob } from '@fatesigner/utils';

let blob = ConvertBlobToFile('data:image/jpg;...')
```

## ConverToQueryParameters
将指定的对象转换为一个查询字符串

```js
import { ConvertToQueryParameters } from '@fatesigner/utils';

console.log(ConvertToQueryParameters({ id: 'a', username: 'user' }));

// 输出: id=a&username=user
```

## ForEach
循环指定的对象、数组，可以添加中间值，即 [Array.prototype.reduce()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/Reduce) 函数的功能

```js
import { ForEach } from '@fatesigner/utils';

/**
 * @param {Object} data 需要循环的对象 可以是 Object、Array
 * @param {Function} fn 回调
 * 如果此回调返回了false：则结束此次循环
 * @param {Function} reducer 中间值
 * reducer 不推荐设置Wie boolean 值，不然会与 break 结束循环逻辑发生冲突
 * @return {Object} reducer
 */

const res = ForEach([1, 2, 3, 4, 5, 6], function(prev, cur, index) {
  if (index === 4) {
    // 模拟 break 退出此次循环
    return false;
  }
  prev += cur;
  return prev;
}, 0 );

console.log(res);

// 输出: 10

const res2 = ForEach({
  a: 'a1',
  b: 'b1',
  c: 'c1',
  d: 'd1'
}, function(prev, cur, index, data) {
  if (index === 2) {
    // 模拟 break 退出此次循环
    return false;
  }
  prev += data[cur];
  return prev;
}, '');

console.log(res);

// 输出: a1b1
```

## Clone
深拷贝指定对象

与 lodash 的 cloneDeep 作用一致，详细可点击  [_.cloneDeep(value)](http://lodash.think2011.net/cloneDeep) 。

```js
import { Clone } from '@fatesigner/utils';

/**
 * @param originalObject 被拷贝对象
 * @param circular 检测是否存在循环引用，并自动处理其拷贝，默认为 false
 * @constructor
 */

const originalObject = {
  a: 1,
  b: '2',
  c: {
    d: [1, 2, 3],
    f: 4
  }
};

const cloneObj = Clone(originalObject);

// 改变 cloneObj 的对象属性
cloneObj.c.f = 5;

console.log(cloneObj.c.f);

// 输出: 5

console.log(originalObject.c.f);

// 输出: 4
```

## Extend
合并指定对象

与 lodash 的 merge 作用一致，详细可点击  [_.merge(object, [sources])](http://lodash.think2011.net/merge) 。

```js
import { DeepExtend, Extend } from '@fatesigner/utils';

/**
 * @param originalObject 被拷贝对象
 * @param circular 检测是否存在循环引用，并自动处理其拷贝，默认为 false
 * @constructor
 */

const originalObject = {
  a: 1,
  b: '2',
  c: {
    f: 4,
    g: {
      h: 2,
      j: 'dsd'
    }
  }
};

const extendObj = {
  a: 2,
  b: '3',
  c: {
    g: {
      j: '111111',
      s: 231
    },
    h: {
      s: 33
    }
  }
};

const obj = Index.Extend({}, originalObject, extendObj);

console.log(JSON.stringify(obj, null, 2));

// 输出
{                    
  "a": 2,            
  "b": "3",          
  "c": {             
    "g": {           
      "j": "111111", 
      "s": 231       
    },               
    "h": {           
      "s": 33        
    }                
  }                  
}                    

// 深度合并
const obj2 = Index.DeepExtend({}, originalObject, extendObj);

console.log(JSON.stringify(obj2, null, 2));

// 输出: 
{                    
  "a": 2,            
  "b": "3",          
  "c": {             
    "f": 4,          
    "g": {           
      "h": 2,        
      "j": "111111", 
      "s": 231       
    },               
    "h": {           
      "s": 33        
    }                
  }                  
}                    
```

## GetParamsFromUrl
获取指定查询字符串中的参数。

```js
import { GetParamsFromUrl } from '@fatesigner/utils';

/**
 * @param paramStr 查询字符串
 * @returns object 参数对象
 */

console.log(GetParamsFromUrl(location.search));

// 输出：{id:'123',name:'23124'}
```
## GroupBy
指定属性，为数组进行分组


```js
import { GetParamsFromUrl } from '@fatesigner/utils';

/**
 * 指定属性，为数组进行分组
 * @param arr 数组
 * @param by 待分组的属性，可以为一个函数，返回决定分组的值
 * @param slice 分组后的 item 默认不包含源 item 的属性，提供一个函数选择指定包含的属性
 * @constructor
 */
declare function GroupBy<T, T2>(arr: T[], by: string | byProp<T>, select?: (arg0: T) => T2): Array<{
    key: string | number;
    children: T[];
}>;

const arr = [
{ parentId: '3', id: '1', text: '1', desc: '1 desc' },
{ parentId: '1', id: '2', text: '1', desc: '1 desc' },
{ parentId: '1', id: '3', text: '1', desc: '1 desc' },
{ parentId: '2', id: '4', text: '1', desc: '1 desc' },
{ parentId: '3', id: '5', text: '1', desc: '1 desc' },
{ parentId: '3', id: '6', text: '1', desc: '1 desc' },
{ parentId: '2', id: '7', text: '1', desc: '1 desc' },
{ parentId: '4', id: '8', text: '4', desc: '4 desc' }
];

console.log(GroupBy(arr, 'parentId', (cur) => {
  return {
    parentText: cur.parentText,
    text: cur.text
  };
}));

// 输出：
[                                              
  {                                            
    "parentId": "3",                           
    "parentText": "text3",                     
    "children": [                              
      {                                        
        "parentId": "3",                       
        "parentText": "text3",                 
        "id": "1",                             
        "text": "1"                            
      },                                       
      {                                        
        "parentId": "3",                       
        "parentText": "text3",                 
        "id": "5",                             
        "text": "1"                            
      },                                       
      {                                        
        "parentId": "3",                       
        "parentText": "text3",                 
        "id": "6",                             
        "text": "1"                            
      }                                        
    ]                                          
  },                                           
  {                                            
    "parentId": "1",                           
    "parentText": "text1",                     
    "children": [                              
      {                                        
        "parentId": "1",                       
        "parentText": "text1",                 
        "id": "2",                             
        "text": "1"                            
      },                                       
      {                                        
        "parentId": "1",                       
        "parentText": "text1",                 
        "id": "3",                             
        "text": "1"                            
      }                                        
    ]                                          
  },                                           
  {                                            
    "parentId": "2",                           
    "parentText": "text2",                     
    "children": [                              
      {                                        
        "parentId": "2",                       
        "parentText": "text2",                 
        "id": "4",                             
        "text": "1"                            
      },                                       
      {                                        
        "parentId": "2",                       
        "parentText": "text2",                 
        "id": "7",                             
        "text": "1"                            
      }                                        
    ]                                          
  },                                           
  {                                            
    "parentId": "4",                           
    "parentText": "text4",                     
    "children": [                              
      {                                        
        "parentId": "4",                       
        "parentText": "text4",                 
        "id": "8",                             
        "text": "4"                            
      }                                        
    ]                                          
  }                                            
]                                              
```

## ToFixed
替代原生 [Number.prototype.toFixed()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Number/toFixed) ，解决 js 精度丢失问题

```js
import { ToFixed } from '@fatesigner/utils';

/**
 * 替代原生 toFixed 函数，解决 js 精度丢失问题
 * @param value  指定的待转换的数值
 * @param digits 小数点后数字的个数；介于 0 到 20 （包括）之间，实现环境可能支持更大范围。如果忽略该参数，则默认为 0。
 * @param mode   当有效位数确定后，其后多余位数的处理模式，默认为 normal，即银行家舍入法 "四舍六入五成双"，round：标准的四舍五入，increase：无论数值大小，一律进1，ignore：一律舍弃
 * @constructor
 */

const num = 12345.6789;

console.log(ToFixed(num, 2, 'normal'));
// 输出：12345.68
console.log(ToFixed(num, 2, 'round'));
// 输出：12345.68
console.log(ToFixed(num, 2, 'increase'));
// 输出：12345.68
console.log(ToFixed(num, 2, 'ignore'));
// 输出：12345.67

console.log(ToFixed(12345.6749, 2, 'normal'));
// 输出：12345.67;
console.log(ToFixed(12345.6769, 2, 'normal'));
// 输出：12345.68;
console.log(ToFixed(12345.6759, 2, 'normal'));
// 输出：12345.68;
console.log(ToFixed(12345.6659, 2, 'normal'));
// 输出：12345.66;
console.log(ToFixed(12345.6759, 5, 'normal'));
// 输出：12345.6759;

console.log(ToFixed(12345.6749, 2, 'round'));
// 输出：12345.67
console.log(ToFixed(12345.6769, 2, 'round'));
// 输出：12345.68
console.log(ToFixed(12345.6759, 2, 'round'));
// 输出：12345.68
console.log(ToFixed(12345.6659, 2, 'round'));
// 输出：12345.67
console.log(ToFixed(12345.6759, 5, 'round'));
// 输出：12345.6759

console.log(ToFixed(12345.6709, 2, 'increase'));
// 输出：12345.67
console.log(ToFixed(12345.6749, 2, 'increase'));
// 输出：12345.68
console.log(ToFixed(12345.6769, 2, 'increase'));
// 输出：12345.68
console.log(ToFixed(12345.6759, 2, 'increase'));
// 输出：12345.68
console.log(ToFixed(12345.6659, 2, 'increase'));
// 输出：12345.67
console.log(ToFixed(12345.6759, 5, 'increase'));
// 输出：12345.6759

console.log(ToFixed(12345.6709, 2, 'ignore'));
// 输出：12345.67
console.log(ToFixed(12345.6749, 2, 'ignore'));
// 输出：12345.67
console.log(ToFixed(12345.6769, 2, 'ignore'));
// 输出：12345.67
console.log(ToFixed(12345.6759, 2, 'ignore'));
// 输出：12345.67
console.log(ToFixed(12345.6659, 2, 'ignore'));
// 输出：12345.66
console.log(ToFixed(12345.6759, 5, 'ignore'));
// 输出：12345.6759

console.log(ToFixed(1.000000000000000000001));
// 输出：1
console.log(ToFixed(1.000000000000000000001, 2, 'normal'));
// 输出：1
```

## BindLazyFunc 延迟函数
场景
> 对于异步函数，在某些场景中，可能会在未初始化前被执行，这时运行会报告 undefined 错误，从而影响后续的程序运行。

解决方案
> 初始化前为其赋值一个挂起的 Promise，待为其初始化后，执行后返回结果，将结果 Resovle 给之前挂起的 Promise

```js
import { BindLazyFunc } from '@fatesigner/utils';

/**
 * @param target     绑定目标对象
 * @param properties 需要绑定的方法属性名集合
 * @constructor
 */
declare function BindLazyFunc<T extends Record<string, any>>(target: T, properties: string[]): T;

// 先定义变量
const target: {
  sayHello: (name: string, words: string, num: number) => Promise<string>;
} = {
  sayHello: null
};

// 绑定对象的 sayHello 函数
const targetLazy = BindLazyFunc(target, ['sayHello']);

// 立即执行
targetLazy.sayHello('tom', 'hello', 100).then((res) => {
  console.log(res);
  // 输出：tom hello 100
});

  // 等待 1s 后为 sayHello 赋值
setTimeout(() => {
  targetLazy.sayHello = (name: string, words: string, num: number) => {
    return new Promise((resolve) => {
      // 模拟延迟
      setTimeout(() => {
          resolve(`${name} ${words} ${num}`);
        }, 3000);
      });
  };
  targetLazy.sayHello('jerry1', 'hello', 200).then((res) => {
    console.log(res);
    // 输出：jerry1 hello 200
  });
}, 1000);
```

## BindPromiseQueue
将指定的异步函数转换为队列模式。

```js
import { BindPromiseQueue } from '@fatesigner/utils';

/**
 * 将指定的异步函数转换为队列模式，即每次调用后将进行等待，直到上一次调用完毕后再执行;
 * 类似 debounce 函数，不过执行逻辑是等待上次执行的结果，非指定时间内
 * 当设置 cached（默认为 false） 为 true，将返回上次 promise 的结果。
 * @param func
 * @param cached
 * @constructor
 */
declare function BindPromiseQueue<TFunc extends (...args: any[]) => Promise<any>>(func: TFunc, cached?: boolean): TFunc;

// 定义延迟函数
const promise = function (ref: { num: number }, name: string, time: number): Promise<string> {
  return new Promise((resolve) => {
    // 累加
    let timer = setInterval(() => {
      ref.num++;
    }, 1000);

    // 模拟延迟
    setTimeout(() => {
      ref.num++;
      resolve(ref.num + name);
      clearInterval(timer);
      timer = null;
    }, time);
  });
};

const g = { num: 0 };

// 正常执行
promise(g, 'tom', 3000).then((res) => {
  console.log(g.num);
  // 输出：4
});

// 等待 1s 后再次执行，此时前一次执行还未完成
setTimeout(() => {
  console.log(`bind new promise`);
  promise(g, 'jerry', 4000).then((res) => {
    console.log(g.num);
    // 输出：7
  });
}, 1000);

const g2 = { num: 0 };
const promise2 = BindPromiseQueue(promise);

// 绑定后执行
promise2(g2, 'tom', 3000).then((res) => {
  console.log(g2.num);
  // 输出：3
});

// 等待 1s 后再次执行，此时前一次执行还未完成
setTimeout(() => {
  console.log(`bind new promise`);
  promise2(g2, 'jerry', 4000).then((res) => {
    console.log(g2.num);
    // 输出：7
  });
}, 1000);

const g3 = { num: 0 };
// 设置 cached 为 true
const promise3 = BindPromiseQueue(promise, true);

promise3(g3, 'tom', 3000).then((res) => {
  console.log(g3.num);
  // 输出：3
});

// 等待 1s 后再次执行，此时前一次执行还未完成
setTimeout(() => {
  console.log(`bind new promise`);
  promise3(g3, 'jerry', 4000).then((res) => {
    console.log(g3.num);
    // 输出：3
  });
}, 1000);
```

## MergeProps
合并对象，遇到数组属性覆盖。

```js
import { MergeProps } from '@fatesigner/utils';

/**
 * @param defaultProps 默认值
 * @param props 需要覆盖的对象
 * @param deep 是否深度合并，默认为 false
 * @param assignment 自定义赋值操作，默认为引用或值的传递
 * @constructor
 */
declare function MergeHandlers<TTarget extends Record<string, (...args: any[]) => Promise<any>>>(target: TTarget, handlers: TTarget): TTarget;

const target = {
    a: 2,
    b: {
      arr: [{ a: 1, b: 2 }],
      arr2: [{ c: '312' }],
      c: '3',
      e: 123,
      h: {
        s: 111
      }
    },
    c: {
      dd: 1
    }
};

const source = {
    a: '3',
    b: {
      arr: [{ a: 3, b: 4, d: 5 }],
      c: 1412,
      d: 4,
      e: {
        f: 123,
        g: '31'
      }
    }
} as any;

MergeProps(target, source, true);

console.log(source);
// 输出：
{                  
  "a": "3",        
  "b": {           
    "arr": [       
      {            
        "a": 3,    
        "b": 4,    
        "d": 5     
      }            
    ],             
    "c": 1412,     
    "d": 4,        
    "e": {         
      "f": 123,    
      "g": "31"    
    },             
    "arr2": [      
      {            
        "c": "312" 
      }            
    ],             
    "h": {         
      "s": 111     
    }              
  },               
  "c": {           
    "dd": 1        
  }                
}                  
```

## ConvertModelArrToEnum
将指定的模型集合数据转换为枚举类型。

```ts
import { ConvertModelArrToEnum } from '@fatesigner/utils';

const Week = ConvertModelArrToEnum([
 {
   name: 'monday',
   value: '1',
   text: '星期一'
 },
 {
   name: 'tuesday',
   value: '2',
   text: '星期二'
 }
]);

console.log(Week);
// 输出：
{                         
  "arr": [                
    {                     
      "name": "monday",   
      "value": "1",       
      "text": "星期一"       
    },                    
    {                     
      "name": "tuesday",  
      "value": "2",       
      "text": "星期二"       
    }                     
  ],                      
  "enum": {               
    "monday": "1",        
    "tuesday": "2"        
  },                      
  "desc": {               
    "1": "星期一",           
    "2": "星期二"            
  },                      
  "keys": [               
    "monday",             
    "tuesday"             
  ],                      
  "values": [             
    "1",                  
    "2"                   
  ]                       
}

// 支持类型提示，当已知 value 的情况下，需要获取描述时，可以访问 desc 属性，这在模板绑定中很有用
let currentDay = '1';
console.log(Week.desc['1']);              
```
```html
<template>
  <ul>
    <li v-for="item in items">
      {{ Week.desc[item.value] }}：{{item.value}}
    </li>
  </ul>
</template>
```

## ConvertArrToEnum
将指定的字符串数组转换为枚举类型。

```ts
import { ConvertArrToEnum } from '@fatesigner/utils';

/**
 * @param items
 * @param callback 指定枚举的 value，默认为键值
 * @constructor
 */

const Week = ConvertArrToEnum(['monday', 'tuesday'] as const);

console.log(Week);
// 输出：
{                        
  "monday": "monday",    
  "tuesday": "tuesday"   
}

const Week2 = ConvertArrToEnum(['monday', 'tuesday'] as const, (item) => `${item} happy`);


console.log(Week2);
// 输出：
{                        
  "monday": "monday happy",    
  "tuesday": "tuesday happy"   
}

// 支持类型提示
console.log(Week.monday); // monday happy      
```
