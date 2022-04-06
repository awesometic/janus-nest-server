import { NotFoundException } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { PermissionRepositoryWrapper } from '../repository/permission.repository';
import {
  GetPermissionInfoQuery,
  GetPermissionInfoQueryResult,
} from './get-permission-info.query';

@QueryHandler(GetPermissionInfoQuery)
export class GetPermissionInfoQueryHandler
  implements IQueryHandler<GetPermissionInfoQuery>
{
  constructor(
    private readonly permissionRepository: PermissionRepositoryWrapper,
  ) {}

  async execute(
    query: GetPermissionInfoQuery,
  ): Promise<GetPermissionInfoQueryResult> {
    const { name, departmentId } = query;

    const permission = await this.permissionRepository.findOne(
      name,
      departmentId,
    );

    if (permission === undefined) {
      throw new NotFoundException('Permission not found');
    }

    return {
      id: permission.id,
      name: permission.name,
      level: permission.level,
    };
  }
}
