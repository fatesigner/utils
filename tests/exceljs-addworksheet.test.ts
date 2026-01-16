import { expect } from 'chai';

type MockCell = {
  style?: Record<string, any>;
  font?: { size?: number; bold?: boolean };
  value?: any;
};

class MockRow {
  values: any[];
  height?: number;
  numFmt?: string;
  _cells: MockCell[] = [];

  constructor(values: any[] = []) {
    this.values = values;
  }

  eachCell(cb: (cell: MockCell, colNumber: number) => void) {
    for (let i = 1; i < this.values.length; i++) {
      const cell: MockCell = {
        style: {},
        font: { size: 10, bold: false },
        value: this.values[i],
        dataValidation: undefined,
        isMerged: false
      };
      this._cells[i - 1] = cell;
      cb(cell, i);
    }
  }

  getCell(index: number) {
    return { text: this.values[index] };
  }

  getCells() {
    return this._cells;
  }
}

class MockWorksheet {
  columns: any[] = [];
  _rows: MockRow[] = [];
  _header?: MockRow;

  addRow(rowData: Record<string, any>) {
    const values = [undefined, ...this.columns.map((col) => rowData[col.key])];
    const row = new MockRow(values);
    this._rows.push(row);
    return row;
  }

  getRow(index: number) {
    if (index === 1) {
      if (!this._header) {
        const values = [undefined, ...this.columns.map((col) => col.header)];
        this._header = new MockRow(values);
      }
      return this._header;
    }
    return this._rows[index - 2];
  }
}

class MockWorkbook {
  addWorksheet() {
    return new MockWorksheet();
  }
}

jest.mock(
  'exceljs',
  () => ({
    __esModule: true,
    default: {
      Workbook: MockWorkbook
    }
  }),
  { virtual: true }
);

import { ExceljsHelper } from '../dist/exceljs';

