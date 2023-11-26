import { config } from 'dotenv';
import { join } from 'path';
import { DataSource, DataSourceOptions } from 'typeorm';

config();

export const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  host: process.env.DATABASE_HOST,
  port: parseInt(process.env.DATABASE_PORT),
  username: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  entities: [join(__dirname, '../domain/**/*.entity.{js,ts}')],
  migrations: ['dist/database/migrations/*{.ts,.js}'],
  synchronize: false,
  entitySkipConstructor: true,
  logging: false,
  migrationsRun: false,
  ssl: false,
};

const dataSource = new DataSource(dataSourceOptions);

export default dataSource;
