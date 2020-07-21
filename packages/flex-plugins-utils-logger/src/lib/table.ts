import { table, TableUserConfig } from 'table';

import logger from './logger';

const config: TableUserConfig = {
  border: {
    topBody: '─',
    topJoin: '┬',
    topLeft: '┌',
    topRight: '┐',

    bottomBody: '─',
    bottomJoin: '┴',
    bottomLeft: '└',
    bottomRight: '┘',

    bodyLeft: '│',
    bodyRight: '│',
    bodyJoin: '│',

    joinBody: '─',
    joinLeft: '├',
    joinRight: '┤',
    joinJoin: '┼',
  },
};

/**
 * Checks that the matrix's rows all have the same number of entries
 *
 * @param matrix
 */
export const isRegularMatrix = (matrix: string[][]): boolean =>
  matrix && matrix.length > 0 && matrix[0].constructor === Array && matrix.every((r) => r.length === matrix[0].length);

/**
 * Prints the data in a table format with the provided headers
 *
 * @param header  the header of the table
 * @param data    the data entry to print
 */
export const printArray = (header: string[], data: string[][]): void => {
  if (!isRegularMatrix(data)) {
    logger.warning('Table rows are not all the same length; this may produce an irregular tabular view.');
  }

  if (header.length === Object.keys(data[0]).length) {
    data.unshift(header.map((h) => h.toUpperCase()));
  } else {
    logger.warning('Header length does not match data row length; printing table without header.');
  }

  logger.info(table(data, config));
};

/**
 * Prints the data in a table format with the provided headers.
 *
 * @param data    the data entry to print
 */
// eslint-disable-next-line @typescript-eslint/ban-types
export const printObjectArray = (data: object[]): void => {
  if (data.length !== 0) {
    const header = Object.keys(data[0]);
    const rows = data.map(Object.values);

    printArray(header, rows);
  }
};

export default {
  isRegularMatrix,
  printArray,
  printObjectArray,
};
