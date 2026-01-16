/**
 * @jest-environment jsdom
 */

import { expect } from 'chai';

import { ExceljsHelper } from '../dist/exceljs';

describe('# test exceljs download.', function () {
  it('## downloadFile', async function () {
    const originalCreate = window.URL.createObjectURL;
    const originalRevoke = window.URL.revokeObjectURL;
    const mockCreate = jest.fn(() => 'blob:mock');
    const mockRevoke = jest.fn();
    (window.URL as any).createObjectURL = mockCreate;
    (window.URL as any).revokeObjectURL = mockRevoke;

    const workbook: any = {
      xlsx: {
        writeBuffer: async () => new Uint8Array([1, 2, 3])
      }
    };

    await ExceljsHelper.downloadFile(workbook, 'test.xlsx');
    expect(mockCreate.mock.calls.length).to.equal(1);
    expect(mockRevoke.mock.calls.length).to.equal(1);

    (window.URL as any).createObjectURL = originalCreate;
    (window.URL as any).revokeObjectURL = originalRevoke;
  });
});
