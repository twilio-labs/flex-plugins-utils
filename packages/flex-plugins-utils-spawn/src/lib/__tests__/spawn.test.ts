import { logger } from 'flex-plugins-utils-logger';

// eslint-disable-next-line import/no-named-as-default
import spawn from '../spawn';

jest.mock('flex-plugins-utils-logger');
jest.mock('execa');

// eslint-disable-next-line @typescript-eslint/no-var-requires, @typescript-eslint/no-require-imports
const execa = require('execa');

describe('spawn', () => {
  const args = ['arg1', 'arg2'];

  beforeEach(() => {
    jest.resetAllMocks();
    jest.resetAllMocks();
  });

  it('should exit correctly', async () => {
    execa.mockResolvedValue({
      exitCode: 123,
      stdout: 'the-stdout',
      stderr: 'the-stderr',
    });

    const resp = await spawn('node', args);

    expect(execa).toHaveBeenCalledTimes(1);
    expect(execa).toHaveBeenCalledWith('node', args, expect.any(Object));
    expect(resp).toMatchObject({
      exitCode: 123,
      stdout: 'the-stdout',
      stderr: 'the-stderr',
    });
  });

  it('default values if nothing is returned', async () => {
    execa.mockResolvedValue({});

    const resp = await spawn('node', args);

    expect(execa).toHaveBeenCalledTimes(1);
    expect(execa).toHaveBeenCalledWith('node', args, expect.any(Object));
    expect(resp).toMatchObject({
      exitCode: 0,
      stdout: '',
      stderr: '',
    });
  });

  it('should log error if SIGKILL', async () => {
    execa.mockResolvedValue({ signal: 'SIGKILL' });

    await spawn('node', args);

    expect(logger.error).toHaveBeenCalledTimes(1);
  });

  it('should log error if SIGTERM', async () => {
    execa.mockResolvedValue({ signal: 'SIGTERM' });

    await spawn('node', args);

    expect(logger.warning).toHaveBeenCalledTimes(1);
  });

  it('should catch exception', async () => {
    execa.mockImplementation(() => {
      throw new Error('some-error');
    });

    const resp = await spawn('node', args);

    expect(resp).toMatchObject({
      exitCode: 1,
      stdout: '',
      stderr: 'some-error',
    });
  });

  it('stderr should be empty with no message', async () => {
    execa.mockImplementation(() => {
      throw new Error();
    });

    const resp = await spawn('node', args);

    expect(resp).toMatchObject({
      exitCode: 1,
      stdout: '',
      stderr: '',
    });
  });
});
