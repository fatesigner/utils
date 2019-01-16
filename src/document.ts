/**
 * document DOM 操作
 */

import { ApplyBind, ForEach } from './';
import { SupportPrefix } from './style';
import { IsArray, IsFunction, IsString } from './type-check';
import { BrowserClient } from './user-agent';

function indexOfValidChars(str: string) {
  for (let i = 0, l = str.length; i < l; i++) {
    if (str[i] !== ' ' && str[i] !== '\n') {
      return i;
    }
  }
  return -1;
}

/**
 * 枚举：用于表示方向
 */
export enum Direction {
  Up = 'Up',
  Left = 'Left',
  Right = 'Right',
  Down = 'Down'
}

/**
 * 创建一个新元素
 * @param {string} innerHtml
 * @returns {Element} element
 */
export function CreateElement(innerHtml: string) {
  const element = document.createElement('div');
  element.innerHTML = innerHtml;
  return element.children[0];
}

/**
 * 删除指定的元素
 * @param {HTMLElement} element
 */
export function RemoveElement(element: HTMLElement) {
  const parentEl = element.parentNode;
  parentEl.removeChild(element);
}

/**
 * 在指定元素的子元素之前再插入一个子元素
 * @param {Node} childEl
 * @param {HTMLElement} parentEl
 */
export function PrependChild(childEl: Node, parentEl: HTMLElement) {
  if (parentEl.hasChildNodes()) {
    parentEl.insertBefore(childEl, parentEl.firstChild);
  } else {
    parentEl.appendChild(childEl);
  }
}

/**
 * 在指定的元素前面追加新元素
 * @param {HTMLElement} newEl
 * @param {HTMLElement} targetEl
 */
export function IsertBefore(newEl: HTMLElement, targetEl: HTMLElement) {
  const parentEl = targetEl.parentNode;
  if (parentEl) {
    parentEl.insertBefore(newEl, targetEl);
  }
}

/**
 * 在指定的元素后面追加新元素
 * @param {HTMLElement} newEl
 * @param {HTMLElement} targetEl
 */
export function InsertAfter(newEl: HTMLElement, targetEl: HTMLElement) {
  const parentEl = targetEl.parentNode;
  if (parentEl.lastChild === targetEl) {
    parentEl.appendChild(newEl);
  } else {
    parentEl.insertBefore(newEl, targetEl.nextSibling);
  }
}

/**
 * 判断元素是否匹配指定的选择器
 * @param element
 * @param selector
 * @returns {boolean}
 */
export function MatchesSelector(element: any, selector: string) {
  if (element.matches) {
    return element.matches(selector);
  } else if (element.matchesSelector) {
    return element.matchesSelector(selector);
  } else if (element.webkitMatchesSelector) {
    return element.webkitMatchesSelector(selector);
  } else if (element.msMatchesSelector) {
    return element.msMatchesSelector(selector);
  } else if (element.mozMatchesSelector) {
    return element.mozMatchesSelector(selector);
  } else if (element.oMatchesSelector) {
    return element.oMatchesSelector(selector);
  } else {
    const matches = (this.document || this.ownerDocument).querySelectorAll(selector);
    const i = matches.length;
    return i > -1;
  }
}

/**
 * 获得匹配选择器的第一个祖先元素，从当前元素开始沿 DOM 树向上。
 * @param {HTMLElement} el
 * @param {string} selector
 * @param {boolean} containsItsOwn
 */
export function Closest(el: any, selector: string, containsItsOwn = false) {
  if (containsItsOwn && MatchesSelector(el, selector)) {
    return el;
  }

  while (el) {
    if (MatchesSelector(el, selector)) {
      break;
    }
    el = el.parentElement;
  }
  return el;
}

/**
 * 判断指定元素是否为另一个元素的子元素
 * @param {Object} parentNode 父级元素
 * @param {HTMLElement} childNode 子元素
 * @returns {boolean} isContains 是否包含
 */
