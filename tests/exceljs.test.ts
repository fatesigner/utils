import { expect } from 'chai';

import { ExceljsHelper } from '../dist/exceljs';

describe('# test exceljs.', function () {
  it('## convertNoToLetter/convertLetterToNo', function () {
    expect(ExceljsHelper.convertNoToLetter(1)).to.equal('A');
    expect(ExceljsHelper.convertNoToLetter(26)).to.equal('Z');
    expect(ExceljsHelper.convertNoToLetter(27)).to.equal('AA');
    expect(ExceljsHelper.convertLetterToNo('A')).to.equal(1);
    expect(ExceljsHelper.convertLetterToNo('Z')).to.equal(26);
    expect(ExceljsHelper.convertLetterToNo('AA')).to.equal(27);
  });

  it('## getFitContentWidth', function () {
    const width = ExceljsHelper.getFitContentWidth('abc');
    expect(width).to.be.ok;
    expect(width).to.be.greaterThan(0);
  });

  it('## getFitContentWidth richText', function () {
    const width = ExceljsHelper.getFitContentWidth({
      richText: [{ text: 'a' }, { text: 'b' }]
    } as any);
    expect(width).to.be.ok;
    expect(width).to.be.greaterThan(0);
  });

  it('## getFitContentWidth object', function () {
    const width = ExceljsHelper.getFitContentWidth({ toString: () => 'xyz' } as any);
    expect(width).to.be.ok;
    expect(width).to.be.greaterThan(0);
  });

  it('## getFitContentWidth empty', function () {
    const width = ExceljsHelper.getFitContentWidth(undefined as any);
    expect(width).to.equal(undefined);
  });

  it('## getFitContentWidthByCell', function () {
    const cell: any = {
      isMerged: false,
      value: 'hello',
      font: { size: 10, bold: false }
    };
    const width = ExceljsHelper.getFitContentWidthByCell(cell);
    expect(width).to.be.ok;
    expect(width).to.be.greaterThan(0);
  });

  it('## getFitContentWidthByCell merged', function () {
    const cell: any = {
      isMerged: true,
      value: 'hello'
    };
    const width = ExceljsHelper.getFitContentWidthByCell(cell);
    expect(width).to.equal(undefined);
  });

  it('## getHeaders/getCellByHeader empty', function () {
    const worksheet: any = {
      getRow() {
        return {
          values: [],
          getCell() {
            return { text: '' };
          },
          eachCell() {}
        };
      }
    };
    const headers = ExceljsHelper.getHeaders(worksheet, 1);
    expect(headers).to.deep.equal([]);
    const cell = ExceljsHelper.getCellByHeader(worksheet, 1, 'name');
    expect(cell).to.equal(undefined);
  });
});
