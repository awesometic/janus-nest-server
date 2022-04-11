import { Inject, Injectable } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { DepartmentRepositoryWrapper } from '../repository/department.repository';
import {
  CreateDepartmentCommand,
  CreateDepartmentCommandResult,
  RemoveDepartmentCommand,
  RemoveDepartmentCommandResult,
} from './department.command';

@Injectable()
@CommandHandler(CreateDepartmentCommand)
export class CreateDepartmentHandler
  implements ICommandHandler<CreateDepartmentCommand>
{
  constructor(
    @Inject(DepartmentRepositoryWrapper)
    private departmentRepository: DepartmentRepositoryWrapper,
  ) {}

  async execute(
    command: CreateDepartmentCommand,
  ): Promise<CreateDepartmentCommandResult> {
    const results = await this.departmentRepository.createDepartment(
      command.name,
    );

    return {
      departmentId: results.id,
      name: results.name,
    };
  }
}

@Injectable()
@CommandHandler(RemoveDepartmentCommand)
export class RemoveDepartmentHandler
  implements ICommandHandler<RemoveDepartmentCommand>
{
  constructor(
    @Inject(DepartmentRepositoryWrapper)
    private departmentRepository: DepartmentRepositoryWrapper,
  ) {}

  async execute(
    command: RemoveDepartmentCommand,
  ): Promise<RemoveDepartmentCommandResult> {
    const results = await this.departmentRepository.removeDepartment(
      command.name,
    );

    return {
      departmentId: results.id,
      name: results.name,
    };
  }
}
