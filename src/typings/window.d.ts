/**
 * window.d.ts
 */

interface Window {
  ActiveXObject: any;
  navigator: any;
  webkitURL: any;
  imagePicker: any;
  plugins: any;
  DocumentTouch: any;
  resolveLocalFileSystemURL: any;
  requestIdleCallback: any;
  external: any;
}

interface HTMLElement {
  createTextRange: () => any;
}

declare let require: any;

declare let window: Window;

declare let DocumentTouch: Window.DocumentTouch;

declare let navigator: Window.navigator;

declare namespace NodeJS {
  interface Global {
    document: Document;
    window: Window;
    navigator: Navigator;
  }
}
