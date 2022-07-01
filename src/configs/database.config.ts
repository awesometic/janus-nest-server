export default () => ({
  port: parseInt(process.env.PORT, 10),
  database: {
    host: process.env.DB_HOST_NAME,
    port: parseInt(process.env.DB_HOST_PORT, 10),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    databaseName: process.env.DB_DATABASE_NAME,
    dbEntities: process.env.DB_ENTITIES,
    synchronize: process.env.DB_SYNCHRONIZE === 'true',
  },
});
