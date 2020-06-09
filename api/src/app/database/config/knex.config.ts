import knex from 'knex';
import * as knexConfig from './knex-connection.config';

export const knexConnection = knex(knexConfig);
