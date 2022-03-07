import { PartialType, PickType } from '@nestjs/mapped-types';
import { CreatePlaceDto } from './create-place.dto';

export class RemovePlaceDto extends PartialType(
  PickType(CreatePlaceDto, ['name']),
) {}
