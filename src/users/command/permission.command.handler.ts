import { Inject, Injectable } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { PermissionRepositoryWrapper } from '../repository/permission.repository';
import {
  CreatePermissionCommand,
  UpdatePermissionCommand,
  RemovePermissionCommand,
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

  async execute(command: CreatePermissionCommand): Promise<any> {
    return await this.permissionRepository.createPermission(
      command.name,
      command.level,
      command.departmentId,
    );
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

  async execute(command: UpdatePermissionCommand): Promise<any> {
    return await this.permissionRepository.updatePermission(
      command.name,
      command.level,
      command.departmentId,
    );
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

  async execute(command: RemovePermissionCommand): Promise<any> {
    return await this.permissionRepository.removePermission(
      command.name,
      command.departmentId,
    );
  }
}
