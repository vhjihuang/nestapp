import { resolve } from 'path';

import { TypeOrmModuleOptions } from '@nestjs/typeorm';

/* 数据库配置 */
export const database = (): TypeOrmModuleOptions => ({
  // 以下为mysql配置
  // charset: 'utf8mb4',
  // logging: ['error'],
  // type: 'mysql',
  // host: '127.0.0.1',
  // port: 3306,
  // username: 'root',
  // password: '123456',
  // database: '3r',
  type: 'better-sqlite3',
  database: resolve(__dirname, '../../database.db'),
  synchronize: true,
  autoLoadEntities: true,
});
