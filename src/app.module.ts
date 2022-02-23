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

@Module({
  imports: [
    ConfigModule.forRoot({
      // There's no other configs under initial development
      envFilePath: ['.env.development.local'],
    }),
    TypeOrmModule.forRoot(),
    UsersModule,
    PlacesModule,
    BeaconsModule,
    EntrancesModule,
  ],
  controllers: [
    AppController,
  ],
  providers: [AppService],
})
export class AppModule {
  constructor(private connection: Connection) {}
}
