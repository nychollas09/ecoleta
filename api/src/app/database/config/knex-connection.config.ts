import { environment } from '../../../environments/environment';

module.exports = {
  client: 'mysql',
  connection: {
    user: environment.databaseUsername,
    password: environment.databasePassword,
    host: environment.databaseHost,
    port: environment.databasePort,
    database: environment.databaseName,
    connectTimeout: 90000,
    charset: 'utf8',
    timezone: 'UTC',
  },
  debug: !environment.production,
  pool: { min: 5, max: 30 },
  useNullAsDefault: true,
};
