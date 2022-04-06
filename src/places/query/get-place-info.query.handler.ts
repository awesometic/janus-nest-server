import { NotFoundException } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { PlaceRepositoryWrapper } from '../repository/place.repository';
import {
  GetPlaceInfoQuery,
  GetPlaceInfoQueryResult,
} from './get-place-info.query';

@QueryHandler(GetPlaceInfoQuery)
export class GetPlaceInfoQueryHandler
  implements IQueryHandler<GetPlaceInfoQuery>
{
  constructor(private readonly placeRepository: PlaceRepositoryWrapper) {}

  async execute(query: GetPlaceInfoQuery): Promise<GetPlaceInfoQueryResult> {
    const { name } = query;

    const place = await this.placeRepository.findOneByName(name);

    if (place === undefined) {
      throw new NotFoundException('Place not found');
    }

    return {
      id: place.id,
      name: place.name,
      location: place.location,
    };
  }
}
