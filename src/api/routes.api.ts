/* eslint-disable functional/no-return-void */
import { Express } from 'express';

import { badRequestError } from '../errors/badRequestError';
import { errorResponse } from '../errors/errorResponse';
import { ApiContextInterface } from './types.api';
import { userRoutes } from './users';

export default function api(app: Express, context: ApiContextInterface): void {
  userRoutes(app, context);

  app.use('*', (_req, res) => {
    res
      .status(404)
      .json(
        errorResponse(
          res,
          badRequestError(
            'Server did not know how to respond to this request.',
          ),
        ),
      );
  });
}
