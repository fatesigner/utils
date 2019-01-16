/*
 * date.spec
 */

import * as Date_ from './date';

test('test date DateFormat.', function() {
  const dateStr = '2012-12-12 12:12:12';
  const date = new Date(dateStr);
  const dateStr2 = Date_.DateFormat(date);
  expect(dateStr2).toBe(dateStr);
});

test('test date GetTimeAgo.', function() {
  const currentTime = new Date('2012-12-12 01:12:12');
  expect(Date_.GetTimeAgo(new Date('2012-12-12 00:12:13'), currentTime)).toBe('00:12');
  expect(Date_.GetTimeAgo(new Date('2012-12-11 23:42:13'), currentTime)).toBe('昨天 23:42');
  expect(Date_.GetTimeAgo(new Date('2012-12-11 01:12:12'), currentTime)).toBe('昨天 01:12');
  expect(Date_.GetTimeAgo(new Date('2012-12-11 01:11:11'), currentTime)).toBe('昨天 01:11');
  expect(Date_.GetTimeAgo(new Date('2012-12-11 00:00:23'), currentTime)).toBe('昨天 00:00');
  expect(Date_.GetTimeAgo(new Date('2012-12-10 23:59:59'), currentTime)).toBe('前天 23:59');
  expect(Date_.GetTimeAgo(new Date('2012-12-10 02:03:23'), currentTime)).toBe('前天 02:03');
  expect(Date_.GetTimeAgo(new Date('2012-12-09 23:52:23'), currentTime)).toBe('周日 23:52');
  expect(Date_.GetTimeAgo(new Date('2012-12-09 01:12:12'), currentTime)).toBe('周日 01:12');
  expect(Date_.GetTimeAgo(new Date('2012-12-09 01:11:12'), currentTime)).toBe('周日 01:11');
  expect(Date_.GetTimeAgo(new Date('2012-12-08 23:41:12'), currentTime)).toBe('周六 23:41');
  expect(Date_.GetTimeAgo(new Date('2012-12-01 23:41:12'), currentTime)).toBe('12-01 23:41');
  expect(Date_.GetTimeAgo(new Date('2012-11-05 23:41:12'), currentTime)).toBe('11-05 23:41');
  expect(Date_.GetTimeAgo(new Date('2012-01-01 00:00:22'), currentTime)).toBe('01-01 00:00');
  expect(Date_.GetTimeAgo(new Date('2011-12-21 12:42:22'), currentTime)).toBe('2011-12-21 12:42');
});
