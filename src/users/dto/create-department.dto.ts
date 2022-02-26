import { Transform } from "class-transformer";
import { IsString, MaxLength } from "class-validator";

export class CreateDepartmentDto {

  @Transform(({ value }) => value.trim())
  @IsString()
  @MaxLength(20)
  readonly name: string;
}
