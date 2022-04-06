import { NotFoundException } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { EntranceRepositoryWrapper } from '../repository/entrance.repository';
import {
  GetAllEntranceInfoQuery,
  GetAllEntranceInfoQueryResult,
  GetEntranceInfoQuery,
  GetEntranceInfoQueryResult,
} from './get-entrance-info.query';

@QueryHandler(GetEntranceInfoQuery)
export class GetEntranceInfoQueryHandler
  implements IQueryHandler<GetEntranceInfoQuery>
{
  constructor(private readonly entranceRepository: EntranceRepositoryWrapper) {}

  async execute(
    query: GetEntranceInfoQuery,
  ): Promise<GetEntranceInfoQueryResult> {
    const { id, accessTime } = query;

    const entrance = await this.entranceRepository.findOne(id, accessTime);

    if (entrance === undefined) {
      throw new NotFoundException('Entrance not found');
    }

    return {
      id: entrance.id,
      user: entrance.user,
      accessTime: entrance.accessTime,
    };
  }
}

@QueryHandler(GetAllEntranceInfoQuery)
export class GetAllEntranceInfoQueryHandler
  implements IQueryHandler<GetAllEntranceInfoQuery>
{
  constructor(private readonly entranceRepository: EntranceRepositoryWrapper) {}

  async execute(
    query: GetAllEntranceInfoQuery,
  ): Promise<GetAllEntranceInfoQueryResult> {
    const { id } = query;

    const entrances = await this.entranceRepository.findAllByUserId(id);

    if (entrances === undefined) {
      throw new NotFoundException('Entrances not found');
    }

    return {
      entranceQueryResults: entrances.map((entrance) => {
        return {
          id: entrance.id,
          user: entrance.user,
          accessTime: entrance.accessTime,
        };
      }),
    };
  }
}
