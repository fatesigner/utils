import { LatencyTimeLog } from '../dist/debug';

describe('# test debug.', function () {
  it('## LatencyTimeLog', function (done) {
    const obj = {
      sync(): Promise<number> {
        return new Promise((resolve) => {
          setTimeout(() => {
            resolve(1000);
            done();
          }, 2000);
        });
      }
    };

    LatencyTimeLog(
      {
        target: obj,
        func: 'sync'
      },
      '_____time spend：[time]'
    );

    obj.sync();
  });
});
