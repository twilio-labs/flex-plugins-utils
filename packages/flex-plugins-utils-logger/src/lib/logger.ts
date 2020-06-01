/* eslint-disable @typescript-eslint/no-explicit-any */
import { format } from 'util';

import chalk from 'chalk';
import wrapAnsi from 'wrap-ansi';

import env from './env';

type Level = 'info' | 'error' | 'warn';
type Color = 'red' | 'yellow' | 'green' | 'blue' | 'cyan';

// LogLevels
export type LogLevels = 'debug' | 'info' | 'warning' | 'error' | 'trace' | 'success';

interface LogArg {
  color?: Color;
  level: Level;
  args: string[];
}

interface LoggerOptions {
  isQuiet?: boolean;
  isDebug?: boolean;
  isTrace?: boolean;
}

// The default option for wrap-ansi
const DefaultWrapOptions = { hard: true };

/**
 * The Logger class
 */
class Logger {
  private readonly options: LoggerOptions;

  constructor(options?: LoggerOptions) {
    this.options = options || {};
  }

  /**
   * debug level log
   * @param args
   */
  public debug = (...args: any[]) => {
    if (this.isDebug()) {
      this._log({ level: 'info', args });
    }
  };

  /**
   * trace level trace
   * @param args
   */
  public trace = (...args: any[]) => {
    if (this.isTrace()) {
      this._log({ level: 'info', args });
    }
  };

  /**
   * info level log
   * @param args
   */
  public info = (...args: any[]) => {
    this._log({ level: 'info', args });
  };

  /**
   * success level log
   * @param args
   */
  public success = (...args: any[]) => {
    this._log({ level: 'info', color: 'green', args });
  };

  /**
   * error level log
   * @param args
   */
  public error = (...args: any[]) => {
    this._log({ level: 'error', color: 'red', args });
  };

  /**
   * warning level log
   * @param args
   */
  public warning = (...args: any[]) => {
    this._log({ level: 'warn', color: 'yellow', args });
  };

  /**
   * Notice log is info level with a cyan color
   * @param args
   */
  public notice = (...args: any[]) => {
    this._log({ level: 'info', color: 'cyan', args });
  };

  /**
   * Appends new line
   * @param lines the number of lines to append
   */
  public newline = (lines: number = 1) => {
    for (let i = 0; i < lines; i++) {
      this.info();
    }
  };

  /**
   * A wrapper for showing bash command information such as `npm install foo`
   * @param command the bash command
   * @param args  the remaining arguments
   */
  public installInfo = (command: string, ...args: string[]) => {
    this.info('\t', chalk.cyan(command), ...args);
  };

  /**
   * Clears the terminal either if forced is provided, or if persist_terminal env is not set
   */
  /* istanbul ignore next */
  public clearTerminal = (forced = false) => {
    if (forced || !env.isTerminalPersisted()) {
      process.stdout.write(env.isWin32() ? '\x1B[2J\x1B[0f' : '\x1B[2J\x1B[3J\x1B[H');
    }
  };

  /**
   * The internal logger method
   * @param args
   * @private
   */
  private _log = (args: LogArg) => {
    const color = args.color ? chalk[args.color] : null;
    const msg = format.apply({}, args.args as any);

    if (!this.isQuiet() || args.level === 'error') {
      // eslint-disable-next-line no-console
      console[args.level]((color && color(msg)) || msg);
    }
  };

  /**
   * Checks whether the logger is set for debug mode
   */
  private isDebug = () => {
    if ('isDebug' in this.options) {
      return this.options.isDebug;
    }

    return env.isDebug();
  };

  /**
   * Checks whether the logger is set for trace mode
   */
  private isTrace = () => {
    if ('isTrace' in this.options) {
      return this.options.isTrace;
    }

    return env.isTrace();
  };

  private isQuiet = () => {
    if ('isQuiet' in this.options) {
      return this.options.isQuiet;
    }

    return env.isQuiet();
  };
}

/**
 * Word wrapping using ANSI escape codes
 *
 * @param input     the string to wrap
 * @param columns   number of columns
 * @param options   options
 */
const wrap = (input: string, columns: number, options = DefaultWrapOptions) => {
  return wrapAnsi(input, columns, options);
};

/**
 * The default logger will use environment variables to determine behavior.
 * You can create an instance to overwrite default behavior.
 */
export const _logger = new Logger();
const { debug, info, warning, error, trace, success, newline, notice, installInfo, clearTerminal } = _logger;

export default {
  debug,
  info,
  warning,
  error,
  trace,
  success,
  newline,
  notice,
  installInfo,
  clearTerminal,
  Logger,
  wrap,
  colors: chalk,
  coloredStrings: {
    link: (str: string) => chalk.blue(str),
    headline: (str: string) => chalk.bold.green(str),
    name: (str: string) => chalk.bold.magenta(str),
    digit: (str: string) => chalk.cyan(str),
  },
};