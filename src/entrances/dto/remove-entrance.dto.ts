import { PartialType } from '@nestjs/mapped-types';
import { CreateEntranceDto } from './create-entrance.dto';

export class RemoveEntranceDto extends PartialType(CreateEntranceDto) {}
