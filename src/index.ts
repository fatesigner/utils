/**
 * index
 */

import { cloneDeep } from 'lodash';
import { FunctionType } from '@fatesigner/typed';

import { IsArray, IsBoolean, IsFunction, IsNodeList, IsNullOrUndefined, IsNumber, IsObject } from './type-check';

/**
 * 无任何操作的 空函数
 */
export function Noop() {}

/**
 * 利用 apply 为函数绑定指定的上下文对象
 * @param {Function} fn 需要绑定的函数
 * @param {Object} context 函数执行的环境、上下文对象
 * @param args
 * @return {Function}
 */
export function ApplyBind(fn: FunctionType, context: Record<string, any>, ...args: any[]) {
  return function (...argsInner: any[]) {
    return fn.apply(context || this, [...args, ...argsInner]);
  };
}

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
export function Debounce(
  fn: (...args: any[]) => any,
  idle: number,
  immediate = true,
  alwaysDo?: (...args: any[]) => any
) {
  let timer: any; // 定时器变量
  let previous = 0; // 时间戳 用于记录上次执行的时间点
  let context: any; // fn函数执行的作用域
  let args: any[]; // fn函数执行传入的参数
  let result: any; // fn函数执行的返回结果

  function later() {
    result = fn.apply(context, args);
    if (!timer) {
      context = args = undefined;
    }
  }

  return function (...args_: any[]) {
    const now = Date.now();
    const spend = now - previous;

    previous = now;

    if (spend >= idle && immediate) {
      // 首次调用该函数 且 immediate 为 true 则立即执行
      result = fn.apply(this, args_);
      context = args = undefined;
    } else {
      // 在 idle 指定的时间内调用该方法，则启动计时器定时调用 fn 函数
      if (timer) {
        clearTimeout(timer);
      }
      context = this;
      args = args_;
      timer = setTimeout(later, idle);
    }

    // 在 idle 指定的时间内 仍调用的函数
    if (alwaysDo) {
      alwaysDo.apply(context);
    }

    return result;
  };
}

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
export function Throttle(fn: FunctionType, delay: number, immediate = true, trailing = true) {
  let timer: any; // 定时器变量
  let previous = 0; // 时间戳 用于记录上次执行的时间点
  // let context; // fn函数执行的作用域
  // let args; // fn函数执行传入的参数
  // let result; // fn函数执行的返回结果

  function later() {
    if (!immediate) {
      previous = 0;
    } else {
      previous = Date.now();
    }
    timer = undefined;
    // result = fn.apply(context, args);
    // context = args = undefined;
  }

  return function () {
    // context = this;

    // args = arguments;

    const now = Date.now();

    if (!previous && !immediate) {
      previous = now;
    }

    const remaining = delay - (now - previous);

    // remaining 小于等于 0，表示上次执行至此所间隔时间已经超过一个 delay 间隔
    // remaining 大于 delay 间隔，表示客户端系统时间被调整过
    if (remaining <= 0 || remaining > delay) {
      // 由于 setTimeout 存在最小时间精度问题，因此会存在到达 wait 的时间间隔，但之前设置的 setTimeout 操作还没被执行，因此为保险起见，这里先清理 setTimeout
      if (timer) {
        clearTimeout(timer);
        timer = undefined;
      }
      previous = now;
      // result = fn.apply(context, args);
      // context = args = undefined;
    } else if (!timer && trailing) {
      // 如果延迟执行定时器不存在，且trailing为true，则启动定时器
      timer = setTimeout(later, remaining);
    }
  };
}

/**
 * 首字母大写
 * @param {string} str
 * @returns {string} str
 */
export function Capitalize(str: string) {
  return str.substring(0, 1).toUpperCase() + str.substring(1);
}

/**
 * 将全角转化为半角
 * @param {string} str
 * @returns {string} value
 */
