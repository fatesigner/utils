import { isNull, isNullOrUndefined, isNumber, isString, isUndefined } from './type-check';

import { UnknownKey } from './types';

/**
 * Odata 运算符
 * eq	等于	==
 * ne	不等于	!=
 * gt	大于	>
 * ge	大于等于	>=
 * lt	小于	<
 * le	小于等于	<=
 * contains 包含
 * not contains 不包含
 * startswith 以xx开头
 * endswith 以xx结尾
 */
export type IOdataOperator = 'eq' | 'ne' | 'gt' | 'ge' | 'lt' | 'le' | 'contains' | 'not contains' | 'startswith' | 'endswith';

/**
 * Odata 排序符
 */
export type IOdataOrderKey = 'asc' | 'desc';

/**
 * Odata 排序项
 */
export interface IOdataOrderItem {
  name: UnknownKey;
  operator: IOdataOrderKey;
}

/**
 * Odata 函数
 * contains（包含）
 * $filter=contains(Name,'mumu')
 * Name中包含‘mumu’的所有信息，这样就达到了模糊查询的效果，只输入其中的几个字符便可查到所有包含这几个字符的信息
 *
 * not contains（不包含）
 * $filter=not contains(Name,'mumu')
 * Name中不包含‘mumu’的所有信息，与contains效果相反，是不包含
 *
 * startswith（以xx开头）
 * $filter=startswith(Name, 'mumu')
 * Name以mumu开头的所有信息
 *
 * endswith（以xx结尾）
 * $filter=endswith(Name, 'mumu')
 * Name以mumu结尾的所有信息
 *
 * length（字符长度等于x）
 * $filter=length(Name) eq 7
 * Name中字符长度等于7的所有信息
 *
 * indexof（字符长度等于x索引为n开始包含xx字符）
 * $filter=indexof(Name, 'mumu') eq 7
 * Name从第八个字母开始包含mumu的所有信息
 *
 * replace（替换）
 * $filter=replace(Name, 'm', 'u') eq 'mumu'
 * Name等于mumu的信息中m被u替换
 *
 * substring（从第n个字符开始）
 * $filter=substring(Name, 1) eq 'mumu'
 * Name从第二个字符开始是mumu的所有信息
 * $filter=substring(Name, 1, 2) eq 'mu'
 * Name的第二个和第三个字符是mu的所有信息
 *
 * tolower（转换为小写）
 * $filter=tolower(Name) eq 'Mu'
 * Name等于Mu的字符都转换为小写
 *
 * toupper（转换为大写）
 * $filter=toupper(Name) eq 'Mu'
 * Name等于Mu的字符都转换为大写
 *
 * trim（去空格后）
 * $filter=length(trim(Name)) eq length(mu)
 * Name去调空格后依旧等于mu的所有信息
 */
export type IOdataFunction = 'startswith' | 'endswith' | 'length' | 'indexof' | 'replace' | 'substring' | 'tolower' | 'toupper' | 'trim';

/**
 * 用于 Odata 辅助操作类
 */
export class ODataHelper {
  /**
   * 创建单个过滤条件
   * eq  等于  ==;
   * ne  不等于  !=;
   * gt  大于  >;
   * ge  大于等于  >=;
   * lt  小于  <;
   * le  小于等于  <=;
   * contains 包含
   * not contains 不包含
   * startswith 以xx开头
   * endswith 以xx结尾
   * @param name
   * @param operator
   * @param value
   * @param dateof 日期格式
   */
  static filter(name: UnknownKey, operator: IOdataOperator, value: string | number, dateof?: boolean) {
    if (isNullOrUndefined(name) || isUndefined(value)) {
      return '';
    }

    if (!dateof) {
      if (!isNumber(value)) {
        // 非数值，添加单引号
        value = `'${value}'`;
      }

      if (isNull(value)) {
        value = 'null';
      }
    }

    if (operator === 'contains') {
      return `${operator}(tolower(${name.toString()}), ${isNull(value) ? 'null' : `tolower(${value})`})`;
    } else if (operator === 'not contains' || operator === 'startswith' || operator === 'endswith') {
      return `${operator}(${name.toString()}, ${isNull(value) ? 'null' : value})`;
    }

    return `${name.toString()} ${operator} ${value}`;
  }

