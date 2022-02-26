import { Body, Controller, Post } from '@nestjs/common';
import { CreatePermissionDto } from './dto/create-permission.dto';
import { RemovePermissionDto } from './dto/remove-permission.dto';
import { UpdatePermissionDto } from './dto/update-permission.dto';
import { PermissionsService } from './permissions.service';

@Controller('permissions')
export class PermissionsController {
  constructor(private readonly permissionsService: PermissionsService) {}

  @Post('/create')
  createPermission(@Body() createPermissionDto: CreatePermissionDto) {
    return this.permissionsService.createPermission(createPermissionDto);
  }

  @Post('/update')
  updatePermission(@Body() updatePermissionDto: UpdatePermissionDto) {
    return this.permissionsService.updatePermission(updatePermissionDto);
  }

  @Post('/remove')
  removePermission(@Body() removePermissionDto: RemovePermissionDto) {
    return this.permissionsService.removePermission(removePermissionDto);
  }
}
