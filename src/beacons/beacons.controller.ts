import {
  Controller,
  Post,
  Body,
  LoggerService,
  Inject,
  Get,
  Request,
} from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
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
import {
  GetAllBeaconInfoQuery,
  GetBeaconInfoQuery,
  GetBeaconInfoQueryResult,
} from './query/get-beacon-info.query';

@Controller('beacons')
export class BeaconsController {
  constructor(
    @Inject(WINSTON_MODULE_NEST_PROVIDER)
    private readonly logger: LoggerService,
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
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

  @Get()
  getBeaconInfo(@Request() req): Promise<GetBeaconInfoQueryResult> {
    const { macAddress } = req.query;

    const query = new GetBeaconInfoQuery(macAddress);

    return this.queryBus.execute(query);
  }

  @Get()
  getAllBeaconInfoByPlaceId(@Request() req): Promise<GetBeaconInfoQueryResult> {
    const { placeId } = req.query;

    const query = new GetAllBeaconInfoQuery(placeId);

    return this.queryBus.execute(query);
  }
}
