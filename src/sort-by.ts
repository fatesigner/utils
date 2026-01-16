import * as objectPath from 'object-path';

const isNil = (value: unknown) => value === null || value === undefined;

const parseDateValue = (value: unknown) => {
  if (value instanceof Date) {
    return value.getTime();
  }
  if (typeof value === 'number') {
    return value;
  }
  const timestamp = Date.parse(String(value));
  return Number.isNaN(timestamp) ? null : timestamp;
};

const parseNumberValue = (value: unknown) => {
  if (typeof value === 'number') {
    return Number.isNaN(value) ? null : value;
  }
  const num = Number(value);
  return Number.isNaN(num) ? null : num;
};

const normalizeCompareResult = (value: unknown) => {
  return Number.isFinite(value as number) ? (value as number) : 0;
};

const sortFn = function (property) {
  const order = property?.order === 'desc' ? 'desc' : 'asc';
  const type = property?.type === 'number' ? 'number' : property?.type === 'date' ? 'date' : 'string';
  const locale = property?.locale ?? 'en';
  const compareOptions = property?.compareOptions ?? { sensitivity: 'base' };

  return function (a, b) {
    let result: number;
    const valueA = objectPath.get(a, property.field);
    const valueB = objectPath.get(b, property.field);
    const isDateType = type === 'date';
    const isNumberType = type === 'number';
    const parsedA = isDateType ? parseDateValue(valueA) : isNumberType ? parseNumberValue(valueA) : null;
    const parsedB = isDateType ? parseDateValue(valueB) : isNumberType ? parseNumberValue(valueB) : null;
    if (property.sort) {
      result = normalizeCompareResult(property.sort(a, b));
    } else {
      const isNilA = isNil(valueA) || ((isDateType || isNumberType) && parsedA === null);
      const isNilB = isNil(valueB) || ((isDateType || isNumberType) && parsedB === null);
      if (isNilA || isNilB) {
        if (isNilA && isNilB) {
          return 0;
        }
        if (order === 'desc') {
          return isNilA ? -1 : 1;
        }
        return isNilA ? 1 : -1;
      }
      if (order === 'asc') {
        if (type === 'number') {
          if (parsedA < parsedB) {
            result = -1;
          } else if (parsedA > parsedB) {
            result = 1;
          } else {
            result = 0;
          }
        } else if (type === 'date') {
          if (parsedA < parsedB) {
            result = -1;
          } else if (parsedA > parsedB) {
            result = 1;
          } else {
            result = 0;
          }
        } else {
          result = String(valueA).localeCompare(String(valueB), locale, compareOptions);
        }
      } else {
        if (type === 'number') {
          if (parsedA < parsedB) {
            result = 1;
          } else if (parsedA > parsedB) {
            result = -1;
          } else {
            result = 0;
          }
        } else if (type === 'date') {
          if (parsedA < parsedB) {
            result = 1;
          } else if (parsedA > parsedB) {
            result = -1;
          } else {
            result = 0;
          }
        } else {
          result = String(valueB).localeCompare(String(valueA), locale, compareOptions);
        }
      }
    }
    return normalizeCompareResult(result);
  };
};

type SortOrder = 'asc' | 'desc' | '' | null;

type Primitive = string | number | boolean | bigint | symbol | null | undefined;

type IsAny<T> = 0 extends 1 & T ? true : false;

type DepthLimit = 4;
type PrevDepth = [never, 0, 1, 2, 3, 4, 5];

type Path<T, Prefix extends string = '', Depth extends number = DepthLimit> = [Depth] extends [never]
  ? never
  : T extends Primitive
    ? never
    : {
        [K in Extract<keyof T, string>]: T[K] extends Primitive | Function | any[] ? `${Prefix}${K}` : `${Prefix}${K}` | Path<T[K], `${Prefix}${K}.`, PrevDepth[Depth]>;
      }[Extract<keyof T, string>];

type FieldPath<T> = IsAny<T> extends true ? string : Path<T> | Extract<keyof T, string>;

type SortByProperty<TItem extends Record<string, any> = Record<string, any>> = {
  /** 支持 object-path 深路径，例如 "a.b.c" */
  field: FieldPath<TItem>;
  order?: SortOrder;
  type?: 'date' | 'number' | 'string' | '' | null;
  sort?: (a: TItem, b: TItem) => number;
  keepNilPosition?: boolean;
  locale?: string;
  compareOptions?: Intl.CollatorOptions;
};

type SortByItem = Record<string, any>;

const createComparator = (...properties: SortByProperty[]) => {
  return function (obj1, obj2) {
    const propertiesLen = properties.length;
    let result = 0;
    let i = 0;

    while (result === 0 && i < propertiesLen) {
      result = sortFn(properties[i])(obj1, obj2);
      i++;
    }
    return result;
  };
};

const stableSort = <T>(list: T[], comparator: (a: T, b: T) => number) => {
  return list
    .map((item, index) => ({ item, index }))
    .sort((a, b) => {
      const result = comparator(a.item, b.item);
      return result === 0 ? a.index - b.index : result;
    })
    .map(({ item }) => item);
};

type SortBy = {
  <T extends Record<string, any>>(list: T[], ...properties: SortByProperty<T>[]): T[];
  <T extends Record<string, any>>(...properties: SortByProperty<T>[]): (obj1: T, obj2: T) => number;
};

/**
 * 多字段排序
 * @param args
 * @returns
 */
export const sortBy = ((...args: any[]) => {
  if (Array.isArray(args[0])) {
    const [list, ...properties] = args as [SortByItem[], ...SortByProperty<SortByItem>[]];
    if (!properties.length) {
      return list;
    }
    // 多字段中仅取首个 keepNilPosition 生效
    const keepProperty = properties.find((property) => property?.keepNilPosition);
    const comparator = createComparator(...properties);
    if (!keepProperty?.field) {
      return stableSort(list, comparator);
    }
    const nilPositions = list.map((item) => {
      const value = objectPath.get(item, keepProperty.field);
      if (keepProperty.type === 'date') {
        return isNil(value) || parseDateValue(value) === null;
      }
      if (keepProperty.type === 'number') {
        return isNil(value) || parseNumberValue(value) === null;
      }
      return isNil(value);
    });
    const nonNullItems = list.filter((_, index) => !nilPositions[index]);
    const sortedNonNull = stableSort(nonNullItems, comparator);
    let cursor = 0;
    return list.map((item, index) => (nilPositions[index] ? item : sortedNonNull[cursor++]));
  }

  return createComparator(...(args as SortByProperty<SortByItem>[]));
}) as SortBy;
