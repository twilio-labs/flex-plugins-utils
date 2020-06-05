/* istanbul ignore next */
const isWin32 = () => process.platform === 'win32';
const persistTerminal = () => (process.env.PERSIST_TERMINAL = 'true');
const isTerminalPersisted = () => process.env.PERSIST_TERMINAL === 'true';
const isQuiet = () => process.env.QUIET === 'true';
const isTrace = () => process.env.TRACE === 'true';
const isDebug = () => process.env.DEBUG === 'true' || isTrace();

export default {
  isWin32,
  persistTerminal,
  isTerminalPersisted,
  isQuiet,
  isDebug,
  isTrace,
};
