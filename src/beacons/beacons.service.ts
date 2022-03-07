import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateBeaconDto } from './dto/create-beacon.dto';
import { UpdateBeaconDto } from './dto/update-beacon.dto';
import { RemoveBeaconDto } from './dto/remove-beacon.dto';
import { Beacon } from './entities/beacon.entity';

@Injectable()
export class BeaconsService {
  constructor(
    @InjectRepository(Beacon)
    private readonly beaconRepository: Repository<Beacon>,
  ) {}

  async create(createBeaconDto: CreateBeaconDto) {
    const beacon = new Beacon();

    beacon.macAddress = createBeaconDto.macAddress;
    beacon.uuid = createBeaconDto.uuid;
    beacon.major = createBeaconDto.major;
    beacon.minor = createBeaconDto.minor;
    beacon.threshold = createBeaconDto.threshold;

    return await this.beaconRepository.save(beacon);
  }

  async update(updateBeaconDto: UpdateBeaconDto) {
    const beacon = await this.findBeacon(updateBeaconDto.macAddress);

    beacon.uuid = updateBeaconDto.uuid;
    beacon.major = updateBeaconDto.major;
    beacon.minor = updateBeaconDto.minor;
    beacon.threshold = updateBeaconDto.threshold;

    return await this.beaconRepository.save(beacon);
  }

  async remove(removeBeaconDto: RemoveBeaconDto) {
    const beacon = await this.findBeacon(removeBeaconDto.macAddress);

    return await this.beaconRepository.remove(beacon);
  }

  async findBeacon(macAddr: string): Promise<Beacon> {
    return await this.beaconRepository.findOne({ macAddress: macAddr });
  }

  async findAll(): Promise<Beacon[]> {
    return await this.beaconRepository.find();
  }
}
