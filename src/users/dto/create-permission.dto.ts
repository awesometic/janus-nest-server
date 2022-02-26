import { Transform } from "class-transformer";
import { IsInt, IsOptional, IsString, MaxLength } from "class-validator";

export class CreatePermissionDto {

  @Transform(({ value }) => value.trim())
  @IsString()
  @MaxLength(20)
  readonly name: string;

  @IsInt()
  @IsOptional()
  readonly level: number;

  @IsInt()
  readonly departmentId: number;
}
