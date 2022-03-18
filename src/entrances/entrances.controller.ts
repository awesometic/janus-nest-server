import { Controller, Post, Body, Inject, LoggerService } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import {
  CreateEntranceCommand,
  RemoveEntranceCommand,
} from './command/entrance.command';
import { CreateEntranceDto, RemoveEntranceDto } from './dto/entrance.dto';

@Controller('entrances')
export class EntrancesController {
  constructor(
    @Inject(WINSTON_MODULE_NEST_PROVIDER)
    private readonly logger: LoggerService,
    private readonly commandBus: CommandBus,
  ) {}

  @Post('/create')
  create(@Body() createEntranceDto: CreateEntranceDto) {
    this.logger.debug(`Creating entrance ${JSON.stringify(createEntranceDto)}`);

    const { userId, accessTime } = createEntranceDto;
    const command = new CreateEntranceCommand(userId, accessTime);

    return this.commandBus.execute(command);
  }

  @Post('/remove')
  remove(@Body() removeEntranceDto: RemoveEntranceDto) {
    this.logger.debug(`Removing entrance ${JSON.stringify(removeEntranceDto)}`);

    const { userId, accessTime } = removeEntranceDto;
    const command = new RemoveEntranceCommand(userId, accessTime);

    return this.commandBus.execute(command);
  }
}