export function ConvertToCDB(str: string) {
  let tmp = '';
  for (let i = 0, l = str.length; i < l; i++) {
    if (str.charCodeAt(i) === 12288) {
      tmp += String.fromCharCode(str.charCodeAt(i) - 12256);
      continue;
    }
    if (str.charCodeAt(i) > 65280 && str.charCodeAt(i) < 65375) {
      tmp += String.fromCharCode(str.charCodeAt(i) - 65248);
    } else {
      tmp += String.fromCharCode(str.charCodeAt(i));
    }
  }
  return tmp;
}

/**
 * 将半角转化为全角
 * @param {string} str
 * @returns {string} value
 */
export function ConvertToDBC(str: string) {
  let tmp = '';
  for (let i = 0, l = str.length; i < l; i++) {
    const at = str.charCodeAt(i);
    if (at === 32) {
      tmp = tmp + String.fromCharCode(12288);
    } else if (at < 127) {
      tmp = tmp + String.fromCharCode(str.charCodeAt(i) + 65248);
    } else {
      tmp = tmp + str[i];
    }
  }
  return tmp;
}

/**
 * 将-连接字符串转换为驼峰式
 * @param {string} bridge
 * @returns {string} hump
 */
export function ConvertBridgeStrToHump(bridge: string) {
  if (bridge) {
    return bridge.replace(/-(\w)/g, function (all, letter) {
      return letter.toUpperCase();
    });
  }
  return '';
}

/**
 * 将驼峰式字符串转换为-连接
 * @param {string} hump
 * @returns {string} bridge
 */
export function ConvertHumpStrToBridge(hump: string) {
  if (hump) {
    let s = hump.replace(/([A-Z])/g, '-$1').toLowerCase();
    if (s && s.length && s[0] === '-') {
      s = s.substr(1, s.length - 1);
    }
    return s;
  }
  return '';
}

/**
 * 转换字节数的单位 GB、MB、KB
 * @param {number} value
 * @param digits
 * @param capital
 * @returns {[]} size
 */
export function ConvertToBytesUnit(value: number, digits = 2, capital = false) {
  if (value == null) {
    return '0 Bytes';
  }
  const unitArr = ['bytes', 'kb', 'mb', 'gb', 'tb', 'pb', 'eb', 'zb', 'yb'];
  const srcsize = parseFloat(value.toString());
  const index = Math.floor(Math.log(srcsize) / Math.log(1024));
  let size: any = srcsize / Math.pow(1024, index);

  if (IsNumber(digits)) {
    size = size.toFixed(digits);
  }

  let res = size + unitArr[index];

  // 是否转换为大写单位
  if (capital) {
    res = res.toUpperCase();
  }

  return res;
}

/**
 * 将 blob 文件 转换为 file 类型
 * @param {Blob} blob
 * @param {string} filename
 * @param {string} type
 * @returns {File}
 * @constructor
 */
export function ConvertBlobToFile(blob: Blob, filename: string, type?: string) {
  return new File([blob], name, { type });
}

/**
 * 将 base64 转换为 blob
 * @param {string} b64Data
 * @param {string} contentType
 * @param {number} sliceSize
 * @returns {Blob}
 */
export function ConvertBase64ToBlob(b64Data: string, contentType?: string, sliceSize?: number) {
  if (!b64Data) {
    return;
  }

  contentType = contentType || '';

  sliceSize = sliceSize || 512;

  const s = b64Data.split(',');

  let byteCharacters;

  if (s.length && s[0].indexOf('base64') >= 0) {
    byteCharacters = atob(s[1]);
  } else {
    byteCharacters = encodeURI(s[1]);
  }

  const byteArrays = [];

  for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
    const slice = byteCharacters.slice(offset, offset + sliceSize);
    const byteNumbers = new Array(slice.length);
    for (let i = 0; i < slice.length; i++) {
      byteNumbers[i] = slice.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);
    byteArrays.push(byteArray);
  }

  const mimeString = s[0].split(':')[1].split(';')[0];

  return new Blob(byteArrays, { type: contentType || mimeString });
}

/**
 * 将指定的对象转换为一个查询字符串
 * @param {Object} obj - 待拼接的对象
 * @returns {string} - 拼接成的请求字符串
 */
