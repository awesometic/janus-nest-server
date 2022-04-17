import { AdminModule } from '@adminjs/nestjs';
import { Database, Resource } from '@adminjs/typeorm';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import AdminJS from 'adminjs';
import { validate } from 'class-validator';
import { Beacon } from 'src/beacons/entities/beacon.entity';
import { Entrance } from 'src/entrances/entities/entrance.entity';
import { Place } from 'src/places/entities/place.entity';
import { Department } from 'src/users/entities/department.entity';
import { Permission } from 'src/users/entities/permission.entity';
import { User } from 'src/users/entities/user.entity';
import { createAdminFactory } from './admin.factory';

Resource.validate = validate;
AdminJS.registerAdapter({ Database, Resource });

@Module({
  imports: [
    TypeOrmModule.forFeature([
      User,
      Department,
      Permission,
      Place,
      Entrance,
      Beacon,
    ]),
    AdminModule.createAdminAsync({
      useFactory: () => createAdminFactory,
    }),
  ],
  providers: [],
})
export class AdminJsModule {}
