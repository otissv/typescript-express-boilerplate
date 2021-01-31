/* eslint-disable functional/no-return-void */
import { Response } from 'express';
import { isProduction } from 'ufunc';

import { SERVER_ERROR, getErrorStatus } from '../status';
import { CustomErrorInterface } from '../CustomError';

// eslint-disable-next-line functional/no-return-void
export function errorResponse(
  res: Response,
  error: CustomErrorInterface,
): void {
  const customError = {
    ...error,
    code: error.code || SERVER_ERROR,
    message: error.message,

    // we only add a `stack` property in non-production environments
    stack: isProduction() ? '' : error.stack || '',
    info: isProduction() ? '' : error.info || '',
  };

  console.error(error);

  res.status(getErrorStatus(error.code));
  res.json({
    error: customError,
  });
}