export function Contains(parentNode: HTMLElement, childNode: HTMLElement) {
  if (parentNode.contains) {
    return parentNode !== childNode && parentNode.contains(childNode);
  } else {
    return !!(parentNode.compareDocumentPosition(childNode) & 16);
  }
}

/**
 * 判断指定元素是否包含某个class。
 * @param {HTMLElement} element
 * @param {string} className
 * @returns {boolean}
 */
export function HasClass(element: HTMLElement, className: string) {
  return !!element.className.match(new RegExp('(\\s|^)' + className + '(\\s|$)'));
}

/**
 * 为元素添加class
 * @param {HTMLElement} elements
 * @param {string} className
 */
export function AddClass(elements: HTMLElement, className: string) {
  ForEach(elements, function(prev, element: any) {
    if (!HasClass(element, className)) {
      element.className += ' ' + className;
    }
    return true;
  });
}

/**
 * 为元素移除class
 * @param {Object} elements
 * @param {string} className
 */
export function RemoveClass(elements: HTMLElement, className: string) {
  ForEach(elements, function(prev, element: any) {
    if (HasClass(element, className)) {
      element.className = element.className.replace(new RegExp('(\\s|^)' + className + '(\\s|$)'), ' ');
    }
    return true;
  });
}

/**
 * 获取浏览器窗口的可视区域尺寸
 * @param {HTMLDocument} dom
 * @returns {number} 宽度
 */
export function GetViewportSize(dom: HTMLDocument): { width: number; height: number } {
  if (!dom && typeof document !== 'undefined') {
    dom = document;
  }
  return {
    width: dom.documentElement.clientWidth || dom.body.clientWidth,
    height: dom.documentElement.clientHeight || dom.body.clientHeight
  };
}

/**
 * 获取指定元素的边界（上、下、左、右）分别相对浏览器视窗边界的位置，这与原生不同，bottom和right是相对于视窗底部和右端的位置。
 * @param {HTMLElement} element
 * @returns {Object} top,lef,right,bottom,width,height
 * top：元素上边界距窗口最上面的距离
 * right：元素右边界距窗口最左边的距离
 * bottom：元素下边界距窗口最上面的距离
 * left：元素左边界距窗口最左边的距离
 * width：元素宽度
 * height：元素高度
 */
export function GetBoundingClientRect(element: HTMLElement) {
  const rect = element.getBoundingClientRect();
  return {
    width: rect.width || rect.right - rect.left,
    height: rect.height || rect.bottom - rect.top,
    top: rect.top,
    right: rect.right,
    bottom: rect.bottom,
    left: rect.left
  };
}

/**
 * 获取元素在页面上的偏移量
 * @param {Element} element 元素
 * @returns {Object} position
 */
export function GetOffsetAwayFromDocument(element: any) {
  let top = 0;
  let left = 0;
  if (element.getBoundingClientRect) {
    const rect = GetBoundingClientRect(element);
    const body = document.body;
    const docElem = document.documentElement;
    const scrollTop = pageYOffset || docElem.scrollTop || body.scrollTop;
    const scrollLeft = pageXOffset || docElem.scrollLeft || body.scrollLeft;
    const clientTop = docElem.clientTop || body.clientTop;
    const clientLeft = docElem.clientLeft || body.clientLeft;
    top = rect.top + scrollTop - clientTop;
    left = rect.left + scrollLeft - clientLeft;
    return {
      // Math.round 兼容火狐浏览器
      top: Math.round(top),
      left: Math.round(left)
    };
  } else {
    while (element) {
      top += element.offsetTop;
      left += element.offsetLeft;
      element = element.offsetParent;
    }
    return {
      top,
      left
    };
  }
}

/**
 * 获取浮动元素相对于目标元素的定位布局（上、右、下、左）
 * 设置贴近目标元素最近，能完整显示浮动元素的一个位置
 * 用于为浮动元素定位在目标元素身边
 * @param {HTMLElement} targetEl 目标元素
 * @param {HTMLElement} absEl 浮动元素
 * @param {string} direction 期望相对于目标元素的方向 默认为 down
 * top、right、bottom、left
 * @returns {Object}
 * direction：up、down、right、left
 */
