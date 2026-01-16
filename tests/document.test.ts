/**
 * @jest-environment jsdom
 */

import { expect } from 'chai';

import {
  addClass,
  addEventPrefix,
  addEventListener,
  addToCollectionSites,
  closest,
  contains,
  clearInputFile,
  createElement,
  downloadFile,
  getBoundingClientRect,
  getAbsRelativeLayout,
  Direction,
  filterExtensions,
  getContentSize,
  getExtension,
  getFileName,
  getFileNameWithoutExtention,
  getFiles,
  getImageSrc,
  getImageSize,
  getOffsetAwayFromDocument,
  getPath,
  getScrollLeft,
  getScrollTop,
  getViewportSize,
  hasClass,
  insertAfter,
  isImage,
  isertBefore,
  loadImage,
  loadScript,
  matchesSelector,
  on,
  one,
  onTransitionEnd,
  openNewWindow,
  prependChild,
  removeEventListener,
  removeClass,
  removeElement,
  scrollTo,
  scrollYTo,
  hover
} from '../dist/document';

describe('# test document.', function () {
  it('## createElement/removeElement', function () {
    const el = createElement('<span class="x">hi</span>') as HTMLElement;
    document.body.appendChild(el);
    expect(hasClass(el, 'x')).to.equal(true);
    removeClass(el, 'x');
    expect(hasClass(el, 'x')).to.equal(false);
    addClass(el, 'x');
    expect(hasClass(el, 'x')).to.equal(true);
    removeElement(el);
  });
  it('## removeElement empty/parentless', function () {
    removeElement(null as any);
    const el = document.createElement('div');
    removeElement(el);
  });

  it('## closest', function () {
    const parent = document.createElement('div');
    parent.className = 'parent';
    const child = document.createElement('span');
    child.className = 'child';
    parent.appendChild(child);
    document.body.appendChild(parent);

    const res = closest(child, '.parent');
    expect(res).to.equal(parent);
  });

  it('## matchesSelector fallback/contains', async function () {
    const el = document.createElement('div');
    el.className = 'm1';
    document.body.appendChild(el);
    (el as any).matches = undefined;
    (el as any).matchesSelector = undefined;
    (el as any).webkitMatchesSelector = undefined;
    (el as any).msMatchesSelector = undefined;
    (el as any).mozMatchesSelector = undefined;
    (el as any).oMatchesSelector = undefined;

    expect(matchesSelector(el, '.m1')).to.equal(true);
    expect(contains(document.body, el)).to.equal(true);
    expect(contains(el, el)).to.equal(false);

    const offset = getOffsetAwayFromDocument(el);
    expect(offset).to.have.property('top');
    expect(offset).to.have.property('left');

    const rect = getBoundingClientRect(el as HTMLElement);
    expect(rect).to.have.property('width');
    expect(rect).to.have.property('height');
  });

  it('## matchesSelector webkit fallback', function () {
    const el = document.createElement('div');
    el.className = 'm2';
    (el as any).matches = undefined;
    (el as any).webkitMatchesSelector = (selector: string) => selector === '.m2';
    expect(matchesSelector(el, '.m2')).to.equal(true);
  });

  it('## matchesSelector prefixed methods', function () {
    const cases = [
      { prop: 'matchesSelector', selector: '.m3' },
      { prop: 'msMatchesSelector', selector: '.m4' },
      { prop: 'mozMatchesSelector', selector: '.m5' },
      { prop: 'oMatchesSelector', selector: '.m6' }
    ];
    cases.forEach(({ prop, selector }) => {
      const el: any = document.createElement('div');
      el.matches = undefined;
      el.matchesSelector = undefined;
      el.webkitMatchesSelector = undefined;
      el.msMatchesSelector = undefined;
      el.mozMatchesSelector = undefined;
      el.oMatchesSelector = undefined;
      el[prop] = (sel: string) => sel === selector;
      expect(matchesSelector(el, selector)).to.equal(true);
    });
  });

  it('## closest containsItsOwn/empty', function () {
    const el = document.createElement('div');
    el.className = 'self';
    document.body.appendChild(el);
    expect(closest(el, '.self', true)).to.equal(el);
    expect(closest(el, '.missing')).to.equal(null);
  });

  it('## contains compareDocumentPosition', function () {
    const parent = document.createElement('div');
    const child = document.createElement('span');
    parent.appendChild(child);
    const originContains = (parent as any).contains;
    (parent as any).contains = undefined;
    (parent as any).compareDocumentPosition = () => 16;
    expect(contains(parent, child)).to.equal(true);
    (parent as any).contains = originContains;
  });

  it('## contains/hasClass empty', function () {
    const el = document.createElement('div');
    expect(contains(null as any, el)).to.equal(false);
    expect(contains(el, null as any)).to.equal(false);
    expect(hasClass(null as any, 'x')).to.equal(false);
    expect(hasClass(el, '')).to.equal(false);
    addClass(null as any, 'x');
    removeClass(null as any, 'x');
    addClass(el, '');
    removeClass(el, '');
  });

  it('## viewport/files', async function () {
    const viewport = getViewportSize(document);
    expect(viewport).to.have.property('width');
    expect(viewport).to.have.property('height');
    const viewportFallback = getViewportSize(undefined as any);
    expect(viewportFallback).to.have.property('width');
    expect(viewportFallback).to.have.property('height');

    const input = document.createElement('input');
    const file = new File(['x'], 'a.png', { type: 'image/png' });
    Object.defineProperty(input, 'files', {
      value: [file]
    });

    const files = getFiles(input as HTMLInputElement) as File[];
    expect(files.length).to.equal(1);
    expect(getFileName(file)).to.equal('a.png');
    expect(getFileNameWithoutExtention(file)).to.equal('a');
    expect(getExtension(file)).to.equal('.png');
    expect(isImage(file)).to.equal(true);
    expect(filterExtensions(file, '.png,.jpg')).to.equal(true);

    const src = await getImageSrc(file);
    expect(src).to.be.ok;

    const emptyInput = document.createElement('input');
    expect(getFiles(emptyInput as HTMLInputElement)).to.deep.equal([]);
    expect(getFiles(null as any)).to.deep.equal([]);
    expect(getOffsetAwayFromDocument(null)).to.deep.equal({ top: 0, left: 0 });
  });

  it('## getOffsetAwayFromDocument fallback', function () {
    const el: any = {
      offsetTop: 5,
      offsetLeft: 3,
      offsetParent: {
        offsetTop: 2,
        offsetLeft: 1,
        offsetParent: null
      }
    };
    const res = getOffsetAwayFromDocument(el);
    expect(res.top).to.equal(7);
    expect(res.left).to.equal(4);
  });

  it('## getAbsRelativeLayout down/up', function () {
    Object.defineProperty(screen, 'availHeight', { value: 500, configurable: true });
    Object.defineProperty(screen, 'availWidth', { value: 500, configurable: true });
    Object.defineProperty(document.body, 'scrollHeight', { value: 500, configurable: true });
    Object.defineProperty(document.body, 'scrollWidth', { value: 500, configurable: true });

    const target = document.createElement('div');
    Object.defineProperty(target, 'offsetWidth', { value: 50, configurable: true });
    Object.defineProperty(target, 'offsetHeight', { value: 20, configurable: true });
    target.getBoundingClientRect = () => ({ top: 10, left: 10, right: 60, bottom: 30, width: 50, height: 20 });

    const abs = document.createElement('div');
    Object.defineProperty(abs, 'offsetWidth', { value: 40, configurable: true });
    Object.defineProperty(abs, 'offsetHeight', { value: 50, configurable: true });

    const resDown = getAbsRelativeLayout(target as any, abs as any, Direction.Down);
    expect(resDown.direction).to.equal(Direction.Down);

    Object.defineProperty(abs, 'offsetHeight', { value: 100, configurable: true });
    target.getBoundingClientRect = () => ({ top: 450, left: 10, right: 60, bottom: 100, width: 50, height: 20 });
    const resUp = getAbsRelativeLayout(target as any, abs as any, Direction.Down);
    expect(resUp.direction).to.equal(Direction.Up);
  });

  it('## getAbsRelativeLayout left/right', function () {
    Object.defineProperty(screen, 'availHeight', { value: 500, configurable: true });
    Object.defineProperty(screen, 'availWidth', { value: 500, configurable: true });
    Object.defineProperty(document.body, 'scrollHeight', { value: 500, configurable: true });
    Object.defineProperty(document.body, 'scrollWidth', { value: 500, configurable: true });

    const target = document.createElement('div');
    Object.defineProperty(target, 'offsetWidth', { value: 50, configurable: true });
    Object.defineProperty(target, 'offsetHeight', { value: 20, configurable: true });
    target.getBoundingClientRect = () => ({ top: 10, left: 10, right: 60, bottom: 30, width: 50, height: 20 });

    const abs = document.createElement('div');
    Object.defineProperty(abs, 'offsetWidth', { value: 40, configurable: true });
    Object.defineProperty(abs, 'offsetHeight', { value: 50, configurable: true });

    const resRight = getAbsRelativeLayout(target as any, abs as any, Direction.Right);
    expect(resRight.direction).to.equal(Direction.Right);

    Object.defineProperty(abs, 'offsetWidth', { value: 200, configurable: true });
    target.getBoundingClientRect = () => ({ top: 10, left: 450, right: 150, bottom: 30, width: 50, height: 20 });
    const resLeft = getAbsRelativeLayout(target as any, abs as any, Direction.Right);
    expect(resLeft.direction).to.equal(Direction.Left);
  });

  it('## getAbsRelativeLayout up/left extra branches', function () {
    Object.defineProperty(screen, 'availHeight', { value: 200, configurable: true });
    Object.defineProperty(screen, 'availWidth', { value: 200, configurable: true });
    Object.defineProperty(document.body, 'scrollHeight', { value: 200, configurable: true });
    Object.defineProperty(document.body, 'scrollWidth', { value: 200, configurable: true });
    Object.defineProperty(document.documentElement, 'clientWidth', { value: 200, configurable: true });
    Object.defineProperty(document.documentElement, 'clientHeight', { value: 200, configurable: true });

    const targetUp = document.createElement('div');
    Object.defineProperty(targetUp, 'offsetWidth', { value: 50, configurable: true });
    Object.defineProperty(targetUp, 'offsetHeight', { value: 20, configurable: true });
    targetUp.getBoundingClientRect = () => ({
      top: 100,
      left: 180,
      right: 230,
      bottom: 120,
      width: 50,
      height: 20
    });
    const absUp = document.createElement('div');
    Object.defineProperty(absUp, 'offsetWidth', { value: 20, configurable: true });
    Object.defineProperty(absUp, 'offsetHeight', { value: 10, configurable: true });

    const resUp = getAbsRelativeLayout(targetUp as any, absUp as any, Direction.Up);
    expect(resUp.direction).to.equal(Direction.Up);
    expect(resUp.left).to.equal(180);

    const targetLeft = document.createElement('div');
    Object.defineProperty(targetLeft, 'offsetWidth', { value: 50, configurable: true });
    Object.defineProperty(targetLeft, 'offsetHeight', { value: 20, configurable: true });
    targetLeft.getBoundingClientRect = () => ({
      top: 180,
      left: 50,
      right: 100,
      bottom: 200,
      width: 50,
      height: 20
    });
    const absLeft = document.createElement('div');
    Object.defineProperty(absLeft, 'offsetWidth', { value: 20, configurable: true });
    Object.defineProperty(absLeft, 'offsetHeight', { value: 60, configurable: true });

    const resLeft = getAbsRelativeLayout(targetLeft as any, absLeft as any, Direction.Left);
    expect(resLeft.direction).to.equal(Direction.Left);
    expect(resLeft.top).to.equal(140);
  });

  it('## getAbsRelativeLayout down/right edge branches', function () {
    Object.defineProperty(screen, 'availHeight', { value: 150, configurable: true });
    Object.defineProperty(screen, 'availWidth', { value: 150, configurable: true });
    Object.defineProperty(document.body, 'scrollHeight', { value: 150, configurable: true });
    Object.defineProperty(document.body, 'scrollWidth', { value: 150, configurable: true });
    Object.defineProperty(document.documentElement, 'clientWidth', { value: 200, configurable: true });
    Object.defineProperty(document.documentElement, 'clientHeight', { value: 200, configurable: true });

    const targetDown = document.createElement('div');
    Object.defineProperty(targetDown, 'offsetWidth', { value: 50, configurable: true });
    Object.defineProperty(targetDown, 'offsetHeight', { value: 20, configurable: true });
    targetDown.getBoundingClientRect = () => ({
      top: 100,
      left: 20,
      right: 70,
      bottom: 120,
      width: 50,
      height: 20
    });
    const absDown = document.createElement('div');
    Object.defineProperty(absDown, 'offsetWidth', { value: 20, configurable: true });
    Object.defineProperty(absDown, 'offsetHeight', { value: 100, configurable: true });
    const resDown = getAbsRelativeLayout(targetDown as any, absDown as any, Direction.Down);
    expect(resDown.direction).to.equal(Direction.Up);

    const targetRight = document.createElement('div');
    Object.defineProperty(targetRight, 'offsetWidth', { value: 50, configurable: true });
    Object.defineProperty(targetRight, 'offsetHeight', { value: 20, configurable: true });
    targetRight.getBoundingClientRect = () => ({
      top: 20,
      left: 150,
      right: 200,
      bottom: 40,
      width: 50,
      height: 20
    });
    const absRight = document.createElement('div');
    Object.defineProperty(absRight, 'offsetWidth', { value: 150, configurable: true });
    Object.defineProperty(absRight, 'offsetHeight', { value: 20, configurable: true });
    const resRight = getAbsRelativeLayout(targetRight as any, absRight as any, Direction.Right);
    expect(resRight.direction).to.equal(Direction.Left);
  });

  it('## addEventPrefix', function () {
    expect(addEventPrefix('transitionend')).to.be.a('string');
    expect(addEventPrefix('click')).to.equal('click');
  });

  it('## addEventListener/removeEventListener fallback', function () {
    const attached: Array<{ type: string; handler: Function }> = [];
    const detached: Array<{ type: string; handler: Function }> = [];
    const element: any = {
      attachEvent(type: string, handler: Function) {
        attached.push({ type, handler });
      },
      detachEvent(type: string, handler: Function) {
        detached.push({ type, handler });
      }
    };

    const handler = jest.fn();
    addEventListener(element, 'click', handler);
    expect(detached[0].type).to.equal('onclick');
    expect(attached[0].type).to.equal('onclick');
    attached[0].handler();
    expect(handler.mock.calls.length).to.equal(1);

    removeEventListener(element, 'click', handler);
    expect(detached[1].type).to.equal('onclick');
  });

  it('## addEventListener/removeEventListener', function () {
    const btn = document.createElement('button');
    let called = 0;
    const handler = () => {
      called += 1;
    };
    addEventListener(btn, 'click', handler);
    btn.click();
    removeEventListener(btn, 'click', handler);
    btn.click();
    expect(called).to.equal(1);
  });

  it('## insert helpers', function () {
    const parent = document.createElement('div');
    const childA = document.createElement('span');
    childA.textContent = 'A';
    const childB = document.createElement('span');
    childB.textContent = 'B';
    parent.appendChild(childA);
    insertAfter(childB, childA);
    expect(parent.lastChild).to.equal(childB);

    const parent2 = document.createElement('div');
    const childA2 = document.createElement('span');
    childA2.textContent = 'A2';
    const childB2 = document.createElement('span');
    childB2.textContent = 'B2';
    const childC2 = document.createElement('span');
    childC2.textContent = 'C2';
    parent2.appendChild(childA2);
    parent2.appendChild(childB2);
    insertAfter(childC2, childA2);
    expect(parent2.children[1]).to.equal(childC2);

    const childC = document.createElement('span');
    childC.textContent = 'C';
    isertBefore(childC, childA);
    expect(parent.firstChild).to.equal(childC);

    const childD = document.createElement('span');
    childD.textContent = 'D';
    prependChild(childD, parent);
    expect(parent.firstChild).to.equal(childD);

    const emptyParent = document.createElement('div');
    const childE = document.createElement('span');
    childE.textContent = 'E';
    prependChild(childE, emptyParent);
    expect(emptyParent.firstChild).to.equal(childE);

    insertAfter(document.createElement('i'), document.createElement('b'));
    prependChild(document.createElement('i'), null as any);
  });

  it('## addEventPrefix non-string', function () {
    expect(addEventPrefix(null as any)).to.equal(null);
  });

  it('## on empty elements', function () {
    const res = on([], 'click', '.x', null as any, null as any);
    expect(res).to.equal(undefined);
  });

  it('## on without delegation', function () {
    const container = document.createElement('div');
    document.body.appendChild(container);
    let called = 0;
    const off = on(container, 'click', '', () => {
      called += 1;
    });
    container.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    off();
    expect(called).to.equal(1);
  });

  it('## on handlerForMatched return false', function () {
    const container = document.createElement('div');
    const child = document.createElement('span');
    child.className = 'child';
    container.appendChild(child);
    document.body.appendChild(container);

    let prevented = false;
    let stopped = false;
    const off = on(container, 'click', '.child', null as any);
    const event = new MouseEvent('click', { bubbles: true, cancelable: true });
    event.preventDefault = () => {
      prevented = true;
    };
    event.stopPropagation = () => {
      stopped = true;
    };
    child.dispatchEvent(event);
    off();

    expect(prevented).to.equal(true);
    expect(stopped).to.equal(true);
  });

  it('## file helpers and image', async function () {
    const file = new File(['abc'], 'demo.jpg', { type: 'image/jpeg' });
    expect(getPath(file)).to.equal('demo.jpg');
    expect(getContentSize(file)).to.equal(3);
    expect(getPath(null as any)).to.equal(undefined);
    expect(getContentSize(null as any)).to.equal(0);
    const textFile = new File(['abc'], 'demo.txt', { type: 'text/plain' });
    expect(isImage(textFile)).to.equal(false);
    expect(filterExtensions(textFile, '.png,.jpg')).to.equal(false);
    expect(getFileNameWithoutExtention(textFile)).to.equal('demo');
    const noExtFile = new File(['abc'], 'demo', { type: 'text/plain' });
    expect(getFileNameWithoutExtention(noExtFile)).to.equal('');

    const input = document.createElement('input');
    input.value = 'fallback';
    expect(getFiles(input as HTMLInputElement)).to.deep.equal(['fallback']);

    const originalFileReader = (global as any).FileReader;
    const originalImage = (global as any).Image;

    class MockFileReader {
      onload?: (e: any) => void;
      readAsDataURL() {
        if (this.onload) {
          this.onload({ target: { result: 'data:image/png;base64,xx' } });
        }
      }
    }

    class MockImage {
      width = 120;
      height = 80;
      onload?: () => void;
      set src(_value: string) {
        if (this.onload) {
          this.onload();
        }
      }
    }

    (global as any).FileReader = MockFileReader;
    (global as any).Image = MockImage;

    const size = await getImageSize(file);
    expect(size.width).to.equal(120);
    expect(size.height).to.equal(80);

    const loaded = await loadImage('x.png');
    expect(loaded.width).to.equal(120);
    expect(loaded.height).to.equal(80);

    const inputFile = document.createElement('input');
    inputFile.type = 'file';
    clearInputFile(inputFile);
    expect(inputFile.value).to.equal('');

    (global as any).FileReader = originalFileReader;
    (global as any).Image = originalImage;
  });

  it('## getImageSrc chrome', async function () {
    const originalUserAgent = navigator.userAgent;
    const originalCreateObjectURL = URL.createObjectURL;
    Object.defineProperty(navigator, 'userAgent', { value: 'Mozilla Chrome', configurable: true });
    const createMock = jest.fn(() => 'blob:mock');
    (URL as any).createObjectURL = createMock;
    const src = await getImageSrc(new File(['x'], 'a.png', { type: 'image/png' }));
    expect(src).to.equal('blob:mock');
    (URL as any).createObjectURL = originalCreateObjectURL;
    Object.defineProperty(navigator, 'userAgent', { value: originalUserAgent, configurable: true });
  });

  it('## clearInputFile safari', function () {
    const originalUserAgent = navigator.userAgent;
    Object.defineProperty(navigator, 'userAgent', { value: 'safari', configurable: true });
    const inputFile = document.createElement('input');
    inputFile.type = 'file';
    clearInputFile(inputFile);
    expect(inputFile.type).to.equal('file');
    Object.defineProperty(navigator, 'userAgent', { value: originalUserAgent, configurable: true });
  });

  it('## getImageSize empty file', async function () {
    let error: Error;
    try {
      await getImageSize(undefined as any);
    } catch (err: any) {
      error = err;
    }
    expect(error).to.be.instanceof(Error);
  });

  it('## getImageSrc FileReader fallback', async function () {
    const originalUserAgent = navigator.userAgent;
    const originalFileReader = (global as any).FileReader;

    Object.defineProperty(navigator, 'userAgent', { value: 'Other', configurable: true });

    class MockFileReader {
      result = 'data:image/png;base64,xx';
      _hasRead = false;
      _onload?: () => void;
      set onload(fn: () => void) {
        this._onload = fn;
        if (this._hasRead && this._onload) {
          this._onload.call(this);
        }
      }
      get onload() {
        return this._onload;
      }
      readAsDataURL() {
        this._hasRead = true;
        if (this._onload) {
          this._onload.call(this);
        }
      }
    }

    (global as any).FileReader = MockFileReader;
    const file = new File(['x'], 'a.png', { type: 'image/png' });
    const src = await getImageSrc(file);
    expect(src).to.equal('data:image/png;base64,xx');

    (global as any).FileReader = originalFileReader;
    Object.defineProperty(navigator, 'userAgent', { value: originalUserAgent, configurable: true });
  });

  it('## getImageSrc msie reject', async function () {
    const originalUserAgent = navigator.userAgent;
    const originalCreateObjectURL = URL.createObjectURL;
    const originalFileReader = (global as any).FileReader;

    let overridden = false;
    try {
      Object.defineProperty(navigator, 'userAgent', { get: () => 'X MSIE', configurable: true });
      overridden = navigator.userAgent.indexOf('MSIE') >= 0;
    } catch (err) {
      overridden = false;
    }
    (URL as any).createObjectURL = undefined;
    const canDisableCreateObjectURL = (URL as any).createObjectURL === undefined;

    class MockFileReader {
      result = 'data:image/png;base64,xx';
      _hasRead = false;
      _onload?: () => void;
      set onload(fn: () => void) {
        this._onload = fn;
        if (this._hasRead && this._onload) {
          this._onload.call(this);
        }
      }
      get onload() {
        return this._onload;
      }
      readAsDataURL() {
        this._hasRead = true;
        if (this._onload) {
          this._onload.call(this);
        }
      }
    }
    (global as any).FileReader = MockFileReader;

    if (overridden && canDisableCreateObjectURL) {
      let error: Error;
      try {
        await getImageSrc(new File(['x'], 'a.png', { type: 'image/png' }));
      } catch (err: any) {
        error = err;
      }
      expect(error).to.be.instanceof(Error);
    } else {
      const src = await getImageSrc(new File(['x'], 'a.png', { type: 'image/png' }));
      expect(src).to.be.ok;
    }

    (URL as any).createObjectURL = originalCreateObjectURL;
    (global as any).FileReader = originalFileReader;
    Object.defineProperty(navigator, 'userAgent', { get: () => originalUserAgent, configurable: true });
  });

  it('## on/one/hover/transition', function () {
    const container = document.createElement('div');
    const child = document.createElement('button');
    child.className = 'child';
    container.appendChild(child);
    document.body.appendChild(container);

    let matchedCount = 0;
    let hoverIn = 0;
    let hoverOut = 0;
    let transitionCount = 0;

    const off = on(container, 'click', '.child', () => {
      matchedCount += 1;
    });

    const offOnce = one(container, 'click', '.child', () => {
      matchedCount += 1;
    });

    hover(container, '.child', () => {
      hoverIn += 1;
    }, () => {
      hoverOut += 1;
    });

    onTransitionEnd(child, () => {
      transitionCount += 1;
    });

    child.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    child.dispatchEvent(new MouseEvent('click', { bubbles: true }));

    child.dispatchEvent(new MouseEvent('mouseover', { bubbles: true, relatedTarget: document.body }));
    child.dispatchEvent(new MouseEvent('mouseout', { bubbles: true, relatedTarget: document.body }));

    child.dispatchEvent(new MouseEvent('mouseover', { bubbles: true, relatedTarget: child }));
    child.dispatchEvent(new MouseEvent('mouseout', { bubbles: true, relatedTarget: child }));

    child.dispatchEvent(new Event('transitionend'));

    off();
    offOnce();

    expect(matchedCount).to.equal(4);
    expect(hoverIn).to.equal(1);
    expect(hoverOut).to.equal(1);
    expect(transitionCount).to.equal(1);
  });

  it('## hover fromElement/toElement', function () {
    const container = document.createElement('div');
    const child = document.createElement('button');
    child.className = 'child';
    container.appendChild(child);
    document.body.appendChild(container);

    let hoverIn = 0;
    let hoverOut = 0;
    hover(container, '.child', () => {
      hoverIn += 1;
    }, () => {
      hoverOut += 1;
    });

    const overEvent = new MouseEvent('mouseover', { bubbles: true });
    Object.defineProperty(overEvent, 'fromElement', { value: document.body });
    child.dispatchEvent(overEvent);

    const outEvent = new MouseEvent('mouseout', { bubbles: true });
    Object.defineProperty(outEvent, 'toElement', { value: document.body });
    child.dispatchEvent(outEvent);

    expect(hoverIn).to.equal(1);
    expect(hoverOut).to.equal(1);
  });

  it('## on handlerForAll and transition once', function () {
    const container = document.createElement('div');
    const child = document.createElement('span');
    container.appendChild(child);
    document.body.appendChild(container);

    let allCount = 0;
    const off = on(container, 'click', '.nope', undefined, () => {
      allCount += 1;
    });

    child.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    off();
    expect(allCount).to.equal(1);

    let transitionCount = 0;
    onTransitionEnd(child, () => {
      transitionCount += 1;
    });
    child.dispatchEvent(new Event('transitionend'));
    child.dispatchEvent(new Event('transitionend'));
    expect(transitionCount).to.equal(1);
  });

  it('## onTransitionEnd custom element', function () {
    const addCalls: Array<{ type: string; handler: any }> = [];
    const removeCalls: Array<{ type: string; handler: any }> = [];
    const element: any = {
      addEventListener(type: string, handler: any) {
        addCalls.push({ type, handler });
      },
      removeEventListener(type: string, handler: any) {
        removeCalls.push({ type, handler });
      }
    };

    let called = 0;
    onTransitionEnd(element, () => {
      called += 1;
    });

    expect(addCalls.length).to.equal(5);
    const handlerRef = addCalls[0].handler;
    handlerRef.handleEvent({ type: 'transitionend' });

    expect(called).to.equal(1);
    expect(removeCalls.length).to.equal(5);
  });

  it('## on handlerForAll return false', function () {
    const container = document.createElement('div');
    const child = document.createElement('span');
    container.appendChild(child);
    document.body.appendChild(container);

    let allCount = 0;
    let prevented = false;
    let stopped = false;
    const off = on(container, 'click', '.nope', undefined, () => {
      allCount += 1;
      return false;
    });

    const event = new MouseEvent('click', { bubbles: true, cancelable: true });
    event.preventDefault = () => {
      prevented = true;
    };
    event.stopPropagation = () => {
      stopped = true;
    };
    child.dispatchEvent(event);
    off();

    expect(allCount).to.equal(1);
    expect(prevented).to.equal(true);
    expect(stopped).to.equal(true);
  });

  it('## on right click skip matched', function () {
    const container = document.createElement('div');
    const child = document.createElement('span');
    child.className = 'child';
    container.appendChild(child);
    document.body.appendChild(container);

    let matchedCount = 0;
    let allCount = 0;
    const off = on(container, 'click', '.child', () => {
      matchedCount += 1;
    }, () => {
      allCount += 1;
    });

    child.dispatchEvent(new MouseEvent('click', { bubbles: true, button: 1 }));
    off();
    expect(matchedCount).to.equal(0);
    expect(allCount).to.equal(1);
  });

  it('## on elements array and prevent default', function () {
    const a = document.createElement('a');
    const b = document.createElement('a');
    document.body.appendChild(a);
    document.body.appendChild(b);

    let called = 0;
    const off = on([a, b], 'click', '', () => {
      called += 1;
      return false;
    });

    const event = new MouseEvent('click', { bubbles: true, cancelable: true });
    a.dispatchEvent(event);
    b.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true }));
    off();

    expect(called).to.equal(2);
  });

  it('## one without selector', function () {
    const btn = document.createElement('button');
    document.body.appendChild(btn);
    let count = 0;
    const off = one(btn, 'click', '', () => {
      count += 1;
    });
    btn.click();
    btn.click();
    off();
    expect(count).to.equal(2);
  });

  it('## on handlerForMatched fallback and return false', function () {
    const container = document.createElement('div');
    const child = document.createElement('span');
    child.className = 'child';
    container.appendChild(child);
    document.body.appendChild(container);

    let fallbackCalled = 0;
    const offFallback = on(container, 'click', '.child', null as any, () => {
      fallbackCalled += 1;
    });
    child.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true }));
    offFallback();
    expect(fallbackCalled).to.equal(0);

    let prevented = false;
    const offPrevent = on(container, 'click', '.child', () => false);
    const event = new MouseEvent('click', { bubbles: true, cancelable: true });
    event.preventDefault = () => {
      prevented = true;
    };
    child.dispatchEvent(event);
    offPrevent();
    expect(prevented).to.equal(true);
  });

  it('## addToCollectionSites', function () {
    const originExternal = (global as any).external;
    const addFavorite = jest.fn();
    (global as any).external = {
      addFavorite
    };

    addToCollectionSites('https://example.com', 'x');
    expect(addFavorite.mock.calls.length).to.equal(1);
    (global as any).external = originExternal;
  });

  it('## addToCollectionSites reject', async function () {
    const originExternal = (global as any).external;
    (global as any).external = undefined;
    let error: Error;

    try {
      await addToCollectionSites('https://example.com', 'x');
    } catch (err: any) {
      error = err;
    }

    expect(error).to.be.instanceof(Error);
    (global as any).external = originExternal;
  });

  it('## addToCollectionSites sidebar fallback', async function () {
    const originExternal = (global as any).external;
    (global as any).external = undefined;
    const sidebar = { addPanel: jest.fn() };
    await addToCollectionSites.call({ sidebar }, 'https://example.com', 'x');
    expect(sidebar.addPanel.mock.calls.length).to.equal(1);
    (global as any).external = originExternal;
  });

  it('## openNewWindow/loadScript', async function () {
    const originOpen = (global as any).open;
    const originClick = (HTMLAnchorElement.prototype as any).click;
    const openMock = jest.fn();
    (global as any).open = openMock;
    (HTMLAnchorElement.prototype as any).click = undefined;
    openNewWindow('https://example.com');
    expect(openMock.mock.calls.length).to.equal(1);

    const clickMock = jest.fn();
    (HTMLAnchorElement.prototype as any).click = clickMock;
    openNewWindow('https://example.com/2');
    expect(clickMock.mock.calls.length).to.equal(1);

    const appendSpy = jest.spyOn(document.head, 'appendChild');
    appendSpy.mockImplementation((node: any) => {
      if (node.onload) {
        node.onload({});
      }
      return node;
    });
    await loadScript('https://example.com/a.js');
    appendSpy.mockRestore();

    const appendSpyErr = jest.spyOn(document.head, 'appendChild');
    appendSpyErr.mockImplementation((node: any) => {
      if (node.onerror) {
        node.onerror(new Error('load failed'));
      }
      return node;
    });
    let loadError: Error;
    try {
      await loadScript('https://example.com/b.js');
    } catch (err: any) {
      loadError = err;
    }
    expect(loadError).to.be.instanceof(Error);
    appendSpyErr.mockRestore();

    (global as any).open = originOpen;
    (HTMLAnchorElement.prototype as any).click = originClick;
  });

  it('## scroll helpers', async function () {
    const el = document.createElement('div');
    el.style.height = '100px';
    el.style.overflow = 'auto';
    el.innerHTML = '<div style="height:200px"></div>';
    document.body.appendChild(el);
    (el as any).scrollTo = jest.fn();

    const raf = window.requestAnimationFrame;
    (window as any).requestAnimationFrame = (cb: FrameRequestCallback) => {
      cb(0);
      return 1;
    };

    await scrollTo(el, 0, 10, 0);
    await scrollTo(el, undefined as any, 10, 0);
    await scrollTo(el, 10, undefined as any, 0);
    await scrollTo(el, undefined as any, undefined as any, 0);
    await scrollYTo(el, 10, 0);
    expect(getScrollTop(document)).to.be.a('number');
    expect(getScrollLeft(document)).to.be.a('number');

    (window as any).requestAnimationFrame = raf;
  });

  it('## scroll helpers duration', async function () {
    const el = document.createElement('div');
    (el as any).scrollTo = jest.fn();
    const originRaf = window.requestAnimationFrame;
    const nowSpy = jest.spyOn(performance, 'now');
    let now = 0;
    let call = 0;
    nowSpy.mockImplementation(() => now);
    (window as any).requestAnimationFrame = (cb: FrameRequestCallback) => {
      call += 1;
      now = call === 1 ? 5 : 20;
      cb(0);
      return call;
    };

    await scrollTo(el, 10, 10, 10);
    call = 0;
    now = 0;
    await scrollYTo(el, 10, 10);

    nowSpy.mockRestore();
    (window as any).requestAnimationFrame = originRaf;
  });

  it('## downloadFile default filename', function () {
    const originCreateObjectURL = window.URL.createObjectURL;
    const originRevokeObjectURL = window.URL.revokeObjectURL;
    const originClick = (HTMLAnchorElement.prototype as any).click;
    const createMock = jest.fn(() => 'blob:mock');
    const revokeMock = jest.fn();
    window.URL.createObjectURL = createMock;
    window.URL.revokeObjectURL = revokeMock;
    (HTMLAnchorElement.prototype as any).click = jest.fn();

    const blob = new Blob(['x'], { type: 'text/plain' });
    downloadFile(blob);
    downloadFile(blob, 'x.txt');
    expect(createMock.mock.calls.length).to.equal(2);
    expect(revokeMock.mock.calls.length).to.equal(2);

    (HTMLAnchorElement.prototype as any).click = originClick;
    window.URL.createObjectURL = originCreateObjectURL;
    window.URL.revokeObjectURL = originRevokeObjectURL;
  });
});
