/**
 * @jest-environment jsdom
 */

import { expect } from 'chai';

import {
  addMask,
  bindLazyFunc,
  bindPromiseQueue,
  convertArrToEnum,
  convertBase64ToBlob,
  convertBlobToFile,
  convertModelArrToEnum,
  exchangeItem,
  getParamsFromUrl,
  mergeHandlers,
  mergeVueProps,
  removeItem
} from '../dist';

describe('# test main extra.', function () {
  it('## convertBase64ToBlob/convertBlobToFile', function () {
    const blob = convertBase64ToBlob('data:text/plain;base64,SGVsbG8=', 'text/plain');
    expect(blob).to.be.ok;
    expect(blob.type).to.equal('text/plain');
    expect(blob.size).to.be.greaterThan(0);

    const file = convertBlobToFile(blob, 'hello.txt', 'text/plain');
    expect(file.name).to.equal('hello.txt');
    expect(file.type).to.equal('text/plain');
  });

  it('## convertBase64ToBlob empty/non-base64', function () {
    const empty = convertBase64ToBlob('' as any);
    expect(empty).to.equal(undefined);
    const blob = convertBase64ToBlob('data:text/plain,Hello', 'text/plain');
    expect(blob).to.be.ok;
    expect(blob.type).to.equal('text/plain');
  });

  it('## getParamsFromUrl', function () {
    const params = getParamsFromUrl('https://example.com?a=1&b=2');
    expect(params.a).to.equal('1');
    expect(params.b).to.equal('2');
    expect(getParamsFromUrl('')).to.deep.equal({});
  });

  it('## bindLazyFunc', async function () {
    const target: any = {};
    bindLazyFunc(target, ['fetch']);
    const p = target.fetch('a');
    target.fetch = (val: string) => `${val}1`;
    const res = await p;
    expect(res).to.equal('a1');
  });

  it('## bindLazyFunc existing function', function () {
    const target: any = {};
    bindLazyFunc(target, ['fetch']);
    target.fetch = (val: string) => `${val}x`;
    const res = target.fetch('a');
    expect(res).to.equal('ax');
  });

  it('## bindLazyFunc late assign before call', function () {
    const target: any = {};
    bindLazyFunc(target, ['fetch']);
    const lazy = target.fetch;
    target.fetch = (val: string) => `${val}z`;
    const res = lazy('a');
    expect(res).to.equal('az');
  });

  it('## bindPromiseQueue', async function () {
    let calls = 0;
    const fn = async (val: number) => {
      calls += 1;
      return val;
    };

    const queued = bindPromiseQueue(fn, false);
    const p1 = queued(1);
    const p2 = queued(2);
    await p1;
    await p2;
    expect(calls).to.equal(2);

    calls = 0;
    const cached = bindPromiseQueue(fn, true);
    const c1 = cached(1);
    const c2 = cached(2);
    expect(c1).to.equal(c2);
    await c1;
    expect(calls).to.equal(1);
  });

  it('## addMask/convertArrToEnum/convertModelArrToEnum', function () {
    expect(addMask('123456', 1, 5, '*')).to.equal('1****6');
    expect(addMask('')).to.equal('');
    const enums = convertArrToEnum(['a', 'b']);
    expect(enums.a).to.equal('a');
    const enums2 = convertArrToEnum(['a', 'b'], (x) => x.toUpperCase());
    expect(enums2.a).to.equal('A');

    const modelEnums = convertModelArrToEnum([
      { name: 'A', value: 1, text: 'alpha' }
    ] as const);
    expect(modelEnums.enum.A).to.equal(1);
    expect(modelEnums.desc[1]).to.equal('alpha');
    expect(modelEnums.keys[0]).to.equal('A');
    expect(modelEnums.values[0]).to.equal(1);
  });

  it('## exchangeItem/removeItem', function () {
    const arr = [1, 2, 3];
    exchangeItem(arr, 0, 2);
    expect(arr).to.deep.equal([2, 3, 1]);

    const arr2 = [1, 2, 3];
    const idx = removeItem((x) => x === 2, arr2);
    expect(idx).to.equal(1);
    expect(arr2).to.deep.equal([1, 3]);
  });

  it('## mergeVueProps/mergeHandlers', function () {
    const vue = {
      set: jest.fn((target, key, val) => {
        target[key] = val;
      })
    };
    const defaults = {
      a: 1,
      b: { c: 2 },
      d: [1, 2]
    };
    const props: any = { b: {} };
    const merged = mergeVueProps(vue, defaults as any, props);
    expect(merged.a).to.equal(1);
    expect(vue.set.mock.calls.length).to.be.greaterThan(0);

    const handlers = mergeHandlers(null as any, {
      onOk: () => Promise.resolve(1)
    } as any);
    expect(typeof handlers.onOk).to.equal('function');
  });
});
