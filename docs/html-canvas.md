# html-canvas
转换 html 为 canvas 或 image

## convertHtmlToCanvas
将指定的 HtmlElement 转换为 HTMLCanvasElement

```js
import { convertHtmlToCanvas } from '@fatesigner/utils/html-canvas';

/**
 * @param el        html 元素
 * @param options   html2canvas插件选项
 * @constructor
 */
export declare function convertHtmlToCanvas(el: HTMLElement, options?: any): Promise<HTMLCanvasElement>;

// 转换为 canvas 元素
const canvas = await convertHtmlToCanvas(document.getElementById('app'), {
  // cavas 背景色，默认为 transparent
  backgroundColor: 'blue'
});

document.body.appendChild(canvas);
```

## convertHtmlToImage
将指定的 HtmlElement 转换为 img element

```js
import { convertHtmlToImage } from '@fatesigner/utils/html-canvas';

/**
 * @param el        html 元素
 * @param options   html2canvas插件选项
 * @param type      图片类型
 * @param width     图片宽度
 * @param height    图片高度
 * @constructor
 */
export declare function convertHtmlToImage(el: HTMLElement, type: ImageType, width?: number, height?: number): Promise<HTMLImageElement>;

// 转换为 img 元素
const img = await convertHtmlToImage(document.getElementById('app'), {
  // cavas 背景色，默认为 transparent
  backgroundColor: 'blue'
}, 'png', 600, 500);

document.body.appendChild(img);
```

## saveHtmlAsImage
将指定的 HtmlElement 保存为 img 并下载

```js
import { saveHtmlAsImage } from '@fatesigner/utils/html-canvas';

/**
 * @param el        html 元素
 * @param options   html2canvas插件选项
 * @param type      图片类型
 * @param fileName  文件名
 * @param width     图片宽度
 * @param height    图片高度
 * @constructor
 */
export declare function saveHtmlAsImage(el: HTMLElement, type: ImageType, fileName?: string, width?: number, height?: number): Promise<void>;

// 转换为 img 并下载
await saveHtmlAsImage(document.getElementById('app'), {
  // cavas 背景色，默认为 transparent
  backgroundColor: 'blue'
}, 'png', 'image_download', 600, 500);
```
