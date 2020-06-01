import TwilioError from '../TwilioError';

describe('TwilioError', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it('should be the error', () => {
    expect(new TwilioError()).toBeInstanceOf(TwilioError);
  });
});
