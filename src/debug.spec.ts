/**
 * debug.spec
 */

import * as Debug from './debug';

test('test debug LatencyTimeLog', function(done) {
  const obj = {
    sync(): Promise<number> {
      return new Promise(resolve => {
        setTimeout(x => {
          resolve(1000);
        }, 2000);
      });
    }
  };

  Debug.LatencyTimeLog(
    {
      target: obj,
      func: 'sync'
    },
    '_____time spend：[time]'
  );

  obj.sync().then(() => {
    done();
  });
});
