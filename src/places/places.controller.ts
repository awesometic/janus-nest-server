import { Controller, Post, Body, Inject, LoggerService } from '@nestjs/common';
import { PlacesService } from './places.service';
import { CreatePlaceDto } from './dto/create-place.dto';
import { UpdatePlaceDto } from './dto/update-place.dto';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import { RemovePlaceDto } from './dto/remove-place.dto';

@Controller('places')
export class PlacesController {
  constructor(
    @Inject(WINSTON_MODULE_NEST_PROVIDER)
    private readonly logger: LoggerService,
    private readonly placesService: PlacesService,
  ) {}

  @Post('/create')
  create(@Body() createPlaceDto: CreatePlaceDto) {
    this.logger.debug(`Creating place ${JSON.stringify(createPlaceDto)}`);

    return this.placesService.create(createPlaceDto);
  }

  @Post('/update')
  update(@Body() updatePlaceDto: UpdatePlaceDto) {
    this.logger.debug(`Updating place ${JSON.stringify(updatePlaceDto)}`);

    return this.placesService.update(updatePlaceDto);
  }

  @Post('/remove')
  remove(@Body() removePlaceDto: RemovePlaceDto) {
    this.logger.debug(`Removing place ${JSON.stringify(removePlaceDto)}`);

    return this.placesService.remove(removePlaceDto);
  }
}
