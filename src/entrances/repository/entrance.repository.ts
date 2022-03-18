import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepositoryWrapper } from 'src/users/repository/user.repository';
import { Repository } from 'typeorm';
import { Entrance } from '../entities/entrance.entity';

@Injectable()
export class EntranceRepositoryWrapper {
  constructor(
    @InjectRepository(Entrance)
    private readonly entranceRepository: Repository<Entrance>,
    @Inject(UserRepositoryWrapper)
    private readonly usersRepository: UserRepositoryWrapper,
  ) {}

  public async createEntrance(
    userId: number,
    accessTime: Date,
  ): Promise<Entrance> {
    const entrance = new Entrance();

    entrance.user = await this.usersRepository.findOneById(userId);
    entrance.accessTime = accessTime;

    return await this.entranceRepository.save(entrance);
  }

  public async removeEntrance(
    userId: number,
    accessTime: Date,
  ): Promise<Entrance> {
    const entrance = await this.findOne(userId, accessTime);

    entrance.user = await this.usersRepository.findOneById(userId);
    entrance.accessTime = accessTime;

    return await this.entranceRepository.remove(entrance);
  }

  public async findOne(
    userId: number,
    accessTime: Date,
  ): Promise<Entrance | null> {
    return await this.entranceRepository.findOne({
      where: { user: { id: userId }, accessTime },
    });
  }

  public async findAllByUserId(userId: number): Promise<Entrance[] | null> {
    return await this.entranceRepository.find({
      where: { user: { id: userId } },
    });
  }

  public async findAll(): Promise<Entrance[] | null> {
    return await this.entranceRepository.find();
  }
}
