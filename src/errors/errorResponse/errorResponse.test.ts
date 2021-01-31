/* eslint-disable prettier/prettier */
import { errorResponse } from './errorResponse';
import { CustomError } from '../CustomError';

describe('errorResponse', () => {
  afterEach(() => {
    // eslint-disable-next-line functional/immutable-data
    process.env.NODE_ENV = 'test';
  });
  it('should call res with default error', () => {
    const res: any = {
      json: () => jest.fn(),
      status: (code: string) => code,
    };

    const resJsonSpyOn = jest.spyOn(res, 'json');
    const resStatusSpyOn = jest.spyOn(res, 'status');

    const error = new CustomError({
      message: 'my error',
    });

    errorResponse(res, error);

    expect(resJsonSpyOn).toBeCalledTimes(1);
    expect(resJsonSpyOn).toBeCalledWith({
      error: { code: 'SERVER_ERROR', info: '', message: 'my error', stack: '' },
    });

    expect(resStatusSpyOn).toBeCalledTimes(1);
    expect(resStatusSpyOn).toBeCalledWith(500);
  });

  it('should call res with customer code', () => {
    const res: any = {
      json: () => jest.fn(),
      status: (code: string) => code,
    };

    const resStatusSpyOn = jest.spyOn(res, 'status');

    const error = new CustomError({
      message: 'my error',
      code: 'BAD_REQUEST',
    });

    errorResponse(res, error);

    expect(resStatusSpyOn).toBeCalledTimes(1);
    expect(resStatusSpyOn).toBeCalledWith(400);
  });

  it('should call res with default error', () => {
    // eslint-disable-next-line functional/immutable-data
    process.env.NODE_ENV = 'production';

    const res: any = {
      json: () => jest.fn(),
      status: (code: string) => code,
    };

    const resJsonSpyOn = jest.spyOn(res, 'json');

    const error = new CustomError({
      message: 'my error',
    });

    errorResponse(res, error);

    expect(resJsonSpyOn).toBeCalledTimes(1);
    expect(resJsonSpyOn).toBeCalledWith({
      error: { code: 'SERVER_ERROR', info: '', message: 'my error', stack: '' },
    });
  });
});
