import { Body, Controller, Inject, LoggerService, Post } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import { CreatePermissionCommand, UpdatePermissionCommand, RemovePermissionCommand } from './command/permission.command';
import { CreatePermissionDto, UpdatePermissionDto, RemovePermissionDto } from './dto/permission.dto';

@Controller('permissions')
export class PermissionsController {
  constructor(
    @Inject(WINSTON_MODULE_NEST_PROVIDER)
    private readonly logger: LoggerService,
    private readonly commandBus: CommandBus,
  ) {}

  @Post('/create')
  createPermission(@Body() createPermissionDto: CreatePermissionDto) {
    this.logger.debug(
      `Creating permission ${JSON.stringify(createPermissionDto)}`,
    );

    const { name, level, departmentId } = createPermissionDto;
    const command = new CreatePermissionCommand(
      name,
      level,
      departmentId,
    );

    return this.commandBus.execute(command);
  }

  @Post('/update')
  updatePermission(@Body() updatePermissionDto: UpdatePermissionDto) {
    this.logger.debug(
      `Updating permission ${JSON.stringify(updatePermissionDto)}`,
    );

    const { name, level, departmentId } = updatePermissionDto;
    const command = new UpdatePermissionCommand(
      name,
      level,
      departmentId,
    );

    return this.commandBus.execute(command);
  }

  @Post('/remove')
  removePermission(@Body() removePermissionDto: RemovePermissionDto) {
    this.logger.debug(
      `Removing permission ${JSON.stringify(removePermissionDto)}`,
    );

    const { name, departmentId } = removePermissionDto;
    const command = new RemovePermissionCommand(
      name,
      departmentId,
    );

    return this.commandBus.execute(command);
  }
}