  /**
   * Odata 函数
   * @param name
   * @param operator
   * @param value
   */
  static func(name: UnknownKey, operator: IOdataFunction, value: string | number) {
    if (isNullOrUndefined(name) || isUndefined(value)) {
      return '';
    }
    if (operator === 'length' || operator === 'indexof') {
      return `length(${name.toString()}) eq ${isNull(value) ? 'null' : `'${value}'`}`;
    }
    return `${operator}(${name.toString()}, ${isNull(value) ? 'null' : `'${value}'`})`;
  }

  /**
   * Odata 字符长度等于 x
   * @param name
   * @param length
   */
  static length_(name: UnknownKey, length: number) {
    if (isNullOrUndefined(name) || isUndefined(length)) {
      return '';
    }
    return `length(${name.toString()}) eq ${isNull(length) ? 'null' : `'${length}'`}`;
  }

  /**
   * Odata 字符长度等于 x 索引为 n 开始包含 xx 字符
   * @param name
   * @param value
   * @param length
   */
  static indexof_(name: UnknownKey, value: string, length: number) {
    if (isNullOrUndefined(name) || isUndefined(value)) {
      return '';
    }
    return `indexof(${name.toString()}, ${isNull(value) ? 'null' : `'${value}'`}) eq ${isNull(length) ? 'null' : `'${length}'`}`;
  }

  /**
   * Odata 字符串替换
   * @param name
   * @param value
   * @param replaced
   * @param value2
   */
  static replace(name: UnknownKey, value: string, replaced: string, value2: string | number) {
    if (isNullOrUndefined(name) || isUndefined(value)) {
      return '';
    }
    return `replace(${name.toString()}, ${isNull(value) ? 'null' : `'${value}'`}, ${isNull(replaced) ? 'null' : `'${replaced}'`}) eq ${
      isNullOrUndefined(value2) ? 'null' : `'${value2}'`
    }`;
  }

  /**
   * 获取 orderby 查询字符串
   * @param orders
   */
  static orderby(orders: IOdataOrderItem[]) {
    return `${orders
      .filter((x) => !!x)
      .map((x) => {
        let operator;
        if (isString(x?.operator)) {
          operator = x.operator.replace('ascend', 'asc').replace('descend', 'desc');
        } else {
          operator = x?.operator?.toString();
        }
        return `${x?.name?.toString()} ${operator}`;
      })
      .join(', ')}`;
  }

  /**
   * 获取 and 组 查询字符串
   * @param filters
   */
  static and(...filters: string[]) {
    const s = `${filters.filter((x) => !!x).join(' and ')}`;
    return s ? `(${s})` : undefined;
  }

  /**
   * 获取 or 组 查询字符串
   * @param filters
   */
  static or(...filters: string[]) {
    const s = `${filters.filter((x) => !!x).join(' or ')}`;
    return s ? `(${s})` : undefined;
  }

  /**
   * 获取 Odata 参数对象
   * @param options
   */
  static getParams(options: { filter?: string; orderby?: string; pageNo?: number; pageSize?: number }) {
    return {
      filter: options?.filter?.length ? options.filter : undefined,
      orderby: options?.orderby?.length ? options.orderby : undefined,
      skip: isNullOrUndefined(options.pageNo) || isNullOrUndefined(options.pageSize) ? undefined : (options.pageSize * (options.pageNo - 1)).toString(),
      top: isNullOrUndefined(options.pageNo) || isNullOrUndefined(options.pageSize) ? undefined : options.pageSize.toString()
    };
  }
}
