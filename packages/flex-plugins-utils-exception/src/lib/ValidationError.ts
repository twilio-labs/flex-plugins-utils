import TwilioError from './TwilioError';

export default class ValidationError extends TwilioError {
  constructor(msg?: string) {
    super(msg);

    Object.setPrototypeOf(this, ValidationError.prototype);
  }
}
