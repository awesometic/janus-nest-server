import { PartialType, PickType } from '@nestjs/mapped-types';
import { Transform } from 'class-transformer';
import {
  IsEmail,
  IsInt,
  IsOptional,
  IsString,
  Length,
  Matches,
  MinLength,
} from 'class-validator';
import { Department } from '../entities/department.entity';
import { Permission } from '../entities/permission.entity';

export class CreateUserDto {
  @Transform(({ value }) => value.trim())
  @IsString()
  @IsEmail()
  @Length(2, 64)
  readonly email: string;

  @Transform(({ value }) => value.trim())
  @IsString()
  @MinLength(2)
  @Length(2, 32)
  readonly name: string;

  @IsString()
  @Matches(/^[a-zA-A0-9\d!@#$%^&*()]{8,30}$/)
  @Length(2, 32)
  readonly password: string;

  @IsInt()
  @IsOptional()
  readonly permission?: Permission;

  @IsInt()
  @IsOptional()
  readonly department?: Department;
}

export class UpdateUserDto extends PartialType(CreateUserDto) {}

export class RemoveUserDto extends PartialType(
  PickType(CreateUserDto, ['email', 'password']),
) {}

export class SignInDto extends PartialType(
  PickType(CreateUserDto, ['email', 'password']),
) {}

export class GetProfileDto extends PartialType(
  PickType(CreateUserDto, ['email']),
) {}
