/* eslint-disable functional/no-this-expression */
/* eslint-disable functional/prefer-readonly-type */

import { SERVER_ERROR, StatusCodeTypes } from '../status';

export type CustomErrorInterface = {
  code?: StatusCodeTypes;
  message: string;
  info?: string;
  stack?: string;
};

// eslint-disable-next-line functional/no-class
export class CustomError extends Error {
  message = '';
  code = SERVER_ERROR;
  info?: string = '';
  stack?: string = '';

  constructor({
    code = SERVER_ERROR,
    message,
    info = '',
    stack = '',
  }: CustomErrorInterface) {
    super();
    this.code = code;
    this.message = message;
    this.info = info;
    this.stack = stack;
  }
}
