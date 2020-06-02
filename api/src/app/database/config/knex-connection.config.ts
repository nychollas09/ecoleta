import { environment } from '../../../environments/environment';

module.exports = {
  client: 'mysql',
  connection: {
    user: environment.databaseUsername,
    password: environment.databasePassword,
    host: environment.databaseHost,
    port: environment.databasePort,
    database: environment.databaseName,
    charset: 'utf8',
    timezone: 'UTC',
  },
  useNullAsDefault: true,
};
