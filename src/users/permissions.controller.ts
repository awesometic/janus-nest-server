import { Body, Controller, Inject, LoggerService, Post } from '@nestjs/common';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import { CreatePermissionDto } from './dto/create-permission.dto';
import { RemovePermissionDto } from './dto/remove-permission.dto';
import { UpdatePermissionDto } from './dto/update-permission.dto';
import { PermissionsService } from './permissions.service';

@Controller('permissions')
export class PermissionsController {
  constructor(
    @Inject(WINSTON_MODULE_NEST_PROVIDER)
    private readonly logger: LoggerService,
    private readonly permissionsService: PermissionsService,
  ) {}

  @Post('/create')
  createPermission(@Body() createPermissionDto: CreatePermissionDto) {
    this.logger.debug(
      `Creating permission ${JSON.stringify(createPermissionDto)}`,
    );

    return this.permissionsService.createPermission(createPermissionDto);
  }

  @Post('/update')
  updatePermission(@Body() updatePermissionDto: UpdatePermissionDto) {
    this.logger.debug(
      `Updating permission ${JSON.stringify(updatePermissionDto)}`,
    );

    return this.permissionsService.updatePermission(updatePermissionDto);
  }

  @Post('/remove')
  removePermission(@Body() removePermissionDto: RemovePermissionDto) {
    this.logger.debug(
      `Removing permission ${JSON.stringify(removePermissionDto)}`,
    );

    return this.permissionsService.removePermission(removePermissionDto);
  }
}
