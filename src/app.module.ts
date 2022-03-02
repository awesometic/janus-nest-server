import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersService } from './users/users.service';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Connection } from 'typeorm';
import { PlacesModule } from './places/places.module';
import { BeaconsModule } from './beacons/beacons.module';
import { EntrancesModule } from './entrances/entrances.module';
import {
  utilities as nestWinstonModuleUtilieis,
  WinstonModule,
} from 'nest-winston';
import * as winston from 'winston';
import { APP_FILTER } from '@nestjs/core';
import { HttpExceptionFilter } from './exceptions/http.exception';

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
            nestWinstonModuleUtilieis.format.nestLike('App', {
              prettyPrint: true,
            }),
          ),
        }),
      ],
    }),
    UsersModule,
    PlacesModule,
    BeaconsModule,
    EntrancesModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
  ],
})
export class AppModule {
  constructor(private connection: Connection) {}
}
