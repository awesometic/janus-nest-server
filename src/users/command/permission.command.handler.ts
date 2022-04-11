import { Inject, Injectable } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { PermissionRepositoryWrapper } from '../repository/permission.repository';
import {
  CreatePermissionCommand,
  UpdatePermissionCommand,
  RemovePermissionCommand,
  CreatePermissionCommandResult,
  UpdatePermissionCommandResult,
  RemovePermissionCommandResult,
} from './permission.command';

@Injectable()
@CommandHandler(CreatePermissionCommand)
export class CreatePermissionHandler
  implements ICommandHandler<CreatePermissionCommand>
{
  constructor(
    @Inject(PermissionRepositoryWrapper)
    private permissionRepository: PermissionRepositoryWrapper,
  ) {}

  async execute(
    command: CreatePermissionCommand,
  ): Promise<CreatePermissionCommandResult> {
    const results = await this.permissionRepository.createPermission(
      command.name,
      command.level,
      command.departmentId,
    );

    return {
      permissionId: results.id,
      name: results.name,
      level: results.level,
      departmentId: results.department.id,
    };
  }
}

@Injectable()
@CommandHandler(UpdatePermissionCommand)
export class UpdatePermissionHandler
  implements ICommandHandler<UpdatePermissionCommand>
{
  constructor(
    @Inject(PermissionRepositoryWrapper)
    private permissionRepository: PermissionRepositoryWrapper,
  ) {}

  async execute(
    command: UpdatePermissionCommand,
  ): Promise<UpdatePermissionCommandResult> {
    const results = await this.permissionRepository.updatePermission(
      command.name,
      command.level,
      command.departmentId,
    );

    return {
      permissionId: results.id,
      name: results.name,
      level: results.level,
      departmentId: results.department.id,
    };
  }
}

@Injectable()
@CommandHandler(RemovePermissionCommand)
export class RemovePermissionHandler
  implements ICommandHandler<RemovePermissionCommand>
{
  constructor(
    @Inject(PermissionRepositoryWrapper)
    private permissionRepository: PermissionRepositoryWrapper,
  ) {}

  async execute(
    command: RemovePermissionCommand,
  ): Promise<RemovePermissionCommandResult> {
    const results = await this.permissionRepository.removePermission(
      command.name,
      command.departmentId,
    );

    return {
      permissionId: results.id,
      name: results.name,
      level: results.level,
      departmentId: results.department.id,
    };
  }
}
