import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as path from 'path';
import * as dotenv from 'dotenv';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { getEnvPath } from './utils/helpers';
import { TodoModule } from './modules/todo/todo.module';

dotenv.config({ path: path.join(__dirname, 'config', 'envs', `.env.${process.env.NODE_ENV}`) });

console.log('process.env.DB_USERNAME', process.env.DB_USERNAME);
console.log({ path: path.join(__dirname, 'config', 'envs', `.env.${process.env.NODE_ENV}`) });

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      // expandVariables: true,
      envFilePath: getEnvPath(path.join(__dirname, 'config', 'envs ')),
    }),
    TypeOrmModule.forRootAsync({
      useFactory: () => ({
        type: 'postgres',
        host: process.env.DB_HOST || 'localhost',
        port: Number(process.env.DB_PORT) || 5434,
        username: process.env.DB_USERNAME || 'admin2',
        password: process.env.DB_PASSWORD || 'password',
        database: process.env.DB_DATABASE || 'postgres',
        entities: [__dirname + '/**/*.entity{.js,.ts}'],
        synchronize: true,
      }),
    }),
    TodoModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
