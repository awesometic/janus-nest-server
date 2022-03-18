import { Inject, Injectable } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { DepartmentRepositoryWrapper } from '../repository/department.repository';
import {
  CreateDepartmentCommand,
  RemoveDepartmentCommand,
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

  async execute(command: CreateDepartmentCommand): Promise<any> {
    return await this.departmentRepository.createDepartment(command.name);
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

  async execute(command: RemoveDepartmentCommand): Promise<any> {
    return await this.departmentRepository.removeDepartment(command.name);
  }
}
