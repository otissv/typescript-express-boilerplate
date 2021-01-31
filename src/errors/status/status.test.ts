import { getErrorStatus } from './getErrorStatus';
import {
  BAD_REQUEST,
  DATA_NOT_SAVED,
  DOCUMENTS_EXISTS,
  SERVER_ERROR,
} from './types.status';

describe('getErrorStatus', () => {
  it('should return default status code 500', () => {
    expect(getErrorStatus()).toBe(500);
  });

  it('should return status code 400 for bad request', () => {
    expect(getErrorStatus(BAD_REQUEST)).toBe(400);
  });

  it('should return status code 500 for data not saved', () => {
    expect(getErrorStatus(DATA_NOT_SAVED)).toBe(500);
  });

  it('should return status code 500 for document does not exit', () => {
    expect(getErrorStatus(DOCUMENTS_EXISTS)).toBe(500);
  });

  it('should return status code 500 for server error', () => {
    expect(getErrorStatus(SERVER_ERROR)).toBe(500);
  });
});
