export const BAD_REQUEST = 'BAD_REQUEST';
export const DATA_NOT_SAVED = 'DATA_NOT_SAVED';
export const DOCUMENTS_EXISTS = 'DOCUMENTS_EXISTS';
export const SERVER_ERROR = 'SERVER_ERROR';

export type StatusCodeTypes =
  | string
  | typeof BAD_REQUEST
  | typeof DATA_NOT_SAVED
  | typeof DOCUMENTS_EXISTS
  | typeof SERVER_ERROR;
