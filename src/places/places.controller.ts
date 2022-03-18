import { Controller, Post, Body, Inject, LoggerService } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { CreatePlaceDto, UpdatePlaceDto, RemovePlaceDto } from './dto/place.dto';
import { CreatePlaceCommand, RemovePlaceCommand, UpdatePlaceCommand } from './command/place.command';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';

@Controller('places')
export class PlacesController {
  constructor(
    @Inject(WINSTON_MODULE_NEST_PROVIDER)
    private readonly logger: LoggerService,
    private readonly commandBus: CommandBus,
  ) {}

  @Post('/create')
  create(@Body() createPlaceDto: CreatePlaceDto) {
    this.logger.debug(`Creating place ${JSON.stringify(createPlaceDto)}`);

    const { name, longitude, latitude } = createPlaceDto;
    const command = new CreatePlaceCommand(
      name,
      longitude,
      latitude,
    );

    return this.commandBus.execute(command);
  }

  @Post('/update')
  update(@Body() updatePlaceDto: UpdatePlaceDto) {
    this.logger.debug(`Updating place ${JSON.stringify(updatePlaceDto)}`);

    const { name, longitude, latitude } = updatePlaceDto;
    const command = new UpdatePlaceCommand(
      name,
      longitude,
      latitude,
    );

    this.commandBus.execute(command);

    return this.commandBus.execute(command);
  }

  @Post('/remove')
  remove(@Body() removePlaceDto: RemovePlaceDto) {
    this.logger.debug(`Removing place ${JSON.stringify(removePlaceDto)}`);

    const { name } = removePlaceDto;
    const command = new RemovePlaceCommand(
      name,
    );

    this.commandBus.execute(command);

    return this.commandBus.execute(command);
  }
}
