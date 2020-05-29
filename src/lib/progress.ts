import * as ora from 'ora';

import env from './env';

export type OraCallback<T, R> = (arg: T) => R;

interface OraOptions {
  text: string;
  isEnabled?: boolean;
}

/**
 * Added for testing purposes
 * @param title
 */
/* istanbul ignore next */
export const _getSpinner = (text: string) => {
  const options: OraOptions = { text };
  if (env.isDebug() || env.isTrace() || env.isQuiet()) {
    options.isEnabled = false;
  }

  return ora.default(options);
};

/**
 * Am {@link ora} progress wrapper
 *
 * @param title   the title to show
 * @param action  the callback to run
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const progress = async <R>(title: string, action: OraCallback<ora.Ora, any>): Promise<R> => {
  const spinner = _getSpinner(title);

  try {
    spinner.start();
    const response = await action(spinner);
    spinner.succeed();

    return response;
  } catch (e) {
    spinner.fail(e.message);

    throw e;
  }
};

export default progress;
