import { PartialType, PickType } from '@nestjs/mapped-types';
import { CreateBeaconDto } from './create-beacon.dto';

export class RemoveBeaconDto extends PartialType(
  PickType(CreateBeaconDto, ['macAddress']),
) {}
