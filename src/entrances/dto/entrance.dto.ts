import { PartialType } from '@nestjs/mapped-types';
import { IsDate, IsInt } from 'class-validator';

export class CreateEntranceDto {
  @IsInt()
  readonly userId: number;

  @IsDate()
  readonly accessTime: Date;
}

export class RemoveEntranceDto extends PartialType(CreateEntranceDto) {}
