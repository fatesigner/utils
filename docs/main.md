# main

```js
import * as Utils from '@fatesigner/utils';
```

## noop
当某些函数必须要传递一个回调函数的参数时，可以将其作为占位符执行空的功能，避免报错，而且无需每次新建一个空函数，而占用内存。和 angular 的 noop 作用一致。

```js
import { noop } from '@fatesigner/utils';

function foo(callback) { 
  var result = calculateResult(); 
  (callback || noop)(result); 
} 
```

## applyBind
该方法会创建一个新函数，称为绑定函数，当调用这个绑定函数时，绑定函数会以创建它时传入第 context 作为 this，
传入后续的参数加上绑定函数运行时本身的参数按照顺序作为原函数的参数来调用原函数。

与 js 的 bind 作用一致，详细可点击  [Function.prototype.bind()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Function/bind) 。
```js
import { applyBind } from '@fatesigner/utils';

function log(...args) {
  console.log(JSON.stringify(this));
  console.log(JSON.stringify(args, null, 2));
}

applyBind(log, { context: 0 }, 1, 2, 3, 4)(5, 6, 7);

// 输出:
// {"context":0}
// [1,2,3,4,5,6,7]
```

## debounce
防抖动函数，常用于DOM之类的高频发事件的触发频率控制。替代用法可查看 rxjs 的 [debounce](https://rxjs-cn.github.io/learn-rxjs-operators/operators/filtering/debounce.html)

```js
import { debounce } from '@fatesigner/utils';

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

## throttle
节流函数，常用于DOM之类的高频发事件的触发频率控制。替代用法可查看 rxjs 的 [throttle](https://rxjs-cn.github.io/learn-rxjs-operators/operators/filtering/throttle.html)

```js
import { throttle } from '@fatesigner/utils';

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

## capitalize
将指定的字符串的首字母替换为大写

```js
import { capitalize } from '@fatesigner/utils';

console.log(capitalize('capitalize'));

// 输出: capitalize
```

## convertToCDB
将全角符号转化为半角符号

```js
import { convertToCDB } from '@fatesigner/utils';

console.log(convertToCDB('ａｂｃｄ'));

// 输出: abcd
```

## convertToDBC
将半角符号转化为全角符号

```js
import { convertToDBC } from '@fatesigner/utils';

console.log(convertToDBC('abcd'));

// 输出: ａｂｃｄ
```

## convertBridgeStrToHump
将-连接字符串转换为驼峰式

```js
import { convertBridgeStrToHump } from '@fatesigner/utils';

console.log(convertBridgeStrToHump('convert-hump-str-to-bridge'));

// 输出: convertHumpStrToBridge
```

## convertHumpStrToBridge
将驼峰式字符串转换为-连接

```js
import { convertHumpStrToBridge } from '@fatesigner/utils';

console.log(convertHumpStrToBridge('convertHumpStrToBridge'));

// 输出: convert-hump-str-to-bridge
```

## convertToBytesUnit
将指定的转换字节数的单位 GB、MB、KB...

```js
import { convertToBytesUnit } from '@fatesigner/utils';

console.log(convertToBytesUnit(166018, 3, true));

// 输出: 162.127KB
```

## convertBlobToFile
将 blob 文件 转换为 file 类型

```js
import { convertBlobToFile } from '@fatesigner/utils';

let file = convertBlobToFile(blob);
```

## convertBase64ToBlob
将 base64 转换为 blob

```js
import { convertBase64ToBlob } from '@fatesigner/utils';

let blob = convertBlobToFile('data:image/jpg;...')
```

## convertToQueryParameters
将指定的对象转换为一个查询字符串

```js
import { convertToQueryParameters } from '@fatesigner/utils';

console.log(convertToQueryParameters({ id: 'a', username: 'user' }));

// 输出: id=a&username=user
```

## forEach
循环指定的对象、数组，可以添加中间值，即 [Array.prototype.reduce()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/Reduce) 函数的功能

```js
import { forEach } from '@fatesigner/utils';

/**
 * @param {Object} data 需要循环的对象 可以是 Object、Array
 * @param {Function} fn 回调
 * 如果此回调返回了false：则结束此次循环
 * @param {Function} reducer 中间值
 * reducer 不推荐设置Wie boolean 值，不然会与 break 结束循环逻辑发生冲突
 * @return {Object} reducer
 */

const res = forEach([1, 2, 3, 4, 5, 6], function(prev, cur, index) {
  if (index === 4) {
    // 模拟 break 退出此次循环
    return false;
  }
  prev += cur;
  return prev;
}, 0 );

console.log(res);

// 输出: 10

const res2 = forEach({
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

## clone
深拷贝指定对象

与 lodash 的 cloneDeep 作用一致，详细可点击  [_.cloneDeep(value)](http://lodash.think2011.net/cloneDeep) 。

```js
import { clone } from '@fatesigner/utils';

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

const cloneObj = clone(originalObject);

// 改变 cloneObj 的对象属性
cloneObj.c.f = 5;

console.log(cloneObj.c.f);

// 输出: 5

console.log(originalObject.c.f);

// 输出: 4
```

## extend
合并指定对象

与 lodash 的 merge 作用一致，详细可点击  [_.merge(object, [sources])](http://lodash.think2011.net/merge) 。

```js
import { DeepExtend, extend } from '@fatesigner/utils';

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

const obj = Index.extend({}, originalObject, extendObj);

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

## getParamsFromUrl
获取指定查询字符串中的参数。

```js
import { getParamsFromUrl } from '@fatesigner/document';

/**
 * @param paramStr 查询字符串
 * @returns object 参数对象
 */

console.log(getParamsFromUrl(location.search));

// 输出：{id:'123',name:'23124'}
```
