import * as _boxen from './lib/boxen';

const boxen = {
  error: _boxen.error,
  warning: _boxen.warning,
  info: _boxen.info,
  print: _boxen.print,
};

export { default as logger } from './lib/logger';
export { default as strings, multilineString, singleLineString } from './lib/strings';
export { default as table, printArray, printObjectArray } from './lib/table';
export { boxen };