export function ConvertToQueryParameters(obj: any) {
  const params: any[] = [];

  Object.keys(obj).forEach((key) => {
    let value = obj[key];
    // 如果值为 null or undefined 则将其置空
    if (IsNullOrUndefined(value)) {
      value = '';
    }
    // 对于需要编码的文本（比如说中文）我们要进行编码
    params.push([key, encodeURIComponent(value)].join('='));
  });

  return params.join('&');
}

/**
 * forEach 循环指定的对象、数组，可以添加中间值，即 reduce 函数功能
 * @param {Object} data 需要循环的对象 可以是 Object、Array
 * @param {Function} fn 回调
 * 如果此回调返回了false：则结束此次循环
 * @param {Function} reducer 中间值
 * reducer 不推荐设置Wie boolean 值，不然会与 break 结束循环逻辑发生冲突
 * @return {Object} reducer
 */
export function ForEach<T extends any[] | Record<string, any>, R>(
  data: T,
  fn: (prev: R, cur: T extends any[] ? T[number] : keyof T, index: number, data: T) => R | boolean | void,
  reducer?: R
) {
  if (IsFunction(fn)) {
    if (IsArray(data) || IsNodeList(data)) {
      for (let i = 0, l = data.length; i < l; i++) {
        const s = data[i as keyof T];
        const res = fn(reducer, s as any, i, data);
        if (IsBoolean(res) && !res) {
          break;
        } else {
          reducer = res as R;
        }
      }
    } else if (IsObject(data)) {
      const keys = Object.keys(data);
      for (let i = 0, l = keys.length; i < l; i++) {
        const res = fn(reducer, keys[i] as any, i, data);
        if (IsBoolean(res) && !res) {
          break;
        } else {
          reducer = res as R;
        }
      }
    }
  }
  return reducer;
}

/**
 * 深拷贝指定对象
 * @param originalObject 被拷贝对象
 * @param circular 检测是否存在循环引用，并自动处理其拷贝，默认为 false
 * @constructor
 */
export function Clone(originalObject: any, circular = false) {
  if (IsNullOrUndefined(originalObject)) {
    return originalObject;
  }
  let propertyIndex;
  let descriptor;
  let keys;
  let current;
  let nextSource;
  let indexOf;
  const copies = [
    {
      source: originalObject,
      target: Object.create(Object.getPrototypeOf(originalObject))
    }
  ];
  const cloneObject = copies[0].target;
  const sourceReferences = [originalObject];
  const targetReferences = [cloneObject];
  while ((current = copies.shift())) {
    keys = Object.getOwnPropertyNames(current.source);
    for (propertyIndex = 0; propertyIndex < keys.length; propertyIndex++) {
      descriptor = Object.getOwnPropertyDescriptor(current.source, keys[propertyIndex]);
      if (!descriptor.value || typeof descriptor.value !== 'object') {
        Object.defineProperty(current.target, keys[propertyIndex], descriptor);
        continue;
      }
      nextSource = descriptor.value;
      descriptor.value = Array.isArray(nextSource) ? [] : Object.create(Object.getPrototypeOf(nextSource));
      if (circular) {
        indexOf = sourceReferences.indexOf(nextSource);
        if (indexOf !== -1) {
          descriptor.value = targetReferences[indexOf];
          Object.defineProperty(current.target, keys[propertyIndex], descriptor);
          continue;
        }
        sourceReferences.push(nextSource);
        targetReferences.push(descriptor.value);
      }
      Object.defineProperty(current.target, keys[propertyIndex], descriptor);
      copies.push({ source: nextSource, target: descriptor.value });
    }
  }
  return cloneObject;
}

function isSpecificValue(val: any) {
  return (
    val instanceof Buffer ||
    val instanceof Date ||
    val instanceof RegExp ||
    (typeof Node !== 'undefined' && val instanceof Node)
  );
}

function cloneSpecificValue(val: any) {
  if (val instanceof Buffer) {
    const x = Buffer.alloc(val.length);
    val.copy(x);
    return x;
  } else if (val instanceof Date) {
    return new Date(val.getTime());
  } else if (val instanceof RegExp) {
    return new RegExp(val);
  } else if (val instanceof Node) {
    return val;
  } else {
    throw new Error('Unexpected situation');
  }
}

