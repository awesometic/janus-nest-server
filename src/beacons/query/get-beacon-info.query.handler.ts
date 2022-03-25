import { NotFoundException } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { Beacon } from '../entities/beacon.entity';
import { BeaconRepositoryWrapper } from '../repository/beacon.repository';
import {
  GetAllBeaconInfoQuery,
  GetAllBeaconInfoQueryResult,
  GetBeaconInfoQuery,
  GetBeaconInfoQueryResult,
} from './get-beacon-info.query';

@QueryHandler(GetBeaconInfoQuery)
export class GetBeaconInfoQueryHandler
  implements IQueryHandler<GetBeaconInfoQuery>
{
  constructor(private readonly beaconRepository: BeaconRepositoryWrapper) {}

  async execute(query: GetBeaconInfoQuery): Promise<GetBeaconInfoQueryResult> {
    const { macAddress } = query;

    const beacon = await this.beaconRepository.findOneByMacAddr(macAddress);

    if (beacon === null) {
      throw new NotFoundException('Beacon not found');
    }

    return {
      id: beacon.id,
      macAddress: beacon.macAddress,
      placeId: beacon.place.map((place) => place.id),
      uuid: beacon.uuid,
      major: beacon.major,
      minor: beacon.minor,
      threshold: beacon.threshold,
    };
  }
}

@QueryHandler(GetAllBeaconInfoQuery)
export class GetAllBeaconInfoQueryHandler
  implements IQueryHandler<GetAllBeaconInfoQuery>
{
  constructor(private readonly beaconRepository: BeaconRepositoryWrapper) {}

  async execute(
    query: GetAllBeaconInfoQuery,
  ): Promise<GetAllBeaconInfoQueryResult> {
    const { placeId } = query;

    let beacons: Beacon[];
    if (placeId) {
      beacons = await this.beaconRepository.findAllByPlaceId(placeId);
    } else {
      beacons = await this.beaconRepository.findAll();
    }

    if (beacons === null) {
      throw new NotFoundException('Beacon not found');
    }

    return {
      beaconInfoQueryResults: beacons.map((beacon) => {
        return {
          id: beacon.id,
          macAddress: beacon.macAddress,
          placeId: beacon.place.map((place) => place.id),
          uuid: beacon.uuid,
          major: beacon.major,
          minor: beacon.minor,
          threshold: beacon.threshold,
        };
      }),
    };
  }
}
