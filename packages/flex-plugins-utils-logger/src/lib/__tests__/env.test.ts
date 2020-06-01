import env from '../env';

describe('env', () => {
  const OLD_ENV = process.env;

  beforeEach(() => {
    process.env = { ...OLD_ENV };
  });

  describe('terminalPersisted', () => {
    it('should return true', () => {
      process.env.PERSIST_TERMINAL = 'true';
      expect(env.isTerminalPersisted()).toEqual(true);
    });

    it('should return false', () => {
      expect(env.isTerminalPersisted()).toEqual(false);
    });
  });

  describe('CI', () => {
    it('should return true', () => {
      process.env.CI = 'true';
      expect(env.isCI()).toEqual(true);
    });

    it('should return false', () => {
      expect(env.isCI()).toEqual(false);
    });
  });

  describe('debug', () => {
    it('should return true', () => {
      process.env.DEBUG = 'true';
      expect(env.isDebug()).toEqual(true);
    });

    it('should return with trace true', () => {
      process.env.TRACE = 'true';
      expect(env.isDebug()).toEqual(true);
    });

    it('should return false', () => {
      expect(env.isDebug()).toEqual(false);
    });
  });

  describe('trace', () => {
    it('should return true', () => {
      process.env.TRACE = 'true';
      expect(env.isTrace()).toEqual(true);
    });

    it('should return false', () => {
      expect(env.isTrace()).toEqual(false);
    });
  });

  describe('quiet', () => {
    it('should return true', () => {
      process.env.QUIET = 'true';
      expect(env.isQuiet()).toEqual(true);
    });

    it('should return false', () => {
      expect(env.isQuiet()).toEqual(false);
    });
  });
});