/**
 * Javascript 对象（object）合并
 * 利用 Object.assign()
 */
export function Extend(target: any, ...args: any[]) {
  if (typeof Object.assign !== 'function') {
    return Object.assign(target);
  } else {
    if (target === undefined || target === null) {
      throw new TypeError('Cannot convert undefined or null to object');
    }
    const output = Object(target);
    for (let index = 1; index < args.length; index++) {
      const source = args[index];
      if (source !== undefined && source !== null) {
        for (const nextKey in source) {
          if (Object.prototype.hasOwnProperty.call(source, nextKey)) {
            output[nextKey] = source[nextKey];
          }
        }
      }
    }
    return output;
  }
}

function deepCloneArray(arr: any[]) {
  const clone: any[] = [];
  arr.forEach(function (item, index) {
    if (typeof item === 'object' && item !== null) {
      if (Array.isArray(item)) {
        clone[index] = deepCloneArray(item);
      } else if (isSpecificValue(item)) {
        clone[index] = cloneSpecificValue(item);
      } else {
        // eslint-disable-next-line @typescript-eslint/no-use-before-define
        clone[index] = DeepExtend({}, item);
      }
    } else {
      clone[index] = item;
    }
  });
  return clone;
}

/**
 * 深度合并
 * @param params
 * @constructor
 */
export function DeepExtend(...params: any[]) {
  if (params.length < 1 || typeof params[0] !== 'object') {
    return false;
  }

  if (params.length < 2) {
    return params[0];
  }

  const target = params[0];

  // convert arguments to array and cut off target object
  const args = Array.prototype.slice.call(params, 1);

  let val;
  let src;

  args.forEach(function (obj: any) {
    // skip argument if isn't an object, is null, or is an array
    if (typeof obj !== 'object' || obj === null || Array.isArray(obj)) {
      return;
    }

    Object.keys(obj).forEach(function (key) {
      src = target[key]; // source value
      val = obj[key]; // new value

      // recursion prevention
      if (val === target) {
        /**
         * if new value isn't object then just overwrite by new value
         * instead of extending.
         */
      } else if (typeof val !== 'object' || val === null) {
        target[key] = val;

        // just clone arrays (and recursive clone objects inside)
      } else if (Array.isArray(val)) {
        target[key] = deepCloneArray(val);

        // custom cloning and overwrite for specific objects
      } else if (isSpecificValue(val)) {
        target[key] = cloneSpecificValue(val);

        // overwrite by new value if source isn't object or array
      } else if (typeof src !== 'object' || src === null || Array.isArray(src)) {
        target[key] = DeepExtend({}, val);

        // source value and new value is objects both, extending...
      } else {
        target[key] = DeepExtend(src, val);
      }
    });
  });

  return target;
}

/**
 * 获取指定查询字符串中的参数
 * @param paramStr 查询字符串
 * @returns object 参数对象
 */
export function GetParamsFromUrl(paramStr?: string): Record<string, any> {
  const s = (paramStr || '').split('?');
  if (s.length) {
    paramStr = s[s.length - 1];
    const searchArray = paramStr.split('&');
    const obj: any = {};
    for (const item of searchArray) {
      const keyArray = item.split('=');
      if (keyArray.length > 1 && keyArray[0].length) {
        obj[decodeURIComponent(keyArray[0])] = decodeURIComponent(keyArray[1]);
      }
    }
    return obj;
  }
  return undefined;
}

type byProp<T> = (arg0: T) => string | number;

/**
 * 指定属性，为数组进行分组
 * @param arr 数组
 * @param by 待分组的属性
 * @param slice 分组后的 item 默认不包含源 item 的属性，提供一个函数选择指定包含的属性
 * @constructor
 */
