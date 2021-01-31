import { badRequestError } from './badRequestError';

describe('badRequestError', () => {
  it('should return bad request error message', () => {
    expect(badRequestError().message).toBe('Bad Request.');
    expect(badRequestError().code).toBe('BAD_REQUEST');
  });

  it('should return custom error message', () => {
    expect(badRequestError('my error').message).toBe('my error');
  });
});
