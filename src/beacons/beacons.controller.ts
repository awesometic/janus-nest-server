import { Controller, Post, Body, LoggerService, Inject } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import {
  CreateBeaconCommand,
  UpdateBeaconCommand,
  RemoveBeaconCommand,
} from './command/beacon.command';
import {
  CreateBeaconDto,
  UpdateBeaconDto,
  RemoveBeaconDto,
} from './dto/beacon.dto';

@Controller('beacons')
export class BeaconsController {
  constructor(
    @Inject(WINSTON_MODULE_NEST_PROVIDER)
    private readonly logger: LoggerService,
    private readonly commandBus: CommandBus,
  ) {}

  @Post('/create')
  create(@Body() createBeaconDto: CreateBeaconDto) {
    this.logger.debug(`Creating beacon ${JSON.stringify(createBeaconDto)}`);

    const { macAddress, uuid, major, minor, threshold } = createBeaconDto;
    const command = new CreateBeaconCommand(
      macAddress,
      uuid,
      major,
      minor,
      threshold,
    );

    return this.commandBus.execute(command);
  }

  @Post('/update')
  update(@Body() updateBeaconDto: UpdateBeaconDto) {
    this.logger.debug(`Updating beacon ${JSON.stringify(updateBeaconDto)}`);

    const { macAddress, uuid, major, minor, threshold } = updateBeaconDto;
    const command = new UpdateBeaconCommand(
      macAddress,
      uuid,
      major,
      minor,
      threshold,
    );

    return this.commandBus.execute(command);
  }

  @Post('/remove')
  remove(@Body() removeBeaconDto: RemoveBeaconDto) {
    this.logger.debug(`Removing beacon ${JSON.stringify(removeBeaconDto)}`);

    const { macAddress } = removeBeaconDto;
    const command = new RemoveBeaconCommand(macAddress);

    return this.commandBus.execute(command);
  }
}
