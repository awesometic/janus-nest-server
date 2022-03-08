import { IsDate, IsInt } from 'class-validator';

export class CreateEntranceDto {
  @IsInt()
  readonly userId: number;

  @IsDate()
  readonly accessTime: Date;
}
