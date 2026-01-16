import { expect } from 'chai';

import { sortBy } from '../dist/sort-by';

const sortByData = [
  { id: 1, group: 'B', score: 88 },
  { id: 2, group: null, score: 91 },
  { id: 3, group: 'A', score: 92 },
  { id: 4, group: 'C', score: 70 },
  { id: 5, group: null, score: 86 },
  { id: 6, group: 'B', score: 90 },
  { id: 7, group: 'A', score: 80 },
  { id: 8, group: 'A', score: 88 }
];

describe('sortBy', function () {
  const sortWithOrder = (order: 'asc' | 'desc') => {
    return sortBy([...sortByData], {
      field: 'group',
      order,
      type: null
    }).map((item) => item.group);
  };

  const getExpectedOrder = (order: 'asc' | 'desc') => {
    const nonNull = sortByData
      .map((item) => item.group)
      .filter((item) => item !== null)
      .sort((a, b) => (order === 'asc' ? a.localeCompare(b, 'en', { sensitivity: 'base' }) : b.localeCompare(a, 'en', { sensitivity: 'base' })));
    const nullCount = sortByData.length - nonNull.length;
    return order === 'desc' ? [...new Array(nullCount).fill(null), ...nonNull] : [...nonNull, ...new Array(nullCount).fill(null)];
  };

  it('按 group asc 排序', () => {
    const result = sortWithOrder('asc');

    expect(result).deep.equal(getExpectedOrder('asc'));
  });

  it('按 group desc 排序', () => {
    const result = sortWithOrder('desc');

    expect(result).deep.equal(getExpectedOrder('desc'));
  });

  it('按 date 类型排序', () => {
    const data = [
      { name: 'B', created: '2024-01-02' },
      { name: 'A', created: '2023-12-31' },
      { name: 'C', created: null },
      { name: 'E', created: '' },
      { name: 'F', created: 'invalid' },
      { name: 'D', created: '2024-01-01' }
    ];
    const result = sortBy([...data], {
      field: 'created',
      order: 'asc',
      type: 'date'
    }).map((item) => item.name);

    expect(result).deep.equal(['A', 'D', 'B', 'C', 'E', 'F']);
  });

  it('按 date 类型 desc 排序空值在前', () => {
    const data = [
      { name: 'B', created: '2024-01-02' },
      { name: 'A', created: '2023-12-31' },
      { name: 'C', created: null },
      { name: 'E', created: '' },
      { name: 'F', created: 'invalid' },
      { name: 'D', created: '2024-01-01' }
    ];
    const result = sortBy([...data], {
      field: 'created',
      order: 'desc',
      type: 'date'
    }).map((item) => item.name);

    expect(result).deep.equal(['C', 'E', 'F', 'B', 'D', 'A']);
  });

  it('date 类型保留空值位置', () => {
    const data = [
      { name: 'B', created: '2024-01-02' },
      { name: 'C', created: '' },
      { name: 'A', created: '2023-12-31' },
      { name: 'D', created: null },
      { name: 'E', created: '2024-01-01' }
    ];
    const result = sortBy([...data], {
      field: 'created',
      order: 'asc',
      type: 'date',
      keepNilPosition: true
    }).map((item) => item.name);

    expect(result).deep.equal(['A', 'C', 'E', 'D', 'B']);
  });

  it('number 无效值视为空并按 order 方向处理', () => {
    const data = [
      { name: 'B', score: 2 },
      { name: 'C', score: null },
      { name: 'A', score: 1 },
      { name: 'D', score: 'x' }
    ];
    const asc = sortBy([...data], {
      field: 'score',
      order: 'asc',
      type: 'number'
    }).map((item) => item.name);
    const desc = sortBy([...data], {
      field: 'score',
      order: 'desc',
      type: 'number'
    }).map((item) => item.name);

    expect(asc).deep.equal(['A', 'B', 'C', 'D']);
    expect(desc).deep.equal(['C', 'D', 'B', 'A']);
  });

  it('多字段排序支持类型与空值规则', () => {
    const result = sortBy([...sortByData], { field: 'group', order: 'asc' }, { field: 'score', order: 'desc', type: 'number' }).map((item) => item.id);

    expect(result).deep.equal([3, 8, 7, 6, 1, 4, 2, 5]);
  });

  it('应能正确处理空数组', () => {
    const result = sortBy([], { field: 'group', order: 'asc' });
    expect(result).deep.equal([]);
  });

  it('应能正确处理单元素数组', () => {
    const data = [{ id: 1, group: 'A' }];
    const result = sortBy([...data], { field: 'group', order: 'asc' });
    expect(result).deep.equal(data);
  });

  it('应支持自定义排序函数', () => {
    const data = [
      { id: 1, value: 'A' },
      { id: 2, value: 'B' },
      { id: 3, value: 'C' }
    ];
    // 自定义函数将 B 排在最前面
    const customSort = (a, b) => {
      if (a.value === 'B') return -1;
      if (b.value === 'B') return 1;
      return a.id - b.id;
    };
    const result = sortBy([...data], { field: 'value', sort: customSort }).map((item) => item.id);
    expect(result).deep.equal([2, 1, 3]);
  });

  it('自定义排序返回非数值时应保持稳定顺序', () => {
    const data = [
      { id: 1, value: 'B' },
      { id: 2, value: 'A' },
      { id: 3, value: 'C' }
    ];
    const customSort = () => Number.NaN;
    const result = sortBy([...data], { field: 'value', sort: customSort }).map((item) => item.id);
    expect(result).deep.equal([1, 2, 3]);
  });

  it('应支持深路径字段排序', () => {
    const data = [
      { id: 1, meta: { score: 2 } },
      { id: 2, meta: { score: 10 } },
      { id: 3, meta: { score: 1 } }
    ];
    const result = sortBy([...data], { field: 'meta.score', type: 'number' }).map((item) => item.id);
    expect(result).deep.equal([3, 1, 2]);
  });

  it('未指定 order 时默认按 asc 排序', () => {
    const data = [
      { id: 1, value: 'b' },
      { id: 2, value: 'a' },
      { id: 3, value: 'c' }
    ];
    const result = sortBy([...data], { field: 'value' }).map((item) => item.id);
    expect(result).deep.equal([2, 1, 3]);
  });

  it('未指定 type 时按字符串排序', () => {
    const data = [
      { id: 1, value: 2 },
      { id: 2, value: 10 },
      { id: 3, value: 1 }
    ];
    const result = sortBy([...data], { field: 'value' }).map((item) => item.id);
    expect(result).deep.equal([3, 2, 1]);
  });

  it('应支持自定义 compareOptions', () => {
    const data = [
      { id: 1, value: '10' },
      { id: 2, value: '2' },
      { id: 3, value: '1' }
    ];
    const result = sortBy([...data], { field: 'value', compareOptions: { numeric: true } }).map((item) => item.id);
    expect(result).deep.equal([3, 2, 1]);
  });

  it('应保持稳定排序', () => {
    const data = [
      { id: 1, value: 'A' },
      { id: 2, value: 'A' },
      { id: 3, value: 'A' }
    ];
    const result = sortBy([...data], { field: 'value' }).map((item) => item.id);
    expect(result).deep.equal([1, 2, 3]);
  });

  it('在多字段排序中应正确处理 keepNilPosition', () => {
    const data = [
      { id: 1, group: 'A', score: 10 },
      { id: 2, group: 'B', score: null },
      { id: 3, group: 'A', score: 20 },
      { id: 4, group: 'C', score: null },
      { id: 5, group: 'A', score: 5 }
    ];
    // 先按 score asc 排序（keepNilPosition 字段同时参与排序），空值位置保持不变
    const result = sortBy([...data], { field: 'score', type: 'number', keepNilPosition: true }, { field: 'group', order: 'asc' }, { field: 'score', order: 'desc', type: 'number' });
    const resultIds = result.map((item) => item.id);
    expect(resultIds).deep.equal([5, 2, 1, 4, 3]);
  });

  it('应支持 Date 对象与时间戳的日期排序', () => {
    const data = [
      { id: 1, created: new Date('2024-01-02') },
      { id: 2, created: 1704067200000 },
      { id: 3, created: new Date('2024-01-01') }
    ];
    const result = sortBy([...data], { field: 'created', type: 'date', order: 'asc' }).map((item) => item.id);
    expect(result).deep.equal([2, 3, 1]);
  });

  it('数值相等时应保持稳定顺序', () => {
    const data = [
      { id: 1, score: 10 },
      { id: 2, score: 10 },
      { id: 3, score: 5 }
    ];
    const result = sortBy([...data], { field: 'score', type: 'number', order: 'asc' }).map((item) => item.id);
    expect(result).deep.equal([3, 1, 2]);
  });

  it('日期相等时应保持稳定顺序', () => {
    const data = [
      { id: 1, created: '2024-01-01' },
      { id: 2, created: '2024-01-01' },
      { id: 3, created: '2024-01-02' }
    ];
    const result = sortBy([...data], { field: 'created', type: 'date', order: 'desc' }).map((item) => item.id);
    expect(result).deep.equal([3, 1, 2]);
  });

  it('无排序字段时应返回原数组', () => {
    const data = [
      { id: 1, value: 'b' },
      { id: 2, value: 'a' }
    ];
    const result = sortBy([...data]);
    expect(result).deep.equal(data);
  });

  it('字符串类型 keepNilPosition 应保持空值位置', () => {
    const data = [
      { id: 1, name: 'b' },
      { id: 2, name: null },
      { id: 3, name: 'a' }
    ];
    const result = sortBy([...data], { field: 'name', keepNilPosition: true }).map((item) => item.id);
    expect(result).deep.equal([3, 2, 1]);
  });

  it('应返回可用于 Array.sort 的比较函数', () => {
    const data = [
      { id: 1, value: 'b' },
      { id: 2, value: 'a' }
    ];
    const comparator = sortBy({ field: 'value', order: 'asc' });
    const result = [...data].sort(comparator).map((item) => item.id);
    expect(result).deep.equal([2, 1]);
  });
});
