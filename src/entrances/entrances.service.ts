import { Injectable } from '@nestjs/common';
import { CreateEntranceDto } from './dto/create-entrance.dto';
import { UpdateEntranceDto } from './dto/update-entrance.dto';

@Injectable()
export class EntrancesService {
  create(createEntranceDto: CreateEntranceDto) {
    return 'This action adds a new entrance';
  }

  findAll() {
    return `This action returns all entrances`;
  }

  findOne(id: number) {
    return `This action returns a #${id} entrance`;
  }

  update(id: number, updateEntranceDto: UpdateEntranceDto) {
    return `This action updates a #${id} entrance`;
  }

  remove(id: number) {
    return `This action removes a #${id} entrance`;
  }
}
