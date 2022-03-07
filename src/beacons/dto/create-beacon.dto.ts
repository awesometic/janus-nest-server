import { Transform } from 'class-transformer';
import { IsInt, IsOptional, IsString, MaxLength } from 'class-validator';

export class CreateBeaconDto {
  @Transform(({ value }) => value.trim())
  @IsString()
  @MaxLength(17)
  readonly macAddress: string;

  @Transform(({ value }) => value.trim())
  @IsString()
  @MaxLength(32)
  readonly uuid: string;

  @Transform(({ value }) => value.trim())
  @IsString()
  @MaxLength(4)
  readonly major: string;

  @Transform(({ value }) => value.trim())
  @IsString()
  @MaxLength(4)
  readonly minor: string;

  @IsInt()
  @IsOptional()
  readonly threshold: number;

  @IsInt()
  @IsOptional()
  readonly placeId: number;
}
