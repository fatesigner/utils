# user-agent
用户代理字符串操作

## UserAgent
用户代理字符串

```js
import { UserAgent } from '@fatesigner/utils/user-agent';

console.log(UserAgent);

// 输出：Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.100 Mobile Safari/537.36

```

## BrowserCore
浏览器内核

```js
import { BrowserCore } from '@fatesigner/utils/user-agent';

console.log(BrowserCore);

// 输出：
{
  "Trident": false,
  "Presto": false,
  "WebKit": true,
  "Gecko": false
}
```

## BrowserClient
浏览器客户端类型，可由此判断是否为微信浏览器下。

```js
import { BrowserClient } from '@fatesigner/utils/user-agent';

console.log(BrowserClient);

{
  "360": false,
  "Safari": true,
  "Chrome": true,
  "IE": false,
  "Edge": false,
  "Firefox": false,
  "Firefox_Focus": false,
  "Chromium": false,
  "Opera": false,
  "Vivaldi": false,
  "Yandex": false,
  "Kindle": false,
  "UC": false,
  "QQBrowser": false,
  "QQ": false,
  "Baidu": false,
  "Maxthon": false,
  "Sogou": false,
  "LBBROWSER": false,
  "Explorer2345": false,
  "TheWorld": false,
  "XiaoMi": false,
  "Quark": false,
  "Qiyu": false,
  "Wechat": false,
  "Taobao": false,
  "Alipay": false,
  "Weibo": false,
  "Douban": false,
  "Suning": false,
  "iQiYi": false
}
```

## BrowserPlatform
浏览器平台

```js
import { BrowserPlatform } from '@fatesigner/utils/user-agent';

console.log(BrowserPlatform);

// 输出：
{
  "Windows": true,
  "Linux": false,
  "MacOS": false,
  "Android": false,
  "Ubuntu": false,
  "FreeBSD": false,
  "Debian": false,
  "WindowsPhone": false,
  "BlackBerry": false,
  "MeeGo": false,
  "Symbian": false,
  "IOS": false,
  "ChromeOS": false,
  "WebOS": false
}
```

## IsMobile
是否为移动端

```js
import { IsMobile } from '@fatesigner/utils/user-agent';

console.log(IsMobile);

// 输出：false
```
