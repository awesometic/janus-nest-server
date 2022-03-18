import { Module } from '@nestjs/common';
import { BeaconsController } from './beacons.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Beacon } from './entities/beacon.entity';
import { BeaconRepositoryWrapper } from './repository/beacon.repository';
import { CqrsModule } from '@nestjs/cqrs';
import {
  CreateBeaconHandler,
  RemoveBeaconHandler,
  UpdateBeaconHandler,
} from './command/beacon.command.handler';

@Module({
  imports: [TypeOrmModule.forFeature([Beacon]), CqrsModule],
  controllers: [BeaconsController],
  providers: [
    BeaconRepositoryWrapper,
    CreateBeaconHandler,
    UpdateBeaconHandler,
    RemoveBeaconHandler,
  ],
})
export class BeaconsModule {}
