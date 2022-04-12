import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PlacesModule } from './places/places.module';
import { BeaconsModule } from './beacons/beacons.module';
import { EntrancesModule } from './entrances/entrances.module';
import {
  utilities as nestWinstonModuleUtilities,
  WinstonModule,
} from 'nest-winston';
import * as winston from 'winston';
import { ExceptionModule } from './exception/exception.module';
import { HealthCheckController } from './health-check/health-check.controller';
import { TerminusModule } from '@nestjs/terminus';
import { HttpModule } from '@nestjs/axios';
import { EmailModule } from './email/email.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      // There's no other configs under initial development
      envFilePath: ['.env.development.local'],
    }),
    TypeOrmModule.forRoot(),
    WinstonModule.forRoot({
      transports: [
        new winston.transports.Console({
          level: process.env.NODE_ENV === 'production' ? 'info' : 'silly',
          format: winston.format.combine(
            winston.format.timestamp(),
            nestWinstonModuleUtilities.format.nestLike('App', {
              prettyPrint: true,
            }),
          ),
        }),
      ],
    }),
    TerminusModule,
    HttpModule,
    ExceptionModule,
    UsersModule,
    PlacesModule,
    BeaconsModule,
    EntrancesModule,
    EmailModule,
    AuthModule,
  ],
  controllers: [HealthCheckController],
  providers: [],
})
export class AppModule {}
