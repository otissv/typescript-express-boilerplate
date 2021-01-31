import { CustomError, CustomErrorInterface } from '../CustomError';
import { BAD_REQUEST } from '../status';

export function badRequestError(
  message = 'Bad Request.',
): CustomErrorInterface {
  const error = new CustomError({
    code: BAD_REQUEST,
    message,
  });

  return error;
}
