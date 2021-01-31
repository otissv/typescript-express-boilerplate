import { CustomError } from './CustomError';
import { SERVER_ERROR } from '../status';

describe('CustomError', () => {
  const code = 'CUSTOM_ERROR';
  const message = 'custom message';

  it('should return with defaults', () => {
    const error = new CustomError({
      message,
    });

    expect(error.code).toBe(SERVER_ERROR);
    expect(error.message).toBe(message);
  });

  it('should return custom error', () => {
    const info = 'has info';
    const stack = 'has stack';
    const error = new CustomError({
      code,
      info,
      message,
      stack,
    });

    expect(error.code).toBe(code);
    expect(error.message).toBe(message);
    expect(error.info).toBe(info);
    expect(error.stack).toBe(stack);
  });

  it('should return with custom error code', () => {
    const error = new CustomError({
      message,
      code,
    });

    expect(error.code).toBe(code);
  });

  it('should return with info', () => {
    const info = 'has info';
    const error = new CustomError({
      message,
      code,
      info,
    });

    expect(error.info).toBe(info);
  });

  it('should return with info', () => {
    const stack = 'has stack';
    const error = new CustomError({
      message,
      code,
      stack,
    });

    expect(error.stack).toBe(stack);
  });
});
