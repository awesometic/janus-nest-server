import { ICommand } from '@nestjs/cqrs';

export class CreatePermissionCommand implements ICommand {
  constructor(
    public readonly name: string,
    public readonly level: number,
    public readonly departmentId: number,
  ) {}
}

export class UpdatePermissionCommand implements ICommand {
  constructor(
    public readonly name: string,
    public readonly level: number,
    public readonly departmentId: number,
  ) {}
}

export class RemovePermissionCommand implements ICommand {
  constructor(
    public readonly name: string,
    public readonly departmentId: number,
  ) {}
}
