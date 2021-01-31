import { Request, Response } from 'express';
import { ApiContextInterface } from '../../types.api';
import { errorResponse } from '../../../errors/errorResponse';

export function findUsers(
  context: ApiContextInterface,
): (req: Request, res: Response) => Promise<void> {
  return async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.params || {};

      const users = context.database().users();

      const docs = id
        ? users.filter((item: Record<string, any>) => item.id === id)
        : users;

      // eslint-disable-next-line functional/no-expression-statement
      res.json({ data: docs });
    } catch (error) {
      errorResponse(res, error);
    }
  };
}
