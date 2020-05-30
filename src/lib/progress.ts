import * as ora from 'ora';

import env from './env';

export type Callback<R> = () => Promise<R>;

interface OraOptions {
  text: string;
  isEnabled?: boolean;
}

interface Progress {
  start: () => void;
  succeed: () => void;
  fail: (text?: string) => void;
}

/**
 * Added for testing purposes
 * @param title
 * @param disabled
 */
/* istanbul ignore next */
export const _getSpinner = (text: string, disabled: boolean): Progress => {
  if (disabled) {
    return {
      start: () => {
        // no-op
      },
      succeed: () => {
        // no-op
      },
      fail: () => {
        // no-op
      },
    };
  }

  const options: OraOptions = { text };
  if (env.isDebug() || env.isTrace()) {
    options.isEnabled = false;
  }

  return ora.default(options);
};

/**
 * An {@link ora} progress wrapper
 *
 * @param title   the title to show
 * @param action  the callback to run
 * @param disabled force enable the progress
 */
export const progress = async <R>(title: string, action: Callback<R>, disabled = env.isQuiet()): Promise<R> => {
  const spinner = _getSpinner(title, disabled);

  try {
    spinner.start();
    const response = await action();
    spinner.succeed();

    return response;
  } catch (e) {
    spinner.fail(e.message);

    throw e;
  }
};

export default progress;
