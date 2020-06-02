import path from 'path';
import * as knexConfig from './src/app/database/config/knex-connection.config';

module.exports = {
  ...knexConfig,
  migrations: {
    directory: path.resolve(__dirname, 'src', 'app', 'database', 'migrations'),
  },
  seeds: {
    directory: path.resolve(__dirname, 'src', 'app', 'database', 'seeds'),
  },
};
