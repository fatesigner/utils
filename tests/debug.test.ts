import { expect } from 'chai';
import { Observable } from 'rxjs';
import { CreateInstrument, CreateObserver, LatencyTimeLog } from '../dist/debug';

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

    LatencyTimeLog('sync', obj, '_____time spend：[time]');

    obj.sync();
  });

  it('## LatencyTimeLog sync', function () {
    const logSpy = jest.spyOn(console, 'log').mockImplementation(() => undefined);
    const obj = {
      sync() {
        return 1;
      }
    };
    LatencyTimeLog('sync', obj, 'sync spend：[time]');
    obj.sync();
    expect(logSpy.mock.calls.length).to.equal(1);
    logSpy.mockRestore();
  });

  it('## CreateInstrument/CreateObserver', function () {
    const logSpy = jest.spyOn(console, 'log').mockImplementation(() => undefined);
    const source = new Observable<number>((observer) => {
      observer.next(1);
      observer.complete();
      return () => undefined;
    });
    const instrumented = CreateInstrument(source);
    const observer = CreateObserver<number>('demo');
    const subscription = instrumented.subscribe(observer as any);
    subscription.unsubscribe();
    expect(logSpy.mock.calls.length).to.be.greaterThan(0);
    logSpy.mockRestore();
  });
});
