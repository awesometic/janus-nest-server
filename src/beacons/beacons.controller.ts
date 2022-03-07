import { Controller, Post, Body, LoggerService, Inject } from '@nestjs/common';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import { BeaconsService } from './beacons.service';
import { CreateBeaconDto } from './dto/create-beacon.dto';
import { RemoveBeaconDto } from './dto/remove-beacon.dto';
import { UpdateBeaconDto } from './dto/update-beacon.dto';

@Controller('beacons')
export class BeaconsController {
  constructor(
    @Inject(WINSTON_MODULE_NEST_PROVIDER)
    private readonly logger: LoggerService,
    private readonly beaconsService: BeaconsService,
  ) {}

  @Post('/create')
  create(@Body() createBeaconDto: CreateBeaconDto) {
    this.logger.debug(`Creating beacon ${JSON.stringify(createBeaconDto)}`);

    return this.beaconsService.create(createBeaconDto);
  }

  @Post('/update')
  update(@Body() updateBeaconDto: UpdateBeaconDto) {
    this.logger.debug(`Updating beacon ${JSON.stringify(updateBeaconDto)}`);

    return this.beaconsService.update(updateBeaconDto);
  }

  @Post('/remove')
  remove(@Body() removeBeaconDto: RemoveBeaconDto) {
    this.logger.debug(`Removing beacon ${JSON.stringify(removeBeaconDto)}`);

    return this.beaconsService.remove(removeBeaconDto);
  }
}
