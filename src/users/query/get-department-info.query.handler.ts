import { NotFoundException } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { DepartmentRepositoryWrapper } from '../repository/department.repository';
import {
  GetDepartmentInfoByIdQuery,
  GetDepartmentInfoByNameQuery,
  GetDepartmentInfoQueryResult,
} from './get-department-info.query';

@QueryHandler(GetDepartmentInfoByNameQuery)
export class GetDepartmentInforByEmailQueryHandler
  implements IQueryHandler<GetDepartmentInfoByNameQuery>
{
  constructor(
    private readonly departmentRepository: DepartmentRepositoryWrapper,
  ) {}

  async execute(
    query: GetDepartmentInfoByNameQuery,
  ): Promise<GetDepartmentInfoQueryResult> {
    const { name } = query;

    const department = await this.departmentRepository.findOne(name);

    if (department === undefined) {
      throw new NotFoundException('Department not found');
    }

    return {
      id: department.id,
      name: department.name,
      users: department.user.map((user) => user.id),
      permissions: department.permission.map((permission) => permission.id),
    };
  }
}

@QueryHandler(GetDepartmentInfoByIdQuery)
export class GetDepartmentInforByIdQueryHandler
  implements IQueryHandler<GetDepartmentInfoByIdQuery>
{
  constructor(
    private readonly departmentRepository: DepartmentRepositoryWrapper,
  ) {}

  async execute(
    query: GetDepartmentInfoByIdQuery,
  ): Promise<GetDepartmentInfoQueryResult> {
    const { id } = query;

    const department = await this.departmentRepository.findOneById(id);

    if (department === undefined) {
      throw new NotFoundException('Department not found');
    }

    return {
      id: department.id,
      name: department.name,
      users: department.user.map((user) => user.id),
      permissions: department.permission.map((permission) => permission.id),
    };
  }
}
