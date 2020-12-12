/* eslint-disable import/no-unused-modules, @typescript-eslint/ban-types */

import execa from 'execa';
import { logger, singleLineString } from 'flex-plugins-utils-logger';

const DefaultOptions = { stdio: 'inherit' };

export interface SpawnReturn {
  exitCode: number;
  stdout: string;
  stderr: string;
}

export interface SpawnPromise<T> extends Promise<T> {
  cancel: () => void;

  kill: (signal?: NodeJS.Signals | number) => boolean;
}

/**
 * A wrapper for spawn
 *
 * @param cmd       the shell command node vs yarn to use
 * @param args      the spawn arguments
 * @param options   the spawn options
 */
// eslint-disable-next-line @typescript-eslint/promise-function-async
export const spawn = (cmd: string, args: string[], options: object = DefaultOptions): SpawnPromise<SpawnReturn> => {
  const spawnOptions = { ...{ shell: process.env.SHELL }, ...options };
  const subProcess = execa(cmd, args, spawnOptions);
  const { cancel, kill } = subProcess;

  const promise = subProcess
    .then(({ signal, exitCode, stdout, stderr }) => {
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
    })
    .catch((e) => {
      return {
        exitCode: e.exitCode || 1,
        stderr: e.message || '',
        stdout: '',
      };
    });

  return Object.assign(promise, { cancel, kill });
};

/**
 * Spawns a node
 *
 * @param args      the spawn arguments
 * @param options   the spawn options
 */
export const node = async (args: string[], options: object = DefaultOptions): Promise<SpawnReturn> =>
  spawn('node', args, options);

/**
 * Spawns an npm
 *
 * @param args      the spawn arguments
 * @param options   the spawn options
 */
export const npm = async (args: string[], options: object = DefaultOptions): Promise<SpawnReturn> =>
  spawn('npm', args, options);

/**
 * Spawns a yarn
 *
 * @param args      the spawn arguments
 * @param options   the spawn options
 */
export const yarn = async (args: string[], options: object = DefaultOptions): Promise<SpawnReturn> =>
  spawn('yarn', args, options);

export default spawn;
