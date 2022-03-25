import { NotFoundException } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { UserRepositoryWrapper } from '../repository/user.repository';
import {
  GetUserInfoByEmailQuery,
  GetUserInfoByIdQuery,
  GetUserInfoQueryResult,
} from './get-user-info.query';

@QueryHandler(GetUserInfoByEmailQuery)
export class GetUserInfoByEmailQueryHandler
  implements IQueryHandler<GetUserInfoByEmailQuery>
{
  constructor(private readonly userRepository: UserRepositoryWrapper) {}

  async execute(
    query: GetUserInfoByEmailQuery,
  ): Promise<GetUserInfoQueryResult> {
    const { email } = query;

    const user = await this.userRepository.findOneByEmail(email);

    if (user === null) {
      throw new NotFoundException('User not found');
    }

    return {
      id: user.id,
      name: user.name,
      email: user.email,
      department: user.department.id,
      permission: user.permission.id,
      places: user.place.map((place) => place.id),
    };
  }
}

@QueryHandler(GetUserInfoByIdQuery)
export class GetUserInfoByIdQueryHandler
  implements IQueryHandler<GetUserInfoByIdQuery>
{
  constructor(private readonly userRepository: UserRepositoryWrapper) {}

  async execute(query: GetUserInfoByIdQuery): Promise<GetUserInfoQueryResult> {
    const { id } = query;

    const user = await this.userRepository.findOneById(id);

    if (user === null) {
      throw new NotFoundException('User not found');
    }

    return {
      id: user.id,
      name: user.name,
      email: user.email,
      department: user.department.id,
      permission: user.permission.id,
      places: user.place.map((place) => place.id),
    };
  }
}