export function GetAbsRelativeLayout(targetEl: HTMLElement, absEl: HTMLElement, direction: Direction = Direction.Down) {
  if (!direction || [Direction.Up, Direction.Right, Direction.Down, Direction.Left].indexOf(direction) < 0) {
    direction = Direction.Down;
  }

  const res: {
    top: number;
    left: number;
    direction: Direction;
  } = {
    top: 0,
    left: 0,
    direction: Direction.Up
  };

  // 目标元素 在页面上的便偏移量
  const offsetAwayFromDocument = GetOffsetAwayFromDocument(targetEl);
  // 目标元素 相对浏览器视窗的位置
  const boundingClientRect = GetBoundingClientRect(targetEl);
  // 浏览器可视区域高宽
  const viewportOffset = GetViewportSize(document);

  boundingClientRect.bottom = viewportOffset.height - boundingClientRect.top - targetEl.offsetHeight;
  boundingClientRect.right = viewportOffset.width - boundingClientRect.left - targetEl.offsetWidth;

  // 页面文档真实高度 最小为屏幕高度
  const documentHeight =
    document.body.scrollHeight > screen.availHeight ? document.body.scrollHeight : screen.availHeight;

  if (direction === Direction.Down || direction === Direction.Up) {
    // down 的可行性
    const _isDown = offsetAwayFromDocument.top + targetEl.offsetHeight + absEl.offsetHeight <= documentHeight;
    // up 的可行性
    const _isUp = offsetAwayFromDocument.top - absEl.offsetHeight >= 0;
    if (direction === Direction.Down) {
      if (absEl.offsetHeight < boundingClientRect.bottom) {
        res.top = offsetAwayFromDocument.top + targetEl.offsetHeight;
        res.direction = Direction.Down;
      } else {
        if (absEl.offsetHeight < boundingClientRect.top) {
          res.top = offsetAwayFromDocument.top - absEl.offsetHeight;
          res.direction = Direction.Up;
        } else {
          if (_isDown) {
            res.top = offsetAwayFromDocument.top + targetEl.offsetHeight;
            res.direction = Direction.Down;
          } else if (_isUp) {
            res.top = offsetAwayFromDocument.top - absEl.offsetHeight;
            res.direction = Direction.Up;
          } else {
            res.top = offsetAwayFromDocument.top + targetEl.offsetHeight;
            res.direction = Direction.Down;
          }
        }
      }
    } else {
      if (absEl.offsetHeight < boundingClientRect.top) {
        res.top = offsetAwayFromDocument.top - absEl.offsetHeight;
        res.direction = Direction.Up;
      } else {
        if (absEl.offsetHeight < boundingClientRect.bottom) {
          res.top = offsetAwayFromDocument.top + targetEl.offsetHeight;
          res.direction = Direction.Down;
        } else {
          if (_isUp) {
            res.top = offsetAwayFromDocument.top - absEl.offsetHeight;
            res.direction = Direction.Up;
          } else if (_isDown) {
            res.top = offsetAwayFromDocument.top + targetEl.offsetHeight;
            res.direction = Direction.Down;
          } else {
            res.top = offsetAwayFromDocument.top - absEl.offsetHeight;
            res.direction = Direction.Up;
          }
        }
      }
    }
    if (offsetAwayFromDocument.left + (absEl.offsetWidth + targetEl.offsetWidth) / 2 > viewportOffset.width) {
      res.left = viewportOffset.width - absEl.offsetWidth;
    } else {
      res.left = offsetAwayFromDocument.left - (absEl.offsetWidth - targetEl.offsetWidth) / 2;
    }
  }
  if (direction === Direction.Right || direction === Direction.Left) {
    // right 的可行性
    const _isDown = offsetAwayFromDocument.left + targetEl.offsetWidth + absEl.offsetWidth <= documentHeight;
    // left 的可行性
    const _isUp = offsetAwayFromDocument.left - absEl.offsetWidth >= 0;
    if (direction === Direction.Right) {
      if (absEl.offsetWidth < boundingClientRect.bottom) {
        res.left = offsetAwayFromDocument.left + targetEl.offsetWidth;
        res.direction = Direction.Right;
      } else {
        if (absEl.offsetWidth < boundingClientRect.left) {
          res.left = offsetAwayFromDocument.left - absEl.offsetWidth;
          res.direction = Direction.Left;
        } else {
          if (_isDown) {
            res.left = offsetAwayFromDocument.left + targetEl.offsetWidth;
            res.direction = Direction.Right;
          } else if (_isUp) {
            res.left = offsetAwayFromDocument.top - absEl.offsetWidth;
            res.direction = Direction.Left;
          } else {
            res.left = offsetAwayFromDocument.top + targetEl.offsetWidth;
            res.direction = Direction.Right;
          }
        }
      }
    } else {
      if (absEl.offsetWidth < boundingClientRect.left) {
        res.left = offsetAwayFromDocument.left - absEl.offsetWidth;
        res.direction = Direction.Left;
      } else {
        if (absEl.offsetWidth < boundingClientRect.bottom) {
          res.left = offsetAwayFromDocument.left + targetEl.offsetWidth;
          res.direction = Direction.Right;
        } else {
          if (_isUp) {
            res.left = offsetAwayFromDocument.left - absEl.offsetWidth;
            res.direction = Direction.Left;
          } else if (_isDown) {
            res.left = offsetAwayFromDocument.left + targetEl.offsetWidth;
            res.direction = Direction.Right;
          } else {
            res.left = offsetAwayFromDocument.left - absEl.offsetWidth;
            res.direction = Direction.Left;
          }
        }
      }
    }
    if (offsetAwayFromDocument.top + (absEl.offsetHeight + targetEl.offsetHeight) / 2 > viewportOffset.height) {
      res.top = viewportOffset.width - absEl.offsetHeight;
    } else {
      res.top = offsetAwayFromDocument.top - (absEl.offsetHeight - targetEl.offsetHeight) / 2;
    }
  }

  return res;
}

