import {
  BAD_REQUEST,
  DATA_NOT_SAVED,
  DOCUMENTS_EXISTS,
  SERVER_ERROR,
  StatusCodeTypes,
} from './types.status';

export function getErrorStatus(
  code: StatusCodeTypes = SERVER_ERROR,
): 400 | 500 {
  switch (code) {
    case BAD_REQUEST:
      return 400;

    case DATA_NOT_SAVED:
    case DOCUMENTS_EXISTS:
    case SERVER_ERROR:
    default:
      return 500;
  }
}
