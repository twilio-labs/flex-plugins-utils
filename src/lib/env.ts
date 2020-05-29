/* istanbul ignore next */
export const isWin32 = () => process.platform === 'win32';
export const persistTerminal = () => (process.env.PERSIST_TERMINAL = 'true');
export const isTerminalPersisted = () => process.env.PERSIST_TERMINAL === 'true';
export const isCI = () => process.env.CI === 'true';
export const isTrace = () => process.env.TRACE === 'true';
export const isDebug = () => process.env.DEBUG === 'true' || isTrace();

export default {
  isWin32,
  persistTerminal,
  isTerminalPersisted,
  isCI,
  isDebug,
  isTrace,
};
