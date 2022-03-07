import { Transform } from 'class-transformer';
import {
  IsNumberString,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';

export class CreatePlaceDto {
  @Transform(({ value }) => value.trim())
  @IsString()
  @MaxLength(20)
  readonly name: string;

  @IsNumberString()
  @IsOptional()
  readonly longitude: number;

  @IsNumberString()
  @IsOptional()
  readonly latitude: number;
}
