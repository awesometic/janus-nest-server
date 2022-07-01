import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Beacon } from '../entities/beacon.entity';

@Injectable()
export class BeaconRepositoryWrapper {
  constructor(
    @InjectRepository(Beacon)
    private readonly beaconRepository: Repository<Beacon>,
  ) {}

  public async createBeacon(
    macAddress: string,
    uuid: string,
    major: string,
    minor: string,
    threshold: number,
  ): Promise<Beacon> {
    const beacon = new Beacon();

    beacon.macAddress = macAddress;
    beacon.uuid = uuid;
    beacon.major = major;
    beacon.minor = minor;
    beacon.threshold = threshold;

    return await this.beaconRepository.save(beacon);
  }

  public async updateBeacon(
    macAddress: string,
    uuid: string,
    major: string,
    minor: string,
    threshold: number,
  ): Promise<Beacon> {
    const beacon = await this.findOneByMacAddr(macAddress);

    beacon.macAddress = macAddress;
    beacon.uuid = uuid;
    beacon.major = major;
    beacon.minor = minor;
    beacon.threshold = threshold;

    return await this.beaconRepository.save(beacon);
  }

  public async removeBeacon(macAddress: string): Promise<Beacon> {
    const beacon = await this.findOneByMacAddr(macAddress);

    return await this.beaconRepository.remove(beacon);
  }

  public async findOneByMacAddr(macAddress: string): Promise<Beacon> {
    return await this.beaconRepository.findOne({ where: { macAddress } });
  }

  public async findAllByPlaceId(placeId: number): Promise<Beacon[]> {
    return await this.beaconRepository
      .createQueryBuilder('beacon')
      .leftJoinAndSelect('beacon.place', 'place')
      .where('place.id = :placeId', { placeId: placeId })
      .getMany();
  }

  public async findAll(): Promise<Beacon[]> {
    return await this.beaconRepository.find();
  }
}
