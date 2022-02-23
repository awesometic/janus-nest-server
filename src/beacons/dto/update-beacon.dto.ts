import { PartialType } from '@nestjs/mapped-types';
import { CreateBeaconDto } from './create-beacon.dto';

export class UpdateBeaconDto extends PartialType(CreateBeaconDto) {}
