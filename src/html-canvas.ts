/**
 * html-canvas
 */

import to from 'await-to-js';

export type ImageType = 'png' | 'jpeg' | 'gif' | 'bmp';

/**
 * 将指定的 HtmlElement 转换为 HTMLCanvasElement
 * @param el        html 元素
 * @param options   html2canvas插件选项
 * @constructor
 */
export async function convertHtmlToCanvas(el: HTMLElement, options?: any): Promise<HTMLCanvasElement> {
  const [err, res] = await to<any>(import('html2canvas'));

  if (err) {
    throw err;
  } else {
    const html2canvas = res.default;

    return html2canvas(el, options);
  }
}

/**
 * 将指定的 HtmlElement 转换为 img element
 * @param el        html 元素
 * @param options   html2canvas插件选项
 * @param type      图片类型
 * @param width     图片宽度
 * @param height    图片高度
 * @constructor
 */
export async function convertHtmlToImage(
  el: HTMLElement,
  options?: any,
  type: ImageType = 'jpeg',
  width?: number,
  height?: number
): Promise<HTMLImageElement> {
  const [err, res] = await to<any>(Promise.all([import('html2canvas'), import('./lib/canvas2image/canvas2image')]));

  if (err) {
    throw err;
  } else {
    const html2canvas = res[0].default;

    const [err, canvas] = await to<any>(html2canvas(el, options));

    if (err) {
      throw err;
    } else {
      const canvas2Image = res[1].default;
      return canvas2Image.convertToImage(canvas, width || canvas.width, height || canvas.height, type);
    }
  }
}

/**
 * 将指定的 HtmlElement 保存为 img 并下载
 * @param el        html 元素
 * @param options   html2canvas插件选项
 * @param type      图片类型
 * @param fileName  文件名
 * @param width     图片宽度
 * @param height    图片高度
 * @constructor
 */
export async function saveHtmlAsImage(
  el: HTMLElement,
  options?: any,
  type: ImageType = 'jpeg',
  fileName?: string,
  width?: number,
  height?: number
): Promise<void> {
  const [err, res] = await to<any>(Promise.all([import('html2canvas'), import('./lib/canvas2image/canvas2image')]));

  if (err) {
    throw err;
  } else {
    const html2canvas = res[0].default;

    const [err, canvas] = await to<any>(html2canvas(el, options));

    if (err) {
      throw err;
    } else {
      const canvas2Image = res[1].default;

      if (!fileName) {
        // 默认设置文件名为时间戳
        fileName = new Date().getTime().toString();
      }

      canvas2Image.saveAsImage(canvas, width || canvas.width, height || canvas.height, type, fileName);
    }
  }
}
