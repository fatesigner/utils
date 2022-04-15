/**
 * type-check
 * 数据类型检查
 */

/**
 * 简单判断两个值的类型是否相等
 * @param {Object} obj
 * @param {Object} obj2
 * @return {boolean} isEqual
 */
export function isEqual(obj: unknown, obj2: unknown) {
  return Object.prototype.toString.call(obj) === Object.prototype.toString.call(obj2);
}

/**
 * 判断给定的值是否为 string类型
 * @param obj
 * @return {boolean}
 */
export function isString(obj: unknown) {
  return Object.prototype.toString.call(obj) === '[object String]';
}

/**
 * 判断是否为 number类型
 * @param obj
 * @return {boolean}
 */
export function isNumber(obj: unknown) {
  return Object.prototype.toString.call(obj) === '[object Number]' && !isNaN(obj as number);
}

/**
 * 判断给定的值是否为 boolean类型
 * @param obj
 * @return {boolean}
 */
export function isBoolean(obj: unknown) {
  return Object.prototype.toString.call(obj) === '[object Boolean]';
}

/**
 * 判断给定的值是否为 undefined
 * @param obj
 * @return {boolean}
 */
export function isUndefined(obj: unknown) {
  return Object.prototype.toString.call(obj) === '[object Undefined]';
}

/**
 * 判断给定的值是否为 null
 * @param obj
 * @return {boolean}
 */
export function isNull(obj: unknown) {
  return Object.prototype.toString.call(obj) === '[object Null]';
}

/**
 * 判断给定的值是否为 null or undefined
 * @param obj
 * @return {boolean}
 */
export function isNullOrUndefined(obj: unknown) {
  return isNull(obj) || isUndefined(obj);
}

/**
 * 判断给定的值是否为 object对象
 * @param obj
 * @return {boolean}
 */
export function isObject(obj: unknown) {
  return Object.prototype.toString.call(obj) === '[object Object]';
}

/**
 * 判断给定的值是否为数组
 * @param obj
 * @return {boolean}
 */
export function isArray(obj: unknown) {
  return Object.prototype.toString.call(obj) === '[object Array]';
}

/**
 * 判断给定的值是否为 element
 * @param obj
 * @return {boolean}
 */
export function isElement(obj: unknown) {
  if (typeof HTMLElement === 'object') {
    return obj instanceof HTMLElement;
  } else {
    return obj && typeof obj === 'object' && (obj as HTMLElement)?.nodeType === 1 && typeof (obj as HTMLElement)?.nodeName === 'string';
  }
}

/**
 * 判断给定的值是否为节点
 * @param obj
 * @return {boolean}
 */
export function isNode(obj: unknown) {
  return obj instanceof Node;
}

/**
 * 判断给定的值是否为节点集合
 * @param obj
 * @return {boolean}
 */
export function isNodeList(obj: unknown) {
  return Object.prototype.toString.call(obj) === '[object NodeList]';
}

/**
 * 判断给定的值是否为函数
 * @param obj
 * @return {boolean}
 */
export function isFunction(obj: unknown) {
  return Object.prototype.toString.call(obj) === '[object Function]';
}

/**
 * 判断给定的值是否为 Symbol 类型
 * @param obj
 * @return {boolean}
 */
export function isSymbol(obj: unknown) {
  return typeof obj === 'symbol' || (typeof obj === 'object' && Object.prototype.toString.call(obj) === '[object Symbol]');
}

/**
 * 判断给定的值是否为 Date 类型
 * @param obj
 * @return {boolean}
 */
export function isDate(obj: unknown) {
  return Object.prototype.toString.call(obj) === '[object Date]';
}
