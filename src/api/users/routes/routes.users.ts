/* eslint-disable functional/no-return-void */
import { Express } from 'express';
import { findUsers } from '../find';
import { ApiContextInterface } from '../../types.api';

export function userRoutes(app: Express, context: ApiContextInterface): void {
  const base = '/users';

  app.get(`${base}`, findUsers(context));
}