/**
 * 获取浏览器窗口水平滚动条的位置
 * @param {Document} dom document
 * @returns {number} left
 */
export function GetScrollLeft(dom: any) {
  if (!dom) {
    dom = document;
  }
  return dom.documentElement.scrollLeft || dom.body.scrollLeft;
}

/**
 * 获取浏览器窗口垂直滚动条的位置
 * @param {Document} dom document
 * @returns {number} top
 */
export function GetScrollTop(dom: HTMLDocument) {
  if (!dom) {
    dom = document;
  }
  return dom.documentElement.scrollTop || dom.body.scrollTop;
}

/**
 * 将容器竖直滚动到指定位置
 * @param container 容器元素
 * @param distance 滚动距离
 * @param duration 间隔时间，默认为 0，即无动画效果
 * @returns {Promise}
 */
export function ScrollYTo(container: HTMLElement, distance: number, duration = 0): Promise<void> {
  const initialY = container.scrollTop;
  const y = initialY + distance;
  const baseY = (initialY + y) * 0.5;
  const difference = initialY - baseY;
  const startTime = performance.now();

  return new Promise(resolve => {
    function step() {
      let normalizedTime = (performance.now() - startTime) / duration;
      if (normalizedTime > 1) {
        normalizedTime = 1;
      }

      container.scrollTo(0, baseY + difference * Math.cos(normalizedTime * Math.PI));
      if (normalizedTime < 1) {
        requestAnimationFrame(step);
      } else {
        resolve();
      }
    }

    requestAnimationFrame(step);
  });
}

/**
 *  将容器滚动到顶部
 * @param container
 * @param duration
 * @returns {Promise}
 * @constructor
 */
export function ScrollToTop(container: HTMLElement, duration: number) {
  return ScrollYTo(container, 0, duration);
}

/**
 * 将容器滚动到底部
 * @param container
 * @param duration
 * @returns {Promise}
 * @constructor
 */
