import { PartialType, PickType } from '@nestjs/mapped-types';
import { CreatePermissionDto } from './create-permission.dto';

export class RemovePermissionDto extends PartialType(
  PickType(CreatePermissionDto, ['name', 'departmentId']),
) {}
