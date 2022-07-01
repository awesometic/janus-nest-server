import databaseConfig from './database.config';
import { DataSourceOptions } from 'typeorm';

const config = databaseConfig();

export const connectionOptions: DataSourceOptions = {
  type: 'mariadb',
  host: config.database.host,
  port: config.database.port,
  username: config.database.username,
  password: config.database.password,
  database: config.database.databaseName,
  entities: [config.database.dbEntities],
  logging: ['warn', 'error'],
  synchronize: config.database.synchronize,
};
