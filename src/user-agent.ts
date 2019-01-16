/**
 * userAgent
 * 用户代理分析工具
 */

let _userAgent = '';

if (typeof document !== 'undefined') {
  _userAgent = navigator.userAgent;
}

export const UserAgent = _userAgent;

/**
 * core 内核
 */
export const BrowserCore = {
  Trident:
    UserAgent.indexOf('Trident') > -1 || UserAgent.indexOf('NET CLR') > -1,
  Presto: UserAgent.indexOf('Presto') > -1,
  WebKit: UserAgent.indexOf('AppleWebKit') > -1,
  Gecko: UserAgent.indexOf('Gecko/') > -1
};

/**
 * browser 浏览器
 */
export const BrowserClient = {
  Safari: UserAgent.indexOf('Safari') > -1,
  Chrome: UserAgent.indexOf('Chrome') > -1 || UserAgent.indexOf('CriOS') > -1,
  // eslint-disable-next-line
  IE: !-[1] || (UserAgent.indexOf('MSIE') > -1 || UserAgent.indexOf('Trident') > -1),
  Edge: UserAgent.indexOf('Edge') > -1,
  Firefox: UserAgent.indexOf('Firefox') > -1 || UserAgent.indexOf('FxiOS') > -1,
  Firefox_Focus: UserAgent.indexOf('Focus') > -1,
  Chromium: UserAgent.indexOf('Chromium') > -1,
  Opera: UserAgent.indexOf('Opera') > -1 || UserAgent.indexOf('OPR') > -1,
  Vivaldi: UserAgent.indexOf('Vivaldi') > -1,
  Yandex: UserAgent.indexOf('YaBrowser') > -1,
  Kindle: UserAgent.indexOf('Kindle') > -1 || UserAgent.indexOf('Silk/') > -1,
  360: UserAgent.indexOf('360EE') > -1 || UserAgent.indexOf('360SE') > -1,
  UC: UserAgent.indexOf('UC') > -1 || UserAgent.indexOf(' UBrowser') > -1,
  QQBrowser: UserAgent.indexOf('QQBrowser') > -1,
  QQ: UserAgent.indexOf('QQ/') > -1,
  Baidu:
    UserAgent.indexOf('Baidu') > -1 || UserAgent.indexOf('BIDUBrowser') > -1,
  Maxthon: UserAgent.indexOf('Maxthon') > -1,
  Sogou: UserAgent.indexOf('MetaSr') > -1 || UserAgent.indexOf('Sogou') > -1,
  LBBROWSER: UserAgent.indexOf('LBBROWSER') > -1,
  Explorer2345: UserAgent.indexOf('2345Explorer') > -1,
  TheWorld: UserAgent.indexOf('TheWorld') > -1,
  XiaoMi: UserAgent.indexOf('MiuiBrowser') > -1,
  Quark: UserAgent.indexOf('Quark') > -1,
  Qiyu: UserAgent.indexOf('Qiyu') > -1,
  Wechat: UserAgent.indexOf('MicroMessenger') > -1,
  Taobao: UserAgent.indexOf('AliApp(TB') > -1,
  Alipay: UserAgent.indexOf('AliApp(AP') > -1,
  Weibo: UserAgent.indexOf('Weibo') > -1,
  Douban: UserAgent.indexOf('com.douban.frodo') > -1,
  Suning: UserAgent.indexOf('SNEBUY-APP') > -1,
  iQiYi: UserAgent.indexOf('IqiyiApp') > -1
};

/**
 * platform 系统或平台
 */
export const BrowserPlatform = {
  Windows: UserAgent.indexOf('Windows') > -1,
  Linux: UserAgent.indexOf('Linux') > -1 || UserAgent.indexOf('X11') > -1,
  MacOS: UserAgent.indexOf('Macintosh') > -1,
  Android: UserAgent.indexOf('Android') > -1 || UserAgent.indexOf('Adr') > -1,
  Ubuntu: UserAgent.indexOf('Ubuntu') > -1,
  FreeBSD: UserAgent.indexOf('FreeBSD') > -1,
  Debian: UserAgent.indexOf('Debian') > -1,
  WindowsPhone:
    UserAgent.indexOf('IEMobile') > -1 ||
    UserAgent.indexOf('Windows Phone') > -1,
  BlackBerry:
    UserAgent.indexOf('BlackBerry') > -1 || UserAgent.indexOf('RIM') > -1,
  MeeGo: UserAgent.indexOf('MeeGo') > -1,
  Symbian: UserAgent.indexOf('Symbian') > -1,
  IOS: UserAgent.indexOf('like Mac OS X') > -1,
  ChromeOS: UserAgent.indexOf('CrOS') > -1,
  WebOS: UserAgent.indexOf('hpwOS') > -1
};

/**
 * 是否为移动端
 */
export const IsMobile =
  (UserAgent.indexOf('Mobi') > -1 ||
    UserAgent.indexOf('iPh') > -1 ||
    UserAgent.indexOf('480') > -1) &&
  !(UserAgent.indexOf('iPad') > -1);