export function GroupBy<T, T2>(
  arr: T[],
  by: string | byProp<T>,
  slice?: (arg0: T) => T2
): Array<{
  key: string | number;
  children: T[];
}> {
  const res = arr.reduce(
    function (prev: any, cur) {
      let key;
      if (Object.prototype.toString.call(by) === '[object Function]') {
        key = (by as byProp<T>)(cur);
      } else if (Object.prototype.toString.call(by) === '[object String]') {
        key = cur[by as keyof T];
      } else {
        throw new Error('GroupBy: the key for group by is not valid.');
      }
      let idx = -1;
      let upd = true;
      if (
        Object.prototype.toString.call(key) === '[object Null]' ||
        Object.prototype.toString.call(key) === '[object Undefined]'
      ) {
        if (prev.undef < 0) {
          upd = false;
          prev.undef = prev.arr.length;
        }
        idx = prev.undef;
      } else if (
        Object.prototype.toString.call(key) !== '[object String]' ||
        Object.prototype.toString.call(key) !== '[object Number]'
      ) {
        if (!Object.prototype.hasOwnProperty.call(prev.keys, key)) {
          upd = false;
          prev.keys[key] = prev.arr.length;
        }
        idx = prev.keys[key];
      }
      if (idx > -1) {
        if (upd) {
          prev.arr[idx].children.push(cur);
        } else {
          let item: any = {};
          if (slice) {
            item = Object.assign({}, item, slice(cur));
          }
          if (Object.prototype.toString.call(by) === '[object String]') {
            item[by as string] = cur[by as keyof T];
          }
          item.children = [cur];
          prev.arr.push(item);
        }
      }
      return prev;
    },
    {
      undef: -1,
      keys: {},
      arr: []
    }
  );

  return res.arr;
}

/**
 * 替代原生 toFixed 函数，解决 js 精度丢失问题
 * @param value  指定的待转换的数值
 * @param digits 小数点后数字的个数；介于 0 到 20 （包括）之间，实现环境可能支持更大范围。如果忽略该参数，则默认为 0。
 * @param mode   当有效位数确定后，其后多余位数的处理模式，默认为 normal，即银行家舍入法 "四舍六入五成双"，round：标准的四舍五入，increase：无论数值大小，一律进1，ignore：一律舍弃
 * @constructor
 */
export function ToFixed(
  value: number,
  digits = 0,
  mode: 'ignore' | 'normal' | 'round' | 'increase' = 'normal'
): string {
  let carry = 0;

  const str = value + '';
  const dotIndex = str.indexOf('.');

  let last = 0;
  if (dotIndex > -1) {
    last = parseInt(str.substr(dotIndex + digits + 1, 1)) || 0;
  }

  if (mode === 'ignore') {
    carry = 0;
  } else if (mode === 'round') {
    if (last >= 5) {
      carry = 1;
    }
  } else if (mode === 'increase') {
    if (last > 0) {
      carry = 1;
    }
  } else {
    // normal
    if (last === 5) {
      // get before
      const before = parseInt(str.substr(dotIndex + digits, 1));
      // 判断前一位奇偶
      if (before % 2) {
        // 奇数，进
        carry = 1;
      } else {
        // 偶数，舍
        carry = 0;
      }
    } else if (last > 5) {
      carry = 1;
    }
  }

  const multiple = Math.pow(10, digits);
  const num = Math.floor(value * multiple) + carry;

  return (num / multiple) as any;
}

/**
 * 绑定延迟函数
 * @param target
 * @param properties
 * @constructor
 */
export function BindLazyFunc<T extends Record<string, any>>(target: T, properties: string[]): T {
  let resolves: any[] = [];
  const functions: any = {};

  const getFunc = function (propertyKey: string) {
    if (Object.prototype.hasOwnProperty.call(functions, propertyKey)) {
      return functions[propertyKey];
    }
    return null;
  };

  const newPromise = function (propertyKey: string, ...args: any[]) {
    const func = getFunc(propertyKey);
    if (func) {
      return func(...args);
    }
    return new Promise((resolve) => {
      resolves.push([resolve, args]);
    });
  };

  properties.forEach((propertyKey) => {
    Object.defineProperty(target, propertyKey, {
      get() {
        const func = getFunc(propertyKey);
        if (func) {
          return func;
        } else {
          return newPromise.bind(this, propertyKey);
        }
      },
      set(val) {
        if (Object.prototype.hasOwnProperty.call(target, propertyKey) && properties.indexOf(propertyKey) > -1) {
          functions[propertyKey as string] = val;
          if (resolves.length) {
            resolves.forEach(([resolve, args]) => {
              resolve(val(...args));
            });
            resolves = [];
          }
        }
      }
    });
  });

  return target;
}

