import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { getEnvPath } from './utils/helpers';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      // expandVariables: true,
      envFilePath: getEnvPath(`${__dirname}/config/envs`),
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
