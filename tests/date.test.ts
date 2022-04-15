import { expect } from 'chai';

import { dateFormat, getTimeAgo } from '../dist/date';

describe('# test date.', function () {
  it('## dateFormat.', function () {
    const date = new Date('2012-01-06 12:12:12');
    expect(dateFormat(date)).to.equal('2012-01-06 12:12:12');
    expect(dateFormat(date, 'HH:mm:ss')).to.equal('12:12:12');
    expect(dateFormat(date, 'yyyy-MM-dd')).to.equal('2012-01-06');
    expect(dateFormat(date, 'yyyy-M-d')).to.equal('2012-1-6');
    expect(dateFormat(date, 'yyyy/M/d')).to.equal('2012/1/6');
  });
  it('## getTimeAgo.', function () {
    const currentTime = new Date('2012-12-12 01:12:12');
    expect(getTimeAgo(new Date('2012-12-12 00:12:13'), currentTime)).to.equal('00:12');
    expect(getTimeAgo(new Date('2012-12-11 23:42:13'), currentTime)).to.equal('昨天 23:42');
    expect(getTimeAgo(new Date('2012-12-11 01:12:12'), currentTime)).to.equal('昨天 01:12');
    expect(getTimeAgo(new Date('2012-12-11 01:11:11'), currentTime)).to.equal('昨天 01:11');
    expect(getTimeAgo(new Date('2012-12-11 00:00:23'), currentTime)).to.equal('昨天 00:00');
    expect(getTimeAgo(new Date('2012-12-10 23:59:59'), currentTime)).to.equal('前天 23:59');
    expect(getTimeAgo(new Date('2012-12-10 02:03:23'), currentTime)).to.equal('前天 02:03');
    expect(getTimeAgo(new Date('2012-12-09 23:52:23'), currentTime)).to.equal('周日 23:52');
    expect(getTimeAgo(new Date('2012-12-09 01:12:12'), currentTime)).to.equal('周日 01:12');
    expect(getTimeAgo(new Date('2012-12-09 01:11:12'), currentTime)).to.equal('周日 01:11');
    expect(getTimeAgo(new Date('2012-12-08 23:41:12'), currentTime)).to.equal('周六 23:41');
    expect(getTimeAgo(new Date('2012-12-01 23:41:12'), currentTime)).to.equal('12-01 23:41');
    expect(getTimeAgo(new Date('2012-11-05 23:41:12'), currentTime)).to.equal('11-05 23:41');
    expect(getTimeAgo(new Date('2012-01-01 00:00:22'), currentTime)).to.equal('01-01 00:00');
    expect(getTimeAgo(new Date('2011-12-21 12:42:22'), currentTime)).to.equal('2011-12-21 12:42');
  });
});
