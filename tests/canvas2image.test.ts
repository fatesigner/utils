/**
 * @jest-environment jsdom
 */

import path from 'path';

import { expect } from 'chai';

type CanvasContextMock = {
  getImageData: () => { width: number; height: number; data: number[] };
  drawImage: (...args: any[]) => void;
};

function loadCanvas2Image(setup: {
  getContext?: () => CanvasContextMock | null;
  toDataURL?: () => string;
  btoa?: (data: string) => string;
}) {
  jest.resetModules();
  const originalGetContext = HTMLCanvasElement.prototype.getContext;
  const originalToDataURL = HTMLCanvasElement.prototype.toDataURL;
  const originalBtoa = window.btoa;

  if (setup.getContext) {
    HTMLCanvasElement.prototype.getContext = setup.getContext as any;
  }
  if (Object.prototype.hasOwnProperty.call(setup, 'toDataURL')) {
    HTMLCanvasElement.prototype.toDataURL = setup.toDataURL as any;
  }
  if (Object.prototype.hasOwnProperty.call(setup, 'btoa')) {
    (window as any).btoa = setup.btoa;
  }

  const modulePath = path.resolve(__dirname, '../dist/lib/canvas2image/canvas2image.js');
  const mod = require(modulePath);

  return {
    Canvas2Image: mod.default ?? mod,
    restore() {
      HTMLCanvasElement.prototype.getContext = originalGetContext;
      HTMLCanvasElement.prototype.toDataURL = originalToDataURL;
      (window as any).btoa = originalBtoa;
    }
  };
}

describe('# test canvas2image.', function () {
  it('## convertToPNG and convertToBMP', function () {
    const ctx: CanvasContextMock = {
      getImageData: () => ({ width: 1, height: 1, data: [0, 0, 0, 255] }),
      drawImage: () => undefined
    };
    const { Canvas2Image, restore } = loadCanvas2Image({
      getContext: () => ctx,
      toDataURL: () => 'data:image/png;base64,xx'
    });

    const canvas = document.createElement('canvas');
    canvas.width = 1;
    canvas.height = 1;

    const png = Canvas2Image.convertToPNG(canvas, 1, 1);
    expect(png.tagName).to.equal('IMG');
    expect(png.src).to.contain('data:image/png');

    const bmp = Canvas2Image.convertToBMP(canvas, 1, 1);
    expect(bmp.tagName).to.equal('IMG');
    expect(bmp.src).to.contain('data:image/bmp');
    restore();
  });

  it('## saveAsPNG/saveAsBMP', function () {
    const ctx: CanvasContextMock = {
      getImageData: () => ({ width: 1, height: 1, data: [0, 0, 0, 255] }),
      drawImage: () => undefined
    };
    const clickSpy = jest.fn();
    const originalClick = HTMLAnchorElement.prototype.click;
    HTMLAnchorElement.prototype.click = clickSpy;

    const { Canvas2Image, restore } = loadCanvas2Image({
      getContext: () => ctx,
      toDataURL: () => 'data:image/png;base64,xx'
    });

    const canvas = document.createElement('canvas');
    canvas.width = 1;
    canvas.height = 1;

    Canvas2Image.saveAsPNG(canvas, 1, 1, 'demo');
    Canvas2Image.saveAsBMP(canvas, 1, 1, 'demo');

    expect(clickSpy.mock.calls.length).to.equal(2);
    HTMLAnchorElement.prototype.click = originalClick;
    restore();
  });

  it('## convertToImage without canvas support', function () {
    const { Canvas2Image, restore } = loadCanvas2Image({
      getContext: () => ({ getImageData: undefined, drawImage: () => undefined }),
      toDataURL: undefined
    });
    const canvas = document.createElement('canvas');
    const res = Canvas2Image.convertToImage(canvas, 1, 1, 'png');
    expect(res).to.equal(undefined);
    restore();
  });

  it('## convertToPNG without width/height', function () {
    const ctx: CanvasContextMock = {
      getImageData: () => ({ width: 1, height: 1, data: [0, 0, 0, 255] }),
      drawImage: () => undefined
    };
    const { Canvas2Image, restore } = loadCanvas2Image({
      getContext: () => ctx,
      toDataURL: () => 'data:image/png;base64,xx'
    });
    const canvas = document.createElement('canvas');
    canvas.width = 1;
    canvas.height = 1;
    const png = Canvas2Image.convertToPNG(canvas);
    expect(png.tagName).to.equal('IMG');
    restore();
  });

  it('## saveAsImage with canvas id and default type', function () {
    const ctx: CanvasContextMock = {
      getImageData: () => ({ width: 1, height: 1, data: [0, 0, 0, 255] }),
      drawImage: () => undefined
    };
    const clickSpy = jest.fn();
    const originalClick = HTMLAnchorElement.prototype.click;
    HTMLAnchorElement.prototype.click = clickSpy;
    const { Canvas2Image, restore } = loadCanvas2Image({
      getContext: () => ctx,
      toDataURL: () => 'data:image/png;base64,xx'
    });
    const canvas = document.createElement('canvas');
    canvas.id = 'c1';
    canvas.width = 1;
    canvas.height = 1;
    document.body.appendChild(canvas);
    Canvas2Image.saveAsImage('c1', 1, 1, undefined, 'demo');
    expect(clickSpy.mock.calls.length).to.equal(1);
    HTMLAnchorElement.prototype.click = originalClick;
    restore();
  });

  it('## convertToJPEG/convertToGIF', function () {
    const ctx: CanvasContextMock = {
      getImageData: () => ({ width: 1, height: 1, data: [0, 0, 0, 255] }),
      drawImage: () => undefined
    };
    const { Canvas2Image, restore } = loadCanvas2Image({
      getContext: () => ctx,
      toDataURL: () => 'data:image/jpeg;base64,xx'
    });
    const canvas = document.createElement('canvas');
    canvas.width = 1;
    canvas.height = 1;
    const jpg = Canvas2Image.convertToJPEG(canvas, 1, 1);
    const gif = Canvas2Image.convertToGIF(canvas, 1, 1);
    expect(jpg.tagName).to.equal('IMG');
    expect(gif.tagName).to.equal('IMG');
    restore();
  });

  it('## convertToBMP btoa missing', function () {
    const ctx: CanvasContextMock = {
      getImageData: () => ({ width: 1, height: 1, data: [0, 0, 0, 255] }),
      drawImage: () => undefined
    };
    const { Canvas2Image, restore } = loadCanvas2Image({
      getContext: () => ctx,
      toDataURL: () => 'data:image/png;base64,xx',
      btoa: undefined as any
    });
    const canvas = document.createElement('canvas');
    canvas.width = 1;
    canvas.height = 1;
    let error: any;
    try {
      Canvas2Image.convertToBMP(canvas, 1, 1);
    } catch (err: any) {
      error = err;
    }
    expect(error).to.be.ok;
    restore();
  });
});
