import { ICommand } from '@nestjs/cqrs';

export class CreateDepartmentCommand implements ICommand {
  constructor(public readonly name: string) {}
}

export class RemoveDepartmentCommand implements ICommand {
  constructor(public readonly name: string) {}
}

abstract class CommonDepartmentCommandResult {
  departmentId: number;
  name: string;
}

export type CreateDepartmentCommandResult = CommonDepartmentCommandResult;

export type RemoveDepartmentCommandResult = CommonDepartmentCommandResult;