export function ScrollToBottom(container: HTMLElement, duration: number) {
  const top = container.scrollHeight;
  return ScrollYTo(container, top, duration);
}

/**
 * 将指定的链接和标题加入到收藏夹
 * @param {string} url 链接
 * @param {string} title 标题
 */
export function AddToCollectionSites(url: string, title: string): Promise<void> {
  return new Promise((resolve, reject) => {
    try {
      (external as any).addFavorite(url, title);
    } catch (e) {
      try {
        this.sidebar.addPanel(title, url, '');
        resolve();
      } catch (e) {
        reject(new Error('抱歉，您所使用的浏览器无法完成此操作。\n\n加入收藏失败，请使用Ctrl+D进行添加'));
      }
    }
  });
}

/**
 * 模拟a标签打开新窗口，避免被浏览器阻止
 * @param {string} link
 * @constructor
 */
export function OpenNewWindow(link: string) {
  const $a = document.createElement('a');
  $a.setAttribute('href', link);
  $a.setAttribute('target', '_blank');
  if ($a.click) {
    $a.click();
  } else {
    open(link);
    // var evt = document.createEvent("MouseEvents");
    // evt.initEvent('click', true, true);
    // $a.dispatchEvent(evt);
  }
}

/**
 * 加载指定的远程脚本，新建 script 标签并添加至 head 返回 Promise
 * @param {string} src 脚本地址
 * @return {Promise}
 */
export function LoadScript(src: string): Promise<any> {
  return new Promise((resolve, reject) => {
    const s = document.createElement('script');
    s.src = src;
    s.onload = function(res) {
      resolve(res);
    };
    s.onerror = error => {
      reject(error);
    };
    document.head.appendChild(s);
  });
}

const ImageTypeReg = /\.(gif|jpg|jpeg|png|GIF|JPG|PNG)$/;

/**
 * 文件类型
 * @type {{JPG: string, PDF: string, GIF: string, PNG: string, JPEG: string}}
 */
export enum FileType {
  PNG = 'png',
  JPEG = 'jpeg',
  JPG = 'jpg',
  GIF = 'gif',
  PDF = 'pdf'
}

/**
 * 获取 input 元素的文件集合
 * @param input
 * @constructor
 */
export function GetFiles(input: HTMLInputElement): string[] | FileList {
  if (input) {
    if (input.files) {
      return input.files;
    } else if (input.value) {
      return [input.value];
    }
  }
  return [];
}

/**
 * 获取文件的路径
 * @param {File} file
 * @returns {string}
 */
export function GetPath(file: File): string {
  if (file) {
    return file.name;
  }
}

/**
 * 获取文件的 Content 大小（字节数）
 * @param {File} file
 * @returns {number}
 */
export function GetContentSize(file: File): number {
  if (file) {
    return file.size;
  }
  return 0;
}

/**
 * 获取 File 对象的文件名
 * @param {File} file 对象
 * @return {string} filename
 */
export function GetFileName(file: File): string {
  const path = GetPath(file);
  if (path) {
    const array = path.split('/');
    return array[array.length - 1];
  }
}

/**
 * 获取 File 对象的文件名，不包含拓展名
 * @param {File} file 对象
 * @return {string} filename
 */
export function GetFileNameWithoutExtention(file: File): string {
  const name = GetFileName(file);
  if (name) {
    const i = name.lastIndexOf('.');
    const s = name.substring(0, i);
    const f = s.lastIndexOf('/');
    return s.substring(f + 1, s.length);
  }
}

/**
 * 获取 File 对象的后缀名
 * @param {File} file
 * @returns {string} extname
 */
export function GetExtension(file: File): string {
  const name = GetFileName(file);
  if (name) {
    const i = name.lastIndexOf('.');
    return name.substring(i, name.length);
  }
}

/**
 * 判断 File 对象是否为图片类型
 * @param {File} file
 * @returns {boolean}
 */
