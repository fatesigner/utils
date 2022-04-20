/**
 * Helper for exceljs
 */

import { merge } from 'lodash-es';
import Excel from 'exceljs/index.d';

import { UnknownType } from './types';
import { downloadFile } from './document';
import { isFunction, isObject } from './type-check';

/**
 * Default format name type for excel column
 */
export type IExceljsHelperFormatName = 'number' | 'currency' | 'date' | 'time' | 'datetime' | 'percentage' | 'fraction' | 'scientific' | 'text';

/**
 * Format options type for Excel column
 * number: 0.00
 */
export type IExceljsHelperFormatOptions<FormatName extends string = IExceljsHelperFormatName> = {
  [P in FormatName]: string;
};

/**
 * Worksheet Column options type for Excel
 */
export interface IWorksheetColumn<TModel extends UnknownType = Record<string, unknown>> extends Partial<Omit<Excel.Column, 'eachCell'>> {
  /**
   * Column format type
   *
   */
  format?: IExceljsHelperFormatName;
  /**
   * Auto width, default is fasle
   */
  autoWidth?: boolean;
  /**
   * Style for thead row
   */
  theadStyle?: Partial<Excel.Style>;
  /**
   * Set dataValidation for each cell
   */
  dataValidation?: Excel.DataValidation;
  /**
   * Custom text render
   */
  customRender?: (params: { record: TModel; text: string | number }) => string | number;
  /**
   * For each cell
   */
  eachCell?: (cell: Excel.Cell, rowNumber: number) => void;
}

/**
 * Options type of Excel
 */
export interface IExceljsHelperOptions<FormatName extends string = string> {
  /**
   * Auto width, default is fasle
   */
  autoWidth?: boolean;
  /**
   * Style for thead row
   */
  theadStyle?: Partial<Excel.Style>;
  /**
   * Style for row and cel
   */
  style?: Partial<Excel.Style>;
  /**
   * WorksheetOptions
   */
  worksheetOptions?: Partial<Excel.AddWorksheetOptions>;
  /**
   * Map for each column
   */
  columnMap?: (column: IWorksheetColumn) => IWorksheetColumn;
  /**
   * Format options
   */
  formatOptions?: Partial<IExceljsHelperFormatOptions<IExceljsHelperFormatName | FormatName>>;
}

/**
 * Options type for add worksheet
 */
export interface IWorksheetAddOptions<TModel extends Record<string, any>> extends Omit<IExceljsHelperOptions, 'columnMap' | 'formatOptions'> {
  columns: IWorksheetColumn<TModel>[];
  data: TModel[];
}

// Define default format options
const formatOptions: IExceljsHelperFormatOptions = {
  number: '0.0000;[Red]-0.0000',
  currency: '#,##0.00;[Red]-#,##0.00',
  date: 'yyyy/MM/dd',
  time: 'HH:mm:ss',
  datetime: 'yyyy/MM/dd HH:mm:ss',
  percentage: '0.00%;[Red]-0.00%',
  fraction: '# ??/??',
  scientific: '0.0000E+00',
  text: '@'
};

// Define a default options, will be merged later
const defaultOptions: IExceljsHelperOptions = {
  style: {
    alignment: {
      vertical: 'middle',
      horizontal: 'left',
      indent: 0,
      wrapText: true
    }
  },
  formatOptions
};

/**
 * Configure Exceljs default options
 */
export function configureExceljs(options: Partial<IExceljsHelperOptions>) {
  merge(defaultOptions, options);
}

// merge cel
/* function mergeCol() {
    const mergeCells = [];
    const mergeStart = 0;
    const end = 0;
  if (column?.children?.length) {
      if (!mergeStart) {
        mergeStart = index;
      }
      const start = end ? end + 1 : index;
      end = start + column.children.length - 1;
      mergeCells.push([start, end, column.header]);
      return column.children.map((x) => {
        if (!x?.width) {
          x.width = x?.header?.length < 12 ? 12 : x?.header?.length + 5;
        }
        return x;
      });
      }
      const createCellPos = function (n) {
     const ordA = 'A'.charCodeAt(0); // convert letter to unicode
     const ordZ = 'Z'.charCodeAt(0);
     const len = ordZ - ordA + 1;
     let s = '';
     while (n >= 0) {
       s = String.fromCharCode((n % len) + ordA) + s;
       n = Math.floor(n / len) - 1;
     }
     return s;
   };
   mergeCells.forEach((item) => {
     worksheet.mergeCells(`${createCellPos(item[0])}1:${createCellPos(item[1])}1`);
     worksheet.getCell(`${createCellPos(item[0])}1`).value = item[2];
     worksheet.getCell(`${createCellPos(item[0])}1`).alignment = { horizontal: 'center' };
   });
   for (let i = 0; i < mergeStart; i++) {
     worksheet.mergeCells(`${createCellPos(i)}1:${createCellPos(i)}2`);
   }
} */

