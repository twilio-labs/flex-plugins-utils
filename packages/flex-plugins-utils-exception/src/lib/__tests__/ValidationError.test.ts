import TwilioError from '../TwilioError';
import ValidationError from '../ValidationError';

describe('ValidationError', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it('should extend TwilioError', () => {
    expect(new ValidationError()).toBeInstanceOf(TwilioError);
  });

  it('should be of its instance', () => {
    expect(new ValidationError()).toBeInstanceOf(ValidationError);
  });
});