export function IsImage(file: File): boolean {
  const extension = GetExtension(file);
  return ImageTypeReg.test(extension);
}

/**
 * 获取图片的尺寸
 * @param {File} file
 * @returns {Object} 图片尺寸
 */
export function GetImageSize(
  file: File
): Promise<{
  width: number;
  height: number;
}> {
  return new Promise((resolve, reject) => {
    if (file) {
      // 读取图片数据
      const reader = new FileReader();
      reader.onload = function(e: any) {
        const data = e.target.result;
        // 加载图片获取图片真实宽度和高度
        const image = new Image();
        image.onload = function() {
          resolve({
            width: image.width,
            height: image.height
          });
        };
        image.src = data;
      };
      reader.readAsDataURL(file);
    } else {
      reject(new Error('The file is empty.'));
    }
  });
}

/**
 * 加载指定图片
 * @param {string} url 图片地址
 * @return {Promise}
 */
export function LoadImage(url: string) {
  return new Promise((resolve, reject) => {
    // 加载图片获取图片真实宽度和高度
    const image = new Image();
    image.onload = function() {
      resolve({
        width: image.width,
        height: image.height
      });
    };
    image.src = url;
  });
}

/**
 * 判断 file 对象类型是否符合指定的一些拓展名类型，用于图片类型过滤
 * @param {File} file
 * @param {string} extensions 后缀名集合，用逗号隔开，如['.jpeg','png']
 * @returns {boolean}
 */
export function FilterExtensions(file: File, extensions: string) {
  const extension = GetExtension(file);
  const _extensions = extensions.split(',');
  return _extensions.some(ext => ext === extension);
}

/**
 * 给定 file 对象，返回图片的资源地址，用于选择图片后的预览。
 * @param {File | string} file
 * @returns {Promise<string>}
 */
export function GetImageSrc(file: File | string): Promise<any> {
  return new Promise((resolve, reject) => {
    let url;
    if (
      navigator.userAgent.indexOf('Chrome') > 0 ||
      navigator.userAgent.indexOf('Firefox') > 0 ||
      navigator.userAgent.indexOf('Safari') > 0
    ) {
      url = URL.createObjectURL(file);
      resolve(url);
    } else if (navigator.userAgent.indexOf('MSIE') >= 1 || navigator.userAgent.indexOf('Trident') >= 1) {
      // url = file.value;
      if (URL && URL.createObjectURL) {
        url = URL.createObjectURL(file);
        resolve(url);
      } else {
        reject(new Error('Get image src are not supported in the current browser.'));
      }
    } else {
      const reader = new FileReader();
      reader.readAsDataURL(file as File);
      reader.onload = function() {
        resolve(this.result.toString());
      };
    }
  });
}

/**
 * 重置指定的 input 元素，将其选择的文件置空
 * @param input
 * @constructor
 */
export function ClearInputFile(input: HTMLInputElement) {
  input.value = '';
  if (!/safari/i.test(navigator.userAgent)) {
    input.type = '';
    input.type = 'file';
  }
}

/**
 * 事件处理
 */

// 正则 分割空格
const reg_splitWhitespace = /\S+/g;

function getEvent(e: any) {
  return e || event;
}

function returnFalse() {
  return false;
}

/**
 * 遍历事件源节点至代理节点之间的所有节点
 * 匹配每一个事件源节点是否为绑定节点
 */
function getHandlerQueue(e: any) {
  const _this = this;
  let targetEl = e.srcElement || e.target;
  const handlerQueue = [];
  const selectors = _this.element.querySelectorAll(_this.selector);
  if (_this && _this.element && targetEl.nodeType && (!e.button || e.type !== 'click')) {
    for (; targetEl != _this.element; targetEl = targetEl.parentNode || _this.element) {
      for (let j = 0, jl = selectors.length; j < jl; j++) {
        if (selectors[j] === targetEl) {
          handlerQueue.push(targetEl);
          break;
        }
      }
    }
  }
  return handlerQueue;
}