/**
 * 绑定延迟函数（proxy模式）
 * @param target
 * @param properties
 * @constructor
 */
function BindLazyFuncProxy<T extends Record<string, (...args: any[]) => Promise<any>>, TKey extends keyof T>(
  target: T,
  properties: TKey[]
): T {
  let args: any[];
  const functions: any[] = [];
  let promiseResolve: any;

  let target_;

  const revocable = Proxy.revocable(target, {
    get(target, property: TKey) {
      const propertyKey = property.toString();
      if (Object.prototype.hasOwnProperty.call(target, propertyKey) && properties.indexOf(property) > -1) {
        if (functions.indexOf(propertyKey) > -1) {
          return target[propertyKey];
        } else {
          return function (...args_: any[]) {
            return new Promise((resolve) => {
              args = args_;
              promiseResolve = resolve;
            });
          };
        }
      }
    },
    deleteProperty(): boolean {
      return true;
    },
    set(target, property: TKey, value, receiver) {
      const propertyKey = property.toString();
      if (Object.prototype.hasOwnProperty.call(target, propertyKey) && properties.indexOf(property) > -1) {
        /* if (
          Object.prototype.toString.call(value) !== '[object Null]' &&
          Object.prototype.toString.call(value) === '[object Undefined]'
        ) {
        } */

        if (promiseResolve) {
          promiseResolve(value(...args));
          promiseResolve = null;
        }

        (target as any)[propertyKey] = value;

        functions.push(propertyKey);

        if (functions.length === properties.length) {
          // 所绑定的属性均已执行过 set，清除 proxy
          target_ = target;
          // revocable.revoke();
        }

        return true;
      } else {
        return Reflect.set(target, property, value, receiver);
      }

      // target[property] = value;
    }
  });

  target_ = revocable.proxy;

  return target_;
}

/**
 * 将指定的异步函数转换为队列模式，即每次调用后将进行等待，直到上一次调用完毕后再执行;
 * 类似 debounce 函数，不过执行逻辑是等待上次执行的结果，非指定时间内
 * 当设置 cached（默认为 false） 为 true，将返回上次 promise 的结果。
 * @param func
 * @param cached
 * @constructor
 */
export function BindPromiseQueue<TFunc extends (...args: any[]) => Promise<any>>(func: TFunc, cached?: boolean): TFunc {
  let promise: Promise<any>;
  let resolved: boolean;

  return function (...args: TFunc extends (...args: infer U) => any ? U : never) {
    if (!promise || resolved) {
      resolved = false;
      promise = func(...args).finally(() => {
        resolved = true;
      });
      return promise;
    }
    if (cached) {
      return promise;
    } else {
      return promise.then(() => {
        return func(...args);
      });
    }
  } as any;
}

const isObject = function (val: any): boolean {
  return Object.prototype.toString.call(val) === '[object Object]';
};

const isMergeObject = function (val: any): boolean {
  return (
    Object.prototype.toString.call(val) === '[object Object]' ||
    Object.prototype.toString.call(val) === '[object Undefined]'
  );
};

const customizer = function (obj: any, src: any) {
  if (IsArray(src)) {
    return src;
  }
};

/**
 * 合并对象，遇到数组属性覆盖
 * @param defaultProps 默认值
 * @param props 需要覆盖的对象
 * @param deep 是否深度合并，默认为 false
 * @param assignment 自定义赋值操作，默认为引用或值的传递
 * @constructor
 */
