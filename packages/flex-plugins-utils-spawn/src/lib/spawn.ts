/* eslint-disable import/no-unused-modules */

import execa from 'execa';
import { logger, singleLineString } from 'flex-plugins-utils-logger';

const DefaultOptions = { stdio: 'inherit' };
type ShellCmd = 'node' | 'yarn' | 'npm';

interface SpawnReturn {
  exitCode: number;
  stdout: string;
  stderr: string;
}

/**
 * A wrapper for spawn
 *
 * @param shellCmd  the shell command node vs yarn to use
 * @param args      the node script spawn
 * @param options   the spawn argument
 */
// eslint-disable-next-line  @typescript-eslint/ban-types
export const spawn = async (cmd: ShellCmd, args: string[], options: object = DefaultOptions): Promise<SpawnReturn> => {
  const spawnOptions = { ...{ shell: process.env.SHELL }, ...options };

  try {
    const { signal, exitCode, stdout, stderr } = await execa(cmd, args, spawnOptions);

    if (signal === 'SIGKILL') {
      logger.error(
        singleLineString(
          'The script has failed because the process exited too early.',
          'This probably means the system ran out of memory or someone called',
          '`kill -9` on the process.',
        ),
      );
    } else if (signal === 'SIGTERM') {
      logger.warning(
        singleLineString(
          'The script has failed because the process exited too early.',
          'Someone might have called `kill` or `killall`, or the system could',
          'be shutting down.',
        ),
      );
    }

    return {
      exitCode: exitCode || 0,
      stdout: stdout || '',
      stderr: stderr || '',
    };
  } catch (e) {
    return {
      exitCode: e.exitCode || 1,
      stderr: e.message || '',
      stdout: '',
    };
  }
};

export default spawn;