function dispatch(e: any) {
  const _this = this;
  let res;
  const handlerQueue = getHandlerQueue.call(this, e);
  let matched;
  let i = 0;
  if (handlerQueue.length) {
    while ((matched = handlerQueue[i++])) {
      res = _this.handlerForMatched.call(matched, e, matched, _this.element);
      if (res !== undefined) {
        if ((e.result = res) === false) {
          e.preventDefault();
          e.stopPropagation();
        }
      }
    }
  } else {
    if (_this.handlerForAll) {
      res = _this.handlerForAll.call(e.srcElement || e.target, e, e.srcElement || e.target, _this.element);
      if (res !== undefined) {
        if ((e.result = res) === false) {
          e.preventDefault();
          e.stopPropagation();
        }
      }
    }
  }
}

function onHandler(e: any) {
  return dispatch.call(this, e);
}

function checkHover(e: any, target: any) {
  e = getEvent(e);
  if (e.type == 'mouseover') {
    return !Contains(target, e.relatedTarget || e.fromElement) && !((e.relatedTarget || e.fromElement) === target);
  } else {
    return !Contains(target, e.relatedTarget || e.toElement) && !((e.relatedTarget || e.toElement) === target);
  }
}

/**
 * 为指定的事件名称添加当前浏览器支持的前缀
 * @param {String} eventName
 * @return {String} eventName has prefix
 */
export function AddEventPrefix(eventName: string) {
  if (IsString(eventName)) {
    if (eventName === 'transitionend') {
      return {
        '': 'transitionend',
        '-moz-': 'transitionend',
        '-webkit-': 'webkitTransitionEnd'
      }[SupportPrefix];
    }
  }
  return eventName;
}

/**
 * 为元素移除指定的事件，基于原生的 element.removeEventListener
 * @param {Object} element 需要绑定的元素
 * @param {Object} type 需要代理的事件 一个或多个用空格分隔的事件类型
 * @param {Function} handler 事件触发的回调
 */
export function RemoveEventListener(element: any, type: string, handler: (...args: any[]) => any) {
  if (element.removeEventListener) {
    element.removeEventListener(type, handler);
  } else {
    element.detachEvent('on' + type, handler);
  }
}

/**
 * 为元素绑定指定事件，基于原生的 element.addEventListener
 * @param {Object} element 需要绑定的元素
 * @param {string} type 需要代理的事件 一个或多个用空格分隔的事件类型
 * @param {Function} handler 事件触发的回调
 * @param {Boolean} [useCapture=false] 默认为 false
 * true：Capture 方式
 * false：Bubbling 方式
 * PS:该值建议设置为 false
 */
export function AddEventListener(element: any, type: string, handler: (...args: any[]) => any, useCapture = false) {
  RemoveEventListener(element, type, handler);
  if (element.addEventListener) {
    if (type === 'input' && BrowserClient.IE) {
      element.onpropertychange = handler;
    } else {
      element.addEventListener(type, handler, useCapture);
    }
  } else {
    element.attachEvent('on' + type, function() {
      handler.call(element);
    });
  }
}

function offHandler() {
  ForEach(this, function(prev, item: any) {
    RemoveEventListener(item.element, item.type, item.handler);
    return true;
  });
}

/**
 * 事件代理
 * PS：弃用一些不支持冒泡事件的类型 如：focus、transition...
 * @param {Object} elements 需要绑定的元素
 * @param {Object} types 需要代理的事件 一个或多个用空格分隔的事件类型
 * @param {Object} selector 需要代理的节点 一个选择器字符串用于过滤器的触发事件的选择器元素的后代
 * @param {Function} handlerForMatched 匹配的节点触发 回调
 * @param {Function} [handlerForAll=null] 绑定的元素内所有的节点触发 回调
 * @param {Boolean} [one=false] 事件是否只触发一次 触发完成后 清除代理
 * @return {Function} 执行后 清除代理
 */
