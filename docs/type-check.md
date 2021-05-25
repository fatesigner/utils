# type-check
类型检查

```js
/**
 * 简单判断两个值的类型是否相等
 * @param {Object} obj1
 * @param {Object} obj2
 * @return {boolean} isEqual
 */
export function isEqual(obj1: any, obj2: any) {
  return (
    Object.prototype.toString.call(obj1) ===
    Object.prototype.toString.call(obj2)
  );
}

/**
 * 判断给定的值是否为 string类型
 * @return {boolean}
 */
export function isString(obj: any) {
  return Object.prototype.toString.call(obj) === '[object String]';
}

/**
 * 判断是否为 number类型
 * @return {boolean}
 */
export function isNumber(obj: any) {
  return (
    Object.prototype.toString.call(obj) === '[object Number]' && !isNaN(obj)
  );
}

/**
 * 判断给定的值是否为 boolean类型
 * @return {boolean}
 */
export function isBoolean(obj) {
  return Object.prototype.toString.call(obj) === '[object Boolean]';
}

/**
 * 判断给定的值是否为 undefined
 * @return {boolean}
 */
export function isUndefined(obj: any) {
  return Object.prototype.toString.call(obj) === '[object Undefined]';
}

/**
 * 判断给定的值是否为 null
 * @return {boolean}
 */
export function isNull(obj: any) {
  return Object.prototype.toString.call(obj) === '[object Null]';
}

/**
 * 判断给定的值是否为 null or undefined
 * @return {boolean}
 */
export function isNullOrUndefined(obj: any) {
  return IsNull(obj) || IsUndefined(obj);
}

/**
 * 判断给定的值是否为 object对象
 * @return {boolean}
 */
export function isObject(obj: any) {
  return Object.prototype.toString.call(obj) === '[object Object]';
}

/**
 * 判断给定的值是否为数组
 * @return {boolean}
 */
export function isArray(obj: any) {
  return Object.prototype.toString.call(obj) === '[object Array]';
}

/**
 * 判断给定的值是否为 element
 * @return {boolean}
 */
export function isElement(obj: any) {
  if (typeof HTMLElement === 'object') {
    return obj instanceof HTMLElement;
  } else {
    return (
      obj &&
      typeof obj === 'object' &&
      obj.nodeType === 1 &&
      typeof obj.nodeName === 'string'
    );
  }
}

/**
 * 判断给定的值是否为节点
 * @return {boolean}
 */
export function isNode(obj: any) {
  return obj instanceof Node;
}

/**
 * 判断给定的值是否为节点集合
 * @return {boolean}
 */
export function isNodeList(obj: any) {
  return Object.prototype.toString.call(obj) === '[object NodeList]';
}

/**
 * 判断给定的值是否为函数
 * @return {boolean}
 */
export function isFunction(obj: any) {
  return Object.prototype.toString.call(obj) === '[object Function]';
}
```
