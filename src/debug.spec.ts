/**
 * debug.spec
 */

import * as Debug from './debug';

describe('# test debug.', function () {
  it('## LatencyTimeLog', function () {
    const obj = {
      sync(): Promise<number> {
        return new Promise((resolve) => {
          setTimeout(() => {
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

    obj.sync();
  });
});