/**
 * Get the actual length of the string
 * @param str
 */
function getStrLen(str: string) {
  let leng = 0;
  let charCode = -1;
  for (let i = 0, len = str.length; i < len; i++) {
    charCode = str.charCodeAt(i);
    if (charCode >= 0 && charCode <= 128) {
      leng += 1;
    } else {
      leng += 2;
    }
  }
  return leng;
}

/**
 * Set style for specified row
 * @param worksheet
 * @param row
 * @param rowNumber
 * @param options
 */
function setRowStyle<TModel extends Record<string, any>>(
  worksheet: Excel.Worksheet,
  row: Excel.Row,
  rowNumber: number,
  options: IExceljsHelperOptions & IWorksheetAddOptions<TModel>
) {
  if (!row) {
    return;
  }

  // set row height
  if (options?.worksheetOptions?.properties?.defaultRowHeight) {
    row.height = options.worksheetOptions.properties.defaultRowHeight;
  }

  // set thead row Style
  if (rowNumber === 1) {
    Object.assign(
      row,
      {
        numFmt: '@'
      },
      options.theadStyle ?? options.style
    );
  } else {
    if (options.style) {
      Object.assign(row, options.style);
    }
  }

  // set cell style
  row.eachCell(function (cell, colNumber) {
    const column: IWorksheetColumn<TModel> = options?.columns?.[colNumber - 1];
    if (rowNumber === 1) {
      if (column?.theadStyle) {
        Object.assign(cell, {
          style: merge({}, cell.style, column.theadStyle)
        });
      }
    } else {
      const format = column?.format ?? 'text';
      const numFmt = options?.formatOptions?.[format];
      Object.assign(cell, {
        style: merge(
          {},
          cell.style,
          {
            numFmt
          },
          column.style
        )
      });
      if (column?.dataValidation) {
        cell.dataValidation = column.dataValidation;
      }
    }
    // for each cell
    if (isFunction(column.eachCell)) {
      column.eachCell(cell, rowNumber);
    }
    // update column width dynamic
    const autoWidth = column?.autoWidth ?? options?.autoWidth;
    if (autoWidth) {
      const width = ExceljsHelper.getFitContentWidthByCell(cell);
      if (width) {
        if (!worksheet.columns[colNumber - 1].width || width > worksheet.columns[colNumber - 1].width) {
          worksheet.columns[colNumber - 1].width = Math.max(worksheet.columns[colNumber - 1].width ?? 0, width);
        }
      }
    }
  });
}

/**
 * Helper for Exceljs
 */
export class ExceljsHelper {
  /**
   * Get headers of worksheet in specified row
   * @param worksheet
   * @param rowNumber
   */
  static getHeaders(worksheet: Excel.Worksheet, rowNumber: number): string[] {
    const result: string[] = [];

    const row = worksheet.getRow(rowNumber);

    if (row === null || !row.values || !row.values.length) {
      return [];
    }

    for (let i: number = 1; i < row.values.length; i++) {
      const cell = row.getCell(i);
      result.push(cell.text);
    }

    return result;
  }

  /**
   * Get cell by header in specified row
   * @param worksheet
   * @param rowNumber
   * @param header
   */
  static getCellByHeader(worksheet: Excel.Worksheet, rowNumber: number, header: string): Excel.Cell {
    let result: Excel.Cell;

    const row = worksheet.getRow(rowNumber);
    const headers = ExceljsHelper.getHeaders(worksheet, rowNumber);

    row.eachCell(function (cell: Excel.Cell, colNumber: number) {
      const header_ = headers[colNumber - 1];
      if (header_?.toLowerCase()?.trim() === header?.toLowerCase()?.trim()) {
        result = cell;
      }
    });

    return result;
  }

