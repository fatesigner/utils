import { expect } from 'chai';

describe('# test user-agent.', function () {
  it('## detect flags', function () {
    jest.resetModules();
    (globalThis as any).navigator = {
      userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 13_6 like Mac OS X) AppleWebKit/605.1.15 MicroMessenger'
    };
    let ua: any;
    jest.isolateModules(() => {
      ua = require('../dist/user-agent');
    });

    expect(ua.UserAgent).to.contain('Mozilla/5.0');
    expect(ua.browserClient.Wechat).to.equal(true);
    expect(ua.browserPlatform.IOS).to.equal(true);
    expect(ua.isMobile).to.equal(true);
  });
});
