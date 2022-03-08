import { Controller, Post, Body, Inject, LoggerService } from '@nestjs/common';
import { EntrancesService } from './entrances.service';
import { CreateEntranceDto } from './dto/create-entrance.dto';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import { RemoveEntranceDto } from './dto/remove-entrance.dto';

@Controller('entrances')
export class EntrancesController {
  constructor(
    @Inject(WINSTON_MODULE_NEST_PROVIDER)
    private readonly logger: LoggerService,
    private readonly entrancesService: EntrancesService,
  ) {}

  @Post('/create')
  create(@Body() createEntranceDto: CreateEntranceDto) {
    this.logger.debug(`Creating entrance ${JSON.stringify(createEntranceDto)}`);

    return this.entrancesService.create(createEntranceDto);
  }

  @Post('/remove')
  remove(@Body() removeEntranceDto: RemoveEntranceDto) {
    this.logger.debug(`Removing entrance ${JSON.stringify(removeEntranceDto)}`);

    return this.entrancesService.remove(removeEntranceDto);
  }
}
