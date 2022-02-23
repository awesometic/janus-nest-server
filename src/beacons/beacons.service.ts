import { Injectable } from '@nestjs/common';
import { CreateBeaconDto } from './dto/create-beacon.dto';
import { UpdateBeaconDto } from './dto/update-beacon.dto';

@Injectable()
export class BeaconsService {
  create(createBeaconDto: CreateBeaconDto) {
    return 'This action adds a new beacon';
  }

  findAll() {
    return `This action returns all beacons`;
  }

  findOne(id: number) {
    return `This action returns a #${id} beacon`;
  }

  update(id: number, updateBeaconDto: UpdateBeaconDto) {
    return `This action updates a #${id} beacon`;
  }

  remove(id: number) {
    return `This action removes a #${id} beacon`;
  }
}
