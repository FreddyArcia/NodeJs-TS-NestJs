import { DataSource, DataSourceOptions } from 'typeorm';
import * as dotenv from 'dotenv';
import { join } from 'node:path';
dotenv.config({
  path: join(
    process.cwd(),
    'environments',
    `.env.${process.env.SCOPE?.trim()}`,
  ),
});
export const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  host: process.env.DATABASE_HOST,
  port: parseInt(process.env.DATABASE_PORT as string),
  username: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD as string,
  database: process.env.DATABASE_NAME,
  schema: 'security',
  entities: [join(process.cwd(), 'src', 'entities', '*.entity{.ts,.js}')],
  migrations: [
    join(process.cwd(), 'src', 'migrations', '*-migration{.ts,.js}'),
  ],
  synchronize: false,
  logging: process.env.DATABASE_LOGGING === 'true' ? true : false,
};
const AppDataSource = new DataSource(dataSourceOptions);
export default AppDataSource;