  /**
   * Get the width of the content
   * @param value
   * @param options
   */
  static getFitContentWidth(
    value: Excel.CellValue,
    options?: {
      fontSize: number;
      fontBold?: boolean;
    }
  ): number {
    if (value) {
      let text;
      let maxWidth = 10;

      if (isObject(value)) {
        // string, number
        text = value.toString();
      } else if ((value as Excel.CellRichTextValue).richText) {
        // richText
        text = (value as Excel.CellRichTextValue).richText.reduce((text, obj) => text + obj.text.toString(), '');
      } else {
        text = value.toString();
      }

      // handle new lines
      const arr = text.split(/[\n\r]+/);

      // because of the font and bold, need increase width with ratio
      // const widthRatio = parseFloat(((options?.fontSize ?? 11) / 11).toFixed(3)) * (options?.fontBold ? 1.08 : 1);
      const widthRatio = (((options?.fontSize ?? 10) - 8) * 0.086 + 0.86) * (options?.fontBold ? 1.08 : 1);

      for (const str of arr) {
        let px = 0;
        for (let i = 0, len = str.length; i < len; i++) {
          const charCode = str.charCodeAt(i);
          if (charCode >= 0 && charCode <= 128) {
            if (charCode === 32) {
              // space
              px += 0.4;
            } else {
              px += widthRatio;
            }
          } else {
            px += 1.8 * widthRatio;
          }
        }
        maxWidth = Math.max(maxWidth, px);
      }

      return maxWidth;
    }

    return undefined;
  }

  /**
   * Get the width of the specified cell
   * @param cell
   */
  static getFitContentWidthByCell(cell: Excel.Cell): number {
    // ignore merged cells
    if (!cell.isMerged && cell.value) {
      return ExceljsHelper.getFitContentWidth(cell.value, {
        fontSize: cell?.font?.size,
        fontBold: cell?.font?.bold
      });
    }

    return undefined;
  }

  /**
   * Add a Worksheet
   * @param workbook
   * @param name
   * @param worksheetAddOptions
   */
  static async addWorksheet<TModel extends Record<string, any>>(
    name?: string,
    worksheetAddOptions?: IWorksheetAddOptions<TModel>,
    workbook?: Excel.Workbook
  ): Promise<{
    workbook: Excel.Workbook;
    worksheet: Excel.Worksheet;
  }> {
    const _excel = await import('exceljs');
    const ExcelJS = _excel.default;

    // merge options
    const options: IExceljsHelperOptions & IWorksheetAddOptions<TModel> = merge({}, defaultOptions, worksheetAddOptions);

    if (!workbook) {
      workbook = new ExcelJS.Workbook();
    }

    const worksheet = workbook.addWorksheet(name, options?.worksheetOptions);

    // map columns
    if (options?.columnMap) {
      options.columns = options?.columns?.map((column) => options.columnMap(column as any)) ?? [];
    }
    worksheet.columns =
      options?.columns?.map((column) => ({
        key: column.key,
        header: column.header || column.key,
        width: column.width
      })) ?? [];

    // repeat data
    if (options?.columns?.length) {
      options?.data?.forEach((item, index) => {
        // get rowData
        const rowData = options.columns.reduce((prev, column) => {
          const key = column.key;
          let text;
          if (column?.customRender) {
            const r = column.customRender({ record: item, text: item[key] });
            if (!isObject(r)) {
              text = r;
            }
          }
          prev[key] = text ?? item[key];
          return prev;
        }, {});

        // add row
        const row = worksheet.addRow(rowData);
        setRowStyle(worksheet, row, index + 2, options);
      });
    }

    // set thead row style
    setRowStyle(worksheet, worksheet.getRow(1), 1, options);

    return {
      worksheet,
      workbook
    };
  }

  /**
   * Download Excel file
   * @param workbook
   * @param filename
   * @param contentType
   */
  static async downloadFile(workbook: Excel.Workbook, filename?: string, contentType?: string) {
    const buffer = await workbook.xlsx.writeBuffer();
    const blob = new Blob([buffer], { type: contentType ?? 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8' });
    downloadFile(blob, filename);
  }
}
