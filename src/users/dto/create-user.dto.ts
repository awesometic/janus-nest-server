import { Transform } from "class-transformer";
import { IsEmail, IsString, Matches, MaxLength, MinLength } from "class-validator";

export class CreateUserDto {

  @Transform(({ value }) => value.trim())
  @IsString()
  @IsEmail()
  @MaxLength(30)
  readonly email: string;

  @Transform(({ value }) => value.trim())
  @IsString()
  @MinLength(2)
  @MaxLength(30)
  readonly name: string;

  @IsString()
  @Matches(/^[a-zA-A0-9\d!@#$%^&*()]{8,30}$/)
  readonly password: string;
}
