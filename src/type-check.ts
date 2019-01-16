/**
 * type-check
 * 数据类型检查
 */

/**
 * 简单判断两个值的类型是否相等
 * @param {Object} obj1
 * @param {Object} obj2
 * @return {boolean} isEqual
 */
export function IsEqual(obj1: any, obj2: any) {
  return Object.prototype.toString.call(obj1) === Object.prototype.toString.call(obj2);
}

/**
 * 判断给定的值是否为 string类型
 * @return {boolean}
 */
export function IsString(obj: any) {
  return Object.prototype.toString.call(obj) === '[object String]';
}

/**
 * 判断是否为 number类型
 * @return {boolean}
 */
export function IsNumber(obj: any) {
  return Object.prototype.toString.call(obj) === '[object Number]' && !isNaN(obj);
}

/**
 * 判断给定的值是否为 boolean类型
 * @return {boolean}
 */
export function IsBoolean(obj: any) {
  return Object.prototype.toString.call(obj) === '[object Boolean]';
}

/**
 * 判断给定的值是否为 undefined
 * @return {boolean}
 */
export function IsUndefined(obj: any) {
  return Object.prototype.toString.call(obj) === '[object Undefined]';
}

/**
 * 判断给定的值是否为 null
 * @return {boolean}
 */
export function IsNull(obj: any) {
  return Object.prototype.toString.call(obj) === '[object Null]';
}

/**
 * 判断给定的值是否为 null or undefined
 * @return {boolean}
 */
export function IsNullOrUndefined(obj: any) {
  return IsNull(obj) || IsUndefined(obj);
}

/**
 * 判断给定的值是否为 object对象
 * @return {boolean}
 */
export function IsObject(obj: any) {
  return Object.prototype.toString.call(obj) === '[object Object]';
}

/**
 * 判断给定的值是否为数组
 * @return {boolean}
 */
export function IsArray(obj: any) {
  return Object.prototype.toString.call(obj) === '[object Array]';
}

/**
 * 判断给定的值是否为 element
 * @return {boolean}
 */
export function IsElement(obj: any) {
  if (typeof HTMLElement === 'object') {
    return obj instanceof HTMLElement;
  } else {
    return obj && typeof obj === 'object' && obj.nodeType === 1 && typeof obj.nodeName === 'string';
  }
}

/**
 * 判断给定的值是否为节点
 * @return {boolean}
 */
export function IsNode(obj: any) {
  return obj instanceof Node;
}

/**
 * 判断给定的值是否为节点集合
 * @return {boolean}
 */
export function IsNodeList(obj: any) {
  return Object.prototype.toString.call(obj) === '[object NodeList]';
}

/**
 * 判断给定的值是否为函数
 * @return {boolean}
 */
export function IsFunction(obj: any) {
  return Object.prototype.toString.call(obj) === '[object Function]';
}