describe('# test exceljs addWorksheet.', function () {
  it('## addWorksheet basic flow', async function () {
    const res = await ExceljsHelper.addWorksheet('Sheet1', {
      columns: [
        {
          key: 'name',
          header: 'Name',
          format: 'text',
          autoWidth: true
        }
      ],
      data: [{ name: 'Tom' }]
    });

    expect(res.worksheet.columns.length).to.equal(1);
    expect(res.worksheet.columns[0].key).to.equal('name');
    expect(res.worksheet.getRow(1).numFmt).to.equal('@');
  });

  it('## addWorksheet options and columns', async function () {
    const eachCell = jest.fn();
    const dataValidation = { type: 'list', allowBlank: true, formulae: ['"A,B"'], operator: 'between' };

    const res = await ExceljsHelper.addWorksheet('Sheet2', {
      autoWidth: true,
      columns: [
        {
          key: 'name',
          header: 'Name',
          format: 'text',
          dataValidation,
          eachCell,
          width: 5
        }
      ],
      columnMap: (column) => ({ ...column, header: `${column.header}`.toUpperCase() }),
      data: [{ name: 'LongName' }]
    });

    const headerCell = res.worksheet.getRow(1).getCell(1);
    expect(headerCell.text).to.equal('NAME');
    expect(res.worksheet.columns[0].width).to.be.ok;
    expect(res.worksheet.columns[0].width).to.be.greaterThan(5);

    const row = (res.worksheet as any)._rows[0];
    const cells = row.getCells();
    expect(cells[0].dataValidation).to.deep.equal(dataValidation);
    expect(eachCell.mock.calls.length).to.equal(2);

    const res2 = await ExceljsHelper.addWorksheet('Sheet2-2', {
      autoWidth: true,
      columns: [
        {
          key: 'name',
          header: 'Name',
          format: 'text',
          width: 999
        }
      ],
      data: [{ name: 'x' }]
    });
    expect(res2.worksheet.columns[0].width).to.equal(999);

    const res3 = await ExceljsHelper.addWorksheet('Sheet2-3', {
      autoWidth: false,
      columns: [
        {
          key: 'name',
          header: 'Name',
          format: 'text'
        }
      ],
      data: [{ name: 'x' }]
    });
    expect(res3.worksheet.columns[0].width).to.equal(undefined);
  });

  it('## addWorksheet columnMap', async function () {
    const res = await ExceljsHelper.addWorksheet('Sheet2-4', {
      columnMap(column) {
        return {
          ...column,
          header: 'NAME2'
        };
      },
      columns: [
        {
          key: 'name',
          header: 'Name'
        }
      ],
      data: [{ name: 'Tom' }]
    });

    const headerCell = res.worksheet.getRow(1).getCell(1);
    expect(headerCell.text).to.equal('NAME2');
  });

  it('## getHeaders/getCellByHeader', async function () {
    const res = await ExceljsHelper.addWorksheet('Sheet3', {
      columns: [
        { key: 'name', header: 'Name' },
        { key: 'age', header: 'Age' }
      ],
      data: [{ name: 'Tom', age: 10 }]
    });

    const headers = ExceljsHelper.getHeaders(res.worksheet as any, 1);
    expect(headers).to.deep.equal(['Name', 'Age']);

    const cell = ExceljsHelper.getCellByHeader(res.worksheet as any, 1, 'age');
    expect(cell).to.be.ok;
  });

  it('## addWorksheet style and format', async function () {
    const res = await ExceljsHelper.addWorksheet('Sheet4', {
      formatOptions: {
        number: '0.00'
      },
      columns: [
        {
          key: 'price',
          header: 'Price',
          format: 'number',
          style: { alignment: { horizontal: 'center' } }
        }
      ],
      data: [{ price: 12.5 }]
    });

    const row = (res.worksheet as any)._rows[0];
    const cells = row.getCells();
    expect(cells[0].style).to.have.property('numFmt', '0.00');
    expect(cells[0].style).to.have.property('alignment');
  });

  it('## addWorksheet theadStyle/customRender object', async function () {
    const res = await ExceljsHelper.addWorksheet('Sheet5', {
      theadStyle: { font: { bold: true } },
      columns: [
        {
          key: 'name',
          header: 'Name',
          theadStyle: { alignment: { horizontal: 'right' } },
          customRender: () => ({ value: 'x' }) as any
        }
      ],
      data: [{ name: 'Tom' }]
    });

    const headRow = res.worksheet.getRow(1);
    expect(headRow.numFmt).to.equal('@');
  });

  it('## addWorksheet without dataValidation', async function () {
    const res = await ExceljsHelper.addWorksheet('Sheet6', {
      columns: [
        {
          key: 'name',
          header: 'Name',
          format: 'text'
        }
      ],
      data: [{ name: 'Tom' }]
    });
    const row = (res.worksheet as any)._rows[0];
    const cells = row.getCells();
    expect(cells[0].dataValidation).to.equal(undefined);
  });

  it('## addWorksheet customRender text and unknown format', async function () {
    const res = await ExceljsHelper.addWorksheet('Sheet7', {
      columns: [
        {
          key: 'name',
          header: 'Name',
          format: 'unknown' as any,
          customRender: () => 'X'
        }
      ],
      data: [{ name: 'Tom' }]
    });
    const row = (res.worksheet as any)._rows[0];
    expect(row.values[1]).to.equal('X');
    const cells = row.getCells();
    expect(cells[0].style).to.have.property('numFmt', undefined);
  });

  it('## addWorksheet defaultRowHeight', async function () {
    const res = await ExceljsHelper.addWorksheet('Sheet8', {
      worksheetOptions: {
        properties: {
          defaultRowHeight: 28
        }
      },
      columns: [
        {
          key: 'name',
          header: 'Name'
        }
      ],
      data: [{ name: 'Tom' }]
    });

    const headRow = res.worksheet.getRow(1);
    const dataRow = res.worksheet.getRow(2);
    expect(headRow.height).to.equal(28);
    expect(dataRow.height).to.equal(28);
  });

  it('## addWorksheet theadStyle and rowStyle', async function () {
    const res = await ExceljsHelper.addWorksheet('Sheet9', {
      style: {
        alignment: {
          horizontal: 'center'
        }
      },
      columns: [
        {
          key: 'name',
          header: 'Name',
          theadStyle: {
            alignment: {
              vertical: 'top'
            }
          }
        }
      ],
      data: [{ name: 'Tom' }]
    });

    const headRow: any = res.worksheet.getRow(1);
    expect(headRow.alignment.horizontal).to.equal('center');
    const headCell = headRow.getCells()[0];
    expect(headCell.style.alignment.vertical).to.equal('top');
  });
});
