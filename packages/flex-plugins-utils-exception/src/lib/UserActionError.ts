import TwilioError from './TwilioError';

export default class UserActionError extends TwilioError {
  public readonly reason: string;

  constructor(reason: string, message?: string) {
    super(message || reason);

    this.reason = reason;

    Object.setPrototypeOf(this, UserActionError.prototype);
  }
}
