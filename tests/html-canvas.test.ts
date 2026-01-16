/**
 * @jest-environment jsdom
 */

import { expect } from 'chai';

jest.mock(
  'await-to-js',
  () => ({
    __esModule: true,
    default: jest.fn(async (promise: Promise<any>) => {
      try {
        const res = await promise;
        return [null, res];
      } catch (err) {
        return [err, undefined];
      }
    })
  }),
  { virtual: true }
);

jest.mock(
  'html2canvas',
  () => ({
    __esModule: true,
    default: jest.fn().mockResolvedValue({ width: 100, height: 50 })
  }),
  { virtual: true }
);

import to from 'await-to-js';
import html2canvas from 'html2canvas';
import { convertHtmlToCanvas, convertHtmlToImage, saveHtmlAsImage } from '../dist/html-canvas';

describe('# test html-canvas.', function () {
  it('## convertHtmlToCanvas', async function () {
    const el = document.createElement('div');
    const canvas = await convertHtmlToCanvas(el);
    expect(canvas.width).to.equal(100);
    expect(canvas.height).to.equal(50);
  });

  it('## convertHtmlToCanvas import error', async function () {
    (to as jest.Mock).mockImplementationOnce(async () => [new Error('import error'), undefined]);
    let error: Error;
    try {
      await convertHtmlToCanvas(document.createElement('div'));
    } catch (err: any) {
      error = err;
    }
    expect(error).to.be.instanceof(Error);
  });

  it('## convertHtmlToImage success', async function () {
    const originalGetContext = HTMLCanvasElement.prototype.getContext;
    const originalToDataURL = HTMLCanvasElement.prototype.toDataURL;
    HTMLCanvasElement.prototype.getContext = () => ({ getImageData: () => ({}), drawImage: () => {} }) as any;
    HTMLCanvasElement.prototype.toDataURL = () => 'data:image/png;base64,xx';
    const el = document.createElement('div');
    const image = await convertHtmlToImage(el, undefined, 'png', 200, 100);
    HTMLCanvasElement.prototype.getContext = originalGetContext;
    HTMLCanvasElement.prototype.toDataURL = originalToDataURL;
    expect(image).to.have.property('tagName', 'IMG');
  });

  it('## convertHtmlToImage import error', async function () {
    (to as jest.Mock).mockImplementationOnce(async () => [new Error('import error'), undefined]);
    let error: Error;
    try {
      await convertHtmlToImage(document.createElement('div'));
    } catch (err: any) {
      error = err;
    }
    expect(error).to.be.instanceof(Error);
  });

  it('## convertHtmlToImage html2canvas error', async function () {
    (html2canvas as jest.Mock).mockRejectedValueOnce(new Error('render error'));
    let error: Error;
    try {
      await convertHtmlToImage(document.createElement('div'));
    } catch (err: any) {
      error = err;
    }
    expect(error).to.be.instanceof(Error);
  });

  it('## saveHtmlAsImage success and default filename', async function () {
    const originalGetContext = HTMLCanvasElement.prototype.getContext;
    const originalToDataURL = HTMLCanvasElement.prototype.toDataURL;
    HTMLCanvasElement.prototype.getContext = () => ({ getImageData: () => ({}), drawImage: () => {} }) as any;
    HTMLCanvasElement.prototype.toDataURL = () => 'data:image/png;base64,xx';
    await saveHtmlAsImage(document.createElement('div'), undefined, 'jpeg');
    HTMLCanvasElement.prototype.getContext = originalGetContext;
    HTMLCanvasElement.prototype.toDataURL = originalToDataURL;
  });

  it('## saveHtmlAsImage import error', async function () {
    (to as jest.Mock).mockImplementationOnce(async () => [new Error('import error'), undefined]);
    let error: Error;
    try {
      await saveHtmlAsImage(document.createElement('div'));
    } catch (err: any) {
      error = err;
    }
    expect(error).to.be.instanceof(Error);
  });

  it('## saveHtmlAsImage html2canvas error', async function () {
    (html2canvas as jest.Mock).mockRejectedValueOnce(new Error('render error'));
    let error: Error;
    try {
      await saveHtmlAsImage(document.createElement('div'));
    } catch (err: any) {
      error = err;
    }
    expect(error).to.be.instanceof(Error);
  });
});