export function MergeProps<T extends Record<string, any>>(
  defaultProps: T,
  props: T,
  deep = false,
  assignment = function (target: any, property: any, val: any) {
    target[property] = val;
  }
): T {
  if (!props) {
    return defaultProps;
  }

  if (isMergeObject(defaultProps) && isMergeObject(props)) {
    Object.keys(defaultProps).forEach(function (key) {
      if (isMergeObject(props[key])) {
        if (Object.prototype.hasOwnProperty.call(props, key)) {
          MergeProps(defaultProps[key], props[key], deep);
        } else {
          if (isObject(defaultProps[key])) {
            if (deep) {
              // 深度模式，进行递归合并
              assignment(props, key, {});
              MergeProps(defaultProps[key], props[key], deep);
            } else {
              assignment(props, key, defaultProps[key]);
            }
          } else if (Array.isArray(defaultProps[key])) {
            // 数组类型，将其克隆后替换
            if (deep) {
              assignment(props, key, cloneDeep(defaultProps[key]));
            } else {
              assignment(props, key, defaultProps[key]);
            }
          } else {
            // 其他非引用类型的值
            assignment(props, key, defaultProps[key]);
          }
        }
      }
    });
  }

  return props;
}

/**
 * 合并用于 vue 绑定的 props
 * @param vue
 * @param defaultProps
 * @param props
 * @constructor
 */
export function MergeVueProps<T extends Record<string, any>>(vue: any, defaultProps: T, props: T): T {
  return MergeProps(defaultProps, props, true, function (target, property, val) {
    vue.set(target, property, val);
  });
}

/**
 * 合并函数
 * @param target
 * @param handlers
 * @constructor
 */
export function MergeHandlers<TTarget extends Record<string, (...args: any[]) => Promise<any>>>(
  target: TTarget,
  handlers: TTarget
): TTarget {
  target = target || ({} as any);
  Object.keys(handlers).forEach((key) => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    target[key] = handlers[key];
  });
  return target;
}

/**
 * 为指定字符串添加掩码，用于隐私信息显示，如身份证号码生日的数字替换为星号
 * @param value
 * @param mask
 * @param start
 * @param end
 * @constructor
 */
export function AddMask(value: string, start = 0, end = 0, mask = '*') {
  if (!value) {
    return '';
  }
  const length = value.length;
  if (!start) {
    start = 0;
  }
  if (!end) {
    end = length;
  }
  const startStr = value.substr(0, start);
  const endStr = value.substr(end, value.length - 1);
  let c = '';
  if (length >= start) {
    for (; start < end; start++) {
      c += mask;
      if (start >= length - 1) {
        break;
      }
    }
  }
  return startStr + c + endStr;
}

/**
 * 将指定的模型集合数据转换为枚举类型
 * @param arr
 * @constructor
 */
export function ConvertModelArrToEnum<
  T extends Readonly<Array<{ name: TName; value: TValue; text: TText } & { [key in string]: any }>>,
  TName extends string,
  TValue extends string | number,
  TText extends string | number
>(arr: T) {
  const res: {
    arr: T;
    enum: {
      [key in T[number]['name']]: T[number]['value'];
    };
    desc: {
      [key in T[number]['value']]: T[number]['text'];
    };
    keys: T[number]['name'][];
    values: T[number]['value'][];
  } = {
    arr: null,
    enum: null,
    desc: null,
    keys: [],
    values: []
  };

  res.arr = arr;

  res.enum = arr.reduce((prev, cur) => {
    prev[cur.name] = cur.value;
    return prev;
  }, {} as any);

  res.desc = arr.reduce((prev, cur) => {
    prev[cur.value] = cur.text;
    return prev;
  }, {} as any);

  res.keys = arr.map((x) => x.name);

  res.values = arr.map((x) => x.value);

  return res;
}

/**
 * 将指定的字符串数组转换为枚举类型
 * @param items
 * @param callback 指定枚举的 value，默认为键值
 * @constructor
 */
export function ConvertArrToEnum<T extends readonly string[]>(
  items: T,
  callback?: (item: string) => string
): {
  [key in T[number]]: T[number];
} {
  return items.reduce((prev, cur) => {
    if (callback) {
      prev[cur] = callback(cur);
    } else {
      prev[cur] = cur;
    }
    return prev;
  }, {} as any);
}
