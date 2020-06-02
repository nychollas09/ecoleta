export const environment = {
  allowOrigins: ['http://localhost:3000'],
  apiBaseUrl: 'http://localhost:3333',
  databaseUrl: 'mysql://root:1234@localhost:3306/ecoleta',
  databaseUsername: process.env.DATABASE_USERNAME,
  databasePassword: process.env.DATABASE_PASSWORD,
  databaseHost: process.env.DATABASE_HOST,
  databasePort: process.env.DATABASE_PORT,
  databaseName: process.env.DATABASE_NAME,
};
