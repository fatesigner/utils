/**
 * html-canvas.spec
 */

import { expect } from 'chai';

import { convertHtmlToCanvas, convertHtmlToImage } from './html-canvas';

describe('# test html-canvas.', function () {
  it('## .', function () {
    expect('hello').to.equal('hello');
  });

  /* const jsdom = require('jsdom');
  const { JSDOM } = jsdom;

   const dom = new JSDOM(
    `<!DOCTYPE html><body><div id="app" style="height: 300px;">html2canvas Screenshots with JavaScript<p></p></div></body>`
  );

  it('## ConvertHtmlToCanvas.', function () {
    const noop = () => {};
    Object.defineProperty(window, 'scrollTo', { value: noop, writable: true });
    const s = convertHtmlToCanvas(dom.window.document.querySelector('#app'));
  }); */
});
