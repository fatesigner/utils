/**
 * canvas2image.d
 */

declare namespace Canvas2Image {
  function saveAsImage(
    canvasObj: HTMLCanvasElement,
    width: number,
    height: number,
    type: string,
    fileName?: string
  ): void;
  function saveAsPNG(canvasObj: HTMLCanvasElement, width: number, height: number, fileName?: string): HTMLImageElement;
  function saveAsJPEG(canvasObj: HTMLCanvasElement, width: number, height: number, fileName?: string): HTMLImageElement;
  function saveAsGIF(canvasObj: HTMLCanvasElement, width: number, height: number, fileName?: string): HTMLImageElement;
  function saveAsBMP(canvasObj: HTMLCanvasElement, width: number, height: number, fileName?: string): HTMLImageElement;
  function convertToImage(canvasObj: HTMLCanvasElement, width: number, height: number, type: string): HTMLImageElement;
  function convertToPNG(canvasObj: HTMLCanvasElement, width: number, height: number): HTMLImageElement;
  function convertToGIF(canvasObj: HTMLCanvasElement, width: number, height: number): HTMLImageElement;
  function convertToBMP(canvasObj: HTMLCanvasElement, width: number, height: number): HTMLImageElement;
}

export default Canvas2Image;
