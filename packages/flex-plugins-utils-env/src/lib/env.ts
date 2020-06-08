export type Realm = 'dev' | 'stage';

/* istanbul ignore next */
export const _isNode = () => typeof process === 'object' && `${process}` === '[object process]';

/* istanbul ignore next */
const isWin32 = () => _isNode() && process.platform === 'win32';

/* istanbul ignore next */
const isCI = () => _isNode() && process.env.CI === 'true';

/**
 * Sets the environment to persist the terminal
 */
const persistTerminal = () => {
  if (_isNode()) {
    process.env.PERSIST_TERMINAL = 'true';
  }
};

/**
 * Determines if the terminal should be persisted or not
 */
const isTerminalPersisted = () => _isNode() && process.env.PERSIST_TERMINAL === 'true';

/**
 * Determines whether script should run in quiet mode
 */
const isQuiet = () => _isNode() && process.env.QUIET === 'true';

/**
 * Determines if log level should be trace level
 */
const isTrace = () => {
  if (_isNode()) {
    return process.env.TRACE === 'true';
  }

  if (window.Twilio) {
    return window.Twilio.Flex.Manager.getInstance().configuration.logLevel === 'trace';
  }

  return false;
};

/**
 * Returns true if running in debug verbose mode
 */
const isDebug = () => {
  if (isTrace()) {
    return true;
  }
  if (_isNode()) {
    return process.env.DEBUG === 'true';
  }

  if (window.Twilio) {
    return window.Twilio.Flex.Manager.getInstance().configuration.logLevel === 'debug';
  }

  return false;
};

/**
 * Returns the realm
 */
/* istanbul ignore next */
const getRealm = () => {
  if (_isNode()) {
    return process.env.REALM as Realm;
  }

  if (window.location.href.indexOf('flex.stage.twilio')) {
    return 'stage';
  }

  if (window.location.href.indexOf('flex.dev.twilio')) {
    return 'dev';
  }

  return '';
};

export default {
  isWin32,
  persistTerminal,
  isTerminalPersisted,
  isQuiet,
  isDebug,
  isTrace,
  getRealm,
  isCI,
};
