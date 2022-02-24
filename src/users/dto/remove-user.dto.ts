import { Transform } from "class-transformer";
import { IsEmail, IsString, Matches, MaxLength, MinLength } from "class-validator";

export class RemoveUserDto {

  @Transform(({ value }) => value.trim())
  @IsString()
  @IsEmail()
  @MaxLength(30)
  readonly email: string;

  @IsString()
  @Matches(/^[a-zA-A0-9\d!@#$%^&*()]{8,30}$/)
  readonly password: string;
}