export function On(
  elements: any,
  types: string,
  selector: string,
  handlerForMatched?: (...args: any[]) => any,
  handlerForAll?: (...args: any[]) => any,
  one?: boolean
) {
  let typesArray = (types || '').match(reg_splitWhitespace);
  if (!typesArray) {
    typesArray = [''];
  }

  const isAgency = IsString(selector) && selector.length;

  if (!IsFunction(handlerForMatched)) {
    handlerForMatched = returnFalse;
  } else if (!IsFunction(handlerForMatched)) {
    return;
  }
  if (!IsFunction(handlerForAll)) {
    handlerForAll = undefined;
  }

  if (one) {
    const origFn = handlerForMatched;
    handlerForMatched = function(e, ...args) {
      return origFn.apply(this, args);
    };
  }
  if (!IsArray(elements)) {
    elements = [elements];
  }
  if (elements.length) {
    const handlers: any[] = [];
    ForEach(elements, function(prev, element) {
      ForEach(typesArray, function(prev2, type: any) {
        let applyHandler = handlerForMatched;
        if (isAgency) {
          applyHandler = ApplyBind(onHandler, {
            element,
            type,
            selector,
            handlerForMatched,
            handlerForAll
          });
        }
        AddEventListener(element, type, applyHandler, false);
        handlers.push({
          element,
          type,
          handler: applyHandler
        });
        return true;
      });
      return true;
    });
    return ApplyBind(offHandler, handlers);
  }
}

/**
 * 为指定的选择器绑定事件（代理模式），只触发一次，触发完成会移除该事件
 * PS：弃用一些不支持冒泡事件的类型 如：focus、transition...
 * @param {Object} elements 需要绑定的元素
 * @param {Object} types 需要代理的事件 一个或多个用空格分隔的事件类型
 * @param {Object} selector 需要代理的节点 一个选择器字符串用于过滤器的触发事件的选择器元素的后代
 * @param {Function} handlerForMatched 匹配的节点触发 回调
 * @param {Function} handlerForAll 绑定的元素内所有的节点触发 回调
 * @return {Function} 执行后 清除代理
 */
export function One(
  elements: any,
  types: string,
  selector: string,
  handlerForMatched?: (...args: any[]) => any,
  handlerForAll?: (...args: any[]) => any
) {
  return On(elements, types, selector, handlerForMatched, handlerForAll, true);
}

/**
 * 为指定的选择器绑定 hover 事件（代理模式）。
 * @param {Object} elements 需要绑定的元素
 * @param {Object} selector 需要代理的节点 一个选择器字符串用于过滤器的触发事件的选择器元素的后代
 * @param {Function} handlerIn in 鼠标移入事件
 * @param {Function} handlerOut out 鼠标移出事件
 * @return {Function} 执行后 清除代理
 */
export function Hover(
  elements: any,
  selector: string,
  handlerIn?: (...args: any[]) => any,
  handlerOut?: (...args: any[]) => any
) {
  return On(
    elements,
    'mouseover mouseout',
    selector,
    function(e) {
      if (checkHover(e, this)) {
        if (e.type === 'mouseover') {
          handlerIn.call(this, e);
        } else {
          handlerOut.call(this, e);
        }
      }
    },
    undefined,
    false
  );
}

/**
 * 为指定的元素绑定 TransitionEnd 事件。
 * @param el
 * @param fun
 * @constructor
 */
export function OnTransitionEnd(el: any, fun: (...args: any[]) => any) {
  const arr = ['msTransitionEnd', 'mozTransitionEnd', 'oTransitionEnd', 'webkitTransitionEnd', 'transitionend'];
  const handler = {
    handleEvent(event: any, ...args: any[]) {
      arr.forEach(function(eventName) {
        el.removeEventListener(eventName, handler, false);
      });
      fun.apply(el, args);
    }
  };
  arr.forEach(function(eventName) {
    el.addEventListener(eventName, handler, false);
  });
}

const IS_TOUCH =
  typeof window !== 'undefined' &&
  typeof document !== 'undefined' &&
  ('ontouchstart' in window || ((window as any).DocumentTouch && document instanceof (window as any).DocumentTouch));
