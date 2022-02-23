import { Module } from '@nestjs/common';
import { BeaconsService } from './beacons.service';
import { BeaconsController } from './beacons.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Beacon } from './entities/beacon.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Beacon]),
  ],
  controllers: [BeaconsController],
  providers: [BeaconsService]
})
export class BeaconsModule {}
