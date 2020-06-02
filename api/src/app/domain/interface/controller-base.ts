import knex from 'knex';
import { Router } from 'express';

export interface ControllerBase {
  path: string;
  router: Router;
  initRoutes(): void;
}
