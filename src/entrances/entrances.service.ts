import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/users.service';
import { Repository } from 'typeorm';
import { CreateEntranceDto } from './dto/create-entrance.dto';
import { RemoveEntranceDto } from './dto/remove-entrance.dto';
import { Entrance } from './entities/entrance.entity';

@Injectable()
export class EntrancesService {
  constructor(
    @InjectRepository(Entrance)
    private readonly entranceRepository: Repository<Entrance>,
    @Inject(UsersService)
    private readonly usersService: UsersService,
  ) {}

  async create(createEntranceDto: CreateEntranceDto) {
    const entrance = new Entrance();

    entrance.user = await this.getUser(createEntranceDto.userId);
    entrance.accessTime = createEntranceDto.accessTime;

    return await this.entranceRepository.save(entrance);
  }

  async remove(removeEntranceDto: RemoveEntranceDto) {
    return await this.findEntrance(
      removeEntranceDto.userId,
      removeEntranceDto.accessTime,
    );
  }

  async findEntrance(userId: number, accessTime: Date): Promise<Entrance> {
    return await this.entranceRepository.findOne({
      where: { user: { id: userId }, accessTime },
    });
  }

  async findEntrancesByUserId(id: number): Promise<Entrance[]> {
    return this.entranceRepository.find({
      where: { user: { id } },
    });
  }

  async findAllEntrances(): Promise<Entrance[]> {
    return await this.entranceRepository.find();
  }

  async getUser(id: number): Promise<User> {
    return await this.usersService.findUserById(id);
  }
}
