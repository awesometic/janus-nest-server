import { ICommand } from '@nestjs/cqrs';
import { Permission } from '../entities/permission.entity';
import { Department } from '../entities/department.entity';

export class CreateUserCommand implements ICommand {
  constructor(
    public readonly email: string,
    public readonly name: string,
    public readonly password: string,
    public readonly permission?: Permission,
    public readonly department?: Department,
  ) {}
}

export class UpdateUserCommand implements ICommand {
  constructor(
    public readonly email: string,
    public readonly name: string,
    public readonly password: string,
    public readonly permission?: Permission,
    public readonly department?: Department,
  ) {}
}

export class RemoveUserCommand implements ICommand {
  constructor(
    public readonly email: string,
    public readonly password: string,
  ) {}
}
