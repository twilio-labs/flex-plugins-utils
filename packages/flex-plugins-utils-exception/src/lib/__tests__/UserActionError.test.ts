import UserActionError from '../UserActionError';
import TwilioError from '../TwilioError';

describe('UserActionError', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it('should extend TwilioError', () => {
    expect(new UserActionError('')).toBeInstanceOf(TwilioError);
  });

  it('should be of its instance', () => {
    expect(new UserActionError('')).toBeInstanceOf(UserActionError);
  });

  it('should pass reason to message', () => {
    const err = new UserActionError('the-reason');

    expect(err.reason).toEqual('the-reason');
    expect(err.message).toEqual('the-reason');
  });

  it('should set reason and message', () => {
    const err = new UserActionError('the-reason', 'the-message');

    expect(err.reason).toEqual('the-reason');
    expect(err.message).toEqual('the-message');
  });
});
